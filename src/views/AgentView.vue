<template>
  <div class="agent-view">
    <!-- ===== 管理控制台（P8a 方案 D）===== -->
    <div class="console-section">
      <div class="console-header">
        <h2>🤖 Agent 管理控制台</h2>
        <div class="console-actions">
          <div class="health-pill" :class="{ up: healthStatus === 'UP' }">
            <span class="health-dot"></span>
            <span>{{ healthText }}</span>
          </div>
          <button class="btn-primary" @click="openCreateModal">+ 新建 Agent</button>
        </div>
      </div>

      <!-- Agent 定义表格 -->
      <div class="agents-table-wrap">
        <table class="agents-table">
          <thead>
            <tr>
              <th>名称</th>
              <th>描述</th>
              <th>绑定工具</th>
              <th>迭代上限</th>
              <th>温度</th>
              <th>审批策略</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="agent in definitions" :key="agent.id">
              <td class="td-name">{{ agent.name }}
                <span v-if="agent.config?.role === 'master'" class="role-badge master" title="主 Agent：可派发子 Agent">master</span>
              </td>
              <td class="td-desc">{{ agent.description || '—' }}</td>
              <td>
                <span v-for="t in (agent.toolIds || [])" :key="t" class="tool-chip">{{ t }}</span>
                <span v-if="!(agent.toolIds && agent.toolIds.length)" class="text-muted">无</span>
              </td>
              <td>{{ agent.config?.maxIterations ?? '—' }}</td>
              <td>{{ agent.config?.temperature ?? '—' }}</td>
              <td>
                <span class="approval-badge" :class="{
                  'ba-strict': agent.config?.requireApproval === true,
                  'ba-trust': agent.config?.requireApproval === false
                }">{{ approvalLabel(agent.config?.requireApproval) }}</span>
              </td>
              <td>
                <span class="status-pill" :class="agent.enabled ? 'on' : 'off'">
                  {{ agent.enabled ? '启用' : '禁用' }}
                </span>
              </td>
              <td class="td-actions">
                <button class="btn-sm" @click="toggleEnabled(agent)">{{ agent.enabled ? '禁用' : '启用' }}</button>
                <button class="btn-sm" @click="openEditModal(agent)">编辑</button>
                <button class="btn-sm danger" @click="handleDelete(agent)">删除</button>
              </td>
            </tr>
            <tr v-if="definitions.length === 0">
              <td colspan="8" class="empty-row">暂无 Agent 定义，点击右上角「新建 Agent」创建</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 工具清单 + 待审批 -->
      <div class="console-grid">
        <div class="console-card">
          <h3>🛠 工具清单（{{ tools.length }}）</h3>
          <div class="tools-grid">
            <div v-for="t in tools" :key="t.name" class="tool-card">
              <div class="tool-name">
                {{ t.name }}
                <span class="approval-tag" :class="{ required: t.requiresApproval }">
                  {{ t.requiresApproval ? '需审批' : '自动放行' }}
                </span>
              </div>
              <div class="tool-desc">{{ t.description }}</div>
            </div>
          </div>
        </div>

        <div class="console-card">
          <h3>⏳ 待审批（{{ pendingCount }}）</h3>
          <div v-if="pendingCount === 0" class="empty-tip">当前无待审批的工具调用</div>
          <div v-for="(req, id) in pendingRequests" :key="id" class="pending-item">
            <div class="pending-tool">{{ req.toolName }}</div>
            <div class="pending-args"><code>{{ JSON.stringify(req.params) }}</code></div>
            <div class="pending-actions">
              <button class="btn-sm ok" @click="approvePending(id)">批准</button>
              <button class="btn-sm danger" @click="rejectPending(id)">拒绝</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== 调试台（保留的对话区，折叠）===== -->
    <div class="debug-section">
      <button class="debug-toggle" @click="debugOpen = !debugOpen">
        <span class="toggle-arrow" :class="{ open: debugOpen }">▸</span>
        调试台 — 快速验证 Agent 执行（不落库）{{ currentDebugAgent ? '：' + currentDebugAgent : '：默认（全部工具）' }}
      </button>

      <div v-show="debugOpen" class="debug-console">
        <!-- 左侧：Agent 快速选择 + 执行历史 -->
        <aside class="agent-sidebar">
          <div class="panel-header">
            <div class="panel-title">调试会话</div>
          </div>

          <div class="panel-section">
            <div class="section-title">选择 Agent（不选=默认全工具）</div>
            <div class="agents-list">
              <div
                v-for="agent in enabledAgents"
                :key="agent.id"
                class="agent-item"
                :class="{ selected: selectedAgentId === agent.id }"
                @click="toggleAgent(agent.id)"
              >
                <div class="agent-name">{{ agent.name }}</div>
                <div class="agent-desc">{{ agent.description }}</div>
              </div>
            </div>
          </div>

          <div v-if="history.length > 0" class="panel-section history-section">
            <div class="section-title">最近执行</div>
            <div
              v-for="(item, idx) in history"
              :key="idx"
              class="history-item"
              :class="{ active: idx === activeHistoryIndex }"
              @click="activeHistoryIndex = idx"
            >
              <div class="history-question">{{ item.question }}</div>
              <div class="history-meta">{{ item.iterationCount }} 次迭代 · {{ item.toolsUsed.join(', ') || '无工具' }}</div>
            </div>
          </div>
        </aside>

        <!-- 右侧：对话区 -->
        <main class="agent-main">
          <div class="messages-container" ref="messagesContainer">
            <div v-if="messages.length === 0" class="welcome">
              <div class="welcome-icon">🧠</div>
              <h2>Agent 调试台</h2>
              <p>验证 Agent 规划与工具调用。试试：</p>
              <div class="quick-actions">
                <button @click="quickAsk('计算 (128 + 56) * 3 等于多少')">🔢 数学计算</button>
                <button @click="quickAsk('现在几点了？请用工具查询')">🕐 查时间</button>
                <button @click="quickAsk('帮我搜索一下今天的科技新闻')">🔍 搜索（需审批）</button>
              </div>
            </div>

            <div v-for="(msg, idx) in messages" :key="idx" class="message-row" :class="msg.role">
              <div class="avatar">{{ msg.role === 'user' ? '👤' : '🤖' }}</div>
              <div class="message-bubble">
                <!-- 审批提示 -->
                <div v-if="msg.approval" class="approval-box">
                  <div class="approval-title">⚠️ 工具调用需要审批</div>
                  <div class="approval-detail">
                    工具 <b>{{ msg.approval.toolName }}</b>，参数：<code>{{ msg.approval.toolInput }}</code>
                  </div>
                  <div class="approval-actions">
                    <button class="btn-approve" :disabled="msg.approval.done" @click="approve(msg, idx)">✅ 批准执行</button>
                    <button class="btn-reject" :disabled="msg.approval.done" @click="reject(msg, idx)">❌ 拒绝</button>
                  </div>
                  <div v-if="msg.approval.result" class="approval-result">{{ msg.approval.result }}</div>
                </div>

                <!-- 工具调用时间线 -->
                <div v-if="msg.iterations && msg.iterations.length" class="reasoning-block">
                  <button class="reasoning-toggle" @click="msg.showReasoning = !msg.showReasoning">
                    <span class="toggle-arrow" :class="{ open: msg.showReasoning }">▸</span>
                    推理过程（{{ msg.iterations.length }} 次工具调用）
                  </button>
                  <div v-show="msg.showReasoning" class="reasoning-timeline">
                    <div v-for="(iter, i) in msg.iterations" :key="i" class="timeline-step">
                      <div class="step-header">
                        <span class="step-badge">Step {{ iter.iteration }}</span>
                        <span class="step-tool">{{ iter.toolName || '—' }}</span>
                      </div>
                      <div v-if="iter.thought" class="step-item"><span class="step-label">Thought</span>{{ iter.thought }}</div>
                      <div v-if="iter.toolInput" class="step-item"><span class="step-label">Action</span><code>{{ iter.toolInput }}</code></div>
                      <div v-if="iter.observation" class="step-item"><span class="step-label">Observation</span>{{ iter.observation }}</div>
                    </div>
                  </div>
                </div>

                <!-- 正文：流式期间显示 streamingText（逐字增长），完成后显示 finalAnswer -->
                <div v-if="msg.role === 'user'" class="message-text">{{ msg.content }}</div>
                <div v-else-if="msg.streaming && msg.streamingText" class="message-text markdown-body" v-html="renderMarkdown(msg.streamingText)"></div>
                <div v-else-if="msg.streaming && !msg.finalAnswer && !msg.iterations.length" class="typing-dots"><span></span><span></span><span></span></div>
                <div v-else-if="!msg.streaming" class="message-text markdown-body" v-html="renderMarkdown(msg.finalAnswer || msg.content)"></div>
              </div>
            </div>
          </div>

          <!-- 输入区 -->
          <div class="input-area">
            <div class="input-wrapper">
              <textarea
                ref="textareaRef"
                v-model="inputMessage"
                :placeholder="selectedAgentId ? '向选中的 Agent 提问…' : '向 Agent 提问，Enter 发送，Shift+Enter 换行'"
                rows="1"
                @keydown.enter.exact.prevent="sendMessage"
              ></textarea>
            </div>
            <div class="input-actions">
              <span class="input-hint">{{ selectedAgentId ? '已选 Agent: ' + selectedAgentName : '默认 Agent（全部工具）' }}</span>
              <button class="send-btn" :disabled="loading || !inputMessage.trim()" @click="sendMessage">
                {{ loading ? '执行中…' : '发送' }}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>

    <!-- Agent 编辑弹窗 -->
    <div v-if="modalVisible" class="modal-mask" @click.self="modalVisible = false">
      <div class="modal-card">
        <h3>{{ editingId ? '编辑 Agent' : (wizardStep === 1 ? '新建 Agent · 选择模板' : '新建 Agent · 配置') }}</h3>
        <!-- T5 向导第一步：选择模板 -->
        <div v-if="!editingId && wizardStep === 1" class="tpl-grid">
          <button v-for="tpl in agentTemplates" :key="tpl.id" class="tpl-card" @click="applyTemplate(tpl)">
            <div class="tpl-name">{{ tpl.name }}</div>
            <p class="tpl-desc">{{ tpl.description }}</p>
          </button>
          <button class="tpl-card blank" @click="wizardStep = 2">
            <div class="tpl-name">空白开始</div>
            <p class="tpl-desc">不使用模板，从零配置</p>
          </button>
        </div>

        <!-- 第二步：配置表单（编辑模式或向导第二步） -->
        <div v-if="editingId || wizardStep === 2">
          <div class="form-grid">
          <label>名称 *</label>
          <input v-model="form.name" placeholder="例如：数据分析助手" />
          <label>描述</label>
          <input v-model="form.description" placeholder="Agent 职责一句话" />
          <label>系统提示词</label>
          <textarea v-model="form.systemPrompt" rows="4" placeholder="Agent 的角色设定与行为约束"></textarea>
          <label>绑定工具</label>
          <div class="checkbox-row">
            <label v-for="t in tools" :key="t.name" class="checkbox-item">
              <input type="checkbox" :value="t.name" v-model="form.toolIds" /> {{ t.name }}
            </label>
          </div>
          <label>绑定知识库（对话时自动检索注入，空=不绑定）</label>
          <div class="checkbox-row kb-row">
            <label v-for="d in knowledgeDocs" :key="d.id" class="checkbox-item kb-item" :title="d.fileName">
              <input type="checkbox" :value="d.id" v-model="form.knowledgeDocumentIds" /> {{ d.fileName }}
            </label>
            <span v-if="knowledgeDocs.length === 0" class="kb-empty">知识库暂无已完成索引的文档</span>
          </div>
          <label>检索条数 topK（1-10）</label>
          <input v-model.number="form.ragTopK" type="number" min="1" max="10" class="kb-topk" />
          <label>迭代上限</label>
          <input v-model.number="form.maxIterations" type="number" min="1" max="10" />
          <label>温度</label>
          <input v-model.number="form.temperature" type="number" min="0" max="2" step="0.1" />
          <label>角色</label>
          <select v-model="form.role" class="approval-select">
            <option :value="null">普通 Agent（不可派发）</option>
            <option value="master">master（可派发子 Agent）</option>
          </select>
          <label v-if="form.role === 'master'">允许派发的子 Agent（多选，仅列非 master）</label>
          <div v-if="form.role === 'master'" class="checkbox-row kb-row">
            <label v-for="w in workerCandidates" :key="w.id" class="checkbox-item kb-item" :title="w.description">
              <input type="checkbox" :value="w.id" v-model="form.allowedWorkers" /> {{ w.name }}
            </label>
            <span v-if="workerCandidates.length === 0" class="kb-empty">暂无可选子 Agent（先创建普通 Agent）</span>
          </div>
          <label>审批策略</label>
          <select v-model="form.requireApproval" class="approval-select">
            <option :value="null">继承默认（search 等外部工具需审批）</option>
            <option :value="true">全部工具需审批（最严格）</option>
            <option :value="false">免审批（可信 Agent，工具直接执行）</option>
          </select>
          <label>启用</label>
          <input v-model="form.enabled" type="checkbox" class="single-check" />
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn-sm" @click="modalVisible = false">取消</button>
          <button v-if="!editingId" class="btn-sm" @click="wizardStep = 1">← 重选模板</button>
          <button class="btn-sm ok" :disabled="!form.name" @click="submitModal">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { message as antdMessage } from 'ant-design-vue'
import { marked } from 'marked'
import {
  getEnabledAgents, getAgentTools, agentHealth,
  getPendingApprovals, approveToolCall, rejectToolCall,
  agentChatStream, listDefinitions, createDefinition,
  updateDefinition, deleteDefinition, setDefinitionEnabled, reloadDefinitions
} from '@/api/agent'
import { getDocuments } from '@/api/knowledge'

// ========== 管理台状态 ==========
const definitions = reactive([])
const tools = reactive([])
const healthStatus = ref('checking')
const pendingRequests = ref({})
const pendingCount = ref(0)
const modalVisible = ref(false)
const editingId = ref(null)
const form = reactive({
  name: '', description: '', systemPrompt: '',
  toolIds: [], maxIterations: 5, temperature: 0.7, enabled: true,
  requireApproval: null,
  role: null, allowedWorkers: [],
  knowledgeDocumentIds: [], ragTopK: 4
})

// T5 创建向导：模板与知识库数据
const agentTemplates = computed(() => definitions.filter(d => (d.id || '').startsWith('template-')))
const knowledgeDocs = ref([])
const wizardStep = ref(1) // 1=选模板 2=配置（创建模式专用）

async function loadKnowledgeDocs() {
  try {
    const res = await getDocuments()
    const data = res?.data !== undefined ? res.data : res
    knowledgeDocs.value = (Array.isArray(data) ? data : []).filter(d => d.status === 2)
  } catch (e) { console.error('[Gewu] 知识库列表加载失败:', e) }
}

function applyTemplate(tpl) {
  Object.assign(form, {
    name: (tpl.name || '').replace(/（模板）/g, ''),
    description: tpl.description || '',
    systemPrompt: tpl.systemPrompt || '',
    toolIds: [...(tpl.toolIds || [])],
    maxIterations: tpl.config?.maxIterations ?? 5,
    temperature: tpl.config?.temperature ?? 0.7,
    requireApproval: tpl.config?.requireApproval ?? null,
    role: tpl.config?.role ?? null,
    allowedWorkers: [...(tpl.config?.allowedWorkers || [])],
    knowledgeDocumentIds: [...(tpl.config?.knowledgeDocumentIds || [])],
    ragTopK: tpl.config?.ragTopK ?? 4,
    enabled: true
  })
  wizardStep.value = 2
}

// P8b 审批策略展示文案
const approvalLabel = (v) => v === true ? '全部审批' : v === false ? '免审批' : '继承默认'
// R1: master 可派发的子 Agent 候选（排除模板/自身/其他 master）
const workerCandidates = computed(() => definitions.filter(d =>
  !(d.id || '').startsWith('template-') && d.id !== editingId.value && d.config?.role !== 'master'
))
let healthTimer = null
let pendingTimer = null

const healthText = computed(() =>
  healthStatus.value === 'UP' ? '引擎运行中' : healthStatus.value === 'DOWN' ? '引擎异常' : '检查中…'
)
const enabledAgents = computed(() => definitions.filter(a => a.enabled))

// ========== 调试台状态 ==========
const debugOpen = ref(false)
const messages = reactive([])
const history = reactive([])
const selectedAgentId = ref(null)
const inputMessage = ref('')
const loading = ref(false)
const activeHistoryIndex = ref(-1)
const messagesContainer = ref(null)
const textareaRef = ref(null)

const selectedAgentName = computed(() => {
  const a = definitions.find(x => x.id === selectedAgentId.value)
  return a ? a.name : ''
})

function renderMarkdown(content) {
  return marked.parse(content || '', { breaks: true, gfm: true })
}

watch(inputMessage, () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height = Math.min(textareaRef.value.scrollHeight, 120) + 'px'
  }
})

async function scrollToBottom() {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// ========== 管理台逻辑 ==========
async function loadDefinitions() {
  try {
    const res = await listDefinitions()
    if (res.code === 200 && Array.isArray(res.data)) {
      definitions.length = 0
      res.data.forEach(a => definitions.push(a))
    }
  } catch (e) { console.warn('加载 Agent 定义失败:', e) }
}

async function loadTools() {
  try {
    const res = await getAgentTools()
    if (res.code === 200 && Array.isArray(res.data)) {
      tools.length = 0
      res.data.forEach(t => tools.push(t))
    }
  } catch (e) { console.warn('加载工具清单失败:', e) }
}

async function checkHealth() {
  try {
    const res = await agentHealth()
    healthStatus.value = (res.code === 200 && res.data && res.data.status) ? res.data.status : 'DOWN'
  } catch { healthStatus.value = 'DOWN' }
}

async function loadPending() {
  try {
    const res = await getPendingApprovals()
    if (res.code === 200 && res.data) {
      pendingRequests.value = res.data.requests || {}
      pendingCount.value = res.data.count || 0
    }
  } catch (e) { /* 静默 */ }
}

async function approvePending(id) {
  try {
    const res = await approveToolCall(id)
    if (res.code === 200) {
      antdMessage.success('已批准执行')
      loadPending()
    } else {
      antdMessage.error(res.message || '审批失败')
    }
  } catch (e) { antdMessage.error('异常：' + e.message) }
}

async function rejectPending(id) {
  try {
    const res = await rejectToolCall(id, '管理台拒绝')
    if (res.code === 200) {
      antdMessage.info('已拒绝')
      loadPending()
    } else {
      antdMessage.error(res.message || '操作失败')
    }
  } catch (e) { antdMessage.error('异常：' + e.message) }
}

function openCreateModal() {
  editingId.value = null
  Object.assign(form, { name: '', description: '', systemPrompt: '', toolIds: [], maxIterations: 5, temperature: 0.7, enabled: true, requireApproval: null, role: null, allowedWorkers: [], knowledgeDocumentIds: [], ragTopK: 4 })
  wizardStep.value = 1
  loadKnowledgeDocs()
  modalVisible.value = true
}

function openEditModal(agent) {
  editingId.value = agent.id
  Object.assign(form, {
    name: agent.name,
    description: agent.description || '',
    systemPrompt: agent.systemPrompt || '',
    toolIds: [...(agent.toolIds || [])],
    maxIterations: agent.config?.maxIterations ?? 5,
    temperature: agent.config?.temperature ?? 0.7,
    enabled: agent.enabled !== false,
    requireApproval: agent.config?.requireApproval ?? null,
    role: agent.config?.role ?? null,
    allowedWorkers: [...(agent.config?.allowedWorkers || [])],
    knowledgeDocumentIds: [...(agent.config?.knowledgeDocumentIds || [])],
    ragTopK: agent.config?.ragTopK ?? 4
  })
  modalVisible.value = true
}

async function submitModal() {
  const payload = {
    name: form.name,
    description: form.description,
    systemPrompt: form.systemPrompt,
    toolIds: form.toolIds,
    modelId: null,
    maxIterations: form.maxIterations,
    temperature: form.temperature,
    enabled: form.enabled,
    requireApproval: form.requireApproval,
    role: form.role,
    allowedWorkers: form.allowedWorkers,
    knowledgeDocumentIds: form.knowledgeDocumentIds,
    ragTopK: form.ragTopK
  }
  try {
    let res
    if (editingId.value) {
      res = await updateDefinition({ id: editingId.value, ...payload })
    } else {
      res = await createDefinition(payload)
    }
    if (res.code === 200) {
      antdMessage.success(editingId.value ? '更新成功' : '创建成功')
      modalVisible.value = false
      await reloadDefinitions().catch(() => {})
      loadDefinitions()
    } else {
      antdMessage.error(res.message || '保存失败')
    }
  } catch (e) { antdMessage.error('异常：' + e.message) }
}

async function toggleEnabled(agent) {
  try {
    const res = await setDefinitionEnabled(agent.id, !agent.enabled)
    if (res.code === 200) {
      agent.enabled = !agent.enabled
      await reloadDefinitions().catch(() => {})
      antdMessage.success(agent.enabled ? '已启用' : '已禁用')
    } else {
      antdMessage.error(res.message || '操作失败')
    }
  } catch (e) { antdMessage.error('异常：' + e.message) }
}

async function handleDelete(agent) {
  if (!window.confirm(`确定删除 Agent「${agent.name}」？此操作不可恢复。`)) return
  try {
    const res = await deleteDefinition(agent.id)
    if (res.code === 200) {
      antdMessage.success('已删除')
      loadDefinitions()
    } else {
      antdMessage.error(res.message || '删除失败')
    }
  } catch (e) { antdMessage.error('异常：' + e.message) }
}

// ========== 调试台逻辑（原 AgentView 对话） ==========
function toggleAgent(id) {
  selectedAgentId.value = selectedAgentId.value === id ? null : id
}

function quickAsk(q) {
  inputMessage.value = q
  sendMessage()
}

async function sendMessage() {
  const text = inputMessage.value.trim()
  if (!text || loading.value) return

  messages.push({ role: 'user', content: text })
  inputMessage.value = ''
  loading.value = true
  await scrollToBottom()

  const agentMsg = reactive({
    role: 'agent',
    finalAnswer: '',
    streamingText: '',
    iterations: [],
    iterationCount: 0,
    toolsUsed: [],
    showReasoning: true,
    streaming: true,
    approval: null
  })
  messages.push(agentMsg)
  await scrollToBottom()

  const findIteration = (n) => {
    let it = agentMsg.iterations.find(x => x.iteration === n)
    if (!it) {
      it = { iteration: n, thought: '', toolName: '', toolInput: '', observation: '' }
      agentMsg.iterations.push(it)
    }
    return it
  }

  try {
    await agentChatStream(
      { message: text, agentId: selectedAgentId.value || undefined },
      {
        onIteration: (e) => { agentMsg.iterationCount = e.iteration || 0; scrollToBottom() },
        onDelta: (e) => {
          agentMsg.streamingText = (agentMsg.streamingText || '') + (e.content || '')
          scrollToBottom()
        },
        onThought: (e) => { const it = findIteration(e.iteration); it.thought = (it.thought || '') + (e.content || ''); scrollToBottom() },
        onAction: (e) => {
          const it = findIteration(e.iteration); it.toolName = e.toolName; it.toolInput = e.toolInput
          const cur = findIteration(e.iteration)
          if (!cur.thought && agentMsg.streamingText) {
            cur.thought = agentMsg.streamingText
            agentMsg.streamingText = ''
          }
          scrollToBottom()
        },
        onToolResult: (e) => {
          const it = findIteration(e.iteration)
          it.toolName = e.toolName
          it.observation = e.content
          if (!agentMsg.toolsUsed.includes(e.toolName)) agentMsg.toolsUsed.push(e.toolName)
          scrollToBottom()
        },
        onApprovalRequired: (e) => {
          agentMsg.approval = {
            toolCallId: e.toolCallId,
            toolName: e.toolName,
            toolInput: e.toolInput,
            done: false,
            result: ''
          }
          scrollToBottom()
        },
        onDone: (e) => {
          agentMsg.finalAnswer = e.content || agentMsg.streamingText || ''
          agentMsg.streamingText = ''
          agentMsg.iterationCount = e.iteration || agentMsg.iterationCount
          if (e.toolsUsed) agentMsg.toolsUsed = e.toolsUsed
          agentMsg.streaming = false
          loading.value = false
          history.unshift({
            question: text,
            iterationCount: agentMsg.iterationCount,
            toolsUsed: [...agentMsg.toolsUsed]
          })
          if (history.length > 10) history.pop()
          scrollToBottom()
        },
        onError: (e) => {
          agentMsg.finalAnswer = e && e.message ? `❌ ${e.message}` : '❌ 请求失败'
          agentMsg.streamingText = ''
          agentMsg.streaming = false
          loading.value = false
          scrollToBottom()
        }
      }
    )
  } finally {
    loading.value = false
    agentMsg.streaming = false
  }
}

async function approve(msg, idx) {
  if (!msg.approval || msg.approval.done) return
  msg.approval.done = true
  try {
    const res = await approveToolCall(msg.approval.toolCallId)
    msg.approval.result = res.code === 200
      ? '✅ 已批准，Agent 继续执行中…'
      : `❌ ${res.message || '审批失败'}`
  } catch (e) {
    msg.approval.result = `❌ 异常：${e.message}`
  }
}

async function reject(msg, idx) {
  if (!msg.approval || msg.approval.done) return
  msg.approval.done = true
  try {
    const res = await rejectToolCall(msg.approval.toolCallId, '用户拒绝')
    msg.approval.result = res.code === 200
      ? '🚫 已拒绝，Agent 将基于拒绝结果继续'
      : `❌ ${res.message || '操作失败'}`
  } catch (e) {
    msg.approval.result = `❌ 异常：${e.message}`
  }
}

onMounted(() => {
  checkHealth()
  loadDefinitions()
  loadTools()
  loadPending()
  healthTimer = setInterval(() => { checkHealth(); loadPending() }, 30000)
})

onUnmounted(() => {
  if (healthTimer) clearInterval(healthTimer)
  if (pendingTimer) clearInterval(pendingTimer)
})
</script>

<style lang="scss" scoped>
.agent-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

/* ===== 管理控制台 ===== */
.console-section {
  padding: 20px 24px 8px;
}

.console-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;

  h2 { font-size: 18px; color: var(--text-primary); }
}

.console-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.health-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 12px;
  background: rgba(248, 81, 73, 0.12);
  color: #f85149;

  &.up {
    background: rgba(52, 211, 153, 0.12);
    color: #10b981;
  }

  .health-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: currentColor;
  }
}

.btn-primary {
  padding: 7px 16px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #0ea5e9, #6366f1);
  color: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover { opacity: 0.9; }
}

.agents-table-wrap {
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
}

.agents-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;

  th {
    text-align: left;
    padding: 10px 14px;
    background: var(--bg-tertiary);
    color: var(--text-secondary);
    font-weight: 600;
    border-bottom: 1px solid var(--border-color);
  }

  td {
    padding: 10px 14px;
    border-bottom: 1px solid var(--border-color);
    color: var(--text-primary);
  }

  tr:last-child td { border-bottom: none; }

  .td-name { font-weight: 600; }
  .td-desc {
    color: var(--text-secondary);
    max-width: 260px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .td-actions { display: flex; gap: 6px; }
  .empty-row {
    text-align: center;
    color: var(--text-secondary);
    padding: 24px;
  }
}

.status-pill {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 11px;

  &.on { background: rgba(52, 211, 153, 0.12); color: #10b981; }
  &.off { background: rgba(148, 163, 184, 0.15); color: #94a3b8; }
}

/* P8b 审批策略徽章 */
.approval-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 11px;
  background: rgba(148, 163, 184, 0.15);
  color: #94a3b8;

  &.ba-strict { background: rgba(251, 146, 60, 0.14); color: #f97316; }
  &.ba-trust { background: rgba(52, 211, 153, 0.12); color: #10b981; }
}

.approval-select {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-tertiary);
  color: var(--text-primary);
  font-size: 13px;
}

.tool-chip {
  display: inline-block;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  margin-right: 4px;
}

.console-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 8px;
}

.console-card {
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 14px 16px;

  h3 { font-size: 14px; margin-bottom: 12px; color: var(--text-primary); }
}

.tools-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tool-card {
  padding: 8px 10px;
  border-radius: 8px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);

  .tool-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .tool-desc {
    font-size: 12px;
    color: var(--text-secondary);
    margin-top: 3px;
  }
}

.approval-tag {
  font-size: 10px;
  padding: 1px 7px;
  border-radius: 999px;
  background: rgba(52, 211, 153, 0.12);
  color: #10b981;

  &.required {
    background: rgba(245, 158, 11, 0.12);
    color: #d97706;
  }
}

.pending-item {
  padding: 10px;
  border-radius: 8px;
  background: rgba(245, 158, 11, 0.06);
  border: 1px solid rgba(245, 158, 11, 0.25);
  margin-bottom: 8px;

  .pending-tool { font-size: 13px; font-weight: 600; color: #d97706; }
  .pending-args {
    font-size: 11px;
    color: var(--text-secondary);
    margin: 5px 0;
    code { background: var(--bg-tertiary); padding: 1px 5px; border-radius: 4px; }
  }
  .pending-actions { display: flex; gap: 6px; }
}

.btn-sm {
  padding: 4px 12px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 12px;
  cursor: pointer;

  &:hover { background: var(--bg-tertiary); }
  &.ok { background: #10b981; border-color: #10b981; color: white; }
  &.danger { background: rgba(248, 81, 73, 0.9); border-color: transparent; color: white; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
}

/* ===== 调试台（卡片化，与上方工具清单/待审批卡片视觉统一）===== */
.debug-section {
  margin: 0 24px 24px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-secondary);
  overflow: hidden;
  flex-shrink: 0;
}

.debug-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 12px 16px;
  background: var(--bg-tertiary);
  border: none;
  color: var(--text-primary);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
}

.toggle-arrow {
  display: inline-block;
  transition: transform 0.15s;
  &.open { transform: rotate(90deg); }
}

/* 调试台内部布局（原 AgentView 对话区双栏，独立类名避免与页面根 .agent-view 冲突） */
.debug-console {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 480px;
  min-height: 0;
  flex-shrink: 0;
  overflow: hidden;
  border-top: 1px solid var(--border-color);
}

.debug-console .agent-sidebar {
  width: 280px;
  flex-shrink: 0;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  overflow-y: auto;
  padding-bottom: 16px;
}

.debug-console .panel-header {
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.debug-console .panel-title {
  font-weight: 600;
  font-size: 15px;
  color: var(--text-primary);
}

.debug-console .panel-section {
  padding: 14px 16px 4px;
}

.debug-console .section-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}

.debug-console .agents-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.debug-console .agent-item {
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--bg-tertiary);
  cursor: pointer;
  transition: all 0.15s;

  &:hover { background: var(--border-color); }
  &.selected {
    border-color: var(--accent);
    background: rgba(14, 165, 233, 0.08);
  }

  .agent-name { font-size: 13px; font-weight: 600; color: var(--text-primary); }
  .agent-desc {
    font-size: 12px;
    color: var(--text-secondary);
    margin-top: 3px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.debug-console .history-section { margin-top: 8px; }

.debug-console .history-item {
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 6px;

  &:hover, &.active { background: rgba(14, 165, 233, 0.08); }

  .history-question {
    font-size: 12px;
    color: var(--text-primary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .history-meta { font-size: 11px; color: var(--text-secondary); margin-top: 3px; }
}

.debug-console .agent-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}

.debug-console .messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.debug-console .welcome {
  margin: auto;
  max-width: 560px;
  text-align: center;
  padding: 32px 20px;

  .welcome-icon { font-size: 48px; margin-bottom: 10px; }
  h2 { font-size: 22px; color: var(--text-primary); margin-bottom: 8px; }
  p { color: var(--text-secondary); margin-bottom: 18px; }
}

.debug-console .quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;

  button {
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid var(--border-color);
    background: var(--bg-secondary);
    color: var(--text-primary);
    font-size: 13px;
    cursor: pointer;
    transition: all 0.15s;

    &:hover {
      border-color: var(--accent);
      color: var(--accent);
    }
  }
}

.debug-console .message-row {
  display: flex;
  gap: 10px;
  margin-bottom: 18px;

  &.user { flex-direction: row-reverse; }

  .avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }
}

.debug-console .message-bubble {
  max-width: 720px;
  padding: 10px 14px;
  border-radius: 12px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);

  .user & {
    background: rgba(14, 165, 233, 0.08);
    border-color: rgba(14, 165, 233, 0.25);
  }
}

.debug-console .message-text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-primary);
  word-break: break-word;

  &.markdown-body :deep(p) { margin-bottom: 8px; &:last-child { margin-bottom: 0; } }
  &.markdown-body :deep(code) {
    background: var(--bg-tertiary);
    padding: 1px 6px;
    border-radius: 4px;
    font-size: 13px;
  }
  &.markdown-body :deep(pre) {
    background: var(--bg-tertiary);
    padding: 10px 12px;
    border-radius: 8px;
    overflow-x: auto;
    code { background: none; padding: 0; }
  }
  &.markdown-body :deep(ul), &.markdown-body :deep(ol) { padding-left: 20px; margin-bottom: 8px; }
}

.debug-console .typing-dots {
  display: inline-flex;
  gap: 4px;
  padding: 6px 0;

  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--text-secondary);
    animation: blink 1.2s infinite;

    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
}

@keyframes blink {
  0%, 80%, 100% { opacity: 0.25; }
  40% { opacity: 1; }
}

.debug-console .approval-box {
  margin-bottom: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.35);

  .approval-title { font-size: 13px; font-weight: 600; color: #d97706; }
  .approval-detail {
    font-size: 12px;
    color: var(--text-primary);
    margin: 6px 0;
    code {
      background: var(--bg-tertiary);
      padding: 1px 6px;
      border-radius: 4px;
      font-size: 11px;
    }
  }
  .approval-actions {
    display: flex;
    gap: 8px;
    margin-top: 8px;

    button {
      padding: 5px 12px;
      border-radius: 8px;
      border: none;
      font-size: 12px;
      cursor: pointer;

      &:disabled { opacity: 0.5; cursor: not-allowed; }
    }
    .btn-approve { background: #10b981; color: white; }
    .btn-reject { background: rgba(248, 81, 73, 0.9); color: white; }
  }
  .approval-result {
    margin-top: 8px;
    font-size: 12px;
    color: var(--text-secondary);
  }
}

.debug-console .reasoning-block { margin-bottom: 8px; }

.debug-console .reasoning-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: var(--accent);
  font-size: 12px;
  cursor: pointer;
  padding: 2px 0;
}

.debug-console .reasoning-timeline {
  margin-top: 8px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
}

.debug-console .timeline-step {
  padding: 8px 0;
  border-bottom: 1px dashed var(--border-color);

  &:last-child { border-bottom: none; }
}

.debug-console .step-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;

  .step-badge {
    font-size: 10px;
    font-weight: 600;
    padding: 1px 7px;
    border-radius: 999px;
    background: rgba(14, 165, 233, 0.12);
    color: var(--accent);
  }
  .step-tool {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-primary);
  }
}

.debug-console .step-item {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 4px;
  line-height: 1.5;
  word-break: break-word;

  .step-label {
    display: inline-block;
    font-size: 10px;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    margin-right: 6px;
    opacity: 0.8;
  }
  code {
    background: var(--bg-secondary);
    padding: 1px 5px;
    border-radius: 4px;
    font-size: 11px;
    color: var(--text-primary);
  }
}

.debug-console .input-area {
  padding: 12px 24px 16px;
  border-top: 1px solid var(--border-color);
}

.debug-console .input-wrapper {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;

  textarea {
    width: 100%;
    padding: 10px 14px;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    background: var(--bg-secondary);
    color: var(--text-primary);
    font-size: 14px;
    font-family: inherit;
    resize: none;
    outline: none;
    transition: border-color 0.15s;

    &:focus { border-color: var(--accent); }
  }
}

.debug-console .input-actions {
  width: 100%;
  max-width: 720px;
  margin: 8px auto 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .input-hint {
    font-size: 12px;
    color: var(--text-secondary);
  }

  .send-btn {
    padding: 8px 22px;
    border-radius: 999px;
    border: none;
    background: linear-gradient(135deg, #0ea5e9, #6366f1);
    color: white;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.15s;

    &:disabled { opacity: 0.5; cursor: not-allowed; }
    &:not(:disabled):hover { opacity: 0.9; }
  }
}

/* ===== 弹窗 ===== */
/* ---- T5 创建向导：模板卡片与知识库绑定 ---- */
.tpl-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
  margin-bottom: 6px;
}

.tpl-card {
  text-align: left;
  border: 1px solid var(--border-color, #e2e8f0);
  background: var(--bg-secondary, #ffffff);
  border-radius: 10px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tpl-card:hover {
  border-color: var(--accent, #4F46E5);
  transform: translateY(-1px);
}

.tpl-card.blank {
  border-style: dashed;
  color: var(--text-secondary, #64748b);
}

.tpl-name {
  font-weight: 600;
  font-size: 13px;
  color: var(--text-primary, #1e293b);
  margin-bottom: 4px;
}

.tpl-desc {
  font-size: 12px;
  color: var(--text-secondary, #64748b);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.kb-row {
  max-height: 120px;
  overflow-y: auto;
}

.kb-item span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 180px;
  display: inline-block;
  vertical-align: middle;
}

.kb-empty {
  font-size: 12px;
  color: var(--text-secondary, #64748b);
}

.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-card {
  width: 560px;
  max-height: 84vh;
  overflow-y: auto;
  background: var(--bg-primary, #fff);
  border-radius: 14px;
  padding: 22px 24px;
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.25);

  h3 { font-size: 16px; margin-bottom: 16px; color: var(--text-primary); }
}

.form-grid {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 12px 14px;
  align-items: start;

  label {
    font-size: 13px;
    color: var(--text-secondary);
    padding-top: 7px;
  }

  input, textarea {
    width: 100%;
    padding: 7px 11px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    background: var(--bg-secondary);
    color: var(--text-primary);
    font-size: 13px;
    font-family: inherit;
    outline: none;

    &:focus { border-color: var(--accent); }
  }

  input[type='checkbox'] { width: auto; padding: 0; }
  .single-check { justify-self: start; }
}

.checkbox-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .checkbox-item {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 13px;
    color: var(--text-primary);
    padding-top: 0;
  }
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 18px;
}
.role-badge {
  display: inline-block;
  margin-left: 6px;
  padding: 1px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  vertical-align: middle;
}
.role-badge.master {
  background: rgba(250, 173, 20, 0.15);
  color: #d48806;
  border: 1px solid rgba(250, 173, 20, 0.45);
}
</style>

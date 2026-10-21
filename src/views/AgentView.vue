<template>
  <div class="agent-view">
    <!-- 左侧：Agent 列表 + 工具 + 历史 -->
    <aside class="agent-sidebar">
      <div class="panel-header">
        <div class="panel-title">🤖 Agent 引擎</div>
        <div class="health-pill" :class="{ up: healthStatus === 'UP' }">
          <span class="health-dot"></span>
          <span>{{ healthText }}</span>
        </div>
      </div>

      <div class="panel-section">
        <div class="section-title">可用 Agent ({{ agents.length }})</div>
        <div class="agents-list">
          <div
            v-for="agent in agents"
            :key="agent.id"
            class="agent-item"
            :class="{ selected: selectedAgentId === agent.id }"
            @click="toggleAgent(agent.id)"
          >
            <div class="agent-name">{{ agent.name }}</div>
            <div class="agent-desc">{{ agent.description }}</div>
          </div>
          <div v-if="agents.length === 0" class="empty-tip">暂无可用 Agent</div>
        </div>
      </div>

      <div class="panel-section">
        <div class="section-title">工具清单 ({{ tools.length }})</div>
        <div class="tools-list">
          <span v-for="t in tools" :key="t.name" class="tool-chip" :title="t.description">
            {{ t.name }}
          </span>
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
          <h2>AI Agent 智能助手</h2>
          <p>Agent 会自动规划并调用工具回答问题。试试：</p>
          <div class="quick-actions">
            <button @click="quickAsk('计算 (128 + 56) * 3 等于多少')">🔢 数学计算</button>
            <button @click="quickAsk('现在几点了？请用工具查询')">🕐 查时间</button>
            <button @click="quickAsk('现在东京是几点钟？')">🌍 东京时间</button>
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
</template>

<script setup>
import { ref, reactive, computed, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { marked } from 'marked'
import {
  getEnabledAgents, getAgentTools, agentHealth,
  getPendingApprovals, approveToolCall, rejectToolCall,
  agentChatStream
} from '@/api/agent'

// ========== 状态 ==========
const agents = reactive([])
const tools = reactive([])
const messages = reactive([])
const history = reactive([])
const healthStatus = ref('checking')
const selectedAgentId = ref(null)
const inputMessage = ref('')
const loading = ref(false)
const activeHistoryIndex = ref(-1)
const messagesContainer = ref(null)
const textareaRef = ref(null)
let healthTimer = null

const healthText = computed(() =>
  healthStatus.value === 'UP' ? '运行中' : healthStatus.value === 'DOWN' ? '异常' : '检查中…'
)

function renderMarkdown(content) {
  return marked.parse(content || '', { breaks: true, gfm: true })
}
const selectedAgentName = computed(() => {
  const a = agents.find(x => x.id === selectedAgentId.value)
  return a ? a.name : ''
})

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

// ========== 数据加载 ==========
async function loadAgents() {
  try {
    const res = await getEnabledAgents()
    if (res.code === 200 && Array.isArray(res.data)) {
      agents.length = 0
      res.data.forEach(a => agents.push(a))
    }
  } catch (e) { console.warn('加载 Agent 列表失败:', e) }
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

function toggleAgent(id) {
  selectedAgentId.value = selectedAgentId.value === id ? null : id
}

function quickAsk(q) {
  inputMessage.value = q
  sendMessage()
}

// ========== 发送（SSE 流式） ==========
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
          // 每轮 LLM 输出实时追加；最终轮即答案本体，中间轮为思考文本
          agentMsg.streamingText = (agentMsg.streamingText || '') + (e.content || '')
          scrollToBottom()
        },
        onThought: (e) => { const it = findIteration(e.iteration); it.thought = (it.thought || '') + (e.content || ''); scrollToBottom() },
        onAction: (e) => {
          const it = findIteration(e.iteration); it.toolName = e.toolName; it.toolInput = e.toolInput
          // 本轮已流出的文本归入时间线 Thought，正文区清空准备接收下一轮/最终答案
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
          // 工具结果回填后清掉正文区残留（若有），准备接收下一轮 delta
          if (agentMsg.streamingText) agentMsg.streamingText = ''
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

// ========== 审批 ==========
async function approve(msg) {
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

async function reject(msg) {
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
  loadAgents()
  loadTools()
  healthTimer = setInterval(checkHealth, 30000)
})

onUnmounted(() => {
  if (healthTimer) clearInterval(healthTimer)
})
</script>

<style lang="scss" scoped>
.agent-view {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* ===== 左侧栏 ===== */
.agent-sidebar {
  width: 280px;
  flex-shrink: 0;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  overflow-y: auto;
  padding-bottom: 16px;
}

.panel-header {
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.panel-title {
  font-weight: 600;
  font-size: 15px;
  color: var(--text-primary);
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

.panel-section {
  padding: 14px 16px 4px;
}

.section-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}

.agents-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.agent-item {
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

.empty-tip {
  font-size: 12px;
  color: var(--text-secondary);
  padding: 8px 0;
}

.tools-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tool-chip {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 999px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  cursor: default;
}

.history-section { margin-top: 8px; }

.history-item {
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

/* ===== 右侧对话区 ===== */
.agent-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.welcome {
  margin: auto;
  max-width: 560px;
  text-align: center;
  padding: 32px 20px;

  .welcome-icon { font-size: 56px; margin-bottom: 12px; }
  h2 { font-size: 26px; color: var(--text-primary); margin-bottom: 8px; }
  p { color: var(--text-secondary); margin-bottom: 20px; }
}

.quick-actions {
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

.message-row {
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

.message-bubble {
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

.message-text {
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

.typing-dots {
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

/* ===== 审批框 ===== */
.approval-box {
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

/* ===== 推理时间线 ===== */
.reasoning-block { margin-bottom: 8px; }

.reasoning-toggle {
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

.toggle-arrow {
  display: inline-block;
  transition: transform 0.15s;
  &.open { transform: rotate(90deg); }
}

.reasoning-timeline {
  margin-top: 8px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
}

.timeline-step {
  padding: 8px 0;
  border-bottom: 1px dashed var(--border-color);

  &:last-child { border-bottom: none; }
}

.step-header {
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

.step-item {
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

/* ===== 输入区 ===== */
.input-area {
  padding: 12px 24px 16px;
  border-top: 1px solid var(--border-color);
  background: var(--bg-primary, transparent);
}

.input-wrapper {
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

.input-actions {
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
</style>

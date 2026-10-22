<template>
  <div class="chat-view">
    <!-- 左侧：会话列表 -->
    <aside class="sidebar-panel">
      <div class="panel-header">
        <h3>💬 会话</h3>
        <button class="btn-icon" @click="handleCreateSession" title="新建会话">+</button>
      </div>
      <div class="session-list">
        <div
          v-for="s in chatStore.sessions"
          :key="s.id"
          class="session-item"
          :class="{ active: s.id === chatStore.sessionId }"
          @click="handleSelectSession(s.id)"
        >
          <span class="session-name">{{ sessionTitle(s) }}</span>
          <button class="btn-del" @click.stop="handleDeleteSession(s.id)">×</button>
        </div>
        <div v-if="chatStore.sessions.length === 0" class="empty-hint">暂无会话</div>
      </div>

      <!-- 模型快捷切换 -->
      <div class="panel-section">
        <div class="section-title">🤖 当前模型</div>
        <select v-model="activeModelId" @change="onModelSwitch" class="model-select">
          <option v-for="m in modelList" :key="m.id" :value="m.id">
            {{ m.description || m.modelName }}
          </option>
        </select>
        <div class="model-status">
          <span class="dot" :class="{ online: backendOnline }"></span>
          <span>{{ backendOnline ? '后端在线' : '后端离线' }}</span>
        </div>
      </div>
    </aside>

    <!-- 主聊天区 -->
    <main class="chat-main">
      <!-- 消息列表 -->
      <div class="messages-container" ref="messagesContainer">
        <div v-if="chatStore.messages.length === 0 && !chatStore.isLoading" class="welcome">
          <div class="welcome-icon">🔗</div>
          <h2>LangChain4j 对话</h2>
          <p>支持同步调用、流式输出、会话记忆、角色扮演</p>
          <div class="quick-actions">
            <button class="quick-btn" @click="applyQuickQuestion('介绍一下 LangChain4j 的核心概念')">
              🤔 LangChain4j 是什么？
            </button>
            <button class="quick-btn" @click="applyQuickQuestion('Spring AI 和 LangChain4j 有什么区别？')">
              ⚡ Spring AI vs LangChain4j？
            </button>
            <button class="quick-btn" @click="applyQuickQuestion('用Java写一个工具调用的示例')">
              🛠 写个 Tool Calling 示例
            </button>
          </div>
        </div>

        <div
          v-for="(msg, index) in chatStore.messages"
          :key="msg.id || index"
          class="message-row"
          :class="msg.role"
        >
          <div class="avatar">
            {{ msg.role === 'user' ? '👤' : '🤖' }}
          </div>
          <div class="message-bubble">
            <div class="message-meta">
              <span class="role-label">{{ msg.role === 'user' ? '我' : 'AI' }}</span>
              <span v-if="msg.model" class="model-tag">{{ msg.model }}</span>
              <span class="time">{{ formatTime(msg.timestamp) }}</span>
            </div>

            <!-- P8a 智能模式：RAG 提示 + 审批卡片 + 工具时间线 -->
            <div v-if="msg.role === 'assistant' && msg.ragHits !== undefined" class="rag-badge" :class="{ miss: msg.ragHits <= 0 }">
              {{ msg.ragHits > 0 ? `📚 已从知识库检索 ${msg.ragHits} 条相关内容` : msg.ragHits === 0 ? '📚 知识库无命中' : '📚 知识库检索失败' }}
            </div>
            <ApprovalCard
              v-if="msg.approval"
              :tool-name="msg.approval.toolName"
              :tool-input="msg.approval.toolInput"
              :done="msg.approval.done"
              :result="msg.approval.result"
              @approve="approveTool(msg)"
              @reject="rejectTool(msg)"
            />
            <ReasoningTimeline
              v-if="msg.toolIterations && msg.toolIterations.length"
              :iterations="msg.toolIterations"
              :show="msg.showReasoning"
              @toggle="msg.showReasoning = !msg.showReasoning"
            />

            <div class="message-text" v-html="renderMarkdown(msg.content)"></div>
          </div>
        </div>

        <!-- 加载中（流式时首 chunk 前显示） -->
        <div v-if="chatStore.isLoading && !hasStreamingMessage" class="message-row assistant">
          <div class="avatar">🤖</div>
          <div class="message-bubble">
            <div class="typing-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </div>

      <!-- 输入区 -->
      <div class="input-area">
        <div class="input-wrapper">
          <textarea
            ref="inputBoxRef"
            v-model="inputMessage"
            @keydown.enter.exact.prevent="sendMessage"
            class="input-box"
            placeholder="输入问题... (Enter 发送)"
            :disabled="chatStore.isLoading"
            rows="1"
          ></textarea>
          <button
            class="send-btn"
            :disabled="!inputMessage.trim() || chatStore.isLoading"
            @click="sendMessage"
          >
            <svg v-if="!chatStore.isLoading" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            <span v-else class="spinner"></span>
          </button>
        </div>
        <div class="input-actions">
          <div class="actions-left">
            <label class="smart-toggle" :class="{ on: smartMode }" title="开启后模型可自主调用工具（计算/时间/搜索等），支持会话记忆与工具留档">
              <input type="checkbox" v-model="smartMode" />
              <span class="toggle-track"><span class="toggle-thumb"></span></span>
              <span class="toggle-text">🧠 智能{{ smartMode ? '：工具已启用' : '' }}</span>
            </label>
            <label v-if="smartMode && knowledgeDocs.length" class="kb-toggle" :class="{ on: kbEnabled }" title="开启后向已选知识文档检索，命中内容注入上下文（RAG）">
              <input type="checkbox" v-model="kbEnabled" />
              <span class="toggle-track"><span class="toggle-thumb"></span></span>
              <span class="toggle-text">📚 知识库</span>
            </label>
          </div>
          <div class="actions-right">
            <button class="action-link" @click="handleClearHistory">🗑 清除会话历史</button>
            <button class="action-link" @click="handleNewChat">✨ 新对话</button>
          </div>
        </div>

        <!-- P8b 知识库选择抽条 -->
        <div v-if="smartMode && kbEnabled && knowledgeDocs.length" class="kb-selector">
          <span class="kb-label">选择文档：</span>
          <span
            v-for="d in knowledgeDocs"
            :key="d.id"
            class="kb-doc"
            :class="{ picked: selectedDocIds.includes(d.id), done: d.status === 2 }"
            @click="toggleDoc(d.id)"
          >
            {{ d.status === 2 ? '' : '⏳ ' }}{{ d.fileName }}
          </span>
          <span v-if="!knowledgeDocs.length" class="kb-empty">知识库为空，请先在「知识库」页上传文档</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue'
import { marked } from 'marked'
import { Modal, message } from 'ant-design-vue'
import { useChatStore } from '@/stores/chat'
import { useAuthStore } from '@/stores/auth'
import { getModelList, switchModel as apiSwitchModel, healthCheck } from '@/api/chat'
import { agentChatStreamSession, approveToolCall, rejectToolCall } from '@/api/agent'
import { getDocuments } from '@/api/knowledge'
import ApprovalCard from '@/components/agent/ApprovalCard.vue'
import ReasoningTimeline from '@/components/agent/ReasoningTimeline.vue'

// P8a 智能模式（方案 D）：开启后走编排层（模型+工具+会话留档）
const smartMode = ref(false)
// P8b RAG：知识库选择（智能模式开启时可用）
const kbEnabled = ref(false)
const knowledgeDocs = ref([])
const selectedDocIds = ref([])

async function loadKnowledgeDocs() {
  try {
    const res = await getDocuments()
    if (res.code === 200 && Array.isArray(res.data)) {
      knowledgeDocs.value = res.data
    }
  } catch (e) { console.warn('[ChatView] 知识文档列表加载失败:', e) }
}

function toggleDoc(id) {
  const i = selectedDocIds.value.indexOf(id)
  if (i >= 0) selectedDocIds.value.splice(i, 1)
  else selectedDocIds.value.push(id)
}

// 智能模式开启时加载文档列表
watch(smartMode, (v) => { if (v) loadKnowledgeDocs() })

// 统一解包 R<T>
function unwrap(response) {
  if (response?.data !== undefined) {
    return response.data
  }
  return response
}

const chatStore = useChatStore()
const authStore = useAuthStore()
const messagesContainer = ref(null)
const inputBoxRef = ref(null)
const inputMessage = ref('')
const activeModelId = ref('')
const modelList = ref([])
const backendOnline = ref(false)

const hasStreamingMessage = computed(() =>
  chatStore.messages.some(m => m.streaming)
)

// 渲染 Markdown
function renderMarkdown(content) {
  return marked.parse(content || '', { breaks: true, gfm: true })
}

function formatTime(ts) {
  if (!ts) return ''
  return new Date(ts).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

function sessionTitle(s) {
  return s.remark || s.title || (s.id ? String(s.id).substring(0, 8) : '会话')
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

watch(() => chatStore.messages.length, scrollToBottom)

// 监听流式内容变化，持续滚动到底部
watch(
  () => {
    const msgs = chatStore.messages
    const last = msgs[msgs.length - 1]
    return last && last.streaming ? last.content.length : -1
  },
  scrollToBottom
)

// 加载模型列表（失败后 2s 重试一次：后端启动中/临时 401 时自动恢复，避免下拉永久空白）
async function loadModels(retried = false) {
  try {
    const res = await getModelList()
    const data = unwrap(res)
    modelList.value = data.models || []
    activeModelId.value = data.activeModel || ''
    backendOnline.value = modelList.value.length > 0
  } catch (e) {
    modelList.value = []
    backendOnline.value = false
    if (!retried && !e?.isAuthError) {
      setTimeout(() => { if (modelList.value.length === 0) loadModels(true) }, 2000)
    }
  }
}

// 切换模型
async function onModelSwitch() {
  try {
    const res = await apiSwitchModel(activeModelId.value)
    const data = unwrap(res)
    chatStore.currentModel = data.newModel || activeModelId.value
    message.success(`已切换到 ${data.modelName || activeModelId.value}`)
  } catch (e) {
    if (e.isAuthError) return
    console.error('切换模型失败:', e)
    message.error('切换模型失败')
  }
}

// 创建新会话
async function handleCreateSession() {
  try {
    await chatStore.createNewSession()
    message.success('新会话已创建')
  } catch (e) {
    if (e.isAuthError) return
    message.error('创建会话失败: ' + (e.message || '未知错误'))
  }
}

// 选择会话
async function handleSelectSession(id) {
  if (id === chatStore.sessionId) return
  try {
    await chatStore.selectSession(id)
  } catch (e) {
    console.warn('[ChatView] 加载会话消息失败:', e)
    message.error('加载会话失败')
  }
}

// 删除会话
function handleDeleteSession(id) {
  Modal.confirm({
    title: '删除会话',
    content: '此操作将永久删除该会话及其所有对话记录，是否继续？',
    okText: '确定',
    cancelText: '取消',
    okType: 'danger',
    async onOk() {
      try {
        await chatStore.removeSession(id)
        message.success('会话已删除')
      } catch (e) {
        message.error('删除失败: ' + (e.message || '未知错误'))
      }
    }
  })
}

// 清除当前会话历史
function handleClearHistory() {
  if (!chatStore.sessionId) {
    chatStore.clearMessages()
    message.success('会话已清除')
    return
  }
  Modal.confirm({
    title: '清除会话',
    content: '确定要清除当前会话的所有消息吗？（会话本身保留）',
    okText: '确定',
    cancelText: '取消',
    onOk() {
      chatStore.clearHistory()
        .then(() => message.success('会话历史已清除'))
        .catch((e) => {
          if (e.isAuthError) return
          message.error('清除失败: ' + (e.message || '未知错误'))
        })
    }
  })
}

// 新对话：清空本地消息视图，下次发送时自动复用/创建会话
function handleNewChat() {
  chatStore.clearMessages()
  inputMessage.value = ''
}

// 快捷问题回填输入框并聚焦（修复点击后焦点丢失）
function applyQuickQuestion(text) {
  inputMessage.value = text
  nextTick(() => {
    inputBoxRef.value?.focus()
    // 光标移到末尾
    const el = inputBoxRef.value
    if (el && typeof el.selectionStart === 'number') {
      el.selectionStart = el.selectionEnd = el.value.length
    }
  })
}

// 发送消息（SSE 流式）
async function sendMessage() {
  const text = inputMessage.value.trim()
  if (!text || chatStore.isLoading) return

  inputMessage.value = ''

  // P8a 方案 D：智能模式走编排层（工具循环+会话留档），普通模式走纯对话
  if (smartMode.value) {
    try {
      await sendSmartMessage(text)
    } catch (e) {
      if (e.isAuthError) return
      console.error('[ChatView] 智能模式发送失败:', e)
      message.error('发送失败: ' + (e.message || '未知错误'))
    }
    return
  }

  try {
    await chatStore.sendUserMessage(text)
  } catch (e) {
    if (e.isAuthError) return
    console.error('[ChatView] 发送消息失败:', e)
    message.error('发送失败: ' + (e.message || '未知错误'))
  }
}

// ========== P8a 智能模式（编排层：模型+工具循环+会话留档）==========

/**
 * 智能模式发送：复用 chatStore 的消息列表，AI 占位消息扩展
 * toolIterations（工具时间线）/ approval（审批卡）字段，done 后写回最终答案
 */
async function sendSmartMessage(text) {
  if (!chatStore.sessionId) {
    await chatStore.initSession()
  }

  // 用户消息入列 + AI 占位（与 store.sendUserMessage 同构，直接操作 messages）
  chatStore.messages.push({ role: 'user', content: text, timestamp: Date.now() })
  const aiMsg = reactive({
    role: 'assistant',
    content: '',
    model: chatStore.currentModel,
    timestamp: Date.now(),
    streaming: true,
    toolIterations: [],
    toolsUsed: [],
    approval: null,
    showReasoning: true,
    ragHits: undefined
  })
  chatStore.messages.push(aiMsg)
  chatStore.isLoading = true

  const findIteration = (n) => {
    let it = aiMsg.toolIterations.find(x => x.iteration === n)
    if (!it) {
      it = { iteration: n, thought: '', toolName: '', toolInput: '', observation: '' }
      aiMsg.toolIterations.push(it)
    }
    return it
  }

  const finish = () => {
    aiMsg.streaming = false
    chatStore.isLoading = false
    scrollToBottom()
  }

  try {
    await agentChatStreamSession(
      { sessionId: chatStore.sessionId, message: text,
        knowledgeDocumentIds: (smartMode.value && kbEnabled.value && selectedDocIds.value.length) ? selectedDocIds.value : undefined },
      {
        onIteration: (e) => { aiMsg.toolIterationCount = e.iteration || 0; scrollToBottom() },
        onRag: (e) => {
          // P8b：检索结果提示（hits>0 命中 / 0 无命中 / -1 失败）
          aiMsg.ragHits = e.ragHits
          scrollToBottom()
        },
        onDelta: (e) => { aiMsg.content += (e.content || ''); scrollToBottom() },
        onThought: (e) => { const it = findIteration(e.iteration); it.thought = (it.thought || '') + (e.content || ''); scrollToBottom() },
        onAction: (e) => {
          const it = findIteration(e.iteration); it.toolName = e.toolName; it.toolInput = e.toolInput
          // 本轮已流出正文归入时间线 Thought，正文区清空待最终答案
          const cur = findIteration(e.iteration)
          if (!cur.thought && aiMsg.content) {
            cur.thought = aiMsg.content
            aiMsg.content = ''
          }
          scrollToBottom()
        },
        onToolResult: (e) => {
          const it = findIteration(e.iteration)
          it.toolName = e.toolName
          it.observation = e.content
          if (!aiMsg.toolsUsed.includes(e.toolName)) aiMsg.toolsUsed.push(e.toolName)
          scrollToBottom()
        },
        onApprovalRequired: (e) => {
          aiMsg.approval = { toolCallId: e.toolCallId, toolName: e.toolName, toolInput: e.toolInput, done: false, result: '' }
          scrollToBottom()
        },
        onDone: (e) => {
          if (e.content) aiMsg.content = e.content
          aiMsg.model = e.modelId || aiMsg.model
          finish()
        },
        onError: (e) => {
          aiMsg.content = `[错误] ${e && e.message ? e.message : '请求失败'}`
          finish()
        }
      }
    )
  } catch (e) {
    aiMsg.content = `[错误] ${e.message || '流式连接断开'}`
    finish()
    throw e
  }
}

/**
 * 智能模式审批：批准/拒绝后，同一 SSE 连接续跑（tool_result/delta/done 由原流推送）
 */
async function approveTool(msg) {
  if (!msg.approval || msg.approval.done) return
  msg.approval.done = true
  try {
    const res = await approveToolCall(msg.approval.toolCallId)
    msg.approval.result = res.code === 200 ? '✅ 已批准，继续执行中…' : `❌ ${res.message || '审批失败'}`
  } catch (e) {
    msg.approval.result = `❌ 异常：${e.message}`
  }
}

async function rejectTool(msg) {
  if (!msg.approval || msg.approval.done) return
  msg.approval.done = true
  try {
    const res = await rejectToolCall(msg.approval.toolCallId, '用户拒绝')
    msg.approval.result = res.code === 200 ? '🚫 已拒绝，继续基于拒绝结果回应' : `❌ ${res.message || '操作失败'}`
  } catch (e) {
    msg.approval.result = `❌ 异常：${e.message}`
  }
}

// 监听登录态变化：登录成功后加载会话列表（修复重新登录后左侧列表为空）
watch(() => authStore.isAuthenticated, (val) => {
  if (val) {
    chatStore.loadSessions().catch(() => {})
    if (modelList.value.length === 0) loadModels().catch(() => {})
  }
})

onMounted(async () => {
  loadModels()
  checkBackendHealth()
  // 对齐 App.vue：30s 轮询后端健康状态（后端重启后自动恢复在线显示）
  setInterval(checkBackendHealth, 30000)
  await initialize()
})

async function checkBackendHealth() {
  try {
    await healthCheck()
    const wasOffline = !backendOnline.value
    backendOnline.value = true
    // 后端恢复在线时补拉模型列表（修复首次加载失败后下拉永久空白）
    if (wasOffline || modelList.value.length === 0) {
      getModelList().then(res => {
        const data = unwrap(res)
        if (data.models && data.models.length) {
          modelList.value = data.models
          activeModelId.value = data.activeModel || ''
        }
      }).catch(() => {})
    }
  } catch {
    backendOnline.value = false
  }
}

async function initialize() {
  // 页面刷新时从 localStorage 恢复会话（含历史消息）
  try {
    await chatStore.restoreSession()
  } catch (e) {
    console.warn('[ChatView] 恢复会话失败:', e)
  }
  // 对齐 native：无论是否恢复成功，都加载会话列表（显示现存全部会话）
  try {
    await chatStore.loadSessions()
  } catch (e) {
    console.warn('[ChatView] 加载会话列表失败:', e)
  }
}
</script>

<style lang="scss" scoped>
.chat-view {
  display: flex;
  width: 100%;
  height: 100%;
}

.sidebar-panel {
  width: 240px;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  h3 { font-size: 15px; font-weight: 600; }
}

.btn-icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover { background: var(--border-color); }
}

.session-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.session-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: var(--bg-tertiary); }
  &.active { background: rgba(88, 166, 255, 0.1); color: var(--accent); }
}

.session-name {
  flex: 1;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.btn-del {
  width: 22px;
  height: 22px;
  border-radius: 4px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 16px;
  opacity: 0;
  &:hover { color: var(--danger); }
  .session-item:hover & { opacity: 1; }
}

.empty-hint {
  text-align: center;
  padding: 24px;
  color: var(--text-secondary);
  font-size: 13px;
}

.panel-section {
  padding: 16px;
  border-top: 1px solid var(--border-color);
}

.section-title {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.model-select {
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  font-size: 13px;
  cursor: pointer;
  outline: none;
}

.model-status {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  font-size: 12px;
  color: var(--text-secondary);
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--danger);
  &.online { background: var(--success); box-shadow: 0 0 4px rgba(63, 185, 80, 0.5); }
}

/* 主聊天区 */
.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 欢迎区：垂直水平居中，消除大片留白 */
.welcome {
  text-align: center;
  margin: auto;
  padding: 32px 20px;
  width: 100%;
  max-width: 560px;
  .welcome-icon { font-size: 56px; margin-bottom: 12px; }
  h2 { font-size: 26px; margin-bottom: 8px; color: var(--accent); }
  p { color: var(--text-secondary); margin-bottom: 28px; }
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 420px;
  margin: 0 auto;
}

.quick-btn {
  padding: 12px 16px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-primary);
  cursor: pointer;
  text-align: left;
  font-size: 14px;
  transition: all 0.15s;
  &:hover { border-color: var(--accent); background: rgba(88, 166, 255, 0.06); }
}

.message-row {
  display: flex;
  gap: 12px;
  max-width: 85%;
  &.user { align-self: flex-end; flex-direction: row-reverse; }
  &.assistant { align-self: flex-start; }
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.message-bubble {
  padding: 12px 16px;
  border-radius: 12px;
  .user & { background: rgba(88, 166, 255, 0.12); border: 1px solid rgba(88, 166, 255, 0.2); }
  .assistant & { background: var(--bg-secondary); border: 1px solid var(--border-color); }
}

.message-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 12px;
}

.role-label {
  font-weight: 600;
  .user & { color: var(--accent); }
  .assistant & { color: var(--success); }
}

.model-tag {
  padding: 2px 6px;
  background: var(--bg-tertiary);
  border-radius: 4px;
  font-size: 10px;
  color: var(--text-secondary);
  font-family: monospace;
}

.time { color: var(--text-secondary); opacity: 0.6; }

.message-text {
  line-height: 1.6;
  font-size: 14px;
  :deep(p) { margin-bottom: 8px; &:last-child { margin-bottom: 0; } }
  :deep(code) {
    background: var(--bg-tertiary);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    font-size: 13px;
  }
  :deep(pre) {
    background: var(--bg-primary);
    padding: 12px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 8px 0;
    border: 1px solid var(--border-color);
  }
  :deep(pre code) { background: transparent; padding: 0; }
  :deep(ul), :deep(ol) { padding-left: 20px; }
  :deep(blockquote) {
    border-left: 3px solid var(--accent);
    padding-left: 12px;
    color: var(--text-secondary);
  }
}

/* 加载动画 */
.typing-dots {
  display: flex;
  gap: 4px;
  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
    animation: pulse 1.4s infinite;
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
}

@keyframes pulse {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}

/* 输入区 */
.input-area {
  flex-shrink: 0;
  padding: 14px 24px 16px;
  background: var(--bg-primary);
  border-top: 1px solid rgba(148, 163, 184, 0.12);
}

.input-wrapper {
  display: flex;
  gap: 12px;
  align-items: flex-end;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 10px 12px;
  box-shadow: 0 2px 12px rgba(15, 23, 42, 0.05);
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
  &:focus-within {
    border-color: rgba(14, 165, 233, 0.35);
    box-shadow: 0 2px 12px rgba(15, 23, 42, 0.05), 0 0 0 3px rgba(14, 165, 233, 0.08);
  }
}

.input-box {
  flex: 1;
  background: transparent;
  border: none;
  padding: 8px 6px;
  color: var(--text-primary);
  font-size: 14px;
  resize: none;
  outline: none;
  line-height: 1.55;
  min-height: 44px;
  max-height: 150px;
  &::placeholder { color: #94a3b8; }
  &:disabled { opacity: 0.55; }
}

.send-btn {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #38bdf8, #0ea5e9);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 10px rgba(14, 165, 233, 0.3);
  transition: all 0.2s ease;
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #0ea5e9, #0284c7);
    box-shadow: 0 4px 14px rgba(14, 165, 233, 0.4);
    transform: translateY(-1px);
  }
  &:disabled { opacity: 0.35; cursor: not-allowed; box-shadow: none; }
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.input-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 720px;
  margin: 10px auto 0;
}

.actions-left {
  display: flex;
  gap: 16px;
}

.actions-right {
  display: flex;
  gap: 16px;
}

.kb-toggle {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
  font-size: 12px;
  color: var(--text-secondary);

  input { display: none; }

  .toggle-track {
    width: 34px;
    height: 18px;
    border-radius: 999px;
    background: var(--border-color);
    position: relative;
    transition: background 0.15s;
  }

  .toggle-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: white;
    transition: left 0.15s;
  }

  &.on {
    .toggle-track { background: #10b981; }
    .toggle-thumb { left: 18px; }
    .toggle-text { color: #10b981; font-weight: 600; }
  }
}

.kb-selector {
  width: 100%;
  max-width: 720px;
  margin: 6px auto 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;

  .kb-label { font-size: 12px; color: var(--text-secondary); }

  .kb-doc {
    font-size: 12px;
    padding: 3px 10px;
    border-radius: 999px;
    border: 1px solid var(--border-color);
    background: var(--bg-secondary);
    color: var(--text-primary);
    cursor: pointer;
    transition: all 0.15s;

    &:hover { border-color: #10b981; }
    &.picked {
      border-color: #10b981;
      background: rgba(16, 185, 129, 0.1);
      color: #10b981;
      font-weight: 600;
    }
  }

  .kb-empty { font-size: 12px; color: var(--text-secondary); }
}

.rag-badge {
  display: inline-block;
  font-size: 11px;
  padding: 2px 10px;
  border-radius: 999px;
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  margin-bottom: 6px;

  &.miss { background: rgba(148, 163, 184, 0.12); color: #94a3b8; }
}

.smart-toggle {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
  font-size: 12px;
  color: var(--text-secondary);

  input { display: none; }

  .toggle-track {
    width: 34px;
    height: 18px;
    border-radius: 999px;
    background: var(--border-color);
    position: relative;
    transition: background 0.15s;
  }

  .toggle-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: white;
    transition: left 0.15s;
  }

  &.on {
    .toggle-track { background: var(--accent); }
    .toggle-thumb { left: 18px; }
    .toggle-text { color: var(--accent); font-weight: 600; }
  }
}

.action-link {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 12px;
  cursor: pointer;
  padding: 4px 0;
  transition: color 0.15s;
  &:hover { color: var(--accent); }
}
</style>

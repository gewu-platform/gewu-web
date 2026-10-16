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
            <button class="quick-btn" @click="inputMessage = '介绍一下 LangChain4j 的核心概念'">
              🤔 LangChain4j 是什么？
            </button>
            <button class="quick-btn" @click="inputMessage = 'Spring AI 和 LangChain4j 有什么区别？'">
              ⚡ Spring AI vs LangChain4j？
            </button>
            <button class="quick-btn" @click="inputMessage = '用Java写一个工具调用的示例'">
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
          <button class="action-link" @click="handleClearHistory">🗑 清除会话历史</button>
          <button class="action-link" @click="handleNewChat">✨ 新对话</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { marked } from 'marked'
import { Modal, message } from 'ant-design-vue'
import { useChatStore } from '@/stores/chat'
import { getModelList, switchModel as apiSwitchModel, healthCheck } from '@/api/chat'

// 统一解包 R<T>
function unwrap(response) {
  if (response?.data !== undefined) {
    return response.data
  }
  return response
}

const chatStore = useChatStore()
const messagesContainer = ref(null)
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

// 加载模型列表
async function loadModels() {
  try {
    const res = await getModelList()
    const data = unwrap(res)
    modelList.value = data.models || []
    activeModelId.value = data.activeModel || ''
    backendOnline.value = modelList.value.length > 0
  } catch {
    modelList.value = []
    backendOnline.value = false
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

// 发送消息（SSE 流式）
async function sendMessage() {
  const text = inputMessage.value.trim()
  if (!text || chatStore.isLoading) return

  inputMessage.value = ''

  try {
    await chatStore.sendUserMessage(text)
  } catch (e) {
    if (e.isAuthError) return
    console.error('[ChatView] 发送消息失败:', e)
    message.error('发送失败: ' + (e.message || '未知错误'))
  }
}

onMounted(async () => {
  loadModels()
  checkBackendHealth()
  await initialize()
})

async function checkBackendHealth() {
  try {
    await healthCheck()
    backendOnline.value = true
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
}
</script>

<style lang="scss" scoped>
.chat-view {
  display: flex;
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

.welcome {
  text-align: center;
  padding: 60px 20px;
  .welcome-icon { font-size: 64px; margin-bottom: 16px; }
  h2 { font-size: 24px; margin-bottom: 8px; color: var(--accent); }
  p { color: var(--text-secondary); margin-bottom: 24px; }
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 400px;
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
  padding: 16px 20px;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
}

.input-wrapper {
  display: flex;
  gap: 10px;
  align-items: flex-end;
}

.input-box {
  flex: 1;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 12px 16px;
  color: var(--text-primary);
  font-size: 14px;
  resize: none;
  outline: none;
  line-height: 1.5;
  min-height: 46px;
  max-height: 150px;
  &:focus { border-color: var(--accent); }
  &:disabled { opacity: 0.5; }
}

.send-btn {
  width: 46px;
  height: 46px;
  border-radius: 10px;
  background: var(--accent);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  &:hover:not(:disabled) { background: var(--accent-hover); transform: scale(1.05); }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
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
  gap: 12px;
  margin-top: 8px;
}

.action-link {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 12px;
  cursor: pointer;
  padding: 4px 0;
  &:hover { color: var(--text-primary); }
}
</style>

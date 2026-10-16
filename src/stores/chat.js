import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  createSession,
  getOrCreateSession,
  sendMessageStream,
  clearSession,
  deleteSession,
  getSessions,
  getSessionMessages,
  switchModel
} from '@/api/chat'

// localStorage 键名（对齐 native）
const STORAGE_KEY_SESSION = 'lc4j_session_id'

/**
 * 统一解包后端响应（Result<T> 格式：{ code: 200, message: "xxx", data: {...} }）
 */
function unwrap(response) {
  if (response?.data !== undefined) {
    return response.data
  }
  return response
}

export const useChatStore = defineStore('chat', () => {
  // ==================== 状态 ====================
  const sessionId = ref(null)
  const messages = ref([])
  const sessions = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const currentModel = ref('')

  // ==================== 计算属性 ====================
  const hasError = computed(() => error.value !== null)

  // ==================== 会话管理 ====================

  /**
   * 初始化会话（优先复用活跃会话）
   */
  async function initSession() {
    try {
      error.value = null
      const result = await getOrCreateSession()
      const data = unwrap(result)
      sessionId.value = data.sessionId
      messages.value.splice(0, messages.value.length)

      // 保存会话 ID 到 localStorage
      localStorage.setItem(STORAGE_KEY_SESSION, sessionId.value)

      if (data.model) {
        currentModel.value = data.model
      }

      // 刷新会话列表，确保当前会话显示在侧边栏
      await loadSessions()
      return result
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  /**
   * 从 localStorage 恢复会话（页面刷新后）
   */
  async function restoreSession() {
    const savedSessionId = localStorage.getItem(STORAGE_KEY_SESSION)
    if (savedSessionId) {
      try {
        // 用保存的 sessionId 加载历史消息
        await loadSessionMessages(savedSessionId)
        sessionId.value = savedSessionId

        // 刷新会话列表
        await loadSessions()
        return true
      } catch (err) {
        console.warn('[chatStore] 恢复会话失败，清除 localStorage', err)
        localStorage.removeItem(STORAGE_KEY_SESSION)
      }
    }
    return false
  }

  /**
   * 加载指定会话的历史消息
   */
  async function loadSessionMessages(targetSessionId) {
    try {
      const result = await getSessionMessages(targetSessionId)
      const data = unwrap(result)
      const rawMessages = data.messages || []
      // 后端 createTime 映射为前端 timestamp
      messages.value = rawMessages.map(msg => ({
        ...msg,
        timestamp: msg.timestamp || parseCreateTime(msg.createTime)
      }))
      return result
    } catch (err) {
      messages.value = []
      throw err
    }
  }

  /**
   * 解析后端 LocalDateTime 为毫秒时间戳
   */
  function parseCreateTime(createTime) {
    if (!createTime) return Date.now()
    if (typeof createTime === 'number') return createTime
    const parsed = new Date(createTime).getTime()
    return isNaN(parsed) ? Date.now() : parsed
  }

  /**
   * 加载会话列表
   */
  async function loadSessions() {
    try {
      const result = await getSessions()
      const data = unwrap(result)
      sessions.value = data.sessions || []
      return result
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  /**
   * 新建会话（不复用活跃会话）
   */
  async function createNewSession() {
    try {
      error.value = null
      const result = await createSession()
      const data = unwrap(result)
      sessionId.value = data.sessionId
      messages.value.splice(0, messages.value.length)
      localStorage.setItem(STORAGE_KEY_SESSION, sessionId.value)
      await loadSessions()
      return data
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  /**
   * 切换会话（加载历史）
   */
  async function selectSession(targetSessionId) {
    sessionId.value = targetSessionId
    localStorage.setItem(STORAGE_KEY_SESSION, targetSessionId)
    await loadSessionMessages(targetSessionId)
    await loadSessions()
  }

  // ==================== 消息发送 ====================

  /**
   * 发送用户消息（SSE 流式）
   */
  async function sendUserMessage(content) {
    if (!content.trim()) return null

    try {
      isLoading.value = true
      error.value = null

      // 没有会话则先创建
      if (!sessionId.value) {
        await initSession()
      }

      // 用户消息入列
      messages.value.push({
        role: 'user',
        content: content,
        timestamp: Date.now()
      })

      // AI 消息占位（流式更新）
      const aiMessageIndex = messages.value.length
      messages.value.push({
        role: 'assistant',
        content: '',
        model: currentModel.value,
        timestamp: Date.now(),
        streaming: true
      })

      const requestData = {
        sessionId: sessionId.value,
        message: content,
        model: currentModel.value || undefined
      }

      // Promise 包装流式回调
      await new Promise((resolve, reject) => {
        sendMessageStream(
          requestData,
          // onChunk 逐块更新
          (chunk) => {
            messages.value[aiMessageIndex].content += chunk
          },
          // onDone 完成
          (fullReply, model) => {
            messages.value[aiMessageIndex].content = fullReply
            messages.value[aiMessageIndex].model = model
            messages.value[aiMessageIndex].streaming = false
            resolve()
          },
          // onError 错误
          (errMsg) => {
            messages.value[aiMessageIndex].content = `[错误] ${errMsg}`
            messages.value[aiMessageIndex].streaming = false
            const err = new Error(errMsg)
            if (errMsg && errMsg.includes('登录已过期')) {
              err.isAuthError = true
            }
            reject(err)
          }
        )
      })

      return messages.value[aiMessageIndex]
    } catch (err) {
      error.value = err.message
      // 回滚失败的用户消息和 AI 占位消息
      messages.value.pop()
      messages.value.pop()
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // ==================== 会话操作 ====================

  /**
   * 清除当前会话历史（保留会话本身）
   */
  async function clearHistory() {
    if (!sessionId.value) {
      throw new Error('当前没有活跃的会话')
    }
    try {
      await clearSession(sessionId.value)
      messages.value.splice(0, messages.value.length)
    } catch (err) {
      error.value = err.message
      throw new Error(err.message || '清除历史失败，请稍后重试')
    }
  }

  /**
   * 删除会话
   */
  async function removeSession(id) {
    try {
      await deleteSession(id)
      if (id === sessionId.value) {
        sessionId.value = null
        messages.value.splice(0, messages.value.length)
        localStorage.removeItem(STORAGE_KEY_SESSION)
      }
      await loadSessions()
    } catch (err) {
      error.value = err.message
      throw new Error(err.message || '删除会话失败，请稍后重试')
    }
  }

  // ==================== 模型管理 ====================

  /**
   * 切换模型
   */
  async function setModel(modelId) {
    try {
      const result = await switchModel(modelId)
      const data = unwrap(result)
      currentModel.value = data.currentModel || modelId
      return result
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  // ==================== 工具方法 ====================

  function setSessionId(id) {
    sessionId.value = id
    if (id) {
      localStorage.setItem(STORAGE_KEY_SESSION, id)
    } else {
      localStorage.removeItem(STORAGE_KEY_SESSION)
    }
  }

  function clearMessages() {
    messages.value.splice(0, messages.value.length)
  }

  function reset() {
    sessionId.value = null
    messages.value.splice(0, messages.value.length)
    error.value = null
    isLoading.value = false
  }

  function clearError() {
    error.value = null
  }

  return {
    // 状态
    sessionId,
    messages,
    sessions,
    isLoading,
    error,
    currentModel,
    // 计算属性
    hasError,
    // 会话管理
    initSession,
    restoreSession,
    loadSessionMessages,
    loadSessions,
    createNewSession,
    selectSession,
    // 消息
    sendUserMessage,
    // 会话操作
    clearHistory,
    removeSession,
    // 模型
    setModel,
    // 工具
    setSessionId,
    clearMessages,
    reset,
    clearError
  }
})

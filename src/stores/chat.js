import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useChatStore = defineStore('chat', () => {
  // 当前激活的会话 ID
  const activeSession = ref('default')
  
  // 当前会话的消息列表
  const messages = ref([])
  
  // 加载状态
  const loading = ref(false)
  
  // 错误信息
  const error = ref(null)
  
  // 流式输出内容
  const streamingContent = ref('')
  
  // 系统提示词
  const systemPrompt = ref('你是一位友好的 AI 助手。记住上下文，提供连贯的对话体验。')

  const sessionId = computed(() => activeSession.value)

  function setActiveSession(id) {
    activeSession.value = id
    messages.value = []
  }

  function addMessage(role, content, model) {
    messages.value.push({
      id: Date.now() + Math.random(),
      role,
      content,
      model,
      timestamp: Date.now()
    })
  }

  function setLoading(value) {
    loading.value = value
  }

  function setError(msg) {
    error.value = msg
  }

  function clearError() {
    error.value = null
  }

  function clearMessages() {
    messages.value = []
    streamingContent.value = ''
  }

  return {
    activeSession,
    messages,
    loading,
    error,
    streamingContent,
    systemPrompt,
    sessionId,
    setActiveSession,
    addMessage,
    setLoading,
    setError,
    clearError,
    clearMessages
  }
})

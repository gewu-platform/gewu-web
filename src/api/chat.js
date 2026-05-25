import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 响应拦截器：自动提取 data 字段，调用方无需写 res.data
api.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

// ==================== 对话 API ====================

/**
 * 简单对话 - 无记忆
 */
export function simpleChat(message) {
  return api.get('/chat/simple', { params: { message } })
}

/**
 * 流式输出 - SSE
 * 返回 AbortController 可用于取消
 */
export function streamChat(message, onChunk, onComplete, onError) {
  const controller = new AbortController()
  const encoded = encodeURIComponent(message)
  
  fetch(`/api/chat/stream?message=${encoded}`, {
    method: 'GET',
    headers: { Accept: 'text/event-stream' },
    signal: controller.signal
  })
    .then(response => {
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      
      const read = () => {
        reader.read().then(({ done, value }) => {
          if (done) {
            onComplete?.()
            return
          }
          const text = decoder.decode(value, { stream: true })
          for (const line of text.split('\n')) {
            if (line.startsWith('data:')) {
              onChunk?.(line.substring(5).trim())
            }
          }
          read()
        }).catch(err => {
          if (err.name !== 'AbortError') onError?.(err)
        })
      }
      read()
    })
    .catch(err => {
      if (err.name !== 'AbortError') onError?.(err)
    })
  
  return controller
}

/**
 * 带记忆的会话对话
 */
export function sessionChat(sessionId, message) {
  return api.post('/chat/session', { sessionId, message })
}

/**
 * 清除会话
 */
export function clearSession(sessionId) {
  return api.delete(`/chat/session/${sessionId}`)
}

/**
 * 角色扮演对话
 */
export function roleChat(message, role, style) {
  return api.get('/chat/role', { params: { message, role, style } })
}

// ==================== 模型管理 API ====================

export function listModels() {
  return api.get('/chat/models')
}

export function switchModel(modelId) {
  return api.post('/chat/model', { modelId })
}

export function modelStatus() {
  return api.get('/chat/model')
}

// ==================== Service 层 API ====================

export function serviceAsk(question) {
  return api.post('/service/ask', { question })
}

export function serviceTranslate(text, targetLang) {
  return api.post('/service/translate', { text, targetLang })
}

export function serviceAnalyze(action, code) {
  return api.post('/service/analyze', { action, code })
}

export default api

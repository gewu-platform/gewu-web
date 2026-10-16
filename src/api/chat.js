import axios from 'axios'

// 用于避免重复弹出登录框的标志（对齐 native）
let loginModalShown = false

const api = axios.create({
  baseURL: '/api',
  timeout: 180000, // 3分钟（AI 流式响应可能较慢）
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器 - 添加认证 token（对齐 native）
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.error('[LC4J] 请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器 - 处理认证相关错误（对齐 native）
api.interceptors.response.use(
  response => response.data,
  error => {
    console.error('[LC4J] 响应错误:', error.response?.status, error.message)

    // 优先处理 401 认证错误
    if (error.response?.status === 401) {
      const message = error.response?.data?.message || '登录已过期，请重新登录'
      console.error('[axios] 检测到 401 错误，准备派发 auth-expired 事件')

      // 避免重复处理
      if (!loginModalShown) {
        loginModalShown = true
        setTimeout(() => {
          loginModalShown = false
        }, 3000)

        // 派发事件通知 App.vue 清除会话并显示登录框
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth-expired'))
        }
      }

      // 返回特殊标记，让组件识别为认证错误（不显示 toast）
      const authError = new Error(message)
      authError.isAuthError = true
      return Promise.reject(authError)
    }

    let message = 'LC4J 连接失败'
    if (error.response?.data?.message) {
      message = error.response.data.message
    } else if (error.code === 'ECONNABORTED') {
      message = '请求超时，AI 响应较慢'
    } else if (error.code === 'ERR_NETWORK') {
      message = '网络连接中断，请检查后端服务'
    }

    return Promise.reject(new Error(message))
  }
)

// ==================== 认证 API（对齐 native /api/auth/*） ====================

/**
 * 用户登录
 */
export function login(username, password) {
  return api.post('/auth/login', { username, password })
}

/**
 * 用户注册
 */
export function register(username, email, password) {
  return api.post('/auth/register', { username, email, password })
}

/**
 * 刷新令牌
 */
export function refreshToken(refreshToken) {
  return api.post('/auth/refresh', { refreshToken })
}

/**
 * 获取当前用户信息
 */
export function getCurrentUser() {
  return api.get('/auth/me')
}

/**
 * 用户登出
 */
export function logout() {
  return api.post('/auth/logout')
}

// ==================== 对话 API ====================

/**
 * 健康检查
 */
export function healthCheck() {
  return api.get('/chat/models', { timeout: 5000 })
}

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
  const token = localStorage.getItem('auth-token')

  fetch(`/api/chat/stream?message=${encoded}`, {
    method: 'GET',
    headers: {
      Accept: 'text/event-stream',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
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

// 导出 api 实例供其他 API 模块复用（对齐 native）
export default api

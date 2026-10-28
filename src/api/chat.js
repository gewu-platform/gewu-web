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
    console.error('[Gewu] 请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器 - 处理认证相关错误（对齐 native）
api.interceptors.response.use(
  response => response.data,
  error => {
    console.error('[Gewu] 响应错误:', error.response?.status, error.message)

    // 优先处理 401 认证错误
    if (error.response?.status === 401) {
      const message = error.response?.data?.message || '登录已过期，请重新登录'

      if (!loginModalShown) {
        loginModalShown = true
        setTimeout(() => {
          loginModalShown = false
        }, 3000)

        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth-expired'))
        }
      }

      const authError = new Error(message)
      authError.isAuthError = true
      return Promise.reject(authError)
    }

    let message = 'Gewu 连接失败'
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

export function login(username, password) {
  return api.post('/auth/login', { username, password })
}

export function register(username, email, password) {
  return api.post('/auth/register', { username, email, password })
}

export function refreshToken(refreshToken) {
  return api.post('/auth/refresh', { refreshToken })
}

export function getCurrentUser() {
  return api.get('/auth/me')
}

export function logout() {
  return api.post('/auth/logout')
}

// ==================== 健康检查 ====================

export function healthCheck() {
  return api.get('/chat/health', { timeout: 5000 })
}

// ==================== 会话 API（对齐 native /api/chat/*） ====================

/**
 * 创建新会话
 */
export function createSession() {
  return api.post('/chat/session')
}

/**
 * 获取或创建会话（会话复用）
 */
export function getOrCreateSession() {
  return api.post('/chat/session/active')
}

/**
 * 清除会话历史
 */
export function clearSession(sessionId) {
  return api.post(`/chat/session/${sessionId}/clear`)
}

/**
 * 删除会话
 */
export function deleteSession(sessionId) {
  return api.delete(`/chat/session/${sessionId}`)
}

/**
 * 获取会话列表
 */
export function getSessions() {
  return api.get('/chat/sessions')
}

/**
 * T2.1 会话重命名（remark 即标题）
 */
export function renameSession(sessionId, remark) {
  return api.patch(`/chat/session/${sessionId}/title`, { remark })
}

/**
 * T2.2 会话归组 / 移组
 */
export function setSessionGroup(sessionId, groupName) {
  return api.patch(`/chat/session/${sessionId}/group`, { groupName })
}

/**
 * T2.2 当前用户分组清单
 */
export function listGroups() {
  return api.get('/chat/groups')
}

/**
 * T2.3 删除分组（会话回落默认）
 */
export function dissolveGroup(groupName) {
  return api.delete(`/chat/groups/${encodeURIComponent(groupName)}`)
}

// ==================== T3 上下文压缩（v1.0.1 B3） ====================
/**
 * T3.2 读当前用户压缩配置
 */
export function getCompactSettings() {
  return api.get('/chat/settings/compact')
}

/**
 * T3.3 写当前用户压缩配置（部分更新）
 */
export function saveCompactSettings(patch) {
  return api.post('/chat/settings/compact', patch)
}

/**
 * T3.1 手动压缩会话（可选保留最近条数）
 */
export function compactSession(sessionId, keepRecent) {
  return api.post(`/chat/session/${sessionId}/compact`, null, {
    params: keepRecent ? { keepRecent } : {}
  })
}

/**
 * 获取会话详情
 */
export function getSession(sessionId) {
  return api.get(`/chat/session/${sessionId}`)
}

/**
 * 获取会话消息列表
 */
export function getSessionMessages(sessionId) {
  return api.get(`/chat/session/${sessionId}/messages`)
}

/**
 * 获取会话 Token 统计
 */
export function getSessionStats(sessionId) {
  return api.get(`/chat/session/${sessionId}/stats`)
}

/**
 * 切换模式（文本/多模态）
 */
export function switchMode(multimodal) {
  return api.post('/chat/mode', { multimodal })
}

/**
 * 获取当前模式
 */
export function getMode() {
  return api.get('/chat/mode')
}

// ==================== 消息发送 ====================

/**
 * 发送聊天消息（同步）
 */
export function sendMessage(data) {
  return api.post('/chat/message', data)
}

/**
 * 流式发送聊天消息（SSE，对齐 native：POST + fetch + 事件解析）
 * @param {Object} data - { sessionId, message, model, systemPrompt, useMultimodal, imageUrls }
 * @param {Function} onChunk - 增量内容回调
 * @param {Function} onDone - 完成回调 (fullReply, model)
 * @param {Function} onError - 错误回调 (errMsg)
 */
export async function sendMessageStream(data, onChunk, onDone, onError) {
  const token = localStorage.getItem('auth-token')
  const baseUrl = '/api/chat/message/stream'

  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      // 处理 401 认证错误
      if (response.status === 401) {
        const errorMessage = '登录已过期，请重新登录'
        if (!loginModalShown) {
          loginModalShown = true
          setTimeout(() => {
            loginModalShown = false
          }, 3000)
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('auth-expired'))
          }
        }
        const authError = new Error(errorMessage)
        authError.isAuthError = true
        onError?.(errorMessage)
        return
      }

      const errorText = await response.text()
      onError?.(`请求失败 (${response.status}): ${errorText}`)
      return
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    let fullReply = ''
    let model = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })

      // 按行处理 SSE 数据
      const lines = buffer.split('\n')
      buffer = lines.pop() // 保留不完整的最后一行
      for (const line of lines) {
        if (line.startsWith('data:')) {
          try {
            const jsonData = JSON.parse(line.slice(5).trim())

            if (jsonData.type === 'chunk') {
              // 后端 chunk 事件字段名是 chunk（非 content），对齐 ChatStreamResponseDTO
              fullReply += (jsonData.chunk || '')
              onChunk?.(jsonData.chunk || '')
            } else if (jsonData.type === 'done') {
              model = jsonData.model || ''
              // 后端 done 事件带完整 reply，优先用（防丢 chunk）
              if (jsonData.reply && jsonData.reply.length >= fullReply.length) {
                fullReply = jsonData.reply
              }
              onDone?.(fullReply, model)
            } else if (jsonData.type === 'error') {
              onError?.(jsonData.error || '未知错误')
            }
          } catch (e) {
            console.warn('[SSE] 解析数据失败:', line, e)
          }
        }
      }
    }
  } catch (error) {
    console.error('[SSE] 流式请求失败:', error)
    onError?.(error.message || '网络连接失败')
  }
}

// ==================== 模型管理 API ====================

export function getModelList() {
  return api.get('/chat/models')
}

export function switchModel(modelId) {
  return api.post('/chat/model', { modelId })
}

export function getCurrentModel() {
  return api.get('/chat/model')
}

// ==================== Service 层 API ====================




// 导出 api 实例供其他 API 模块复用（对齐 native）
export default api

import api from './chat'

/**
 * Agent API（对齐 java-ai-native-web api/agent.js，端点对齐本项目后端）
 */

/**
 * Agent 对话（同步，支持 agentId）
 */
export function agentChat(data) {
  return api.post('/agent/chat', data)
}

/**
 * 智能对话（全量工具，同步）
 */
export function smartChat(data) {
  return api.post('/agent/chat/smart', data)
}

/**
 * Agent 简易对话（直答，无工具）
 */
export function agentChatSimple(data) {
  return api.post('/agent/chat/simple', data)
}

/**
 * 工具清单
 */
export function getAgentTools() {
  return api.get('/agent/tools')
}

/**
 * 已启用 Agent 列表
 */
export function getEnabledAgents() {
  return api.get('/agent/definitions/enabled-list')
}

/**
 * 全部定义（管理）
 */
export function listDefinitions() {
  return api.get('/agent/definitions')
}

/**
 * 创建定义
 */
export function createDefinition(data) {
  return api.post('/agent/definitions', data)
}

/**
 * 更新定义
 */
export function updateDefinition(data) {
  return api.put('/agent/definitions', data)
}

/**
 * 删除定义
 */
export function deleteDefinition(id) {
  return api.delete(`/agent/definitions/${id}`)
}

/**
 * 启用/禁用
 */
export function setDefinitionEnabled(id, enabled) {
  return api.put(`/agent/definitions/${id}/enabled?enabled=${enabled}`)
}

/**
 * 重载缓存
 */
export function reloadDefinitions() {
  return api.post('/agent/definitions/reload')
}

/**
 * 健康检查
 */
export function agentHealth() {
  return api.get('/agent/health')
}

/**
 * 待审批列表
 */
export function getPendingApprovals() {
  return api.get('/agent/approval/pending')
}

/**
 * 审批通过并执行
 */
export function approveToolCall(toolCallId) {
  return api.post('/agent/approval/approve', { toolCallId })
}

/**
 * 审批拒绝
 */
export function rejectToolCall(toolCallId, reason) {
  return api.post('/agent/approval/reject', { toolCallId, reason })
}

/**
 * 流式对话（SSE，POST + fetch + ReadableStream，对齐 sendMessageStream 模式）
 * @param {Object} data - { message, agentId?, systemPrompt?, modelId? }
 * @param {Object} callbacks - { onIteration, onDelta, onThought, onAction, onToolResult, onApprovalRequired, onDone, onError }
 */
export async function agentChatStream(data, callbacks) {
  const token = localStorage.getItem('auth-token')
  const baseUrl = '/api/agent/chat/stream'

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
      if (response.status === 401) {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth-expired'))
        }
        const authError = new Error('登录已过期，请重新登录')
        authError.isAuthError = true
        callbacks.onError?.(authError)
        return
      }
      const errorText = await response.text()
      callbacks.onError?.(new Error(`请求失败 (${response.status}): ${errorText}`))
      return
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        callbacks.onComplete?.()
        break
      }

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed.startsWith('data:')) continue

        try {
          const event = JSON.parse(trimmed.substring(5).trim())
          switch (event.eventType) {
            case 'iteration': callbacks.onIteration?.(event); break
            case 'delta': callbacks.onDelta?.(event); break
            case 'ping': break // 心跳，忽略
            case 'thought': callbacks.onThought?.(event); break
            case 'action': callbacks.onAction?.(event); break
            case 'tool_result': callbacks.onToolResult?.(event); break
            case 'approval_required': callbacks.onApprovalRequired?.(event); break
            case 'done': callbacks.onDone?.(event); break
            case 'error': callbacks.onError?.(event); break
          }
        } catch (e) {
          console.warn('SSE 解析失败:', e, trimmed)
        }
      }
    }
  } catch (err) {
    callbacks.onError?.(new Error('流式连接断开: ' + err.message))
  }
}

// T3 前端：api/settings.js（模型配置中心 API 封装，对齐既有 api 文件风格）
import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器 - 添加认证 token（对齐 chat.js）
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

// 响应拦截器 - 统一错误提示（对齐 chat.js）
api.interceptors.response.use(
  response => response.data,
  error => {
    const msg = error.response?.data?.message || error.message || '请求失败'
    console.error('[Gewu] 响应错误:', msg)
    return Promise.reject(new Error(msg))
  }
)

/**
 * 模型配置中心 API（T3）
 */
export function listProviders() {
  return api.get('/settings/providers')
}

export function createProvider(data) {
  return api.post('/settings/providers', data)
}

export function updateProvider(id, data) {
  return api.post(`/settings/providers/${id}`, data)
}

export function deleteProvider(id) {
  return api.delete(`/settings/providers/${id}`)
}

export function activateProvider(id) {
  return api.post(`/settings/providers/${id}/activate`)
}

export function testProvider(id) {
  return api.post(`/settings/providers/${id}/test`, {})
}


// ==================== V2.0.0 R2 公共 Skill 库 ====================

/** Skill 库列表（目录扫描产物，只读展示） */
export function listSkills() {
  return api.get('/settings/skills')
}

/** 手动重扫目录（增删 SKILL.md 后生效） */
export function rescanSkills() {
  return api.post('/settings/skills/rescan', {})
}


// ==================== V2.0.0 R3 插件仓库 ====================

/** 插件清单（内置样例自动灌入） */
export function listPlugins() {
  return api.get('/settings/plugins')
}

/** 新增自定义插件条目 */
export function createPlugin(data) {
  return api.post('/settings/plugins', data)
}

/** 一键安装（登记进 mcp_server 并桥接工具） */
export function installPlugin(id) {
  return api.post(`/settings/plugins/${id}/install`, {})
}

/** 卸载（删除登记并断开桥接） */
export function uninstallPlugin(id) {
  return api.post(`/settings/plugins/${id}/uninstall`, {})
}

/** 删除条目（内置不可删，已安装需先卸载） */
export function deletePlugin(id) {
  return api.delete(`/settings/plugins/${id}`)
}

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

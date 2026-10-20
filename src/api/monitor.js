import api from './chat'

/**
 * 获取监控统计（今日）
 */
export function getMonitorStats() {
  return api.get('/monitor/stats')
}

/**
 * 分页查询调用日志
 * @param {Object} data - { page, size, modelName?, status?, startDate?, endDate? }
 */
export function getCallLogs(data) {
  return api.post('/monitor/logs', data)
}

/**
 * 模型使用排行（今日）
 */
export function getModelRanking() {
  return api.get('/monitor/models')
}

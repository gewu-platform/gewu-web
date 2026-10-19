import api from './chat'

/**
 * 执行 Prompt 模板
 * @param {Object} data - { templateName, variables? }
 */
export function executeTemplate(data) {
  return api.post('/prompt/execute', data)
}

/**
 * 列出所有模板
 */
export function listTemplates() {
  return api.get('/prompt/list')
}

/**
 * 获取模板详情
 * @param {string} name - 模板名称
 */
export function getTemplate(name) {
  return api.get(`/prompt/${name}`)
}

/**
 * 创建模板
 * @param {Object} data - 模板对象
 */
export function createTemplate(data) {
  return api.post('/prompt/create', data)
}

/**
 * 回滚模板版本
 * @param {Object} data - { name, targetVersion }
 */
export function rollbackTemplate(data) {
  return api.post('/prompt/rollback', data)
}

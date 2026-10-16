import api from './chat'

/**
 * 知识库 API（对齐 native-web src/api/knowledge.js）
 */

/**
 * 上传文档（知识库）
 * @param {File} file 文件对象
 * @returns {Promise} R<KnowledgeDocument>
 */
export function uploadDocument(file) {
  const formData = new FormData()
  formData.append('file', file)
  return api.post('/knowledge/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    timeout: 120000 // 文档上传可能较慢
  })
}

/**
 * 获取文档列表
 * @returns {Promise<R<KnowledgeDocument[]>>}
 */
export function getDocuments() {
  return api.get('/knowledge/documents')
}

/**
 * 获取文档详情
 * @param {number} id 文档ID
 * @returns {Promise<R<KnowledgeDocument>>}
 */
export function getDocument(id) {
  return api.get(`/knowledge/document/${id}`)
}

/**
 * 删除文档
 * @param {number} id 文档ID
 * @returns {Promise<R<Void>>}
 */
export function deleteDocument(id) {
  return api.delete(`/knowledge/document/${id}`)
}

/**
 * 知识库搜索（向量检索）
 * @param {string} query 搜索关键词
 * @param {number} topK 返回结果数量，默认5
 * @returns {Promise<R<KnowledgeSearchResult[]>>}
 */
export function searchKnowledge(query, topK = 5) {
  return api.get('/knowledge/search', {
    params: { query, topK }
  })
}

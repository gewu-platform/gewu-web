<template>
  <div class="knowledge-view">
    <div class="knowledge-shell">
      <!-- 左侧导航 -->
      <aside class="knowledge-nav">
        <div class="nav-header">
          <div class="nav-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
          </div>
          <div class="nav-title-group">
            <span class="nav-title">知识库</span>
            <span class="nav-subtitle">文档管理与检索</span>
          </div>
        </div>

        <nav class="nav-list">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="nav-item"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            <div class="nav-item-icon" :style="`background: ${tab.color}15; color: ${tab.color}`">
              <svg v-if="tab.id === 'tab-docs'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              <svg v-if="tab.id === 'tab-search'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <svg v-if="tab.id === 'tab-upload'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <span class="nav-item-label">{{ tab.label }}</span>
          </button>
        </nav>
      </aside>

      <!-- 右侧内容区 -->
      <div class="knowledge-content">

        <!-- ===== 文档列表 ===== -->
        <section v-if="activeTab === 'tab-docs'" class="knowledge-section">
          <div class="section-heading">
            <div class="section-icon" style="background: linear-gradient(135deg, #0ea5e9, #38bdf8)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <div>
              <h2 class="section-title">文档列表</h2>
              <p class="section-desc">已上传的知识文档共 {{ documents.length }} 篇</p>
            </div>
          </div>

          <div class="section-body">
            <a-spin :spinning="loading" tip="加载中...">
              <!-- 文档表格 -->
              <div class="doc-table">
                <div class="doc-table-header">
                  <span class="col col-name">文件名</span>
                  <span class="col col-type">类型</span>
                  <span class="col col-size">大小</span>
                  <span class="col col-chunks">分块数</span>
                  <span class="col col-status">状态</span>
                  <span class="col col-time">上传时间</span>
                  <span class="col col-action">操作</span>
                </div>

                <div
                  v-for="doc in documents"
                  :key="doc.id"
                  class="doc-table-row"
                >
                  <span class="col col-name">
                    <svg class="doc-file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    <span class="doc-filename" :title="doc.fileName">{{ doc.fileName }}</span>
                  </span>
                  <span class="col col-type">
                    <span class="type-badge" :class="'type-' + doc.fileType">{{ doc.fileType }}</span>
                  </span>
                  <span class="col col-size">{{ formatSize(doc.fileSize) }}</span>
                  <span class="col col-chunks">{{ doc.chunkCount || '-' }}</span>
                  <span class="col col-status">
                    <span class="status-badge" :class="'status-' + doc.status">
                      {{ statusText(doc.status) }}
                    </span>
                  </span>
                  <span class="col col-time">{{ formatTime(doc.createTime) }}</span>
                  <span class="col col-action">
                    <button class="action-btn view-btn" @click="viewDocument(doc)" title="查看详情">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                      </svg>
                    </button>
                    <button class="action-btn delete-btn" @click="confirmDelete(doc)" title="删除">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      </svg>
                    </button>
                  </span>
                </div>

                <!-- 空状态 -->
                <div v-if="!loading && documents.length === 0" class="empty-state">
                  <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="9" y1="15" x2="15" y2="15"/>
                  </svg>
                  <p class="empty-title">暂无文档</p>
                  <p class="empty-desc">切换到「上传文档」标签上传第一个文档</p>
                  <button class="empty-action-btn" @click="activeTab = 'tab-upload'">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    上传文档
                  </button>
                </div>
              </div>
            </a-spin>
          </div>
        </section>

        <!-- ===== 上传文档 ===== -->
        <section v-if="activeTab === 'tab-upload'" class="knowledge-section">
          <div class="section-heading">
            <div class="section-icon" style="background: linear-gradient(135deg, #10b981, #059669)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <div>
              <h2 class="section-title">上传文档</h2>
              <p class="section-desc">支持 PDF、DOCX、TXT、MD 格式</p>
            </div>
          </div>

          <div class="section-body">
            <div
              class="upload-dropzone"
              :class="{ dragging: isDragging }"
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="handleDrop"
              @click="triggerFileInput"
            >
              <svg class="upload-big-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <p class="upload-title">拖拽文件到此处，或点击选择文件</p>
              <p class="upload-desc">支持 PDF、DOCX、TXT、MD 格式，自动解析并生成向量索引</p>
              <input
                ref="fileInput"
                type="file"
                accept=".pdf,.docx,.txt,.md"
                class="hidden-file-input"
                @change="handleFileSelect"
                :disabled="uploading"
              />
            </div>

            <!-- 上传中状态 -->
            <div v-if="uploading" class="upload-progress">
              <a-spin size="large" />
              <p class="upload-progress-text">正在上传文档，解析与向量化在后台进行...</p>
            </div>

            <!-- 最近上传 -->
            <div v-if="recentUploads.length > 0" class="recent-uploads">
              <h3 class="recent-title">最近上传</h3>
              <div class="recent-list">
                <div v-for="doc in recentUploads" :key="doc.id" class="recent-item" :class="{'recent-success': doc.status === 2, 'recent-failed': doc.status === 3}">
                  <div class="recent-icon" :class="'status-' + doc.status">
                    <svg v-if="doc.status === 2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    <svg v-else-if="doc.status === 3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                      <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                    <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div class="recent-info">
                    <span class="recent-name">{{ doc.fileName }}</span>
                    <span class="recent-meta">{{ formatSize(doc.fileSize) }} · {{ statusText(doc.status) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ===== 知识检索 ===== -->
        <section v-if="activeTab === 'tab-search'" class="knowledge-section">
          <div class="section-heading">
            <div class="section-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <div>
              <h2 class="section-title">知识检索</h2>
              <p class="section-desc">通过语义向量搜索相关知识片段</p>
            </div>
          </div>

          <div class="section-body">
            <div class="search-box">
              <div class="search-input-wrap">
                <svg class="search-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <a-input
                  v-model:value="searchQuery"
                  placeholder="输入问题或关键词，按 Enter 搜索..."
                  size="large"
                  class="search-input"
                  :bordered="false"
                  @pressEnter="doSearch"
                  :disabled="searching"
                />
                <a-button
                  type="primary"
                  @click="doSearch"
                  :loading="searching"
                  :disabled="!searchQuery.trim()"
                  class="search-btn"
                >
                  搜索
                </a-button>
              </div>

              <div class="search-options">
                <span class="search-option-label">返回结果数：</span>
                <a-select v-model:value="topK" style="width: 80px" size="small">
                  <a-select-option :value="3">3</a-select-option>
                  <a-select-option :value="5">5</a-select-option>
                  <a-select-option :value="10">10</a-select-option>
                </a-select>
              </div>
            </div>

            <!-- 搜索结果 -->
            <a-spin :spinning="searching" tip="语义检索中...">
              <div v-if="searchResults.length > 0" class="search-results">
                <p class="results-summary">找到 <strong>{{ searchResults.length }}</strong> 条相关知识片段</p>
                <div
                  v-for="(result, index) in searchResults"
                  :key="result.chunkId || index"
                  class="result-card"
                >
                  <div class="result-header">
                    <span class="result-rank">#{{ index + 1 }}</span>
                    <span class="result-doc-name">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                      {{ result.documentName }}
                    </span>
                    <span class="result-similarity">
                      相似度 {{ (result.similarity * 100).toFixed(1) }}%
                    </span>
                  </div>
                  <div class="result-content">
                    {{ result.content }}
                  </div>
                </div>
              </div>

              <!-- 搜索空状态 -->
              <div v-if="!searching && searched && searchResults.length === 0" class="search-empty">
                <svg class="search-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  <line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
                <p class="search-empty-title">未找到相关知识</p>
                <p class="search-empty-desc">尝试换一些关键词，或先上传更多文档</p>
              </div>
            </a-spin>
          </div>
        </section>

      </div>
    </div>

    <!-- 文档详情弹窗 -->
    <a-modal
      v-model:visible="docDetailVisible"
      title="文档详情"
      width="520px"
      :footer="null"
    >
      <div v-if="docDetail" class="doc-detail">
        <div class="detail-grid">
          <div class="detail-row">
            <span class="detail-label">文件名</span>
            <span class="detail-value" :title="docDetail.fileName">{{ docDetail.fileName }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">类型</span>
            <span class="detail-value">
              <span class="type-badge" :class="'type-' + docDetail.fileType">{{ docDetail.fileType }}</span>
            </span>
          </div>
          <div class="detail-row">
            <span class="detail-label">大小</span>
            <span class="detail-value">{{ formatSize(docDetail.fileSize) }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">分块数</span>
            <span class="detail-value">{{ docDetail.chunkCount ?? '-' }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">状态</span>
            <span class="detail-value">
              <span class="status-badge" :class="'status-' + docDetail.status">
                {{ statusText(docDetail.status) }}
              </span>
            </span>
          </div>
          <div class="detail-row">
            <span class="detail-label">上传人</span>
            <span class="detail-value">{{ docDetail.createdBy }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">上传时间</span>
            <span class="detail-value">{{ formatTime(docDetail.createTime) }}</span>
          </div>
        </div>
        <div v-if="docDetail.errorMsg" class="detail-error">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span>{{ docDetail.errorMsg }}</span>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { Modal, message } from 'ant-design-vue'
import { uploadDocument, getDocuments, getDocument, deleteDocument, searchKnowledge } from '@/api/knowledge'

// 统一解包 R<T>
function unwrap(res) {
  if (res?.data !== undefined) {
    return res.data
  }
  return res
}

const tabs = [
  { id: 'tab-docs', label: '文档列表', color: '#0ea5e9' },
  { id: 'tab-search', label: '知识检索', color: '#f59e0b' },
  { id: 'tab-upload', label: '上传文档', color: '#10b981' }
]

const activeTab = ref('tab-docs')
const documents = ref([])
const recentUploads = ref([])
const loading = ref(false)

const fileInput = ref(null)
const isDragging = ref(false)
const uploading = ref(false)

const searchQuery = ref('')
const topK = ref(5)
const searching = ref(false)
const searchResults = ref([])
const searched = ref(false)

// ===== 状态轮询（处理中文档异步索引） =====
let pollTimer = null

function startPolling() {
  stopPolling()
  pollTimer = setInterval(async () => {
    const processing = documents.value.some(d => d.status === 1)
    if (!processing) {
      stopPolling()
      return
    }
    // 静默刷新列表（不闪 loading）
    try {
      const res = await getDocuments()
      const data = unwrap(res)
      documents.value = Array.isArray(data) ? data : (data?.documents || [])
    } catch (err) {
      stopPolling()
    }
  }, 3000)
}

function stopPolling() {
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
}

// ===== 文档列表 =====
async function loadDocuments() {
  loading.value = true
  try {
    const res = await getDocuments()
    const data = unwrap(res)
    documents.value = Array.isArray(data) ? data : (data?.documents || [])
    if (documents.value.some(d => d.status === 1)) {
      startPolling()
    }
  } catch (err) {
    if (err.isAuthError) {
      documents.value = []
      return
    }
    console.error('[知识库] 加载文档列表失败:', err)
    message.error('加载文档列表失败: ' + (err.message || '未知错误'))
    documents.value = []
  } finally {
    loading.value = false
  }
}

// 格式化文件大小
function formatSize(bytes) {
  if (!bytes) return '-'
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

// 状态文本
function statusText(status) {
  switch (status) {
    case 0: return '待处理'
    case 1: return '处理中'
    case 2: return '已完成'
    case 3: return '失败'
    default: return '未知'
  }
}

// 格式化时间
function formatTime(time) {
  if (!time) return '-'
  const d = new Date(time)
  return d.toLocaleString('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  })
}

// ===== 文档详情 =====
const docDetail = ref(null)
const docDetailVisible = ref(false)

async function viewDocument(doc) {
  try {
    const res = await getDocument(doc.id)
    const data = unwrap(res)
    docDetail.value = data
    docDetailVisible.value = true
  } catch (err) {
    if (err.isAuthError) return
    message.error('获取文档详情失败: ' + (err.message || '未知错误'))
  }
}

// ===== 删除文档 =====
function confirmDelete(doc) {
  Modal.confirm({
    title: '删除文档',
    content: `确定删除「${doc.fileName}」吗？其向量索引将同步清除。`,
    okText: '删除',
    okType: 'danger',
    cancelText: '取消',
    async onOk() {
      try {
        await deleteDocument(doc.id)
        message.success('文档已删除')
        await loadDocuments()
      } catch (err) {
        if (err.isAuthError) return
        message.error('删除失败: ' + (err.message || '未知错误'))
      }
    }
  })
}

// ===== 上传 =====
function triggerFileInput() {
  fileInput.value?.click()
}

function handleFileSelect(e) {
  const files = e.target.files
  if (!files || files.length === 0) return
  uploadFile(files[0])
  e.target.value = ''
}

function handleDrop(e) {
  isDragging.value = false
  const files = e.dataTransfer.files
  if (!files || files.length === 0) return
  uploadFile(files[0])
}

async function uploadFile(file) {
  const allowed = ['pdf', 'docx', 'txt', 'md']
  const ext = file.name.split('.').pop().toLowerCase()
  if (!allowed.includes(ext)) {
    message.error(`不支持的文件类型：.${ext}，仅支持 ${allowed.join(', ')}`)
    return
  }

  uploading.value = true
  try {
    const res = await uploadDocument(file)
    const data = unwrap(res)
    message.success(`文档「${file.name}」上传成功，解析进行中`)

    // 添加到最近上传列表（处理中状态，靠轮询刷新）
    recentUploads.value.unshift({
      id: data?.id || Date.now(),
      fileName: file.name,
      fileType: ext,
      fileSize: file.size,
      status: data?.status ?? 1,
      chunkCount: data?.chunkCount,
      createTime: new Date().toISOString()
    })

    // 刷新文档列表并启动状态轮询
    await loadDocuments()
    activeTab.value = 'tab-docs'
  } catch (err) {
    if (err.isAuthError) return
    message.error('上传失败: ' + (err.message || '未知错误'))
    recentUploads.value.unshift({
      id: Date.now(),
      fileName: file.name,
      fileType: ext,
      fileSize: file.size,
      status: 3,
      createTime: new Date().toISOString()
    })
  } finally {
    uploading.value = false
  }
}

// ===== 知识检索 =====
async function doSearch() {
  const query = searchQuery.value.trim()
  if (!query) {
    message.warning('请输入搜索关键词')
    return
  }

  searching.value = true
  searched.value = true
  try {
    const res = await searchKnowledge(query, topK.value)
    const data = unwrap(res)
    searchResults.value = Array.isArray(data) ? data : (data?.results || [])
    if (searchResults.value.length > 0) {
      message.success(`找到 ${searchResults.value.length} 条相关知识`)
    } else {
      message.info('未找到相关知识')
    }
  } catch (err) {
    console.error('[知识库] 搜索失败:', err)
    if (!err.isAuthError) {
      message.error('搜索失败: ' + (err.message || '未知错误'))
    }
    searchResults.value = []
  } finally {
    searching.value = false
  }
}

// ===== 生命周期 =====
onMounted(async () => {
  await loadDocuments()
})

onUnmounted(() => {
  stopPolling()
})

// 切换到文档列表 Tab 时自动刷新
watch(activeTab, async (newTab) => {
  if (newTab === 'tab-docs') {
    await loadDocuments()
  }
})
</script>

<style scoped>
/* ===== 整体 ===== */
.knowledge-view {
  height: 100%;
  width: 100%;
  background: #f8fafc;
}

.knowledge-shell {
  display: flex;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* ===== 左侧导航 ===== */
.knowledge-nav {
  width: 220px;
  flex-shrink: 0;
  padding: 24px 12px;
  border-right: 1px solid #e2e8f0;
}

.nav-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 12px 20px;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 16px;
}

.nav-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(56, 189, 248, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0ea5e9;
}

.nav-icon-wrap svg { width: 20px; height: 20px; }

.nav-title-group {
  display: flex;
  flex-direction: column;
}

.nav-title {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
}

.nav-subtitle {
  font-size: 12px;
  color: #64748b;
}

.nav-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border: none;
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s;
}

.nav-item:hover { background: #f1f5f9; }

.nav-item.active {
  background: rgba(14, 165, 233, 0.08);
}

.nav-item.active .nav-item-label {
  color: #0ea5e9;
  font-weight: 600;
}

.nav-item-icon {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.nav-item-icon svg { width: 17px; height: 17px; }

.nav-item-label {
  font-size: 14px;
  color: #334155;
}

/* ===== 内容区 ===== */
.knowledge-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.knowledge-section { max-width: 860px; }

.section-heading {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}

.section-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}

.section-icon svg { width: 21px; height: 21px; }

.section-title {
  font-size: 19px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.section-desc {
  font-size: 13px;
  color: #64748b;
  margin: 2px 0 0;
}

.section-body {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 20px;
}

/* ===== 文档表格 ===== */
.doc-table { display: flex; flex-direction: column; }

.doc-table-header,
.doc-table-row {
  display: grid;
  grid-template-columns: 2.2fr 0.7fr 0.9fr 0.8fr 1fr 1.4fr 0.9fr;
  gap: 8px;
  align-items: center;
  padding: 10px 8px;
}

.doc-table-header {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  border-bottom: 1px solid #e2e8f0;
}

.doc-table-row {
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.12s;
}

.doc-table-row:hover { background: #f8fafc; }
.doc-table-row:last-of-type { border-bottom: none; }

.col { min-width: 0; }
.col-name { display: flex; align-items: center; gap: 8px; }

.doc-file-icon {
  width: 16px; height: 16px;
  color: #0ea5e9;
  flex-shrink: 0;
}

.doc-filename {
  font-size: 13px;
  color: #0f172a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.col-size, .col-chunks, .col-time {
  font-size: 12px;
  color: #475569;
}

.type-badge {
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: #f1f5f9;
  color: #475569;
}

.type-pdf { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
.type-docx { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
.type-md { background: rgba(14, 165, 233, 0.1); color: #0ea5e9; }
.type-txt { background: rgba(100, 116, 139, 0.12); color: #64748b; }

.status-badge {
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
}

.status-0 { background: #f1f5f9; color: #64748b; }
.status-1 { background: rgba(245, 158, 11, 0.12); color: #d97706; }
.status-2 { background: rgba(16, 185, 129, 0.12); color: #059669; }
.status-3 { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

.col-action {
  display: flex;
  gap: 6px;
  justify-content: flex-end;
}

.action-btn {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  transition: all 0.12s;
}

.action-btn:hover { border-color: #0ea5e9; color: #0ea5e9; }
.action-btn.delete-btn:hover { border-color: #ef4444; color: #ef4444; }

/* ===== 空状态 ===== */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 48px 20px;
  color: #94a3b8;
}

.empty-icon { width: 40px; height: 40px; }
.empty-title { font-size: 15px; font-weight: 600; color: #475569; margin: 0; }
.empty-desc { font-size: 13px; margin: 0; }

.empty-action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  padding: 8px 18px;
  border-radius: 999px;
  border: none;
  background: #0ea5e9;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.empty-action-btn:hover { background: #0284c7; }

/* ===== 上传区 ===== */
.upload-dropzone {
  border: 2px dashed #cbd5e1;
  border-radius: 14px;
  padding: 48px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.15s;
}

.upload-dropzone:hover,
.upload-dropzone.dragging {
  border-color: #0ea5e9;
  background: rgba(14, 165, 233, 0.04);
}

.upload-big-icon {
  width: 44px; height: 44px;
  color: #94a3b8;
}

.upload-dropzone.dragging .upload-big-icon { color: #0ea5e9; }

.upload-title { font-size: 15px; font-weight: 600; color: #334155; margin: 0; }
.upload-desc { font-size: 13px; color: #94a3b8; margin: 0; }

.hidden-file-input { display: none; }

.upload-progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 28px;
}

.upload-progress-text {
  font-size: 13px;
  color: #64748b;
  margin: 0;
}

/* ===== 最近上传 ===== */
.recent-uploads { margin-top: 24px; }

.recent-title {
  font-size: 14px;
  font-weight: 600;
  color: #334155;
  margin: 0 0 12px;
}

.recent-list { display: flex; flex-direction: column; gap: 8px; }

.recent-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
}

.recent-success { border-left: 3px solid #10b981; }
.recent-failed { border-left: 3px solid #ef4444; }

.recent-icon { display: flex; color: #f59e0b; }
.recent-icon.status-2 { color: #10b981; }
.recent-icon.status-3 { color: #ef4444; }

.recent-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.recent-name {
  font-size: 13px;
  font-weight: 500;
  color: #0f172a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recent-meta { font-size: 12px; color: #94a3b8; }

/* ===== 检索 ===== */
.search-box { margin-bottom: 20px; }

.search-input-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 4px 8px 4px 14px;
  background: #f8fafc;
  transition: border-color 0.15s;
}

.search-input-wrap:focus-within { border-color: #0ea5e9; }

.search-input-icon {
  width: 18px; height: 18px;
  color: #94a3b8;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  background: transparent;
}

.search-btn {
  background: #0ea5e9;
  border-color: #0ea5e9;
}

.search-btn:hover { background: #0284c7; border-color: #0284c7; }

.search-options {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  padding-left: 6px;
}

.search-option-label { font-size: 12px; color: #64748b; }

.results-summary {
  font-size: 13px;
  color: #475569;
  margin: 0 0 12px;
}

.search-results { display: flex; flex-direction: column; gap: 12px; }

.result-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 14px 16px;
  transition: border-color 0.15s;
}

.result-card:hover { border-color: #0ea5e9; }

.result-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.result-rank {
  font-size: 12px;
  font-weight: 700;
  color: #f59e0b;
}

.result-doc-name {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
}

.result-similarity {
  margin-left: auto;
  font-size: 12px;
  font-weight: 600;
  color: #0ea5e9;
}

.result-content {
  font-size: 13px;
  line-height: 1.65;
  color: #475569;
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 200px;
  overflow-y: auto;
}

.search-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 40px 20px;
  color: #94a3b8;
}

.search-empty-icon { width: 36px; height: 36px; }
.search-empty-title { font-size: 15px; font-weight: 600; color: #475569; margin: 0; }
.search-empty-desc { font-size: 13px; margin: 0; }

/* ===== 详情弹窗 ===== */
.detail-grid { display: flex; flex-direction: column; gap: 4px; }

.detail-row {
  display: flex;
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;
}

.detail-row:last-child { border-bottom: none; }

.detail-label {
  width: 90px;
  font-size: 13px;
  color: #64748b;
  flex-shrink: 0;
}

.detail-value {
  font-size: 13px;
  color: #0f172a;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.detail-error {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding: 10px 14px;
  border-radius: 8px;
  background: rgba(239, 68, 68, 0.06);
  color: #ef4444;
  font-size: 13px;
}

.detail-error svg { width: 16px; height: 16px; flex-shrink: 0; }

/* ===== 响应式 ===== */
@media (max-width: 800px) {
  .knowledge-nav { display: none; }
  .doc-table-header, .doc-table-row {
    grid-template-columns: 2fr 0.7fr 1fr 0.9fr 1fr;
  }
  .col-size, .col-time, .col-action { display: none; }
}
</style>

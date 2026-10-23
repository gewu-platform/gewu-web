<template>
  <div class="prompt-view">
    <div class="prompt-shell">
      <!-- 左侧模板列表 -->
      <aside class="prompt-sidebar">
        <div class="sidebar-header">
          <div class="nav-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <div class="nav-title-group">
            <h3 class="sidebar-title">Prompt 模板</h3>
            <span class="sidebar-sub">版本制模板管理</span>
          </div>
          <button class="add-btn" @click="showCreateModal = true" title="新建模板">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>

        <div class="template-list">
          <div
            v-for="tpl in templates"
            :key="`${tpl.name}-${tpl.version}`"
            class="template-item"
            :class="{ active: selectedTemplate?.name === tpl.name }"
            @click="selectTemplate(tpl)"
          >
            <div class="template-info">
              <span class="template-name">{{ tpl.name }}</span>
              <span class="template-version">v{{ tpl.version }}</span>
            </div>
            <p class="template-desc">{{ tpl.description || '暂无描述' }}</p>
            <div class="template-footer">
              <span class="template-model">{{ tpl.model || '默认模型' }}</span>
              <span class="template-status" :class="tpl.isActive ? 'active' : 'inactive'">
                {{ tpl.isActive ? '启用' : '停用' }}
              </span>
            </div>
          </div>
          <div v-if="templates.length === 0" class="empty-hint">暂无模板</div>
        </div>
      </aside>

      <!-- 右侧详情/执行区 -->
      <div class="prompt-main">
        <template v-if="selectedTemplate">
          <!-- Tab 切换 -->
          <div class="prompt-tabs">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              class="tab-btn"
              :class="{ active: activeTab === tab.id }"
              @click="activeTab = tab.id"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- 模板详情 -->
          <div v-if="activeTab === 'detail'" class="tab-content">
            <div class="detail-header">
              <div>
                <h2 class="detail-name">{{ selectedTemplate.name }}</h2>
                <p class="detail-meta">
                  v{{ selectedTemplate.version }} · {{ selectedTemplate.model || '默认' }} · T={{ selectedTemplate.temperature }}
                </p>
              </div>
            </div>

            <div class="detail-panel">
              <div class="detail-field">
                <label class="field-label">描述</label>
                <p class="field-text">{{ selectedTemplate.description || '-' }}</p>
              </div>

              <div class="field-divider" />

              <div class="detail-field">
                <label class="field-label">System Prompt</label>
                <div class="prompt-block">{{ selectedTemplate.systemPrompt || '-' }}</div>
              </div>

              <div class="field-divider" />

              <div class="detail-field">
                <label class="field-label">User Prompt 模板</label>
                <div class="prompt-block">{{ selectedTemplate.userPromptTemplate || '-' }}</div>
              </div>

              <div class="field-divider" />

              <div class="detail-actions">
                <a-button size="small" @click="executeCurrent">执行模板</a-button>
              </div>
            </div>
          </div>

          <!-- 执行 -->
          <div v-if="activeTab === 'execute'" class="tab-content">
            <div class="execute-section">
              <h3 class="execute-title">填充变量</h3>
              <div class="variable-inputs">
                <div
                  v-for="v in extractedVars"
                  :key="v"
                  class="var-field"
                >
                  <label class="var-label">{{ v }}</label>
                  <a-textarea
                    v-model:value="execVars[v]"
                    :placeholder="'输入 ' + v + ' 的值'"
                    :auto-size="{ minRows: 2, maxRows: 8 }"
                    class="var-input"
                  />
                </div>
                <div v-if="extractedVars.length === 0" class="empty-hint">该模板没有变量占位符</div>
              </div>

              <button class="execute-btn" @click="doExecute" :disabled="executing">
                <svg v-if="!executing" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                {{ executing ? '执行中...' : '执行' }}
              </button>
            </div>

            <!-- 执行结果 -->
            <div v-if="execResult" class="result-section">
              <div class="result-header">
                <div class="result-title-row">
                  <svg class="result-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                  <h3 class="result-title">执行结果</h3>
                </div>
                <div class="result-meta">
                  <span class="meta-chip model-chip">{{ execResult.model }}</span>
                  <span class="meta-chip">{{ execResult.tokens }} tokens</span>
                  <span class="meta-chip">{{ execResult.duration }}ms</span>
                </div>
              </div>
              <div class="result-body">
                <div class="result-block" v-html="renderMarkdown(execResult.content)"></div>
              </div>
            </div>
          </div>
        </template>

        <div v-else class="no-selection">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          <p>从左侧选择一个模板查看详情或执行</p>
        </div>
      </div>
    </div>

    <!-- 创建模板弹窗 -->
    <a-modal
      v-model:visible="showCreateModal"
      title="新建 Prompt 模板"
      :confirm-loading="creating"
      @ok="doCreate"
      width="600px"
    >
      <a-form :model="createForm" layout="vertical">
        <a-form-item label="模板名称" required>
          <a-input v-model:value="createForm.name" placeholder="如 code-review" />
        </a-form-item>
        <a-form-item label="描述">
          <a-input v-model:value="createForm.description" placeholder="模板用途说明" />
        </a-form-item>
        <a-form-item label="System Prompt">
          <a-textarea v-model:value="createForm.systemPrompt" :rows="4" placeholder="系统角色设定" />
        </a-form-item>
        <a-form-item label="User Prompt 模板" required>
          <a-textarea v-model:value="createForm.userPromptTemplate" :rows="4" placeholder="使用 {variable} 占位符" />
        </a-form-item>
        <a-row :gutter="12">
          <a-col :span="12">
            <a-form-item label="模型">
              <a-select v-model:value="createForm.model" placeholder="选择推荐模型" allow-clear>
                <a-select-option v-for="m in allModels" :key="m.modelId" :value="m.modelId">
                  {{ m.description || m.modelName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="温度">
              <a-input-number v-model:value="createForm.temperature" :min="0" :max="2" :step="0.1" style="width:100%" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="Max Tokens">
              <a-input-number v-model:value="createForm.maxTokens" :min="1" :step="100" style="width:100%" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { message } from 'ant-design-vue'
import { listTemplates, getTemplate, executeTemplate, createTemplate } from '@/api/prompt'
import { getModelList } from '@/api/chat'
import { marked } from 'marked'

const templates = ref([])
const selectedTemplate = ref(null)
const activeTab = ref('detail')
const executing = ref(false)
const execResult = ref(null)
const execVars = reactive({})
const showCreateModal = ref(false)
const creating = ref(false)
const allModels = ref([])

const tabs = [
  { id: 'detail', label: '模板详情' },
  { id: 'execute', label: '执行' }
]

const createForm = reactive({
  name: '',
  description: '',
  systemPrompt: '',
  userPromptTemplate: '',
  model: '',
  temperature: 0.7,
  maxTokens: 2048
})

const extractedVars = computed(() => {
  if (!selectedTemplate.value?.userPromptTemplate) return []
  const matches = selectedTemplate.value.userPromptTemplate.match(/\{(\w+)\}/g) || []
  return [...new Set(matches.map(m => m.slice(1, -1)))]
})

function renderMarkdown(text) {
  return marked.parse(text || '')
}

async function loadTemplates() {
  try {
    const res = await listTemplates()
    if (res.code === 200) {
      templates.value = res.data || []
    }
  } catch (err) {
    if (err.isAuthError) return
    message.error('加载模板列表失败: ' + err.message)
  }
}

async function loadModels() {
  try {
    const res = await getModelList()
    if (res.code === 200) {
      let modelsData = []
      if (Array.isArray(res.data)) {
        modelsData = res.data
      } else if (res.data?.models) {
        modelsData = res.data.models
      }
      allModels.value = modelsData
    }
  } catch (err) {
    console.warn('加载模型列表失败:', err.message)
  }
}

function selectTemplate(tpl) {
  selectedTemplate.value = tpl
  activeTab.value = 'detail'
  execResult.value = null
  // 重置变量
  extractedVars.value.forEach(v => { execVars[v] = '' })
}

async function executeCurrent() {
  activeTab.value = 'execute'
}

async function doExecute() {
  if (!selectedTemplate.value) return
  executing.value = true
  execResult.value = null
  try {
    const res = await executeTemplate({
      templateName: selectedTemplate.value.name,
      variables: { ...execVars }
    })
    if (res.code === 200 && res.data) {
      execResult.value = res.data
      message.success('模板执行成功')
    }
  } catch (err) {
    if (err.isAuthError) return
    message.error('执行失败: ' + err.message)
  } finally {
    executing.value = false
  }
}

async function doCreate() {
  if (!createForm.name || !createForm.userPromptTemplate) {
    message.error('模板名称和 User Prompt 模板不能为空')
    return
  }
  creating.value = true
  try {
    const res = await createTemplate({ ...createForm })
    if (res.code === 200) {
      message.success('模板创建成功')
      showCreateModal.value = false
      Object.assign(createForm, {
        name: '', description: '', systemPrompt: '', userPromptTemplate: '',
        model: '', temperature: 0.7, maxTokens: 2048
      })
      await loadTemplates()
    }
  } catch (err) {
    if (err.isAuthError) return
    message.error('创建失败: ' + err.message)
  } finally {
    creating.value = false
  }
}

onMounted(async () => {
  await loadTemplates()
  await loadModels()
})

watch(extractedVars, (vars) => {
  vars.forEach(v => {
    if (!(v in execVars)) execVars[v] = ''
  })
})
</script>

<style scoped>
/* ===== 整体 ===== */
.prompt-view {
  height: 100%;
  width: 100%;
  background: #f8fafc;
  overflow: hidden;
}

.prompt-shell {
  display: flex;
  height: 100%;
}

/* ===== 左侧模板列表 ===== */
.prompt-sidebar {
  width: 320px;
  flex-shrink: 0;
  background: #fff;
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-header {
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
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6366F1;
  flex-shrink: 0;
}

.nav-icon-wrap svg { width: 20px; height: 20px; }

.nav-title-group {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.sidebar-title {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.sidebar-sub {
  font-size: 12px;
  color: #94a3b8;
}

.add-btn {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #6366F1, #8B5CF6);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.add-btn:hover {
  transform: scale(1.05);
}

.add-btn svg {
  width: 18px;
  height: 18px;
}

.template-list {
  flex: 1;
  overflow-y: auto;
  padding: 4px;
}

.template-item {
  padding: 14px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.15s ease;
  border: 1px solid transparent;
  margin-bottom: 4px;
}

.template-item:hover {
  background: #f1f5f9;
  border-color: #e2e8f0;
}

.template-item.active {
  background: linear-gradient(135deg, rgba(99,102,241,0.06), rgba(139,92,246,0.06));
  border-color: #c7d2fe;
}

.template-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.template-name {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.template-version {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
  background: #f1f5f9;
  color: #64748b;
  font-weight: 600;
}

.template-desc {
  font-size: 12px;
  color: #94a3b8;
  margin: 0 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.template-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.template-model {
  font-size: 11px;
  color: #6366F1;
  font-weight: 500;
}

.template-status {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 600;
}

.template-status.active { background: rgba(16,185,129,0.1); color: #10b981; }
.template-status.inactive { background: rgba(148,163,184,0.15); color: #94a3b8; }

.empty-hint {
  padding: 40px;
  text-align: center;
  color: #94a3b8;
  font-size: 14px;
}

/* ===== 右侧主区 ===== */
.prompt-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #f8fafc;
}

.no-selection {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  gap: 12px;
}

.no-selection svg {
  width: 48px;
  height: 48px;
  opacity: 0.5;
}

/* Tabs */
.prompt-tabs {
  display: flex;
  gap: 2px;
  padding: 4px;
  background: rgba(148,163,184,0.08);
  margin: 16px 16px 0;
  border-radius: 10px;
  width: fit-content;
}

.tab-btn {
  padding: 8px 20px;
  border-radius: 8px;
  border: none;
  background: transparent;
  font-size: 13px;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.15s ease;
}

.tab-btn.active {
  background: #fff;
  color: #6366F1;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

/* Tab 内容 */
.tab-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.detail-header {
  margin-bottom: 20px;
}

.detail-name {
  font-size: 22px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px;
}

.detail-meta {
  font-size: 13px;
  color: #94a3b8;
  margin: 0;
}

.detail-panel {
  background: #fff;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.05);
  padding: 24px;
}

.detail-field {
  margin-bottom: 4px;
}

.field-label {
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  display: block;
  margin-bottom: 8px;
}

.field-text {
  font-size: 14px;
  color: #64748b;
  margin: 0;
}

.prompt-block {
  background: #f8fafc;
  border-radius: 10px;
  padding: 16px;
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #334155;
  white-space: pre-wrap;
  border: 1px solid #e2e8f0;
}

.field-divider {
  height: 1px;
  background: rgba(0,0,0,0.04);
  margin: 20px 0;
}

.detail-actions {
  display: flex;
  justify-content: flex-end;
}

/* 执行区 */
.execute-section {
  background: #fff;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.05);
  padding: 24px;
  margin-bottom: 20px;
}

.execute-title {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 16px;
}

.variable-inputs {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 16px;
}

.var-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.var-label {
  font-size: 13px;
  font-weight: 600;
  color: #6366F1;
  font-family: 'SF Mono', 'Fira Code', monospace;
}

.var-input {
  border-radius: 10px !important;
  border-color: #e2e8f0 !important;
}

.execute-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #6366F1, #8B5CF6);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.execute-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  transform: translateY(-1px);
}

.execute-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.execute-btn svg {
  width: 18px;
  height: 18px;
}

/* 结果区 */
.result-section {
  background: #fff;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.05);
  overflow: hidden;
}

.result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(99,102,241,0.04), rgba(139,92,246,0.04));
  border-bottom: 1px solid rgba(0,0,0,0.06);
}

.result-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.result-icon {
  width: 20px;
  height: 20px;
  color: #6366F1;
}

.result-title {
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.result-meta {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.meta-chip {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #64748b;
  background: rgba(241, 245, 249, 0.8);
  border: 1px solid rgba(0,0,0,0.04);
}

.meta-chip.model-chip {
  color: #6366F1;
  background: rgba(99, 102, 241, 0.08);
  border-color: rgba(99, 102, 241, 0.15);
}

.result-body {
  padding: 20px;
}

.result-block {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  font-size: 14px;
  line-height: 1.8;
  color: #334155;
  border: 1px solid #e2e8f0;
}

.result-block > :first-child { margin-top: 0; }
.result-block > :last-child { margin-bottom: 0; }

.result-block p { margin: 0.6em 0; }
.result-block code {
  background: rgba(99,102,241,0.08);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
  color: #6366F1;
}
.result-block pre {
  background: #1e293b;
  color: #e2e8f0;
  padding: 14px 18px;
  border-radius: 10px;
  overflow-x: auto;
  margin: 12px 0;
}
.result-block pre code {
  background: none;
  color: inherit;
  padding: 0;
}

@media (max-width: 768px) {
  .prompt-shell { flex-direction: column; }
  .prompt-sidebar { width: 100%; max-height: 300px; }
}
</style>

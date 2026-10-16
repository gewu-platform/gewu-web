<template>
  <div class="model-view">
    <div class="page-header">
      <h2>🤖 模型管理</h2>
      <p>查看可用模型并切换当前使用的 AI 模型</p>
    </div>

    <div class="current-model">
      <div class="label">当前激活模型</div>
      <div class="value">
        <span class="model-id">{{ activeModel }}</span>
        <span class="model-name">{{ currentModelName }}</span>
      </div>
    </div>

    <div class="model-list">
      <div
        v-for="m in models"
        :key="m.id"
        class="model-card"
        :class="{ active: m.id === activeModel }"
        @click="switchTo(m.id)"
      >
        <div class="model-info">
          <div class="model-header">
            <span class="model-id">{{ m.id }}</span>
            <span v-if="m.id === activeModel" class="badge">当前</span>
          </div>
          <div class="model-desc">
            <span class="provider-badge">{{ m.provider }}</span>
            <span class="model-name">{{ m.modelName }}</span>
          </div>
          <div class="model-description">{{ m.description }}</div>
        </div>
      </div>
    </div>

    <div v-if="switching" class="switch-overlay">
      <span class="spinner"></span>
      <span>切换中...</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getModelList, switchModel as apiSwitchModel } from '@/api/chat'

// 统一解包 R<T>：{ code, message, data }
function unwrap(response) {
  if (response?.data !== undefined) {
    return response.data
  }
  return response
}

const models = ref([])
const activeModel = ref('')
const switching = ref(false)

const currentModelName = computed(() => {
  const m = models.value.find(m => m.id === activeModel.value)
  return m ? m.description || m.modelName : ''
})

async function loadModels() {
  try {
    const res = await getModelList()
    const data = unwrap(res)
    models.value = data.models || []
    activeModel.value = data.activeModel || ''
  } catch (e) {
    console.error('加载模型列表失败:', e)
  }
}

async function switchTo(modelId) {
  if (modelId === activeModel.value || switching.value) return
  switching.value = true
  try {
    const res = await apiSwitchModel(modelId)
    const data = unwrap(res)
    activeModel.value = data.newModel || modelId
    console.log('模型已切换:', data.oldModel, '->', data.newModel)
  } catch (e) {
    console.error('切换失败:', e)
    alert('切换模型失败: ' + (e.message || '未知错误'))
  } finally {
    switching.value = false
  }
}

onMounted(() => {
  loadModels()
})
</script>

<style lang="scss" scoped>
.model-view {
  height: 100%;
  overflow-y: auto;
  padding: 24px;
}

.page-header {
  margin-bottom: 24px;
  h2 { font-size: 22px; margin-bottom: 6px; }
  p { color: var(--text-secondary); font-size: 14px; }
}

.current-model {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  .label { font-size: 12px; color: var(--text-secondary); margin-bottom: 8px; }
  .value { display: flex; align-items: center; gap: 12px; }
  .model-id {
    font-family: monospace;
    font-size: 18px;
    font-weight: 600;
    color: var(--accent);
  }
  .model-name { font-size: 14px; color: var(--text-secondary); }
}

.model-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

.model-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.15s;
  &:hover { border-color: var(--accent); }
  &.active { border-color: var(--accent); background: rgba(88, 166, 255, 0.06); }
}

.model-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  .model-id {
    font-family: monospace;
    font-size: 15px;
    font-weight: 600;
  }
}

.badge {
  padding: 2px 8px;
  background: var(--accent);
  color: white;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}

.model-desc {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.provider-badge {
  padding: 2px 8px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 11px;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.model-name {
  font-size: 13px;
  color: var(--text-secondary);
  font-family: monospace;
}

.model-description {
  font-size: 13px;
  color: var(--text-secondary);
}

.switch-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--text-primary);
  font-size: 16px;
  z-index: 100;
  .spinner {
    width: 24px;
    height: 24px;
    border: 3px solid rgba(255,255,255,0.2);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>

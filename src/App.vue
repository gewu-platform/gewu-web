<template>
  <div class="app-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h1>🔗 LangChain4j</h1>
        <span class="subtitle">学习平台</span>
      </div>
      <nav class="nav-menu">
        <router-link to="/chat" class="nav-item" active-class="active">
          <span class="nav-icon">💬</span>
          <span>AI 对话</span>
        </router-link>
        <router-link to="/examples" class="nav-item" active-class="active">
          <span class="nav-icon">📚</span>
          <span>学习示例</span>
        </router-link>
        <router-link to="/models" class="nav-item" active-class="active">
          <span class="nav-icon">🤖</span>
          <span>模型管理</span>
        </router-link>
      </nav>
      <div class="sidebar-footer">
        <div class="model-badge" @click="$router.push('/models')">
          <span class="dot" :class="{ online: backendOnline }"></span>
          <span>{{ currentModelName }}</span>
        </div>
      </div>
    </aside>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { modelStatus } from '@/api/chat'

const backendOnline = ref(false)
const activeModel = ref('')
const modelName = ref('')

const currentModelName = computed(() => {
  if (!activeModel.value) return '加载中...'
  return modelName.value ? `${activeModel.value} · ${modelName.value}` : activeModel.value
})

async function loadModelStatus() {
  try {
    const res = await modelStatus()
    activeModel.value = res.activeModel
    backendOnline.value = !!res.activeModel
    modelName.value = res.modelName || ''
  } catch {
    backendOnline.value = false
  }
}

onMounted(() => {
  loadModelStatus()
  // 每 30s 刷新状态
  setInterval(loadModelStatus, 30000)
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --bg-primary: #0f1117;
  --bg-secondary: #161b22;
  --bg-tertiary: #1c2333;
  --border-color: #30363d;
  --text-primary: #e6edf3;
  --text-secondary: #8b949e;
  --accent: #58a6ff;
  --accent-hover: #79b8ff;
  --success: #3fb950;
  --danger: #f85149;
  --warning: #d29922;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  overflow: hidden;
}

.app-layout {
  display: flex;
  height: 100vh;
}

/* 侧边栏 */
.sidebar {
  width: 220px;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.sidebar-header {
  padding: 20px 16px;
  border-bottom: 1px solid var(--border-color);
}

.sidebar-header h1 {
  font-size: 18px;
  font-weight: 600;
}

.sidebar-header .subtitle {
  font-size: 12px;
  color: var(--text-secondary);
}

.nav-menu {
  flex: 1;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.15s;
}

.nav-item:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.nav-item.active {
  background: rgba(88, 166, 255, 0.12);
  color: var(--accent);
}

.nav-icon {
  font-size: 16px;
}

.sidebar-footer {
  padding: 12px 16px;
  border-top: 1px solid var(--border-color);
}

.model-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--bg-tertiary);
  border-radius: 8px;
  font-size: 12px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.15s;
}

.model-badge:hover {
  background: var(--border-color);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--danger);
}

.dot.online {
  background: var(--success);
  box-shadow: 0 0 6px rgba(63, 185, 80, 0.5);
}

/* 主内容区 */
.main-content {
  flex: 1;
  overflow: hidden;
}
</style>

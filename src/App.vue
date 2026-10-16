<template>
  <div class="app-root">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="header-inner">
        <div class="header-left">
          <router-link to="/" class="logo-link">
            <!-- 液态有机主义 Logo -->
            <div class="organic-logo-container">
              <!-- 主 blob 形态 -->
              <div class="organic-blob blob-primary"></div>
              <!-- 次要 blob -->
              <div class="organic-blob blob-secondary"></div>
              <!-- 装饰气泡 -->
              <div class="organic-bubble bubble-1"></div>
              <div class="organic-bubble bubble-2"></div>
              <div class="organic-bubble bubble-3"></div>
              <!-- 内核光点 -->
              <div class="organic-core"></div>
            </div>
            <!-- 品牌名称 -->
            <div class="brand-name">
              <span class="brand-primary">LC4J</span>
            </div>
          </router-link>
        </div>

        <div class="header-center">
          <nav class="nav-tabs">
            <router-link to="/" class="nav-tab" active-class="active">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              对话
            </router-link>
            <router-link to="/examples" class="nav-tab" active-class="active">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
              学习示例
            </router-link>
            <router-link to="/knowledge" class="nav-tab" active-class="active">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              知识库
            </router-link>
            <router-link to="/prompt" class="nav-tab" active-class="active">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              模板
            </router-link>
            <router-link to="/monitor" class="nav-tab" active-class="active">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              监控
            </router-link>
            <router-link to="/agent" class="nav-tab" active-class="active">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v4l3 3"/>
              </svg>
              Agent
            </router-link>
            <router-link to="/models" class="nav-tab" active-class="active">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              设置
            </router-link>
          </nav>
        </div>

        <div class="header-right">
          <div class="status-pill" :class="{ online: backendHealth }">
            <span class="pill-dot"></span>
            <span>{{ backendHealth ? '在线' : '离线' }}</span>
          </div>

          <!-- 用户信息 -->
          <div v-if="authStore.isLoggedIn" class="user-area">
            <div class="user-profile-dropdown">
              <button class="user-trigger" @click="toggleDropdown">
                <div class="user-avatar">
                  {{ (authStore.currentUser?.nickname || authStore.currentUser?.username || 'U').charAt(0).toUpperCase() }}
                </div>
              </button>

              <div v-show="showDropdown" class="dropdown-menu" ref="dropdownRef">
                <div class="dropdown-header">
                  <div class="user-avatar-large">
                    {{ (authStore.currentUser?.nickname || authStore.currentUser?.username || 'U').charAt(0).toUpperCase() }}
                  </div>
                  <div class="user-info">
                    <div class="user-name">{{ authStore.currentUser?.nickname || authStore.currentUser?.username }}</div>
                    <div class="user-email">{{ authStore.currentUser?.email }}</div>
                  </div>
                </div>

                <div class="dropdown-divider"></div>

                <a href="#" class="dropdown-item" @click.prevent="goToProfile">
                  <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>个人中心</span>
                </a>

                <a href="#" class="dropdown-item" @click.prevent="goToSettings">
                  <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m6 6l-3 3m3-3l3 3m-3-3l-3-3m3 3l3-3"/>
                  </svg>
                  <span>设置</span>
                </a>

                <div class="dropdown-divider"></div>

                <a href="#" class="dropdown-item logout-item" @click.prevent="authStore.logout">
                  <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="10 17 15 12 10 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  <span>退出登录</span>
                </a>
              </div>
            </div>
          </div>

          <!-- 未登录时显示登录按钮 -->
          <button v-else type="button" @click="authStore.showLogin" class="login-btn">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            <span>登录</span>
          </button>
        </div>
      </div>
    </header>

    <!-- 主体内容区 -->
    <main class="main-container">
      <router-view />
    </main>

    <!-- 认证弹窗 -->
    <AuthModal
      v-model="authStore.showModal"
      :initial-view="authStore.authMode"
      @login="handleLogin"
      @register="handleRegister"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { healthCheck } from '@/api/chat'
import AuthModal from '@/components/AuthModal.vue'
import { message } from 'ant-design-vue'

const authStore = useAuthStore()
const router = useRouter()
const backendHealth = ref(false)
const showDropdown = ref(false)
const dropdownRef = ref(null)

// 点击外部关闭下拉菜单
const handleClickOutside = (event) => {
  const isInsideDropdown = dropdownRef.value && dropdownRef.value.contains(event.target);
  const isTriggerButton = event.target.closest('.user-trigger') !== null;

  if (!isInsideDropdown && !isTriggerButton) {
    showDropdown.value = false;
  }
}

async function checkBackend() {
  try {
    await healthCheck()
    backendHealth.value = true
  } catch {
    backendHealth.value = false
  }
}

const handleLogin = () => {
  authStore.hideModal()
}

const handleRegister = async (credentials) => {
  const result = await authStore.register(credentials)
  if (result.success) {
    authStore.hideModal()
    message.success('注册成功！欢迎使用 LC4J')
  }
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const goToProfile = () => {
  router.push('/profile')
  showDropdown.value = false
}

const goToSettings = () => {
  router.push('/models')
  showDropdown.value = false
}

const handleAuthExpired = () => {
  // 强制清除登录态（即使 localStorage 里还有 token）
  authStore.clearSession()

  // 强制显示登录框
  authStore.authMode = 'login'
  authStore.showModal = true
}

// 立即注册事件监听器（不能放在 onMounted 中，因为 401 可能在挂载完成前发生）
if (typeof window !== 'undefined') {
  window.addEventListener('auth-expired', handleAuthExpired)
}

onMounted(async () => {
  await checkBackend()
  setInterval(checkBackend, 30000)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('auth-expired', handleAuthExpired)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.app-root {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f1f5f9;
  font-family: 'Outfit', 'Red Hat Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  width: 100vw;
  overflow: hidden;
}

/* ===== 顶部导航栏 ===== */
.header {
  height: 56px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);
}

.header-inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  max-width: 1920px;
  margin: 0 auto;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  padding: 4px 0;
}

/* ===== 液态有机主义 Logo ===== */
.organic-logo-container {
  position: relative;
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

/* 主 blob - 天空蓝 */
.organic-blob {
  position: absolute;
  border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
  animation: organic-morph 8s ease-in-out infinite;
}

.blob-primary {
  width: 38px;
  height: 38px;
  background: radial-gradient(circle at 35% 35%, #38bdf8, #0ea5e9, #075985);
  box-shadow:
    0 6px 20px rgba(14, 165, 233, 0.25),
    inset 0 2px 10px rgba(255, 255, 255, 0.15);
  animation-delay: 0s;
}

.blob-secondary {
  width: 32px;
  height: 32px;
  background: radial-gradient(circle at 65% 35%, #f472b6, #ec4899);
  opacity: 0.75;
  transform: translate(8px, -6px);
  box-shadow:
    0 4px 15px rgba(244, 114, 182, 0.3),
    inset 0 1px 8px rgba(255, 255, 255, 0.2);
  animation-delay: -2s;
  animation-duration: 10s;
}

/* 装饰气泡 */
.organic-bubble {
  position: absolute;
  border-radius: 50%;
  animation: bubble-float 6s ease-in-out infinite;
}

.bubble-1 {
  width: 8px;
  height: 8px;
  background: radial-gradient(circle at 40% 40%, #fcd34d, #f59e0b);
  top: 8px;
  right: 4px;
  box-shadow: 0 2px 8px rgba(252, 211, 77, 0.4);
  animation-delay: 0s;
}

.bubble-2 {
  width: 6px;
  height: 6px;
  background: radial-gradient(circle at 40% 40%, #a3e635, #84cc16);
  bottom: 6px;
  left: 2px;
  box-shadow: 0 2px 6px rgba(163, 230, 53, 0.35);
  animation-delay: -1s;
}

.bubble-3 {
  width: 5px;
  height: 5px;
  background: radial-gradient(circle at 40% 40%, #f9a8d4, #ec4899);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 1px 4px rgba(249, 168, 212, 0.3);
  animation-delay: -2s;
}

/* 内核光点 */
.organic-core {
  position: absolute;
  width: 12px;
  height: 12px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.4));
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  animation: core-glow 3s ease-in-out infinite;
}

/* 品牌名称 */
.brand-name {
  display: flex;
  flex-direction: column;
  z-index: 0;
}

.brand-primary {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #1e293b;
  font-family: 'Outfit', 'Red Hat Display', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  display: inline-block;
}

/* 柔和的文字装饰 */
.brand-primary::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #0ea5e9 0%, #f472b6 50%, #fcd34d 100%);
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.logo-link:hover .brand-primary::after {
  transform: scaleX(1);
}

/* 有机形态变形动画 */
@keyframes organic-morph {
  0%, 100% {
    border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    border-radius: 58% 42% 30% 70% / 55% 45% 55% 45%;
    transform: translate(2px, -1px) rotate(5deg);
  }
  50% {
    border-radius: 45% 55% 60% 40% / 50% 40% 60% 50%;
    transform: translate(-1px, 1px) rotate(-3deg);
  }
  75% {
    border-radius: 55% 45% 35% 65% / 52% 48% 52% 48%;
    transform: translate(1px, 2px) rotate(2deg);
  }
}

/* 气泡浮动动画 */
@keyframes bubble-float {
  0%, 100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(2px, -3px);
  }
  66% {
    transform: translate(-1px, 2px);
  }
}

/* 内核光点呼吸动画 */
@keyframes core-glow {
  0%, 100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.7;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

/* 悬停时的液态变形 */
.logo-link:hover .blob-primary {
  animation: liquid-expand 2s ease-in-out infinite;
}

.logo-link:hover .blob-secondary {
  animation: liquid-merge 2.5s ease-in-out infinite;
}

@keyframes liquid-expand {
  0%, 100% {
    border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
    transform: scale(1);
  }
  50% {
    border-radius: 35% 65% 55% 45% / 55% 35% 65% 45%;
    transform: scale(1.08);
  }
}

@keyframes liquid-merge {
  0%, 100% {
    opacity: 0.75;
    transform: translate(8px, -6px);
  }
  50% {
    opacity: 0.9;
    transform: translate(10px, -8px);
  }
}

.header-center {
  display: flex;
  align-items: center;
}

.nav-tabs {
  display: flex;
  align-items: center;
  gap: 2px;
  background: rgba(148, 163, 184, 0.08);
  padding: 3px;
  border-radius: 10px;
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 8px;
  color: #64748b;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.nav-tab:hover {
  color: #1e293b;
}

.nav-tab.active {
  background: #fff;
  color: #0ea5e9;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}

.nav-icon {
  width: 16px;
  height: 16px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 20px;
  background: rgba(239, 68, 68, 0.08);
  transition: all 0.3s ease;
  font-size: 12px;
  font-weight: 500;
  color: #ef4444;
}

.status-pill.online {
  background: rgba(16, 185, 129, 0.08);
  color: #10b981;
}

.pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ef4444;
  transition: background 0.3s ease;
}

.status-pill.online .pill-dot {
  background: #10b981;
  animation: pill-pulse 2s ease-in-out infinite;
}

@keyframes pill-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.main-container {
  flex: 1;
  overflow: hidden;
  display: flex;
  background: #f1f5f9;
  width: 100%;
}

/* 用户下拉菜单样式 */
.user-profile-dropdown {
  position: relative;
  display: inline-block;
}

.user-trigger {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-trigger:hover {
  background-color: rgba(148, 163, 184, 0.15);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  min-width: 260px;
  z-index: 1000;
  overflow: hidden;
  transform-origin: top right;
  animation: dropdownSlideIn 0.2s ease-out forwards;
}

@keyframes dropdownSlideIn {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.dropdown-header {
  display: flex;
  align-items: center;
  padding: 16px;
  background: linear-gradient(135deg, #f0f9ff, #fce7f3);
  border-bottom: 1px solid #e2e8f0;
}

.user-avatar-large {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0ea5e9, #ec4899);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 18px;
  margin-right: 12px;
}

.user-info {
  flex: 1;
}

.user-name {
  font-weight: 600;
  color: #1e293b;
  font-size: 15px;
  margin-bottom: 2px;
}

.user-email {
  font-size: 13px;
  color: #64748b;
}

.dropdown-divider {
  height: 1px;
  background: #e2e8f0;
  margin: 8px 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  text-decoration: none;
  color: #334155;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s ease;
}

.dropdown-item:hover {
  background-color: #f1f5f9;
  color: #1e293b;
}

.dropdown-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.logout-item {
  color: #ef4444 !important;
}

.logout-item:hover {
  background-color: #fee2e2 !important;
  color: #dc2626 !important;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0ea5e9, #ec4899);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
}

.login-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: linear-gradient(135deg, #0ea5e9, #ec4899);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.login-btn:hover {
  background: linear-gradient(135deg, #0284c7, #db2777);
  transform: translateY(-1px);
}

.btn-icon {
  width: 16px;
  height: 16px;
}

@media (max-width: 1024px) {
  .header-inner { padding: 0 12px; }
  .nav-tab span { display: none; }
}
</style>

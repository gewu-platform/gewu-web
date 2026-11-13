<template>
  <a-config-provider :locale="antdLocale">
  <div class="app-root">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="header-inner">
        <div class="header-left">
          <router-link to="/" class="logo-link">
            <!-- 品牌标：观察熊猫（格物致知 · 竹芽生长） -->
            <span class="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 256 256" fill="none">
                <circle cx="64" cy="64" r="30" fill="var(--nav)"/>
                <circle cx="192" cy="64" r="30" fill="var(--nav)"/>
                <path fill="var(--nav)" fill-rule="evenodd" d="M40 146a88 88 0 1 0 176 0a88 88 0 1 0 -176 0 M56 146a72 72 0 1 0 144 0a72 72 0 1 0 -144 0"/>
                <path fill="var(--accent-600)" d="M120 52 C 108 48, 94 40, 84 24 C 100 30, 114 40, 120 52 Z"/>
                <path fill="var(--accent-600)" d="M136 52 C 148 48, 162 40, 172 24 C 156 30, 142 40, 136 52 Z"/>
                <path fill="var(--nav)" fill-rule="evenodd" d="M78 117a17 17 0 0 1 17-17h6a17 17 0 0 1 17 17v28a17 17 0 0 1-17 17h-6a17 17 0 0 1-17-17z M89.5 130a8.5 8.5 0 1 0 17 0a8.5 8.5 0 1 0 -17 0"/>
                <path fill="var(--nav)" fill-rule="evenodd" d="M138 117a17 17 0 0 1 17-17h6a17 17 0 0 1 17 17v28a17 17 0 0 1-17 17h-6a17 17 0 0 1-17-17z M149.5 130a8.5 8.5 0 1 0 17 0a8.5 8.5 0 1 0 -17 0"/>
                <ellipse cx="128" cy="177" rx="10" ry="8" fill="var(--nav)"/>
              </svg>
            </span>
            <!-- 品牌名称 -->
            <div class="brand-name">
              <span class="brand-primary">Gewu</span>
            </div>
          </router-link>
        </div>

        <div class="header-center">
          <nav class="nav-tabs">
            <router-link to="/" class="nav-tab" active-class="active">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              {{ $t('nav.chat') }}
            </router-link>
            <router-link to="/knowledge" class="nav-tab" active-class="active">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              {{ $t('nav.knowledge') }}
            </router-link>
            <router-link to="/prompt" class="nav-tab" active-class="active">
              <DocIcon class="nav-icon" variant="lines" />
              {{ $t('nav.prompt') }}
            </router-link>
            <router-link to="/monitor" class="nav-tab" active-class="active">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              {{ $t('nav.monitor') }}
            </router-link>
            <router-link v-if="authStore.isAdmin" to="/agent" class="nav-tab" active-class="active">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v4l3 3"/>
              </svg>
              {{ $t('nav.agent') }}
            </router-link>
            <router-link to="/settings" class="nav-tab" active-class="active">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              {{ $t('nav.settings') }}
            </router-link>
          </nav>
        </div>

        <div class="header-right">
          <div class="status-pill" :class="{ online: backendHealth }">
            <span class="pill-dot"></span>
            <span>{{ backendHealth ? $t('header.online') : $t('header.offline') }}</span>
          </div>

          <!-- V2.6.0 i18n：语言切换器 -->
          <div class="locale-switch">
            <button
              class="locale-btn"
              :class="{ active: currentLocale === 'zh-CN' }"
              @click="switchLocale('zh-CN')"
            >中</button>
            <span class="locale-sep">/</span>
            <button
              class="locale-btn"
              :class="{ active: currentLocale === 'en-US' }"
              @click="switchLocale('en-US')"
            >EN</button>
          </div>

          <!-- P18 暗色模式：主题切换（浅色/深色/跟随系统 循环） -->
          <button class="theme-btn" :title="$t('header.theme.' + theme)" @click="cycleTheme" aria-label="theme">
            <svg v-if="theme === 'light'" class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            <svg v-else-if="theme === 'dark'" class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            <svg v-else class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </button>

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
  </a-config-provider>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { healthCheck } from '@/api/chat'
import { useI18n } from 'vue-i18n'
import DocIcon from '@/components/icons/DocIcon.vue'
import { setLocale, currentLocale as getLocale } from '@/i18n'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US'
import { computed } from 'vue'
import AuthModal from '@/components/AuthModal.vue'
import { message } from 'ant-design-vue'
import { useTheme } from '@/composables/useTheme'

const authStore = useAuthStore()
const { t: tFn } = useI18n()
const currentLocale = ref(getLocale())
const antdLocale = computed(() => currentLocale.value === 'zh-CN' ? zhCN : enUS)
function switchLocale(loc) {
  setLocale(loc)
  currentLocale.value = loc
}
const router = useRouter()
// P18 暗色模式：三态主题（light/dark/system），详见 composables/useTheme.js
const { theme, cycle: cycleTheme } = useTheme()
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
    message.success('注册成功！欢迎使用 Gewu')
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
  router.push('/settings')
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

<style>
/* ===== 全局 CSS 变量（Gewu 浅色液态有机风）=====
   ChatView 等视图引用 var(--)，此前未定义导致按钮透明/边框丢失 */
:root {
  /* ============================================================
     格物 Gewu 设计令牌 v2（V2.7.0 设计系统化）
     结构参考 FastGPT 设计体系：完整色阶 / 品牌色相阴影 / 刻度化尺寸
     品牌性格保留：藏青导航 + 几何「格」标识
     ============================================================ */

  /* ---------- 品牌色阶（primary var(--accent-600)） ---------- */
  --accent-50:  #F0F4FF;
  --accent-100: #E1EAFF;
  --accent-200: #C5D7FF;
  --accent-300: #94B5FF;
  --accent-400: #5E8FFF;
  --accent-500: #487FFF;
  --accent-600: #3370FF;
  --accent-700: #2B5FD9;
  --accent-800: #2450B5;
  --accent-900: #1D4091;

  /* 品牌色透明档：hover 底 / 边框 / 聚焦环 */
  --accent-a1: rgba(var(--accent-rgb), 0.1);
  --accent-a3: rgba(var(--accent-rgb), 0.3);
  --accent-a5: rgba(var(--accent-rgb), 0.5);
  --accent-a7: rgba(var(--accent-rgb), 0.7);

  /* ---------- 语义主色（兼容既有引用） ---------- */
  --accent: var(--accent-600);
  --accent-hover: var(--accent-700);
  --accent-primary: var(--accent-600);
  --accent-soft: var(--accent-50);

  /* ---------- 导航（品牌性格保留） ---------- */
  --nav: #1E3A5F;
  --nav-hover: #16304F;

  /* ---------- 背景与表面 ---------- */
  --bg-primary: #F6F8F9;
  --bg-secondary: #ffffff;
  --bg-tertiary: #F4F6F8;
  --header-bg: rgba(255, 255, 255, 0.85);

  /* ---------- 中性灰阶 ---------- */
  --text-900: #111824;
  --text-800: #1D2532;
  --text-700: #383F50;
  --text-600: #485264;
  --text-500: #667085;
  --text-400: #8A95A7;
  --text-300: var(--border-high);
  --text-200: #E8EBF0;

  --text-primary: var(--text-800);
  --text-secondary: var(--text-500);
  --text-tertiary: var(--text-400);

  /* ---------- 边框三级 ---------- */
  --border-low: #E8EBF0;
  --border-base: #DFE2EA;
  --border-high: #C4CBD7;
  --border-color: var(--border-base);

  /* ---------- 状态色 ---------- */
  --success: #12B76A;
  --success-soft: #EDFBF3;
  --danger: #D92D20;
  --danger-soft: #FEF3F2;
  --warning: #F79009;
  --warning-soft: #FFFAEB;

  /* ---------- RGB 三元组（rgba(<rgb 三元组变量>, α) 形式引用） ---------- */
  --accent-rgb: 51, 112, 255;
  --warning-rgb: 247, 144, 9;
  --success-rgb: 18, 183, 106;
  --danger-rgb: 217, 45, 32;
  --text-400-rgb: 138, 149, 167;
  --module-violet-rgb: 139, 92, 246;

  /* ---------- 模块识别色（与 design/palette.js 对齐） ---------- */
  --module-indigo: #6366F1;
  --module-indigo-rgb: 99, 102, 241;

  /* ---------- 圆角刻度 ---------- */
  --radius-xs: 0.25rem;
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-semilg: 0.625rem;
  --radius-lg: 0.75rem;
  --radius-mdlg: 0.875rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.25rem;

  /* ---------- 间距刻度（4px 基数） ---------- */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;

  /* ---------- 阴影刻度（品牌色相） ---------- */
  --shadow-1: 0 1px 2px 0 rgba(19, 51, 107, 0.05), 0 0 1px 0 rgba(19, 51, 107, 0.08);
  --shadow-2: 0 4px 4px 0 rgba(19, 51, 107, 0.05), 0 0 1px 0 rgba(19, 51, 107, 0.08);
  --shadow-3: 0 4px 10px 0 rgba(19, 51, 107, 0.08), 0 0 1px 0 rgba(19, 51, 107, 0.08);
  --shadow-4: 0 12px 16px -4px rgba(19, 51, 107, 0.2), 0 0 1px 0 rgba(19, 51, 107, 0.2);
  --shadow-5: 0 20px 24px -8px rgba(19, 51, 107, 0.15), 0 0 1px 0 rgba(19, 51, 107, 0.15);
  --shadow-6: 0 24px 48px -12px rgba(19, 51, 107, 0.2), 0 0 1px 0 rgba(19, 51, 107, 0.2);
  --shadow-7: 0 32px 64px -12px rgba(19, 51, 107, 0.2), 0 0 1px 0 rgba(19, 51, 107, 0.2);
  --shadow-focus: 0 0 0 3px rgba(var(--accent-rgb), 0.15);

  /* ---------- 按钮尺寸刻度 ---------- */
  --btn-h-xs: 24px;
  --btn-h-sm: 32px;
  --btn-h-md: 36px;
  --btn-h-lg: 40px;

  /* ---------- 字体栈（含中文，移除未加载的 Web 字体） ---------- */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑',
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
  --font-mono: 'SF Mono', 'Cascadia Code', Consolas, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
}

/* ============================================================
   P18 暗色模式令牌表（html[data-theme="dark"]）
   浅色为默认；暗色覆盖语义令牌，中间档翻转后语义别名自动跟随
   ============================================================ */
[data-theme='dark'] {
  --header-bg: rgba(13, 18, 28, 0.85);

  --bg-primary: #121926;
  --bg-secondary: #1A2332;
  --bg-tertiary: #0C111B;

  --text-900: #F2F5F9;
  --text-800: #E8EBF0;
  --text-700: #C9D1DC;
  --text-600: #A8B3C2;
  --text-500: #8A95A7;
  --text-400: #667085;
  --text-300: #4A5568;
  --text-200: #2A3444;

  --border-low: #232D3E;
  --border-base: #2C3850;
  --border-high: #3A4759;

  --nav: #E8EBF0;
  --accent-hover: var(--accent-400);
  --accent-soft: rgba(var(--accent-rgb), 0.16);
  --success-soft: rgba(var(--success-rgb), 0.14);
  --danger-soft: rgba(var(--danger-rgb), 0.14);
  --warning-soft: rgba(var(--warning-rgb), 0.14);

  --shadow-1: 0 1px 2px 0 rgba(0, 0, 0, 0.4), 0 0 1px 0 rgba(0, 0, 0, 0.5);
  --shadow-2: 0 4px 4px 0 rgba(0, 0, 0, 0.35), 0 0 1px 0 rgba(0, 0, 0, 0.5);
  --shadow-3: 0 4px 10px 0 rgba(0, 0, 0, 0.4), 0 0 1px 0 rgba(0, 0, 0, 0.5);
  --shadow-4: 0 12px 16px -4px rgba(0, 0, 0, 0.5), 0 0 1px 0 rgba(0, 0, 0, 0.5);
  --shadow-5: 0 20px 24px -8px rgba(0, 0, 0, 0.45), 0 0 1px 0 rgba(0, 0, 0, 0.5);
  --shadow-6: 0 24px 48px -12px rgba(0, 0, 0, 0.5), 0 0 1px 0 rgba(0, 0, 0, 0.5);
  --shadow-7: 0 32px 64px -12px rgba(0, 0, 0, 0.5), 0 0 1px 0 rgba(0, 0, 0, 0.5);
  --shadow-focus: 0 0 0 3px rgba(var(--accent-rgb), 0.25);

  /* ---------- antd 组件暗色适配（v3 编译产物无变量，按组件覆盖） ---------- */
  .ant-input,
  .ant-input-number,
  .ant-input-affix-wrapper,
  .ant-select-selector,
  textarea.ant-input {
    background-color: var(--bg-secondary);
    border-color: var(--border-base);
    color: var(--text-800);
  }
  .ant-input::placeholder,
  .ant-select-selection-placeholder { color: var(--text-400); }
  .ant-select-arrow { color: var(--text-400); }
  .ant-select-dropdown { background-color: var(--bg-secondary); }
  .ant-select-item { color: var(--text-700); }
  .ant-select-item-option-active:not(.ant-select-item-option-selected) { background: rgba(var(--accent-rgb), 0.12); }
  .ant-select-item-option-selected { background: rgba(var(--accent-rgb), 0.2); }
  .ant-modal-content,
  .ant-modal-header { background-color: var(--bg-secondary); }
  .ant-modal-title,
  .ant-modal-close-x { color: var(--text-800); }
  .ant-form-item-label > label { color: var(--text-600); }
  .ant-table { background: transparent; color: var(--text-800); }
  .ant-table-thead > tr > th { background: var(--bg-tertiary); color: var(--text-600); }
  .ant-checkbox-inner,
  .ant-radio-inner { background-color: var(--bg-secondary); border-color: var(--border-base); }
  .ant-btn-default { background-color: var(--bg-secondary); border-color: var(--border-base); color: var(--text-800); }
  .ant-slider-rail { background: var(--border-base); }
  .ant-tooltip-inner { background-color: var(--bg-secondary); color: var(--text-800); }
}
</style>

<style scoped>
.app-root {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-tertiary);
  font-family: var(--font-sans);
  width: 100vw;
  overflow: hidden;
}

/* ===== 顶部导航栏 ===== */
.header {
  height: 56px;
  background: var(--header-bg);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(var(--text-400-rgb), 0.1);
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
/* ===== 品牌标：观察熊猫（Panda v5，格物致知） ===== */
.brand-mark {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.brand-mark svg {
  width: 100%;
  height: 100%;
  display: block;
}

.logo-link:hover .brand-mark {
  transform: scale(1.06);
}

.brand-name {
  display: flex;
  flex-direction: column;
  z-index: 0;
}

.brand-primary {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: var(--text-800);
  font-family: var(--font-sans);
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
  background: linear-gradient(90deg, var(--accent-600) 0%, #5B8DFF 100%);
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.logo-link:hover .brand-primary::after {
  transform: scaleX(1);
}






.header-center {
  display: flex;
  align-items: center;
}

.nav-tabs {
  display: flex;
  align-items: center;
  gap: 2px;
  background: rgba(var(--text-400-rgb), 0.08);
  padding: 3px;
  border-radius: var(--radius-semilg);
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.nav-tab:hover {
  color: var(--text-800);
}

.nav-tab.active {
  background: var(--bg-secondary);
  color: var(--accent-600);
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

/* V2.6.0 i18n：语言切换器 */
.locale-switch {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  margin-right: 10px;
  padding: 2px 6px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-semilg);
  background: transparent;
}
.locale-btn {
  border: none;
  background: transparent;
  padding: 2px 8px;
  border-radius: var(--radius-md);
  font-size: 12px;
  color: var(--text-secondary, var(--text-secondary));
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover { color: var(--accent-600); }
  &.active {
    background: var(--accent-600);
    color: #fff;
  }
}
.locale-sep {
  color: var(--border-color);
  font-size: 11px;
}

.theme-btn {
  border: none;
  background: transparent;
  padding: 4px 8px;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  &:hover { color: var(--accent-600); }
}
.theme-icon { width: 16px; height: 16px; display: block; }

.status-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: var(--radius-2xl);
  background: rgba(var(--danger-rgb), 0.08);
  transition: all 0.3s ease;
  font-size: 12px;
  font-weight: 500;
  color: var(--danger);
}

.status-pill.online {
  background: rgba(var(--success-rgb), 0.08);
  color: var(--success);
}

.pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--danger);
  transition: background 0.3s ease;
}

.status-pill.online .pill-dot {
  background: var(--success);
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
  background: var(--bg-tertiary);
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
  background-color: rgba(var(--text-400-rgb), 0.15);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
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
  background: var(--accent-soft);
  border-bottom: 1px solid var(--border-base);
}

.user-avatar-large {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-600), var(--accent-700));
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
  color: var(--text-800);
  font-size: 15px;
  margin-bottom: 2px;
}

.user-email {
  font-size: 13px;
  color: var(--text-secondary);
}

.dropdown-divider {
  height: 1px;
  background: var(--bg-tertiary);
  margin: 8px 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  text-decoration: none;
  color: var(--text-700);
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s ease;
}

.dropdown-item:hover {
  background: var(--bg-tertiary);
  color: var(--text-800);
}

.dropdown-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.logout-item {
  color: var(--danger) !important;
}

.logout-item:hover {
  background-color: #fee2e2 !important;
  color: var(--danger) !important;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-600), var(--accent-700));
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
  background: linear-gradient(135deg, var(--accent-600), var(--accent-700));
  color: white;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.login-btn:hover {
  background: var(--accent-hover);
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

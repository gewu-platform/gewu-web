import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { message } from 'ant-design-vue'
import { login as loginApi, register as registerApi, getCurrentUser, logout as logoutApi } from '@/api/chat'

export const useAuthStore = defineStore('auth', () => {
  // State
  const isAuthenticated = ref(false)
  const user = ref(null)
  const token = ref(null)
  const refreshToken = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const showModal = ref(false)
  const authMode = ref('login')
  const autoShowLoginAttempted = ref(false)

  // Computed
  const isLoggedIn = computed(() => isAuthenticated.value)
  const currentUser = computed(() => user.value)
  const authToken = computed(() => token.value)
  const hasError = computed(() => !!error.value)

  // Actions
  async function login(credentials) {
    loading.value = true
    error.value = null

    try {
      const response = await loginApi(
        credentials.username || credentials.email,
        credentials.password
      )

      // R<T> 格式: { code: 200, message: "xxx", data: { token, refreshToken, user } }
      if (response.code === 200 && response.data) {
        const { token: newToken, refreshToken: newRefreshToken, user: userInfo } = response.data

        isAuthenticated.value = true
        user.value = userInfo
        token.value = newToken
        refreshToken.value = newRefreshToken

        localStorage.setItem('auth-token', token.value)
        if (refreshToken.value) {
          localStorage.setItem('auth-refresh-token', refreshToken.value)
        }
        localStorage.setItem('user', JSON.stringify(user.value))

        message.success(response.message || '登录成功！')
        return { success: true }
      } else {
        error.value = response.message || '登录失败'
        message.error(error.value)
        return { success: false, error: error.value }
      }
    } catch (err) {
      if (err.isAuthError) return { success: false, error: err.message }
      error.value = err.message || '登录失败'
      message.error('登录失败: ' + error.value)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  async function register(credentials) {
    loading.value = true
    error.value = null

    try {
      const response = await registerApi(
        credentials.username || credentials.email.split('@')[0],
        credentials.email,
        credentials.password
      )

      if (response.code === 200 && response.data) {
        const { token: newToken, refreshToken: newRefreshToken, user: userInfo } = response.data

        isAuthenticated.value = true
        user.value = userInfo
        token.value = newToken
        refreshToken.value = newRefreshToken

        localStorage.setItem('auth-token', token.value)
        if (refreshToken.value) {
          localStorage.setItem('auth-refresh-token', refreshToken.value)
        }
        localStorage.setItem('user', JSON.stringify(user.value))

        message.success(response.message || '注册成功！')
        return { success: true }
      } else {
        error.value = response.message || '注册失败'
        message.error(error.value)
        return { success: false, error: error.value }
      }
    } catch (err) {
      if (err.isAuthError) return { success: false, error: err.message }
      error.value = err.message || '注册失败'
      message.error('注册失败: ' + error.value)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      await logoutApi()
    } catch {
      // 后端登出失败不阻塞前端清理
    }
    clearSession()
    message.success('已退出登录')
  }

  /**
   * 清除登录态（不弹提示，用于 token 过期场景）
   */
  function clearSession() {
    isAuthenticated.value = false
    user.value = null
    token.value = null
    refreshToken.value = null

    localStorage.removeItem('auth-token')
    localStorage.removeItem('auth-refresh-token')
    localStorage.removeItem('user')
  }

  function checkAuthStatus() {
    const storedToken = localStorage.getItem('auth-token')
    const storedUser = localStorage.getItem('user')
    const storedRefreshToken = localStorage.getItem('auth-refresh-token')

    if (storedToken && storedUser) {
      token.value = storedToken
      refreshToken.value = storedRefreshToken
      user.value = JSON.parse(storedUser)
      isAuthenticated.value = true
    }
  }

  function showLogin() {
    if (!showModal.value) {
      authMode.value = 'login'
      showModal.value = true
    }
  }

  function showRegister() {
    if (!showModal.value) {
      authMode.value = 'register'
      showModal.value = true
    }
  }

  function hideModal() {
    showModal.value = false
    autoShowLoginAttempted.value = false
  }

  function clearError() {
    error.value = null
  }

  function smartShowLogin() {
    if (!autoShowLoginAttempted.value && !isAuthenticated.value) {
      autoShowLoginAttempted.value = true
      showLogin()
    }
  }

  function resetAutoShowFlag() {
    autoShowLoginAttempted.value = false
  }

  checkAuthStatus()

  return {
    // State
    isAuthenticated,
    user,
    token,
    refreshToken,
    loading,
    error,
    showModal,
    authMode,
    autoShowLoginAttempted,

    // Computed
    isLoggedIn,
    currentUser,
    authToken,
    hasError,

    // Actions
    login,
    register,
    logout,
    clearSession,
    checkAuthStatus,
    showLogin,
    showRegister,
    hideModal,
    clearError,
    smartShowLogin,
    resetAutoShowFlag
  }
})

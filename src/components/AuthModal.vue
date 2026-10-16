<template>
  <a-modal
    v-model:visible="visible"
    :footer="null"
    :closable="true"
    :maskClosable="true"
    :mask="true"
    width="400px"
    centered
    @cancel="handleCancel"
    class="auth-modal"
    wrap-class-name="auth-modal-wrapper"
  >
    <div class="auth-container">
      <!-- Header -->
      <div class="auth-header">
        <div class="logo-wrapper">
          <svg class="auth-logo" viewBox="0 0 48 48" fill="none">
            <defs>
              <linearGradient id="lc4jLogoGrad" x1="0" y1="0" x2="48" y2="48">
                <stop offset="0%" stop-color="#0ea5e9"/>
                <stop offset="100%" stop-color="#ec4899"/>
              </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="20" stroke="url(#lc4jLogoGrad)" stroke-width="2.5"/>
            <path d="M16 24 Q24 16 32 24 Q24 32 16 24Z" fill="url(#lc4jLogoGrad)"/>
          </svg>
        </div>
        <h2 class="auth-title">{{ currentView === 'login' ? '欢迎回来' : '创建账户' }}</h2>
        <p class="auth-subtitle">
          {{ currentView === 'login'
            ? '请输入您的账号密码以继续'
            : '创建新账户以解锁全部功能' }}
        </p>
      </div>

      <!-- Form -->
      <div class="auth-form">
        <form @submit.prevent="handleSubmit">
          <!-- Username Field -->
          <div class="form-group">
            <label class="form-label">用户名</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <input
                v-model="formData.username"
                :placeholder="currentView === 'login' ? '用户名或邮箱' : '用户名'"
                class="auth-input"
                @blur="validateField('username')"
                type="text"
              />
            </div>
            <span v-if="errors.username" class="error-msg">{{ errors.username }}</span>
          </div>

          <!-- Email Field (register only) -->
          <div v-if="currentView === 'register'" class="form-group">
            <label class="form-label">邮箱</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <input
                v-model="formData.email"
                placeholder="邮箱地址"
                class="auth-input"
                @blur="validateField('email')"
                type="email"
              />
            </div>
            <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
          </div>

          <!-- Password Field -->
          <div class="form-group">
            <label class="form-label">密码</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input
                v-model="formData.password"
                placeholder="密码"
                class="auth-input"
                @blur="validateField('password')"
                :type="showPassword ? 'text' : 'password'"
              />
              <button type="button" class="toggle-pw" @click="showPassword = !showPassword">
                <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </button>
            </div>
            <span v-if="errors.password" class="error-msg">{{ errors.password }}</span>
          </div>

          <!-- Confirm Password (register only) -->
          <div v-if="currentView === 'register'" class="form-group">
            <label class="form-label">确认密码</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <input
                v-model="formData.confirmPassword"
                placeholder="再次输入密码"
                class="auth-input"
                @blur="validateField('confirmPassword')"
                :type="showPassword ? 'text' : 'password'"
              />
            </div>
            <span v-if="errors.confirmPassword" class="error-msg">{{ errors.confirmPassword }}</span>
          </div>

          <!-- Options Row (login only) -->
          <div v-if="currentView === 'login'" class="auth-options">
            <label class="remember-checkbox">
              <input type="checkbox" v-model="rememberMe" class="checkbox" />
              <span class="checkmark"></span>
              <span>记住我</span>
            </label>
            <a class="forgot-link" @click="handleForgotPassword">忘记密码？</a>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="auth-button"
          >
            <span v-if="loading" class="spinner"></span>
            {{ currentView === 'login' ? '登录' : '注册' }}
          </button>

          <!-- Switch View -->
          <div class="switch-view">
            <span class="switch-text">
              {{ currentView === 'login' ? '还没有账户？' : '已有账户？' }}
              <a @click="toggleView" class="switch-link">
                {{ currentView === 'login' ? '立即注册' : '立即登录' }}
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { message } from 'ant-design-vue'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  initialView: { type: String, default: 'login' }
})

const emit = defineEmits(['update:modelValue', 'login', 'register'])

const authStore = useAuthStore()

const visible = ref(props.modelValue)
const currentView = ref(props.initialView)
const loading = ref(false)
const rememberMe = ref(false)
const showPassword = ref(false)

const formData = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

watch(() => props.modelValue, (newVal) => {
  visible.value = newVal
  if (newVal) {
    currentView.value = props.initialView
    Object.keys(formData).forEach(key => formData[key] = '')
    Object.keys(errors).forEach(key => errors[key] = '')
  }
})

watch(visible, (newVal) => {
  emit('update:modelValue', newVal)
})

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const validateField = (field) => {
  switch (field) {
    case 'username':
      if (!formData.username) errors.username = '请输入用户名'
      else if (formData.username.length < 2) errors.username = '用户名至少2个字符'
      else errors.username = ''
      break
    case 'email':
      if (currentView.value === 'register') {
        if (!formData.email) errors.email = '请输入邮箱地址'
        else if (!validateEmail(formData.email)) errors.email = '请输入有效的邮箱地址'
        else errors.email = ''
      }
      break
    case 'password':
      if (!formData.password) errors.password = '请输入密码'
      else if (formData.password.length < 6) errors.password = '密码至少需要6个字符'
      else errors.password = ''
      break
    case 'confirmPassword':
      if (currentView.value === 'register') {
        if (!formData.confirmPassword) errors.confirmPassword = '请确认密码'
        else if (formData.password !== formData.confirmPassword) errors.confirmPassword = '两次输入的密码不一致'
        else errors.confirmPassword = ''
      }
      break
  }
}

const validateForm = () => {
  validateField('username')
  validateField('password')
  if (currentView.value === 'register') {
    validateField('email')
    validateField('confirmPassword')
  }
  return !Object.values(errors).some(e => e)
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  try {
    if (currentView.value === 'login') {
      const result = await authStore.login({
        username: formData.username,
        password: formData.password
      })
      if (result.success) {
        emit('login', formData)
        emit('update:modelValue', false)
      }
    } else {
      const result = await authStore.register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      })
      if (result.success) {
        emit('register', formData)
        emit('update:modelValue', false)
      }
    }
  } catch (error) {
    message.error(currentView.value === 'login' ? '登录失败: ' + error.message : '注册失败: ' + error.message)
  } finally {
    loading.value = false
  }
}

const toggleView = () => {
  currentView.value = currentView.value === 'login' ? 'register' : 'login'
  Object.keys(formData).forEach(key => formData[key] = '')
  Object.keys(errors).forEach(key => errors[key] = '')
}

const handleCancel = () => {
  emit('update:modelValue', false)
}

const handleForgotPassword = () => {
  message.info('请联系管理员重置密码')
}
</script>

<style scoped>
.auth-modal :deep(.ant-modal-content) {
  border-radius: 16px;
  padding: 0;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.auth-modal :deep(.ant-modal-body) {
  padding: 0;
}

.auth-modal :deep(.ant-modal-close) {
  color: #94a3b8;
}

.auth-modal :deep(.ant-modal-close:hover) {
  color: #0ea5e9;
}

.auth-container {
  padding: 36px 32px 32px;
}

/* Header */
.auth-header {
  text-align: center;
  margin-bottom: 28px;
}

.logo-wrapper {
  display: inline-block;
  margin-bottom: 16px;
}

.auth-logo {
  width: 48px;
  height: 48px;
  display: block;
  margin: 0 auto;
}

.auth-title {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 6px 0;
  letter-spacing: -0.3px;
}

.auth-subtitle {
  font-size: 13px;
  color: #94a3b8;
  margin: 0;
}

/* Form */
.auth-form {
  width: 100%;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  margin-bottom: 6px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  width: 18px;
  height: 18px;
  color: #94a3b8;
  pointer-events: none;
  z-index: 1;
}

.auth-input {
  width: 100%;
  height: 44px;
  padding: 0 14px 0 44px;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  color: #1e293b;
  background: #fff;
  transition: all 0.2s ease;
  outline: none;
  font-family: inherit;
}

.auth-input:hover {
  border-color: #bae6fd;
}

.auth-input:focus {
  border-color: #0ea5e9;
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.08);
}

.auth-input::placeholder {
  color: #cbd5e1;
}

.toggle-pw {
  position: absolute;
  right: 12px;
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  cursor: pointer;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: color 0.2s ease;
}

.toggle-pw:hover {
  color: #0ea5e9;
}

.toggle-pw svg {
  width: 18px;
  height: 18px;
}

.error-msg {
  display: block;
  font-size: 12px;
  color: #ef4444;
  margin-top: 4px;
}

/* Options */
.auth-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.remember-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 13px;
  color: #64748b;
  user-select: none;
}

.remember-checkbox .checkbox {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border-radius: 5px;
  border: 1.5px solid #d1d5db;
  display: inline-block;
  position: relative;
  transition: all 0.15s ease;
}

.remember-checkbox .checkbox:checked + .checkmark {
  background: #0ea5e9;
  border-color: #0ea5e9;
}

.remember-checkbox .checkbox:checked + .checkmark::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 1px;
  width: 5px;
  height: 10px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.forgot-link {
  font-size: 13px;
  color: #0ea5e9;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: #0284c7;
}

/* Submit Button */
.auth-button {
  width: 100%;
  height: 46px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #0ea5e9, #ec4899);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
  font-family: inherit;
}

.auth-button:hover:not(:disabled) {
  box-shadow: 0 6px 20px rgba(14, 165, 233, 0.35);
  transform: translateY(-1px);
}

.auth-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Switch View */
.switch-view {
  text-align: center;
}

.switch-text {
  font-size: 13px;
  color: #94a3b8;
}

.switch-link {
  color: #0ea5e9;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease;
}

.switch-link:hover {
  color: #0284c7;
}
</style>

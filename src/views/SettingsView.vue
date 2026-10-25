<template>
  <div class="settings-view">
    <div class="settings-shell">
      <!-- 左侧导航 -->
      <aside class="settings-nav">
        <div class="nav-header">
          <div class="nav-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </div>
          <div class="nav-title-group">
            <span class="nav-title">设置</span>
            <span class="nav-subtitle">偏好与配置</span>
          </div>
        </div>

        <nav class="nav-list">
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="nav-item"
            :class="{ active: activeCategory === cat.id }"
            @click="scrollToSection(cat.id)"
          >
            <div class="nav-item-icon" :style="`background: ${cat.color}15; color: ${cat.color}`">
              <svg v-if="cat.id === 'section-account'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <svg v-if="cat.id === 'section-model'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="4" y="4" width="16" height="16" rx="2"/>
                <rect x="9" y="9" width="6" height="6"/>
                <line x1="9" y1="1" x2="9" y2="4"/>
                <line x1="15" y1="1" x2="15" y2="4"/>
                <line x1="9" y1="20" x2="9" y2="23"/>
                <line x1="15" y1="20" x2="15" y2="23"/>
                <line x1="20" y1="9" x2="23" y2="9"/>
                <line x1="20" y1="14" x2="23" y2="14"/>
                <line x1="1" y1="9" x2="4" y2="9"/>
                <line x1="1" y1="14" x2="4" y2="14"/>
              </svg>
              <svg v-if="cat.id === 'section-data'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <ellipse cx="12" cy="5" rx="9" ry="3"/>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
              </svg>
            </div>
            <span class="nav-item-label">{{ cat.label }}</span>
            <svg class="nav-item-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
              <polyline points="6 4 10 8 6 12"/>
            </svg>
          </button>
        </nav>
      </aside>

      <!-- 右侧内容区 -->
      <div class="settings-content">
        <div class="settings-scroll" ref="contentRef">
          <div class="settings-content-inner">

            <!-- 账户设置 -->
            <section class="settings-section" id="section-account">
              <div class="section-heading">
                <div class="section-icon" style="background: linear-gradient(135deg, #6366F1, #8B5CF6)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div>
                  <h2 class="section-title">账户设置</h2>
                  <p class="section-desc">管理您的账户信息</p>
                </div>
              </div>

              <div class="settings-panel">
                <div class="panel-field">
                  <div class="field-label-row">
                    <label class="field-label">用户名</label>
                  </div>
                  <a-input
                    :value="accountInfo.username"
                    placeholder="未登录"
                    size="large"
                    class="field-input"
                    disabled
                  />
                </div>

                <div class="field-divider" />

                <div class="panel-field">
                  <div class="field-label-row">
                    <label class="field-label">昵称</label>
                    <span class="field-badge optional">可修改</span>
                  </div>
                  <a-input
                    v-model:value="profileForm.nickname"
                    placeholder="设置昵称"
                    size="large"
                    class="field-input"
                    :disabled="!isLoggedIn"
                  />
                </div>

                <div class="field-divider" />

                <div class="panel-field">
                  <label class="field-label">邮箱</label>
                  <a-input
                    :value="accountInfo.email"
                    placeholder="未设置"
                    size="large"
                    class="field-input"
                    disabled
                  />
                </div>

                <div class="field-divider" />

                <div class="panel-field">
                  <label class="field-label">密码</label>
                  <a-space>
                    <a-button type="primary" ghost @click="saveProfile" :disabled="!profileChanged || savingProfile">
                      保存昵称
                    </a-button>
                    <a-button @click="showPasswordModal">修改密码</a-button>
                  </a-space>
                </div>
              </div>
            </section>

            <!-- 模型设置 -->
            <section class="settings-section" id="section-model">
              <div class="section-heading">
                <div class="section-icon" style="background: linear-gradient(135deg, #0ea5e9, #0369a1)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="4" y="4" width="16" height="16" rx="2"/>
                    <rect x="9" y="9" width="6" height="6"/>
                    <line x1="9" y1="1" x2="9" y2="4"/>
                    <line x1="15" y1="1" x2="15" y2="4"/>
                    <line x1="9" y1="20" x2="9" y2="23"/>
                    <line x1="15" y1="20" x2="15" y2="23"/>
                    <line x1="20" y1="9" x2="23" y2="9"/>
                    <line x1="20" y1="14" x2="23" y2="14"/>
                    <line x1="1" y1="9" x2="4" y2="9"/>
                    <line x1="1" y1="14" x2="4" y2="14"/>
                  </svg>
                </div>
                <div>
                  <h2 class="section-title">模型设置</h2>
                  <p class="section-desc">查看可用模型并切换当前使用的 AI 模型</p>
                </div>
              </div>

              <div class="model-grid">
                <button
                  v-for="m in models"
                  :key="m.id"
                  class="model-card"
                  :class="{ active: m.id === activeModel, switching: switching && m.id !== activeModel }"
                  @click="switchTo(m.id)"
                >
                  <div class="model-card-head">
                    <span class="model-card-id">{{ m.id }}</span>
                    <span v-if="m.id === activeModel" class="model-card-badge">当前</span>
                  </div>
                  <div class="model-card-meta">
                    <span class="provider-chip">{{ m.provider }}</span>
                    <span class="model-card-name">{{ m.modelName }}</span>
                  </div>
                  <p class="model-card-desc">{{ m.description }}</p>
                </button>
              </div>
            </section>

            <!-- 数据管理 -->            <!-- 模型服务 (T3) -->
            <section class="settings-section" id="section-providers">
              <div class="section-heading">
                <div class="section-icon" style="background: linear-gradient(135deg, #4F46E5, #6366F1)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div>
                  <h2 class="section-title">模型服务</h2>
                  <p class="section-desc">配置对话/向量模型服务，保存即生效，无需重启</p>
                </div>
              </div>

              <div class="provider-toolbar">
                <button class="provider-btn primary" @click="openProviderForm()">+ 新增配置</button>
              </div>

              <a-spin :spinning="providersLoading">
                <div v-if="providers.length === 0" class="provider-empty">暂无配置，点击上方“新增配置”创建</div>
                <div v-else class="provider-list">
                  <div v-for="p in providers" :key="p.id" class="provider-card">
                    <div class="provider-card-head">
                      <span class="provider-card-name">{{ p.name }}</span>
                      <span class="provider-chip" :class="p.providerType">{{ p.providerType === 'chat' ? '对话' : '向量' }}</span>
                      <span v-if="p.isActive" class="model-card-badge">当前</span>
                    </div>
                    <div class="provider-card-meta">
                      <span class="provider-chip">{{ p.vendor }}</span>
                      <span class="model-card-name">{{ p.modelName }}</span>
                      <span v-if="p.providerType === 'embedding' && p.dimension" class="dim-chip">{{ p.dimension }}d</span>
                      <span class="key-chip">{{ p.hasApiKey ? p.apiKeyMasked : '未配置' }}</span>
                    </div>
                    <p v-if="p.description" class="model-card-desc">{{ p.description }}</p>
                    <div class="provider-card-actions">
                      <button class="provider-btn small" :disabled="testingId === p.id" @click="testProviderConn(p)">{{ testingId === p.id ? '测试中…' : '测试连通' }}</button>
                      <button v-if="!p.isActive" class="provider-btn small" :disabled="actingId === p.id" @click="activateProviderRow(p)">激活</button>
                      <button class="provider-btn small" @click="openProviderForm(p)">编辑</button>
                      <button class="provider-btn small danger" @click="removeProvider(p)">删除</button>
                    </div>
                  </div>
                </div>
              </a-spin>

              <a-modal
                v-model:open="providerFormOpen"
                :title="providerForm.id ? '编辑模型服务' : '新增模型服务'"
                :confirm-loading="providerSaving"
                @ok="saveProviderForm"
              >
                <a-form layout="vertical" style="margin-top: 12px">
                  <a-form-item :label="'配置名称'" required>
                    <a-input v-model:value="providerForm.name" :disabled="!!providerForm.id" placeholder="my-chat-model" />
                  </a-form-item>
                  <a-form-item :label="'类型'" required>
                    <a-radio-group v-model:value="providerForm.providerType" :disabled="!!providerForm.id">
                      <a-radio value="chat">对话</a-radio>
                      <a-radio value="embedding">向量</a-radio>
                    </a-radio-group>
                  </a-form-item>
                  <a-form-item :label="'API Base URL'" required>
                    <a-input v-model:value="providerForm.baseUrl" placeholder="https://ark.cn-beijing.volces.com/api/v3" />
                  </a-form-item>
                  <a-form-item :label="'服务商'" >
                    <a-select v-model:value="providerForm.vendor">
                      <a-select-option value="volcengine">volcengine</a-select-option>
                      <a-select-option value="aliyun">aliyun</a-select-option>
                      <a-select-option value="openai">openai</a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item :label="'API Key'" :extra="providerForm.id ? '留空保持原值' : '保存后加密存储，不再回显'">
                    <a-input-password v-model:value="providerForm.apiSpecialKey" autocomplete="new-password" />
                  </a-form-item>
                  <a-form-item :label="'模型名称/端点 ID'" required>
                    <a-input v-model:value="providerForm.modelName" placeholder="ep-xxxx / doubao-xxx" />
                  </a-form-item>
                  <template v-if="providerForm.providerType === 'embedding'">
                    <a-form-item :label="'向量维度'" >
                      <a-input-number v-model:value="providerForm.dimension" :min="64" :max="8192" style="width: 100%" />
                    </a-form-item>
                    <a-form-item :label="'embedding 模式'" >
                      <a-radio-group v-model:value="providerForm.mode">
                        <a-radio value="multimodal">multimodal</a-radio>
                        <a-radio value="text">text</a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </template>
                  <template v-else>
                    <a-form-item :label="'随机性 (0-2)'" >
                      <a-slider v-model:value="providerForm.temperatureNum" :min="0" :max="2" :step="0.1" />
                    </a-form-item>
                    <a-form-item :label="'最大 token'" >
                      <a-input-number v-model:value="providerForm.maxTokens" :min="16" :max="32768" style="width: 100%" />
                    </a-form-item>
                  </template>
                  <a-form-item :label="'描述'" >
                    <a-input v-model:value="providerForm.description" />
                  </a-form-item>
                  <a-checkbox v-model:checked="providerForm.isActive">保存后激活为当前服务</a-checkbox>
                </a-form>
              </a-modal>
            </section>

            <section class="settings-section" id="section-data">
              <div class="section-heading">
                <div class="section-icon" style="background: linear-gradient(135deg, #ef4444, #dc2626)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <ellipse cx="12" cy="5" rx="9" ry="3"/>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                  </svg>
                </div>
                <div>
                  <h2 class="section-title">数据管理</h2>
                  <p class="section-desc">清除会话历史等本地数据</p>
                </div>
              </div>

              <div class="settings-panel">
                <div class="data-grid">
                  <button class="data-card" @click="clearCurrentSession">
                    <div class="data-card-icon" style="background: rgba(14, 165, 233, 0.1); color: #0ea5e9">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      </svg>
                    </div>
                    <div class="data-card-text">
                      <span class="data-card-label">清空当前会话</span>
                      <span class="data-card-desc">删除当前对话的消息记录</span>
                    </div>
                  </button>
                  <button class="data-card danger-card" @click="clearAllSessions">
                    <div class="data-card-icon" style="background: rgba(239, 68, 68, 0.1); color: #ef4444">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                      </svg>
                    </div>
                    <div class="data-card-text">
                      <span class="data-card-label">删除全部会话</span>
                      <span class="data-card-desc">删除所有对话记录（不可恢复）</span>
                    </div>
                  </button>
                </div>
              </div>
            </section>

          </div>
        </div>

        <!-- 固定底部操作栏 -->
        <div class="action-bar-fixed">
          <button class="btn btn-secondary" @click="resetSettings">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="1 4 1 10 7 10"/>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
            </svg>
            恢复默认
          </button>
        </div>
      </div>
    </div>

    <!-- 修改密码弹窗 -->
    <a-modal
      v-model:open="pwdModalOpen"
      title="修改密码"
      :confirm-loading="changingPwd"
      ok-text="确认修改"
      cancel-text="取消"
      @ok="submitPassword"
    >
      <div class="pwd-form">
        <a-form layout="vertical">
          <a-form-item label="原密码" required>
            <a-input-password v-model:value="pwdForm.oldPassword" placeholder="请输入原密码" />
          </a-form-item>
          <a-form-item label="新密码" required>
            <a-input-password v-model:value="pwdForm.newPassword" placeholder="至少 6 位" />
          </a-form-item>
          <a-form-item label="确认新密码" required>
            <a-input-password v-model:value="pwdForm.confirmPassword" placeholder="再次输入新密码" />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { message, Modal } from 'ant-design-vue'
import { useAuthStore } from '@/stores/auth'
import { useChatStore } from '@/stores/chat'
import { getModelList, switchModel as apiSwitchModel } from '@/api/chat'
import { listProviders, createProvider, updateProvider, deleteProvider, activateProvider, testProvider as apiTestProvider } from '@/api/settings'
import { getProfile, updateProfile, changePassword } from '@/api/user'

const router = useRouter()
const authStore = useAuthStore()
const chatStore = useChatStore()

// chat store 的 setModel 是本地状态同步（真正切换走 apiSwitchModel）
void router

const contentRef = ref(null)
const activeCategory = ref('section-account')

const categories = [
  { id: 'section-account', label: '账户设置', color: '#6366F1' },
  { id: 'section-model', label: '模型设置', color: '#0ea5e9' },
  { id: 'section-data', label: '数据管理', color: '#ef4444' },
]

// ==================== 账户 ====================
const isLoggedIn = computed(() => authStore.isLoggedIn)
const accountInfo = reactive({ username: '', email: '' })
const profileForm = reactive({ nickname: '' })
const savingProfile = ref(false)
const profileChanged = computed(() => profileForm.nickname !== (accountInfo.nickname || ''))

async function loadAccountInfo() {
  if (!authStore.isLoggedIn) return
  // 优先用 store 缓存，同时拉取后端最新
  try {
    const res = await getProfile()
    const data = res?.data !== undefined ? res.data : res
    if (data) {
      accountInfo.username = data.username || '未设置'
      accountInfo.email = data.email || '未设置'
      accountInfo.nickname = data.nickname || ''
      profileForm.nickname = data.nickname || ''
    }
  } catch (e) {
    // /profile 401 时回退 store
    const u = authStore.currentUser
    if (u) {
      accountInfo.username = u.username || '未设置'
      accountInfo.email = u.email || '未设置'
      accountInfo.nickname = u.nickname || ''
      profileForm.nickname = u.nickname || ''
    }
  }
}

async function saveProfile() {
  savingProfile.value = true
  try {
    await updateProfile({ nickname: profileForm.nickname })
    message.success('昵称已更新')
    await loadAccountInfo()
  } catch (e) {
    message.error('更新失败：' + (e.message || '未知错误'))
  } finally {
    savingProfile.value = false
  }
}

// ==================== 修改密码 ====================
const pwdModalOpen = ref(false)
const changingPwd = ref(false)
const pwdForm = reactive({ oldPassword: '', newPassword: '', confirmPassword: '' })

function showPasswordModal() {
  if (!authStore.isLoggedIn) {
    authStore.showLogin()
    return
  }
  pwdForm.oldPassword = ''
  pwdForm.newPassword = ''
  pwdForm.confirmPassword = ''
  pwdModalOpen.value = true
}

async function submitPassword() {
  if (!pwdForm.oldPassword || !pwdForm.newPassword) {
    message.warning('请填写完整')
    return
  }
  if (pwdForm.newPassword.length < 6) {
    message.warning('新密码至少 6 位')
    return
  }
  if (pwdForm.newPassword !== pwdForm.confirmPassword) {
    message.warning('两次输入的新密码不一致')
    return
  }
  changingPwd.value = true
  try {
    await changePassword({ oldPassword: pwdForm.oldPassword, newPassword: pwdForm.newPassword })
    message.success('密码修改成功，请重新登录')
    pwdModalOpen.value = false
    setTimeout(() => {
      authStore.logout()
      router.push('/')
    }, 1200)
  } catch (e) {
    message.error('修改失败：' + (e.message || '未知错误'))
  } finally {
    changingPwd.value = false
  }
}

// ==================== 模型设置 ====================
// ---- T3 模型服务配置中心 ----
const providers = ref([])
const providersLoading = ref(false)
const testingId = ref(null)
const actingId = ref(null)
const providerFormOpen = ref(false)
const providerSaving = ref(false)
const providerForm = reactive({
  id: null, name: '', providerType: 'chat', vendor: 'volcengine', baseUrl: '',
  apiSpecialKey: '', modelName: '', dimension: 2048, mode: 'multimodal',
  temperatureNum: 0.7, maxTokens: 1024, description: '', isActive: false
})

async function loadProviders() {
  providersLoading.value = true
  try {
    const res = await listProviders()
    providers.value = res?.data !== undefined ? res.data : (res || [])
  } catch (e) {
    console.error('[Gewu] 加载模型服务失败:', e)
  } finally {
    providersLoading.value = false
  }
}

function openProviderForm(row) {
  if (row) {
    Object.assign(providerForm, {
      id: row.id, name: row.name, providerType: row.providerType, vendor: row.vendor || 'volcengine',
      baseUrl: row.baseUrl || '', apiSpecialKey: '', modelName: row.modelName || '',
      dimension: row.dimension || 2048, mode: row.mode || 'multimodal',
      temperatureNum: row.temperature != null ? Number(row.temperature) : 0.7,
      maxTokens: row.maxTokens || 1024, description: row.description || '',
      isActive: !!row.isActive
    })
  } else {
    Object.assign(providerForm, {
      id: null, name: '', providerType: 'chat', vendor: 'volcengine', baseUrl: '',
      apiSpecialKey: '', modelName: '', dimension: 2048, mode: 'multimodal',
      temperatureNum: 0.7, maxTokens: 1024, description: '', isActive: false
    })
  }
  providerFormOpen.value = true
}

async function saveProviderForm() {
  if (!providerForm.name || !providerForm.baseUrl || !providerForm.modelName) {
    message.warning('请填写名称、Base URL 与模型名称')
    return
  }
  if (!providerForm.id && !providerForm.apiSpecialKey) {
    message.warning('新增配置需要填写 API Key')
    return
  }
  providerSaving.value = true
  try {
    const payload = {
      name: providerForm.name.trim(), providerType: providerForm.providerType, vendor: providerForm.vendor,
      baseUrl: providerForm.baseUrl.trim(), modelName: providerForm.modelName.trim(),
      description: providerForm.description, isActive: providerForm.isActive
    }
    if (providerForm.apiSpecialKey) payload.apiSpecialKey = providerForm.apiSpecialKey
    if (providerForm.providerType === 'embedding') {
      payload.dimension = providerForm.dimension
      payload.mode = providerForm.mode
    } else {
      payload.temperature = providerForm.temperatureNum
      payload.maxTokens = providerForm.maxTokens
    }
    if (providerForm.id) { await updateProvider(providerForm.id, payload) }
    else { await createProvider(payload) }
    message.success('已保存，配置即时生效')
    providerFormOpen.value = false
    await loadProviders()
    await loadModels()
  } catch (e) {
    message.error(e.message || '保存失败')
  } finally {
    providerSaving.value = false
  }
}

async function removeProvider(row) {
  Modal.confirm({
    title: '删除模型服务配置',
    content: '确定删除 「' + row.name + '」？删除后相关服务回退 yml 配置。',
    okType: 'danger',
    async onOk() {
      try {
        await deleteProvider(row.id)
        message.success('已删除')
        await loadProviders()
        await loadModels()
      } catch (e) {
        message.error(e.message || '删除失败')
      }
    }
  })
}

async function activateProviderRow(row) {
  actingId.value = row.id
  try {
    await activateProvider(row.id)
    message.success('已激活：' + row.name)
    await loadProviders()
    await loadModels()
  } catch (e) {
    message.error(e.message || '激活失败')
  } finally {
    actingId.value = null
  }
}

async function testProviderConn(row) {
  testingId.value = row.id
  try {
    const res = await apiTestProvider(row.id)
    const d = res?.data !== undefined ? res.data : res
    if (d && d.success) {
      message.success(d.message || '连通正常', 4)
    } else {
      message.error((d && d.message) || '连通失败', 6)
    }
  } catch (e) {
    message.error(e.message || '测试失败', 6)
  } finally {
    testingId.value = null
  }
}

const models = ref([])
const activeModel = ref('')
const switching = ref(false)

async function loadModels() {
  try {
    const res = await getModelList()
    const data = res?.data !== undefined ? res.data : res
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
    const data = res?.data !== undefined ? res.data : res
    activeModel.value = data.newModel || modelId
    // 同步 chat store 本地状态（setModel 会重复调 API，直接改值避免双写）
    if (chatStore.currentModel !== undefined) {
      chatStore.currentModel = data.currentModel || modelId
    }
    message.success('模型已切换：' + modelId)
  } catch (e) {
    message.error('切换失败：' + (e.message || '未知错误'))
  } finally {
    switching.value = false
  }
}

// ==================== 数据管理 ====================
function clearCurrentSession() {
  Modal.confirm({
    title: '清空当前会话的消息？',
    okText: '清空',
    cancelText: '取消',
    async onOk() {
      try {
        await chatStore.clearHistory()
        message.success('当前会话已清空')
      } catch (e) {
        message.error(e.message || '清空失败')
      }
    }
  })
}

function clearAllSessions() {
  Modal.confirm({
    title: '确定删除所有会话吗？此操作不可恢复！',
    okText: '全部删除',
    okType: 'danger',
    cancelText: '取消',
    async onOk() {
      try {
        const sessions = chatStore.sessions || []
        for (const s of sessions) {
          await chatStore.removeSession(s.sessionId || s.id)
        }
        localStorage.removeItem('lc4j_session_id')
        message.success('所有会话已删除')
      } catch (e) {
        message.error('删除失败：' + (e.message || '未知错误'))
      }
    }
  })
}

// ==================== 恢复默认 ====================
function resetSettings() {
  Modal.confirm({
    title: '确定要恢复默认设置吗？',
    content: '将清除本地登录状态与会话记录',
    okText: '确定',
    cancelText: '取消',
    async onOk() {
      localStorage.removeItem('auth-token')
      localStorage.removeItem('auth-refresh-token')
      localStorage.removeItem('user')
      localStorage.removeItem('lc4j_session_id')
      window.location.reload()
    }
  })
}

function scrollToSection(id) {
  activeCategory.value = id
  const el = document.getElementById(id)
  if (el && contentRef.value) {
    const container = contentRef.value
    const top = el.offsetTop - container.offsetTop
    container.scrollTo({ top, behavior: 'smooth' })
  }
}

onMounted(async () => {
  loadProviders()
  await Promise.all([loadAccountInfo(), loadModels()])
})
</script>

<style scoped>
.settings-view {
  height: 100%;
  width: 100%;
  background: #f8fafc;
}

.settings-shell {
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

/* ===== 左侧导航 ===== */
.settings-nav {
  width: 280px;
  flex-shrink: 0;
  background: #fff;
  border-right: 1px solid rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  padding: 28px 0;
  overflow-y: auto;
}

.nav-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 20px 24px;
  margin-bottom: 4px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}

.nav-avatar {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: linear-gradient(135deg, #0ea5e9, #0369a1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}

.nav-avatar svg {
  width: 20px;
  height: 20px;
}

.nav-title-group {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.nav-title {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.3px;
}

.nav-subtitle {
  font-size: 12px;
  color: #94a3b8;
}

.nav-list {
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: inherit;
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
}

.nav-item:hover {
  background: #f8fafc;
  color: #1e293b;
}

.nav-item.active {
  background: linear-gradient(135deg, rgba(14,165,233,0.08), rgba(3,105,161,0.06));
  color: #0ea5e9;
  font-weight: 600;
}

.nav-item-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.nav-item-icon svg {
  width: 16px;
  height: 16px;
}

.nav-item-label {
  flex: 1;
}

.nav-item-arrow {
  width: 16px;
  height: 16px;
  opacity: 0;
  transition: opacity 0.2s ease;
  color: #94a3b8;
}

.nav-item:hover .nav-item-arrow,
.nav-item.active .nav-item-arrow {
  opacity: 1;
}

/* ===== 右侧内容 ===== */
.settings-content {
  flex: 1;
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.settings-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 32px 40px 32px;
  scroll-behavior: smooth;
}

.settings-content-inner {
  width: 100%;
}

/* ===== 区块 ===== */

/* ---- T3 模型服务配置中心 ---- */
.provider-toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
}

.provider-btn {
  border: 1px solid var(--border-color, #e2e8f0);
  background: var(--bg-secondary, #ffffff);
  color: var(--text-primary, #1e293b);
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.provider-btn:hover:not(:disabled) {
  border-color: var(--accent, #4F46E5);
  color: var(--accent, #4F46E5);
}

.provider-btn.primary {
  background: var(--accent, #4F46E5);
  border-color: var(--accent, #4F46E5);
  color: #ffffff;
}

.provider-btn.primary:hover:not(:disabled) {
  opacity: 0.9;
  color: #ffffff;
}

.provider-btn.small {
  padding: 4px 10px;
  font-size: 12px;
}

.provider-btn.danger:hover:not(:disabled) {
  border-color: var(--danger, #ef4444);
  color: var(--danger, #ef4444);
}

.provider-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.provider-empty {
  text-align: center;
  color: var(--text-secondary, #64748b);
  padding: 32px 0;
  font-size: 13px;
}

.provider-list {
  display: grid;
  gap: 12px;
}

.provider-card {
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 12px;
  padding: 14px 16px;
  background: var(--bg-secondary, #ffffff);
  transition: border-color 0.2s ease;
}

.provider-card:hover {
  border-color: var(--accent, #4F46E5);
}

.provider-card-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.provider-card-name {
  font-weight: 600;
  font-size: 14px;
  color: var(--text-primary, #1e293b);
}

.provider-card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.dim-chip,
.key-chip {
  font-size: 11px;
  color: var(--text-secondary, #64748b);
  background: var(--bg-tertiary, #f1f5f9);
  border-radius: 4px;
  padding: 2px 6px;
  font-family: monospace;
}

.provider-card-actions {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.settings-section {
  width: 100%;
  margin-bottom: 36px;
  animation: section-fade 0.4s ease;
}

.settings-section:last-child {
  margin-bottom: 0;
}

@keyframes section-fade {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.section-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}

.section-icon svg {
  width: 20px;
  height: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  letter-spacing: -0.3px;
}

.section-desc {
  font-size: 13px;
  color: #94a3b8;
  margin: 2px 0 0;
}

/* 设置面板 */
.settings-panel {
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 1px 4px rgba(0,0,0,0.02);
  padding: 24px;
  transition: box-shadow 0.2s ease;
}

.settings-panel:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}

/* 表单字段 */
.panel-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.field-label {
  font-size: 13px;
  font-weight: 600;
  color: #475569;
}

.field-badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 6px;
  font-weight: 600;
}

.field-badge.optional {
  background: rgba(16, 185, 129, 0.08);
  color: #10b981;
}

.field-input {
  width: 100%;
}

.field-divider {
  height: 1px;
  background: rgba(0,0,0,0.04);
  margin: 20px 0;
}

/* ===== 模型卡片网格 ===== */
.model-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 14px;
}

.model-card {
  text-align: left;
  font-family: inherit;
  background: #fff;
  border: 1.5px solid #e2e8f0;
  border-radius: 14px;
  padding: 18px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.model-card:hover {
  border-color: #7dd3fc;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(14,165,233,0.1);
}

.model-card.active {
  border-color: #0ea5e9;
  background: linear-gradient(135deg, rgba(14,165,233,0.05), rgba(3,105,161,0.04));
  box-shadow: 0 4px 16px rgba(14,165,233,0.12);
}

.model-card.switching {
  opacity: 0.6;
  pointer-events: none;
}

.model-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.model-card-id {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  font-family: 'JetBrains Mono', Consolas, monospace;
}

.model-card-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(14, 165, 233, 0.12);
  color: #0284c7;
}

.model-card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.provider-chip {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 6px;
  background: rgba(100, 116, 139, 0.1);
  color: #475569;
}

.model-card-name {
  font-size: 12px;
  color: #64748b;
  font-family: 'JetBrains Mono', Consolas, monospace;
}

.model-card-desc {
  font-size: 12.5px;
  color: #94a3b8;
  margin: 0;
  line-height: 1.5;
}

/* ===== 数据卡片 ===== */
.data-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.data-card {
  padding: 20px;
  border-radius: 12px;
  border: 1.5px solid #e2e8f0;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 14px;
  text-align: left;
  font-family: inherit;
}

.data-card:hover {
  border-color: #7dd3fc;
  transform: translateY(-2px);
}

.data-card.danger-card {
  border-color: #fecaca;
}

.data-card.danger-card:hover {
  border-color: #fca5a5;
  background: #fef2f2;
}

.data-card-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.data-card-icon svg {
  width: 20px;
  height: 20px;
}

.data-card-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.data-card-label {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.data-card-desc {
  font-size: 12px;
  color: #94a3b8;
}

/* Ant Design 对齐 */
:deep(.ant-input),
:deep(.ant-input-password input),
:deep(.ant-select-selector) {
  border-radius: 10px !important;
  border-color: #e2e8f0 !important;
}

:deep(.ant-input:hover),
:deep(.ant-input-password:hover input),
:deep(.ant-select-selector:hover) {
  border-color: #7dd3fc !important;
}

:deep(.ant-input:focus),
:deep(.ant-input-password input:focus),
:deep(.ant-select-focused .ant-select-selector) {
  border-color: #0ea5e9 !important;
  box-shadow: 0 0 0 3px rgba(14,165,233,0.08) !important;
}

/* 固定底部操作栏 */
.action-bar-fixed {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 16px 40px 24px;
  background: #f8fafc;
  border-top: 1px solid rgba(0,0,0,0.06);
  flex-shrink: 0;
}

.btn {
  padding: 12px 28px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  font-family: inherit;
}

.btn svg {
  width: 16px;
  height: 16px;
}

.btn-secondary {
  background: #fff;
  color: #475569;
  border: 1.5px solid #e2e8f0;
}

.btn-secondary:hover {
  border-color: #7dd3fc;
  color: #0ea5e9;
}

/* 密码表单 */
.pwd-form {
  padding-top: 4px;
}

/* 响应式 */
@media (max-width: 1024px) {
  .settings-shell { flex-direction: column; }
  .settings-nav {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid rgba(0,0,0,0.06);
    padding: 16px 0;
  }
  .nav-list { flex-direction: row; padding: 0 12px; overflow-x: auto; }
  .nav-item { white-space: nowrap; }
  .settings-scroll { padding: 24px 20px 40px; }
  .data-grid { grid-template-columns: 1fr; }
  .model-grid { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .action-bar-fixed { flex-direction: column; }
  .btn { justify-content: center; }
}
</style>

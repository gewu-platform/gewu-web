import { createRouter, createWebHistory } from 'vue-router'
import ChatView from '@/views/ChatView.vue'
import ExamplesView from '@/views/ExamplesView.vue'
import ModelView from '@/views/ModelView.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ChatView,
    meta: { title: 'AI 对话' }
  },
  {
    path: '/chat',
    redirect: '/'
  },
  {
    path: '/examples',
    name: 'examples',
    component: ExamplesView,
    meta: { title: '学习示例' }
  },
  {
    path: '/models',
    name: 'models',
    component: ModelView,
    meta: { title: '模型管理' }
  },
  {
    path: '/knowledge',
    name: 'knowledge',
    component: () => import('@/views/KnowledgeView.vue'),
    meta: { title: '知识库' }
  },
  {
    path: '/prompt',
    name: 'prompt',
    component: () => import('@/views/PromptView.vue'),
    meta: { title: 'Prompt 模板' }
  },
  {
    path: '/monitor',
    name: 'monitor',
    component: () => import('@/views/MonitorView.vue'),
    meta: { title: '监控' }
  },
  {
    path: '/agent',
    name: 'agent',
    component: () => import('@/views/AgentView.vue'),
    meta: { title: 'Agent', requiresAdmin: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/PlaceholderView.vue'),
    meta: { title: '个人中心', placeholder: '个人中心（开发中）' }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/SettingsView.vue'),
    meta: { title: '设置' }
  },
  {
    path: '/models',
    redirect: '/settings'
  },
  {
    path: '/login',
    name: 'login',
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore()
      authStore.showLogin()
      next('/')
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} · LC4J` : 'LC4J'
  // P8b 权限管控：管理员页面守卫（Agent 管理与审批）
  if (to.meta.requiresAdmin) {
    const authStore = useAuthStore()
    authStore.checkAuthStatus()
    if (!authStore.isLoggedIn) {
      authStore.showLogin()
      next(from.fullPath || '/')
      return
    }
    if (!authStore.isAdmin) {
      next('/')
      setTimeout(() => {
        import('ant-design-vue').then(({ message }) => message.warning('Agent 管理与审批仅管理员可用，请联系管理员'))
      }, 50)
      return
    }
  }
  next()
})

// 移除全局认证守卫，避免应用启动时强制弹出登录框
// 由业务逻辑（401 → auth-expired 事件）决定何时需要登录

export default router

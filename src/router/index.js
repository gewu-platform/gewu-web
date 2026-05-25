import { createRouter, createWebHistory } from 'vue-router'
import ChatView from '@/views/ChatView.vue'
import ExamplesView from '@/views/ExamplesView.vue'
import ModelView from '@/views/ModelView.vue'

const routes = [
  {
    path: '/',
    redirect: '/chat'
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatView,
    meta: { title: 'AI 对话' }
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = (to.meta.title || '') + ' - LangChain4j 学习平台'
  next()
})

export default router

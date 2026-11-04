import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import i18n from './i18n'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import router from './router'
import 'highlight.js/styles/atom-one-dark.css'

const app = createApp(App)
app.use(createPinia())
app.use(i18n)
app.use(router)
app.use(Antd)
app.mount('#app')

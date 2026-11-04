/**
 * i18n 入口（V2.6.0 国际化批次 2）
 *
 * - 全局模式（globalInjection），模板内可直接用 $t()
 * - 语言持久化到 localStorage（key: gewu.locale），默认 zh-CN
 * - 语言包按模块拆分：locales/zh-CN.js、locales/en-US.js
 * - AntD ConfigProvider 的 locale 在 App.vue 中根据当前语言切换
 */
import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'

export const SUPPORTED_LOCALES = ['zh-CN', 'en-US']
export const LOCALE_STORAGE_KEY = 'gewu.locale'

function initialLocale() {
  const saved = localStorage.getItem(LOCALE_STORAGE_KEY)
  if (saved && SUPPORTED_LOCALES.includes(saved)) {
    return saved
  }
  // 浏览器语言以 zh 开头 → 中文，否则英文
  const nav = (navigator.language || 'zh-CN').toLowerCase()
  return nav.startsWith('zh') ? 'zh-CN' : 'en-US'
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: initialLocale(),
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})

/** 切换语言并持久化（App.vue 语言切换器调用） */
export function setLocale(locale) {
  if (!SUPPORTED_LOCALES.includes(locale)) return
  i18n.global.locale.value = locale
  localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  document.documentElement.setAttribute('lang', locale)
}

/** 当前语言 */
export function currentLocale() {
  return i18n.global.locale.value
}

export default i18n

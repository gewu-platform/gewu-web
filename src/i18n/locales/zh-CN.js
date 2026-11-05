/**
 * 中文语言包（按模块组织；批次 2 覆盖导航与通用项，批次 3 随视图迁移逐步扩充）
 */
export default {
  nav: {
    chat: '对话',
    knowledge: '知识库',
    prompt: '模板',
    monitor: '监控',
    agent: 'Agent',
    settings: '设置'
  },
  common: {
    confirm: '确认',
    cancel: '取消',
    save: '保存',
    delete: '删除',
    edit: '编辑',
    create: '新建',
    search: '搜索',
    loading: '加载中…',
    retry: '重试',
    close: '关闭',
    success: '操作成功',
    failed: '操作失败',
    none: '暂无数据',
    send: '发送',
    copy: '复制',
    copied: '已复制',
    download: '下载',
    upload: '上传',
    back: '返回',
    enable: '启用',
    disable: '禁用',
    enabled: '已启用',
    disabled: '已禁用'
  },
    "model": {
      "title": "🤖 模型管理",
      "subtitle": "查看可用模型并切换当前使用的 AI 模型",
      "currentLabel": "当前激活模型",
      "currentBadge": "当前",
      "switching": "切换中...",
      "switchFailed": "切换模型失败: "
    },
    "approval": {
      "title": "⚠️ 工具调用需要审批",
      "body": "工具",
      "paramsPrefix": "，参数：",
      "approve": "✅ 批准执行",
      "reject": "❌ 拒绝",
      "readonly": "⏳ 审批由管理员处理，请等待管理员在 Agent 页操作"
    },
    "placeholder": {
      "desc": "该模块正在对齐 java-ai-native 逐步交付，敬请期待",
      "backToChat": "返回对话",
      "developing": "开发中"
    },
    "reasoning": {
      "title": "推理过程（{n} 次工具调用）"
    },
  header: {
    logout: '退出登录',
    login: '登录 / 注册',
    profile: '个人资料',
    language: '语言 / Language',
    online: '服务正常',
    offline: '服务不可用'
  },
  login: {
    title: '登录',
    register: '注册',
    username: '用户名',
    password: '密码',
    email: '邮箱',
    submit: '登录',
    toRegister: '没有账号？去注册',
    toLogin: '已有账号？去登录'
  }
}

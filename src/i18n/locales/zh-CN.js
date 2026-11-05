/**
 * 中文语言包（按模块组织，与 en-US.js 键结构同构）
 * 模块：nav/common/header/login（批次2）+ model/approval/placeholder/reasoning（3a）
 *      + promptView/knowledge（3b）+ monitor（3c）
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
    password: '***',
    email: '邮箱',
    submit: '登录',
    toRegister: '没有账号？去注册',
    toLogin: '已有账号？去登录'
  },
  model: {
    title: '🤖 模型管理',
    subtitle: '查看可用模型并切换当前使用的 AI 模型',
    currentLabel: '当前激活模型',
    currentBadge: '当前',
    switching: '切换中...',
    switchFailed: '切换模型失败: '
  },
  approval: {
    title: '⚠️ 工具调用需要审批',
    body: '工具',
    paramsPrefix: '，参数：',
    approve: '✅ 批准执行',
    reject: '❌ 拒绝',
    readonly: '⏳ 审批由管理员处理，请等待管理员在 Agent 页操作'
  },
  placeholder: {
    desc: '该模块正在对齐 java-ai-native 逐步交付，敬请期待',
    backToChat: '返回对话',
    developing: '开发中'
  },
  reasoning: {
    title: '推理过程（{n} 次工具调用）'
  },
  promptView: {
    sidebar: { title: 'Prompt 模板', sub: '版本制模板管理', new: '新建模板' },
    list: { noDesc: '暂无描述', defaultModel: '默认模型', active: '启用', inactive: '停用', empty: '暂无模板', default: '默认' },
    tabs: { detail: '模板详情', execute: '执行' },
    detail: { desc: '描述', userPrompt: 'User Prompt 模板', executeBtn: '执行模板' },
    execute: { fillVars: '填充变量', varPlaceholder: '输入 {v} 的值', noVars: '该模板没有变量占位符', running: '执行中...', run: '执行', result: '执行结果' },
    empty: { pick: '从左侧选择一个模板查看详情或执行' },
    modal: {
      new: '新建 Prompt 模板', name: '模板名称', namePh: '如 code-review',
      desc: '描述', descPh: '模板用途说明', sysPh: '系统角色设定',
      userPrompt: 'User Prompt 模板', userPromptPh: '使用 {variable} 占位符',
      model: '模型', modelPh: '选择推荐模型', temp: '温度',
      nameRequired: '模板名称和 User Prompt 模板不能为空',
      created: '模板创建成功', createFailed: '创建失败: '
    },
    msgs: { loadFailed: '加载模板列表失败: ', modelsFailed: '加载模型列表失败: ', execOk: '模板执行成功', execFailed: '执行失败: ' }
  },
  knowledge: {
    nav: { title: '知识库', sub: '文档管理与检索' },
    docs: {
      title: '文档列表', desc: '已上传的知识文档共 {n} 篇',
      colName: '文件名', colType: '类型', colSize: '大小', colChunks: '分块数',
      colStatus: '状态', colTime: '上传时间', colAction: '操作',
      empty: '暂无文档', emptyDesc: '切换到「上传文档」标签上传第一个文档',
      uploadBtn: '上传文档', viewDetail: '查看详情', delete: '删除'
    },
    upload: {
      title: '上传文档', desc: '支持 PDF、DOCX、TXT、MD 格式',
      drop: '拖拽文件到此处，或点击选择文件',
      dropDesc: '支持 PDF、DOCX、TXT、MD 格式，自动解析并生成向量索引',
      progress: '正在上传文档，解析与向量化在后台进行...'
    },
    search: {
      title: '知识检索', desc: '通过语义向量搜索相关知识片段',
      placeholder: '输入问题或关键词，按 Enter 搜索...', btn: '搜索',
      topK: '返回结果数：', spinning: '语义检索中...',
      found: '找到 {n} 条相关知识片段', similarity: '相似度 {p}%',
      emptyTitle: '未找到相关知识', emptyDesc: '尝试换一些关键词，或先上传更多文档'
    },
    detail: { title: '文档详情', name: '文件名', type: '类型', size: '大小', chunks: '分块数', status: '状态', uploader: '上传人', time: '上传时间' },
    status: { pending: '待处理', processing: '处理中', done: '已完成', failed: '失败', unknown: '未知' },
    tabs: { docs: '文档列表', search: '知识检索', upload: '上传文档' },
    recent: { title: '最近上传' },
    msgs: {
      loadFailed: '加载文档列表失败: ', detailFailed: '获取文档详情失败: ',
      deleted: '文档已删除', deleteFailed: '删除失败: ',
      deleteTitle: '删除文档', deleteContent: '确定删除「{name}」吗？其向量索引将同步清除。',
      okDelete: '删除', cancel: '取消',
      badType: '不支持的文件类型：.{ext}，仅支持 {allowed}',
      uploaded: '文档「{name}」上传成功，解析进行中', uploadFailed: '上传失败: ',
      emptyKeyword: '请输入搜索关键词', found: '找到 {n} 条相关知识',
      notFound: '未找到相关知识', searchFailed: '搜索失败: '
    }
  },
  monitor: {
    hours: { title: '24 小时调用分布', desc: '今日按小时统计', tip: '{h}:00 — {n} 次' },
    ranking: { title: '模型使用排行', desc: '按调用次数排序', colModel: '模型', colCalls: '调用次数', colTokens: 'Token 总量', colCost: '总费用 (元)' },
    usage: {
      title: '用量报表', desc: '按天 / 用户 / Agent 三视图（近 {n} 天）',
      byDay: '按天', byUser: '按用户', byAgent: '按 Agent',
      d7: '近 7 天', d14: '近 14 天', d30: '近 30 天',
      colDate: '日期', colUser: '用户', colAgent: '来源', colCalls: '调用次数',
      colIn: '输入 tokens', colOut: '输出 tokens', colTotal: '总 tokens', colCost: '费用（元）'
    },
    logs: {
      title: '调用日志', desc: '最近的大模型调用记录',
      allModels: '全部模型', allStatus: '全部状态',
      success: '成功', failed: '失败', timeout: '超时',
      colTime: '时间', colModel: '模型', colStatus: '状态', colLatency: '延迟', colCost: '费用',
      empty: '暂无日志记录', prev: '上一页', next: '下一页',
      pageInfo: '第 {p} 页 / 共 {m} 页（{t} 条）', loadFailed: '加载日志失败: '
    },
    msgs: { loadFailed: '加载监控数据失败: ' },
    stats: { todayCalls: '今日调用', todayTokens: '今日 Token', todayCost: '今日费用', avgLatency: '平均延迟' }
  }
}

/**
 * 中文语言包（按模块组织，与 en-US.js 键结构同构）
 * 模块：nav/common/header/login（批次2）+ model/approval/placeholder/reasoning（3a）
 *      + promptView/knowledge（3b）+ monitor（3c）
 */
export default {
  "nav": {
    "chat": "对话",
    "knowledge": "知识库",
    "prompt": "模板",
    "monitor": "监控",
    "agent": "Agent",
    "settings": "设置"
  },
  "common": {
    "confirm": "确认",
    "cancel": "取消",
    "save": "保存",
    "delete": "删除",
    "edit": "编辑",
    "create": "新建",
    "search": "搜索",
    "loading": "加载中…",
    "retry": "重试",
    "close": "关闭",
    "success": "操作成功",
    "failed": "操作失败",
    "none": "暂无数据",
    "send": "发送",
    "copy": "复制",
    "copied": "已复制",
    "download": "下载",
    "upload": "上传",
    "back": "返回",
    "enable": "启用",
    "disable": "禁用",
    "enabled": "已启用",
    "disabled": "已禁用",
    "exception": "异常："
  },
  "header": {
    "logout": "退出登录",
    "login": "登录 / 注册",
    "profile": "个人资料",
    "language": "语言 / Language",
    "online": "服务正常",
    "offline": "服务不可用"
  },
  "login": {
    "title": "登录",
    "register": "注册",
    "username": "用户名",
    "password": "***",
    "email": "邮箱",
    "submit": "登录",
    "toRegister": "没有账号？去注册",
    "toLogin": "已有账号？去登录"
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
  "promptView": {
    "sidebar": {
      "title": "Prompt 模板",
      "sub": "版本制模板管理",
      "new": "新建模板"
    },
    "list": {
      "noDesc": "暂无描述",
      "defaultModel": "默认模型",
      "active": "启用",
      "inactive": "停用",
      "empty": "暂无模板",
      "default": "默认"
    },
    "tabs": {
      "detail": "模板详情",
      "execute": "执行"
    },
    "detail": {
      "desc": "描述",
      "userPrompt": "User Prompt 模板",
      "executeBtn": "执行模板"
    },
    "execute": {
      "fillVars": "填充变量",
      "varPlaceholder": "输入 {v} 的值",
      "noVars": "该模板没有变量占位符",
      "running": "执行中...",
      "run": "执行",
      "result": "执行结果"
    },
    "empty": {
      "pick": "从左侧选择一个模板查看详情或执行"
    },
    "modal": {
      "new": "新建 Prompt 模板",
      "name": "模板名称",
      "namePh": "如 code-review",
      "desc": "描述",
      "descPh": "模板用途说明",
      "sysPh": "系统角色设定",
      "userPrompt": "User Prompt 模板",
      "userPromptPh": "使用 {variable} 占位符",
      "model": "模型",
      "modelPh": "选择推荐模型",
      "temp": "温度",
      "nameRequired": "模板名称和 User Prompt 模板不能为空",
      "created": "模板创建成功",
      "createFailed": "创建失败: "
    },
    "msgs": {
      "loadFailed": "加载模板列表失败: ",
      "modelsFailed": "加载模型列表失败: ",
      "execOk": "模板执行成功",
      "execFailed": "执行失败: "
    }
  },
  "knowledge": {
    "nav": {
      "title": "知识库",
      "sub": "文档管理与检索"
    },
    "docs": {
      "title": "文档列表",
      "desc": "已上传的知识文档共 {n} 篇",
      "colName": "文件名",
      "colType": "类型",
      "colSize": "大小",
      "colChunks": "分块数",
      "colStatus": "状态",
      "colTime": "上传时间",
      "colAction": "操作",
      "empty": "暂无文档",
      "emptyDesc": "切换到「上传文档」标签上传第一个文档",
      "uploadBtn": "上传文档",
      "viewDetail": "查看详情",
      "delete": "删除"
    },
    "upload": {
      "title": "上传文档",
      "desc": "支持 PDF、DOCX、TXT、MD 格式",
      "drop": "拖拽文件到此处，或点击选择文件",
      "dropDesc": "支持 PDF、DOCX、TXT、MD 格式，自动解析并生成向量索引",
      "progress": "正在上传文档，解析与向量化在后台进行..."
    },
    "search": {
      "title": "知识检索",
      "desc": "通过语义向量搜索相关知识片段",
      "placeholder": "输入问题或关键词，按 Enter 搜索...",
      "btn": "搜索",
      "topK": "返回结果数：",
      "spinning": "语义检索中...",
      "found": "找到 {n} 条相关知识片段",
      "similarity": "相似度 {p}%",
      "emptyTitle": "未找到相关知识",
      "emptyDesc": "尝试换一些关键词，或先上传更多文档"
    },
    "detail": {
      "title": "文档详情",
      "name": "文件名",
      "type": "类型",
      "size": "大小",
      "chunks": "分块数",
      "status": "状态",
      "uploader": "上传人",
      "time": "上传时间"
    },
    "status": {
      "pending": "待处理",
      "processing": "处理中",
      "done": "已完成",
      "failed": "失败",
      "unknown": "未知"
    },
    "tabs": {
      "docs": "文档列表",
      "search": "知识检索",
      "upload": "上传文档"
    },
    "recent": {
      "title": "最近上传"
    },
    "msgs": {
      "loadFailed": "加载文档列表失败: ",
      "detailFailed": "获取文档详情失败: ",
      "deleted": "文档已删除",
      "deleteFailed": "删除失败: ",
      "deleteTitle": "删除文档",
      "deleteContent": "确定删除「{name}」吗？其向量索引将同步清除。",
      "okDelete": "删除",
      "cancel": "取消",
      "badType": "不支持的文件类型：.{ext}，仅支持 {allowed}",
      "uploaded": "文档「{name}」上传成功，解析进行中",
      "uploadFailed": "上传失败: ",
      "emptyKeyword": "请输入搜索关键词",
      "found": "找到 {n} 条相关知识",
      "notFound": "未找到相关知识",
      "searchFailed": "搜索失败: "
    }
  },
  "monitor": {
    "hours": {
      "title": "24 小时调用分布",
      "desc": "今日按小时统计",
      "tip": "{h}:00 — {n} 次"
    },
    "ranking": {
      "title": "模型使用排行",
      "desc": "按调用次数排序",
      "colModel": "模型",
      "colCalls": "调用次数",
      "colTokens": "Token 总量",
      "colCost": "总费用 (元)"
    },
    "usage": {
      "title": "用量报表",
      "desc": "按天 / 用户 / Agent 三视图（近 {n} 天）",
      "byDay": "按天",
      "byUser": "按用户",
      "byAgent": "按 Agent",
      "d7": "近 7 天",
      "d14": "近 14 天",
      "d30": "近 30 天",
      "colDate": "日期",
      "colUser": "用户",
      "colAgent": "来源",
      "colCalls": "调用次数",
      "colIn": "输入 tokens",
      "colOut": "输出 tokens",
      "colTotal": "总 tokens",
      "colCost": "费用（元）"
    },
    "logs": {
      "title": "调用日志",
      "desc": "最近的大模型调用记录",
      "allModels": "全部模型",
      "allStatus": "全部状态",
      "success": "成功",
      "failed": "失败",
      "timeout": "超时",
      "colTime": "时间",
      "colModel": "模型",
      "colStatus": "状态",
      "colLatency": "延迟",
      "colCost": "费用",
      "empty": "暂无日志记录",
      "prev": "上一页",
      "next": "下一页",
      "pageInfo": "第 {p} 页 / 共 {m} 页（{t} 条）",
      "loadFailed": "加载日志失败: "
    },
    "msgs": {
      "loadFailed": "加载监控数据失败: "
    },
    "stats": {
      "todayCalls": "今日调用",
      "todayTokens": "今日 Token",
      "todayCost": "今日费用",
      "avgLatency": "平均延迟"
    }
  },
  "chat": {
    "sessions": {
      "title": "💬 会话",
      "newSession": "新建会话",
      "delGroup": "删除分组（会话回到默认）",
      "childTag": "↳ 子",
      "rename": "重命名",
      "moveToGroup": "移动到分组",
      "derive": "派生子会话",
      "delSession": "删除会话",
      "empty": "暂无会话",
      "fallback": "会话"
    },
    "rename": {
      "title": "重命名会话",
      "save": "保存"
    },
    "move": {
      "title": "移动「{name}」到分组",
      "orNew": "或新建分组",
      "namePh": "分组名（留空 = 默认）",
      "toDefault": "移到默认"
    },
    "hero": {
      "title": "Gewu 智能对话",
      "sub": "支持同步调用、流式输出、会话记忆、角色扮演",
      "q1": "介绍一下 Gewu 的核心能力",
      "q1Label": "🌱 Gewu 是什么？",
      "q2": "Gewu 的 Agent 工具编排和审批网关怎么用？",
      "q2Label": "⚡ Agent 工具编排怎么用？",
      "q3": "用Java写一个工具调用的示例",
      "q3Label": "🛠 写个 Tool Calling 示例"
    },
    "msg": {
      "me": "我",
      "ragHits": "📚 已从知识库检索 {n} 条相关内容",
      "ragEmpty": "📚 知识库无命中",
      "ragFailed": "📚 知识库检索失败",
      "attachAlt": "附图"
    },
    "input": {
      "remove": "移除",
      "images": "{n} 张图片",
      "withImages": "已附加 {n} 张图片，可继续输入...",
      "placeholder": "输入问题... (Enter 发送，可直接粘贴图片)",
      "upload": "上传图片（或直接 Ctrl+V 粘贴）",
      "switchModel": "切换模型"
    },
    "panel": {
      "online": "后端在线",
      "offline": "后端离线",
      "budget": "提示词预算",
      "lastTokens": "最近一次运行的词元数",
      "in": "输入",
      "out": "输出",
      "smartTitle": "开启后模型可自主调用工具（计算/时间/搜索等），支持会话记忆与工具留档",
      "smart": "🧠 智能",
      "smartOn": "：工具已启用",
      "kbTitle": "开启后向已选知识文档检索",
      "kb": "📚 知识库",
      "pickDoc": "选择文档：",
      "kbEmpty": "知识库为空，请先在「知识库」页上传文档",
      "clearHistory": "🗑 清除会话历史",
      "estCost": "预估费用 ${cost}"
    },
    "msgs": {
      "renameEmpty": "名称不能为空",
      "renamed": "已重命名",
      "renameFailed": "[Gewu] 重命名失败: ",
      "moved": "已移入分组: {name}",
      "movedDefault": "已移到默认",
      "moveFailed": "[Gewu] 归组失败: ",
      "dissolved": "分组已删除（{n} 个会话回到默认）",
      "dissolveFailed": "[Gewu] 删除分组失败: ",
      "childCreated": "子会话已创建",
      "deriveFailed": "[Gewu] 派生失败: ",
      "cmdFailed": "命令执行失败",
      "switched": "已切换到 {name}",
      "switchFailed": "切换模型失败",
      "created": "新会话已创建",
      "createFailed": "创建会话失败: ",
      "loadFailed": "加载会话失败",
      "delTitle": "删除会话",
      "delContent": "此操作将永久删除该会话及其所有对话记录，是否继续？",
      "ok": "确定",
      "deleted": "会话已删除",
      "delFailed": "删除失败: ",
      "cleared": "会话已清除",
      "clearTitle": "清除会话",
      "clearContent": "确定要清除当前会话的所有消息吗？（会话本身保留）",
      "historyCleared": "会话历史已清除",
      "clearFailed": "清除失败: ",
      "skipNonImage": "已跳过非图片文件：{name}",
      "skipOversize": "已跳过超过 10MB 的图片：{name}",
      "noUrl": "上传失败：服务端未返回地址",
      "uploadFailed": "图片上传失败：",
      "sendFailed": "发送失败: ",
      "reqFailed": "请求失败",
      "streamBroken": "流式连接断开"
    },
    "approval": {
      "approved": "✅ 已批准，继续执行中…",
      "failPrefix": "❌ {msg}",
      "exception": "❌ 异常：{msg}",
      "userRejected": "用户拒绝",
      "rejected": "🚫 已拒绝，继续基于拒绝结果回应"
    },
    "ctx": {
      "noSession": "上下文用量：暂无会话（发送消息后展示）",
      "usage": "上下文用量：约 {used} / {threshold} tokens（{percent}%）",
      "autoOn": "，超阈值自动压缩",
      "autoOff": "，自动压缩已关闭"
    }
  },
  "agent": {
    "console": {
      "title": "🤖 Agent 管理控制台",
      "newAgent": "+ 新建 Agent"
    },
    "table": {
      "name": "名称",
      "desc": "描述",
      "tools": "绑定工具",
      "maxIter": "迭代上限",
      "temp": "温度",
      "approval": "审批策略",
      "status": "状态",
      "actions": "操作",
      "none": "无",
      "enabled": "启用",
      "disabled": "禁用",
      "enable": "启用",
      "disable": "禁用",
      "edit": "编辑",
      "delete": "删除",
      "empty": "暂无 Agent 定义，点击右上角「新建 Agent」创建",
      "masterTitle": "主 Agent：可派发子 Agent"
    },
    "tools": {
      "title": "🛠 工具清单（{n}）",
      "needApproval": "需审批",
      "auto": "自动放行"
    },
    "pending": {
      "title": "⏳ 待审批（{n}）",
      "empty": "当前无待审批的工具调用",
      "approve": "批准",
      "reject": "拒绝"
    },
    "debug": {
      "banner": "调试台 — 快速验证 Agent 执行（不落库）",
      "bannerWith": "：{name}",
      "bannerDefault": "：默认（全部工具）",
      "session": "调试会话",
      "select": "选择 Agent（不选=默认全工具）",
      "recent": "最近执行",
      "meta": "{n} 次迭代 · {tools}",
      "noTools": "无工具",
      "title": "Agent 调试台",
      "sub": "验证 Agent 规划与工具调用。试试：",
      "q1": "计算 (128 + 56) * 3 等于多少",
      "q1Label": "🔢 数学计算",
      "q2": "现在几点了？请用工具查询",
      "q2Label": "🕐 查时间",
      "q3": "帮我搜索一下今天的科技新闻",
      "q3Label": "🔍 搜索（需审批）",
      "placeholderWith": "向选中的 Agent 提问…",
      "placeholder": "向 Agent 提问，Enter 发送，Shift+Enter 换行",
      "selected": "已选 Agent: {name}",
      "selectedDefault": "默认 Agent（全部工具）",
      "executing": "执行中…",
      "send": "发送"
    },
    "modal": {
      "edit": "编辑 Agent",
      "newPick": "新建 Agent · 选择模板",
      "newConfig": "新建 Agent · 配置",
      "blank": "空白开始",
      "blankDesc": "不使用模板，从零配置",
      "name": "名称 *",
      "namePh": "例如：数据分析助手",
      "desc": "描述",
      "descPh": "Agent 职责一句话",
      "sys": "系统提示词",
      "sysPh": "Agent 的角色设定与行为约束",
      "tools": "绑定工具",
      "kb": "绑定知识库（对话时自动检索注入，空=不绑定）",
      "kbEmpty": "知识库暂无已完成索引的文档",
      "skill": "公共 Skill（提示词包，勾选后注入指令段）",
      "skillEmpty": "Skill 目录为空或未扫描到 SKILL.md",
      "topK": "检索条数 topK（1-10）",
      "maxIter": "迭代上限",
      "temp": "温度",
      "role": "角色",
      "roleWorker": "普通 Agent（不可派发）",
      "roleMaster": "master（可派发子 Agent）",
      "workers": "允许派发的子 Agent（多选，仅列非 master）",
      "workersEmpty": "暂无可选子 Agent（先创建普通 Agent）",
      "approval": "审批策略",
      "approvalInherit": "继承默认（search 等外部工具需审批）",
      "approvalAll": "全部工具需审批（最严格）",
      "approvalNone": "免审批（可信 Agent，工具直接执行）",
      "enabled": "启用",
      "cancel": "取消",
      "repick": "← 重选模板",
      "save": "保存"
    },
    "msgs": {
      "approved": "已批准执行",
      "approveFailed": "审批失败",
      "exception": "异常：",
      "rejectedInfo": "已拒绝",
      "rejectedBy": "管理台拒绝",
      "opFailed": "操作失败",
      "updated": "更新成功",
      "created": "创建成功",
      "saveFailed": "保存失败",
      "enabledMsg": "已启用",
      "disabledMsg": "已禁用",
      "deleteConfirm": "确定删除 Agent「{name}」？此操作不可恢复。",
      "deleted": "已删除",
      "deleteFailed": "删除失败",
      "reqFailed": "❌ 请求失败",
      "approvedRunning": "✅ 已批准，Agent 继续执行中…",
      "rejectedContinuing": "🚫 已拒绝，Agent 将基于拒绝结果继续",
      "userRejected": "用户拒绝"
    },
    "labels": {
      "allApproval": "全部审批",
      "noApproval": "免审批",
      "inherit": "继承默认"
    },
    "health": {
      "up": "引擎运行中",
      "down": "引擎异常",
      "checking": "检查中…"
    }
  },
  "settings": {
    "nav": {
      "title": "设置",
      "sub": "偏好与配置"
    },
    "tabs": {
      "account": "账户设置",
      "model": "模型设置",
      "chat": "对话设置",
      "data": "数据管理",
      "plugin": "插件仓库",
      "skill": "公共 Skill"
    },
    "account": {
      "title": "账户设置",
      "desc": "管理您的账户信息",
      "username": "用户名",
      "nickname": "昵称",
      "editable": "可修改",
      "nicknamePh": "设置昵称",
      "email": "邮箱",
      "notSet": "未设置",
      "notLoggedIn": "未登录",
      "password": "密码",
      "saveNickname": "保存昵称",
      "changePassword": "修改密码",
      "nicknameUpdated": "昵称已更新",
      "updateFailed": "更新失败："
    },
    "modelSection": {
      "title": "模型设置",
      "desc": "查看可用模型并切换当前使用的 AI 模型",
      "current": "当前"
    },
    "provider": {
      "title": "模型服务",
      "desc": "描述",
      "newBtn": "+ 新增配置",
      "empty": "暂无配置，点击上方“新增配置”创建",
      "chat": "对话",
      "embedding": "向量",
      "current": "当前",
      "notConfigured": "未配置",
      "activate": "激活",
      "edit": "编辑",
      "delete": "删除",
      "formEdit": "编辑模型服务",
      "formNew": "新增模型服务",
      "name": "配置名称",
      "type": "类型",
      "provider": "服务商",
      "apiKey": "API Key",
      "modelName": "模型名称/端点 ID",
      "dim": "向量维度",
      "embeddingMode": "embedding 模式",
      "temp": "随机性 (0-2)",
      "maxTokens": "最大 token",
      "nameRequired": "请填写名称、Base URL 与模型名称",
      "apiKeyRequired": "新增配置需要填写 API Key",
      "saved": "已保存，配置即时生效",
      "saveFailed": "保存失败",
      "deleteTitle": "删除模型服务配置",
      "deleteContent": "确定删除 「{name}」？删除后相关服务回退 yml 配置。",
      "deleted": "已删除",
      "deleteFailed": "删除失败",
      "activated": "已激活：{name}",
      "activateFailed": "激活失败",
      "testOk": "连通正常",
      "testFailed": "连通失败",
      "testError": "测试失败",
      "testing": "测试中…",
      "testConn": "测试连通",
      "extraKeep": "留空保持原值",
      "extraNew": "保存后加密存储，不再回显",
      "saveActivate": "保存后激活为当前服务"
    },
    "chatSettings": {
      "title": "对话设置",
      "desc": "上下文自动压缩：长对话超过阈值时自动把旧消息合并为摘要，控制 token 占用",
      "autoCompact": "自动压缩",
      "autoCompactDesc": "发送消息前估算 token，未压缩内容超过阈值时自动压缩历史",
      "threshold": "压缩阈值（tokens）",
      "thresholdDesc": "超过该值触发自动压缩（1000 - 200000）",
      "keepRecent": "保留最近消息（条）",
      "keepRecentDesc": "压缩时保留最近 N 条原文不进摘要（2 - 200）",
      "compactNow": "立即压缩当前会话",
      "compacting": "压缩中…",
      "currentSession": "当前会话：{id}",
      "noSession": "暂无活跃会话——先到对话页发起或选择一个会话",
      "saved": "压缩设置已保存，全局生效",
      "saveFailed": "保存失败",
      "summaryDone": "已生成 {n} 字摘要（保留最近 {keep} 条原文）",
      "compactDone": "压缩完成",
      "compactFailed": "压缩失败",
      "compactFailedRetry": "压缩失败，请重试",
      "noActiveSession": "暂无活跃会话（去对话页发起/选择会话后可压缩）"
    },
    "data": {
      "title": "数据管理",
      "desc": "清除会话历史等本地数据",
      "clearCurrent": "清空当前会话",
      "clearCurrentDesc": "删除当前对话的消息记录",
      "deleteAll": "删除全部会话",
      "deleteAllDesc": "删除所有对话记录（不可恢复）",
      "clearTitle": "清空当前会话的消息？",
      "okClear": "清空",
      "cleared": "当前会话已清空",
      "clearFailed": "清空失败",
      "deleteAllTitle": "确定删除所有会话吗？此操作不可恢复！",
      "okDeleteAll": "全部删除",
      "allDeleted": "所有会话已删除",
      "deleteFailed": "删除失败："
    },
    "plugin": {
      "title": "插件仓库",
      "desc": "常用插件清单（首版形态＝外部 MCP server），一键安装即桥接工具",
      "refresh": "刷新清单",
      "hint": "内置样例端点为占位地址，需先自建 MCP server 并修改端点；工具白名单留空=不限",
      "codePh": "编码（如 my-plugin）",
      "namePh": "名称",
      "endpointPh": "端点 SSE URL",
      "allowPh": "工具白名单：a,b 或留空不限",
      "add": "新增",
      "colCode": "编码",
      "colName": "名称",
      "colDesc": "描述",
      "colEndpoint": "端点",
      "colAllow": "工具白名单",
      "colStatus": "状态",
      "colAction": "操作",
      "allowAll": "不限（全部桥接）",
      "installed": "已安装",
      "notInstalled": "未安装",
      "install": "安装",
      "uninstall": "卸载",
      "delete": "删除",
      "empty": "暂无插件条目",
      "codeRequired": "编码与端点必填",
      "added": "已新增：{code}",
      "addFailed": "新增失败",
      "installedMsg": "安装成功：{code}",
      "installFailed": "安装失败",
      "uninstalledMsg": "卸载成功：{code}",
      "uninstallFailed": "卸载失败",
      "deleteConfirm": "确定删除插件条目「{code}」？",
      "deleteFailed": "删除失败",
      "exception": "异常：",
      "deletedMsg": "已删除"
    },
    "skill": {
      "title": "公共 Skill",
      "desc": "扫描目录中的 SKILL.md，作为提示词包供 Agent 勾选启用",
      "dir": "扫描目录",
      "apply": "应用并重扫",
      "refresh": "刷新",
      "current": "当前生效：{dir}",
      "readable": "目录可读",
      "notReadable": "目录不存在或不可读",
      "count": "Skill 数：{n}",
      "dirRequired": "请输入目录",
      "switched": "目录已切换并重扫：{dir}",
      "switchFailed": "切换失败（目录不存在或不可读）",
      "dirPh": "例如 C:\\Users\\25333\\.agents\\skills",
      "hint": "说明：此处修改为运行时生效（仅内存），重启后回退到配置文件 / 环境变量 GEWU_SKILLS_DIR 的值。"
    },
    "pwd": {
      "fillAll": "请填写完整",
      "tooShort": "新密码至少 6 位",
      "mismatch": "两次输入的新密码不一致",
      "changed": "密码修改成功，请重新登录",
      "failed": "修改失败：",
      "modalTitle": "修改密码",
      "okConfirm": "确认修改",
      "oldPwd": "原密码",
      "oldPwdPh": "请输入原密码",
      "newPwd": "新密码",
      "newPwdPh": "至少 6 位",
      "confirmPwd": "确认新密码",
      "confirmPwdPh": "再次输入新密码"
    },
    "restore": {
      "btn": "恢复默认",
      "title": "确定要恢复默认设置吗？",
      "content": "将清除本地登录状态与会话记录"
    },
    "model": {
      "switched": "模型已切换：{id}",
      "switchFailed": "切换失败：",
      "loadFailed": "加载模型列表失败:"
    }
  }
}

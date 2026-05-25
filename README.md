# LangChain4j Learning Web

LangChain4j 学习平台 Web 前端，联调 `langchain4j-learning` 后端（端口 8081）。

## 技术栈

- Vue 3 (Composition API)
- Vite 5
- Pinia 状态管理
- Vue Router 路由
- Axios HTTP 请求
- Marked.js Markdown 渲染
- Highlight.js 代码高亮

## 功能

| 页面 | 说明 |
|------|------|
| 💬 AI 对话 | 多轮会话对话，支持简单模式/会话模式切换 |
| 📚 学习示例 | 5 个交互式示例：简单对话、角色扮演、通用问答、AI 翻译、代码分析 |
| 🤖 模型管理 | 查看可用模型列表，一键切换模型（百炼/火山引擎） |

## 快速开始

```bash
# 安装依赖
pnpm i

# 启动开发服务（端口 3001，自动代理到后端 8081）
pnpm run dev

# 生产构建
pnpm run build
```

## 项目结构

```
langchain4j-learning-web/
├── index.html
├── vite.config.js              # Vite 配置 + API 代理
├── package.json
├── public/
│   └── vite.svg
└── src/
    ├── main.js                 # 入口
    ├── App.vue                 # 主布局 + 侧边导航
    ├── router/
    │   └── index.js            # 路由配置
    ├── stores/
    │   └── chat.js             # Pinia 聊天状态管理
    ├── api/
    │   └── chat.js             # API 请求封装
    └── views/
        ├── ChatView.vue        # AI 对话页面
        ├── ExamplesView.vue    # 学习示例页面
        └── ModelView.vue       # 模型管理页面
```

## 后端联调

确保 `langchain4j-learning` 后端已启动（端口 8081）：

```bash
# 后端启动后访问
# http://localhost:3001 → 自动代理到 http://localhost:8081
```

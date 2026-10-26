# Gewu Web — 企业级 AI Agent 平台前端（Vue 3）

[![Vue](https://img.shields.io/badge/Vue-3-42b883)](https://vuejs.org)
[![Vite](https://img.shields.io/badge/Vite-5-646cff)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue)]../gewu/LICENSE)

**Gewu（格物）** AI 原生应用平台的 Web 前端。配合后端 [gewu-platform/gewu](https://github.com/gewu-platform/gewu)（Java 17 + Spring Boot 3 + LangChain4j，端口 8081）构成完整平台。

English: Web frontend of **Gewu** — an enterprise AI-native platform. Vue 3 + Vite 5 + Pinia, pairs with the [gewu](https://github.com/gewu-platform/gewu) backend.

## ✨ 功能全景

| 页面 | 说明 |
|------|------|
| 💬 AI 对话 | 多轮会话，SSE 逐 token 流式输出，Markdown 渲染 + 代码高亮，多模态图片输入 |
| 🤖 Agent 编排 | 模板创建向导（知识库问答/客服接待/通用助手）→ 人设 → 知识库绑定；对话实时展示思考/工具调用/审批卡 |
| 📚 RAG 知识库 | md/txt/pdf/docx 上传，异步索引，检索测试台（相似度分数可视化） |
| 🧩 Prompt 管理 | 模板版本制（创建自增 +1）、变量提取、渲染执行、一键回滚 |
| 📊 监控与报表 | LLM 调用链路、今日统计卡、24h 分布、模型排行；用量报表三视图（按天/用户/Agent） |
| ⚙️ 模型配置中心 | chat/embedding 双类型 Provider 管理，API Key 掩码显示，连通性测试，保存即生效 |

## 🛠 技术栈

- Vue 3（Composition API）+ Vite 5
- Pinia 状态管理 / Vue Router 路由
- Axios HTTP 请求
- Marked.js Markdown 渲染 + Highlight.js 代码高亮

## 🚀 快速开始

**前置**：Node 18+、后端 [gewu](https://github.com/gewu-platform/gewu) 已启动（默认 8081）

```bash
# 安装依赖（pnpm / npm 均可，锁文件双份都有）
pnpm i        # 或 npm i

# 启动开发服务（端口 3001，自动代理到后端 8081）
pnpm run dev  # 或 npm run dev

# 生产构建
pnpm run build
```

浏览器打开 `http://localhost:3001`，登录后即可使用（默认管理员见后端 `.env.example` 注释）。

## 🔗 后端联调

开发模式下 Vite 自动代理 `/api` → `http://localhost:8081`（见 `vite.config.js`），无需额外配置。

生产部署建议：nginx 托管 `dist/` 并反代 `/api` 到后端（完整配置见后端仓库 [docs/DEPLOY.md](https://github.com/gewu-platform/gewu/blob/develop/docs/DEPLOY.md)）。

## 📁 项目结构

```
gewu-web/
├── index.html                  # 入口（Gewu 品牌标题/favicon）
├── vite.config.js              # Vite 配置 + /api 代理
├── src/
│   ├── main.js                 # 应用入口
│   ├── App.vue                 # 主布局 + 侧边导航
│   ├── router/index.js         # 路由（/chat /agent /knowledge /prompt /monitor /models）
│   ├── stores/                 # Pinia 状态
│   ├── api/                    # 后端 API 封装（chat/agent/knowledge/monitor/settings）
│   ├── components/             # AuthModal 等组件
│   └── views/
│       ├── ChatView.vue        # AI 对话
│       ├── AgentView.vue       # Agent 编排（创建向导 + 对话）
│       ├── KnowledgeView.vue   # 知识库管理
│       ├── PromptView.vue      # Prompt 模板
│       ├── MonitorView.vue     # 监控与用量报表
│       ├── ModelView.vue       # 模型列表
│       └── SettingsView.vue    # 模型配置中心
```

## 📄 License

Apache-2.0（与后端一致）

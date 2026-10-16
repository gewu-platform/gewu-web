<template>
  <div class="examples-view">
    <div class="page-header">
      <h2>📚 学习示例</h2>
      <p>通过交互式界面体验 LangChain4j 的核心能力</p>
    </div>

    <div class="examples-grid">
      <!-- 简单对话 -->
      <div class="example-card">
        <div class="card-header">
          <span class="card-icon">💬</span>
          <h3>简单对话</h3>
        </div>
        <p class="card-desc">无上下文记忆，每次都是独立问答</p>
        <div class="card-body">
          <textarea
            v-model="simpleInput"
            class="input-area"
            placeholder="输入问题..."
            rows="3"
          ></textarea>
          <button class="btn-primary" @click="runSimple" :disabled="simpleLoading">
            {{ simpleLoading ? '思考中...' : '发送' }}
          </button>
          <div v-if="simpleResult" class="result-area" v-html="renderMarkdown(simpleResult)"></div>
        </div>
      </div>

      <!-- 角色扮演 -->
      <div class="example-card">
        <div class="card-header">
          <span class="card-icon">🎭</span>
          <h3>角色扮演</h3>
        </div>
        <p class="card-desc">通过 Prompt 模板切换 AI 角色和风格</p>
        <div class="card-body">
          <div class="form-row">
            <label>角色设定</label>
            <input v-model="roleInput" class="input-field" placeholder="如：Java老师" />
          </div>
          <div class="form-row">
            <label>回答风格</label>
            <input v-model="styleInput" class="input-field" placeholder="如：通俗易懂" />
          </div>
          <div class="form-row">
            <label>你的问题</label>
            <textarea v-model="roleQuestion" class="input-area" placeholder="向该角色提问..." rows="2"></textarea>
          </div>
          <button class="btn-primary" @click="runRole" :disabled="roleLoading">
            {{ roleLoading ? '思考中...' : '提问' }}
          </button>
          <div v-if="roleResult" class="result-area" v-html="renderMarkdown(roleResult)"></div>
        </div>
      </div>

      <!-- 通用问答 -->
      <div class="example-card">
        <div class="card-header">
          <span class="card-icon">❓</span>
          <h3>通用问答</h3>
        </div>
        <p class="card-desc">通过 Service 层封装的 AI 服务</p>
        <div class="card-body">
          <textarea
            v-model="qaInput"
            class="input-area"
            placeholder="输入你的问题..."
            rows="3"
          ></textarea>
          <button class="btn-primary" @click="runQA" :disabled="qaLoading">
            {{ qaLoading ? '思考中...' : '提问' }}
          </button>
          <div v-if="qaResult" class="result-area" v-html="renderMarkdown(qaResult)"></div>
        </div>
      </div>

      <!-- 翻译 -->
      <div class="example-card">
        <div class="card-header">
          <span class="card-icon">🌐</span>
          <h3>AI 翻译</h3>
        </div>
        <p class="card-desc">智能翻译，支持多种目标语言</p>
        <div class="card-body">
          <div class="form-row">
            <label>目标语言</label>
            <input v-model="translateTarget" class="input-field" value="中文" />
          </div>
          <textarea v-model="translateInput" class="input-area" placeholder="输入要翻译的文本..." rows="3"></textarea>
          <button class="btn-primary" @click="runTranslate" :disabled="translateLoading">
            {{ translateLoading ? '翻译中...' : '翻译' }}
          </button>
          <div v-if="translateResult" class="result-area" v-html="renderMarkdown(translateResult)"></div>
        </div>
      </div>

      <!-- 代码分析 -->
      <div class="example-card wide">
        <div class="card-header">
          <span class="card-icon">🛠</span>
          <h3>代码分析</h3>
        </div>
        <p class="card-desc">让 AI 审查代码、提出优化建议</p>
        <div class="card-body">
          <div class="form-row">
            <label>分析动作</label>
            <select v-model="codeAction" class="input-field">
              <option value="审查代码">审查代码</option>
              <option value="优化这段代码">优化代码</option>
              <option value="解释这段代码">解释代码</option>
              <option value="找出潜在Bug">找出 Bug</option>
            </select>
          </div>
          <textarea v-model="codeInput" class="input-area code-editor" placeholder="粘贴 Java 代码..." rows="6"></textarea>
          <button class="btn-primary" @click="runCodeAnalysis" :disabled="codeLoading">
            {{ codeLoading ? '分析中...' : '分析' }}
          </button>
          <div v-if="codeResult" class="result-area code-result" v-html="renderMarkdown(codeResult)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { marked } from 'marked'
import { serviceAsk, serviceTranslate, serviceAnalyze } from '@/api/chat'
import api from '@/api/chat'

// 统一解包 R<T>：{ code, message, data }
function unwrap(response) {
  if (response?.data !== undefined) {
    return response.data
  }
  return response
}

function renderMarkdown(content) {
  return marked.parse(content || '', { breaks: true, gfm: true })
}

// 简单对话
const simpleInput = ref('')
const simpleResult = ref('')
const simpleLoading = ref(false)

async function runSimple() {
  if (!simpleInput.value.trim()) return
  simpleLoading.value = true
  simpleResult.value = ''
  try {
    const res = await serviceAsk(simpleInput.value)
    simpleResult.value = res.response
  } catch (e) {
    simpleResult.value = `❌ 请求失败: ${e.message}`
  } finally {
    simpleLoading.value = false
  }
}

// 角色扮演
const roleInput = ref('Java老师')
const styleInput = ref('通俗易懂')
const roleQuestion = ref('')
const roleResult = ref('')
const roleLoading = ref(false)

async function runRole() {
  if (!roleQuestion.value.trim()) return
  roleLoading.value = true
  roleResult.value = ''
  try {
    // 原 /api/simple、/api/role 端点已删，改走 /api/service/session 带记忆对话
    const roleSessionId = 'lc4j-role-demo'
    const res = await api.post('/service/session', {
      sessionId: roleSessionId,
      message: `你是${roleInput.value}，回答风格${styleInput.value}。问题：${roleQuestion.value}`
    })
    // session 端点返回 { sessionId, message, response }（非 R 包装，axios 拦截器返回 response.data）
    roleResult.value = res.response
    // 清理演示会话，避免记忆污染下次演示
    api.delete(`/service/session/${roleSessionId}`).catch(() => {})
  } catch (e) {
    roleResult.value = `❌ 请求失败: ${e.message}`
  } finally {
    roleLoading.value = false
  }
}

// 通用问答
const qaInput = ref('')
const qaResult = ref('')
const qaLoading = ref(false)

async function runQA() {
  if (!qaInput.value.trim()) return
  qaLoading.value = true
  qaResult.value = ''
  try {
    const res = await serviceAsk(qaInput.value)
    qaResult.value = res.response
  } catch (e) {
    qaResult.value = `❌ 请求失败: ${e.message}`
  } finally {
    qaLoading.value = false
  }
}

// 翻译
const translateInput = ref('')
const translateTarget = ref('中文')
const translateResult = ref('')
const translateLoading = ref(false)

async function runTranslate() {
  if (!translateInput.value.trim()) return
  translateLoading.value = true
  translateResult.value = ''
  try {
    const res = await serviceTranslate(translateInput.value, translateTarget.value)
    translateResult.value = res.response
  } catch (e) {
    translateResult.value = `❌ 请求失败: ${e.message}`
  } finally {
    translateLoading.value = false
  }
}

// 代码分析
const codeInput = ref('')
const codeAction = ref('审查代码')
const codeResult = ref('')
const codeLoading = ref(false)

async function runCodeAnalysis() {
  if (!codeInput.value.trim()) return
  codeLoading.value = true
  codeResult.value = ''
  try {
    const res = await serviceAnalyze(codeAction.value, codeInput.value)
    codeResult.value = res.response
  } catch (e) {
    codeResult.value = `❌ 请求失败: ${e.message}`
  } finally {
    codeLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.examples-view {
  height: 100%;
  overflow-y: auto;
  padding: 24px;
}

.page-header {
  margin-bottom: 24px;
  h2 { font-size: 22px; margin-bottom: 6px; }
  p { color: var(--text-secondary); font-size: 14px; }
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  gap: 20px;
}

.example-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  &.wide { grid-column: 1 / -1; }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 20px 0;
  .card-icon { font-size: 22px; }
  h3 { font-size: 16px; font-weight: 600; }
}

.card-desc {
  padding: 6px 20px 0;
  font-size: 13px;
  color: var(--text-secondary);
}

.card-body {
  padding: 16px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
  label {
    font-size: 12px;
    color: var(--text-secondary);
    font-weight: 500;
  }
}

.input-field {
  padding: 8px 12px;
  border-radius: 8px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  font-size: 14px;
  outline: none;
  &:focus { border-color: var(--accent); }
}

.input-area {
  padding: 10px 14px;
  border-radius: 8px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  font-size: 14px;
  resize: vertical;
  outline: none;
  line-height: 1.5;
  &:focus { border-color: var(--accent); }
}

.code-editor {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 13px;
}

.btn-primary {
  align-self: flex-start;
  padding: 10px 24px;
  border-radius: 8px;
  background: var(--accent);
  border: none;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  &:hover:not(:disabled) { background: var(--accent-hover); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
}

.result-area {
  margin-top: 8px;
  padding: 14px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.6;
  max-height: 400px;
  overflow-y: auto;
  :deep(p) { margin-bottom: 8px; &:last-child { margin-bottom: 0; } }
  :deep(code) {
    background: var(--bg-tertiary);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
  }
  :deep(pre) {
    background: var(--bg-secondary);
    padding: 12px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 8px 0;
  }
  :deep(pre code) { background: transparent; padding: 0; }
}

.code-result {
  :deep(pre) { background: var(--bg-secondary); }
}
</style>

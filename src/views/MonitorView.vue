<template>
  <div class="monitor-view">
    <div class="monitor-shell">
      <div class="monitor-scroll" ref="scrollRef">

        <!-- 顶部统计卡片 -->
        <div class="stats-row">
          <div class="stat-card" v-for="stat in statsCards" :key="stat.label">
            <div class="stat-icon" :style="`background: ${stat.color}15; color: ${stat.color}`">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path v-html="stat.icon" />
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-label">{{ stat.label }}</span>
              <span class="stat-value">{{ getStatValue(stat) }}</span>
            </div>
          </div>
        </div>

        <!-- 24 小时调用分布 -->
        <section class="monitor-section">
          <div class="section-heading">
            <div class="section-icon" style="background: linear-gradient(135deg, #38bdf8, #0ea5e9)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div>
              <h2 class="section-title">24 小时调用分布</h2>
              <p class="section-desc">今日按小时统计</p>
            </div>
          </div>

          <div class="hourly-chart">
            <div class="bar-area">
              <div
                v-for="h in hourlyDistribution"
                :key="h.hour"
                class="bar-col"
                :title="`${h.hour}:00 — ${h.callCount} 次`"
              >
                <div class="bar-track">
                  <div
                    class="bar-fill"
                    :style="{ height: barHeight(h.callCount) }"
                  ></div>
                </div>
                <span class="bar-label">{{ h.hour }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 模型排行 -->
        <section class="monitor-section">
          <div class="section-heading">
            <div class="section-icon" style="background: linear-gradient(135deg, #6366f1, #8b5cf6)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
              </svg>
            </div>
            <div>
              <h2 class="section-title">模型使用排行</h2>
              <p class="section-desc">按调用次数排序</p>
            </div>
          </div>

          <div class="ranking-table">
            <div class="ranking-header">
              <span class="rank-col">#</span>
              <span class="name-col">模型</span>
              <span class="count-col">调用次数</span>
              <span class="token-col">Token 总量</span>
              <span class="cost-col">总费用 (元)</span>
            </div>
            <div
              v-for="(item, index) in modelRanking"
              :key="item.modelName"
              class="ranking-row"
            >
              <span class="rank-col">
                <span class="rank-badge" :class="`rank-${index + 1}`">{{ index + 1 }}</span>
              </span>
              <span class="name-col">{{ item.modelName }}</span>
              <span class="count-col">{{ item.callCount }}</span>
              <span class="token-col">{{ formatTokens(item.totalTokens) }}</span>
              <span class="cost-col">{{ item.totalCost?.toFixed(4) || '0.0000' }}</span>
            </div>
            <div v-if="modelRanking.length === 0" class="empty-hint">暂无数据</div>
          </div>
        </section>

        <!-- 调用日志 -->
        <section class="monitor-section">
          <div class="section-heading">
            <div class="section-icon" style="background: linear-gradient(135deg, #10b981, #059669)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <div>
              <h2 class="section-title">调用日志</h2>
              <p class="section-desc">最近的大模型调用记录</p>
            </div>
          </div>

          <!-- 筛选栏 -->
          <div class="filter-bar">
            <select v-model="query.modelName" class="filter-select" @change="loadLogs">
              <option :value="null">全部模型</option>
              <option v-for="m in modelNames" :key="m" :value="m">{{ m }}</option>
            </select>
            <select v-model="query.status" class="filter-select" @change="loadLogs">
              <option :value="null">全部状态</option>
              <option value="success">成功</option>
              <option value="error">失败</option>
              <option value="timeout">超时</option>
            </select>
            <input type="date" v-model="query.startDate" class="filter-date" @change="loadLogs" />
            <input type="date" v-model="query.endDate" class="filter-date" @change="loadLogs" />
          </div>

          <div class="log-table">
            <div class="log-header">
              <span class="log-col col-time">时间</span>
              <span class="log-col col-model">模型</span>
              <span class="log-col col-status">状态</span>
              <span class="log-col col-tokens">Tokens</span>
              <span class="log-col col-latency">延迟</span>
              <span class="log-col col-cost">费用</span>
            </div>
            <div
              v-for="log in logs"
              :key="log.id"
              class="log-row"
              :class="log.status"
            >
              <span class="log-col col-time">{{ formatTime(log.createTime) }}</span>
              <span class="log-col col-model">{{ log.modelName }}</span>
              <span class="log-col col-status">
                <span class="status-badge" :class="log.status">
                  {{ statusLabel(log.status) }}
                </span>
              </span>
              <span class="log-col col-tokens">{{ log.totalTokens || '-' }}</span>
              <span class="log-col col-latency">{{ log.latency != null ? log.latency + 'ms' : '-' }}</span>
              <span class="log-col col-cost">{{ log.cost?.toFixed(4) || '-' }}</span>
            </div>
            <div v-if="logs.length === 0" class="empty-hint">暂无日志记录</div>
          </div>

          <!-- 分页 -->
          <div class="pagination-bar">
            <button class="page-btn" :disabled="query.page <= 1" @click="query.page--; loadLogs()">上一页</button>
            <span class="page-info">第 {{ query.page }} 页 / 共 {{ totalPages }} 页（{{ total }} 条）</span>
            <button class="page-btn" :disabled="query.page >= totalPages" @click="query.page++; loadLogs()">下一页</button>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { getMonitorStats, getCallLogs } from '@/api/monitor'

const loading = ref(false)
const stats = ref(null)
const logs = ref([])
const total = ref(0)

const query = reactive({
  page: 1,
  size: 20,
  modelName: null,
  status: null,
  startDate: null,
  endDate: null
})

const statsCards = [
  { label: '今日调用', icon: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>', color: '#0ea5e9', key: 'todayCalls' },
  { label: '今日 Token', icon: '<path d="M12 2v4m0 12v4m-4-8H4m16 0h-4m-2.636-5.364-2.828-2.828m0 11.314 2.828 2.828M9.172 6.344 6.344 9.172m11.314 5.656 2.828 2.828"/>', color: '#10b981', key: 'todayTokens' },
  { label: '今日费用', icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>', color: '#f59e0b', key: 'todayCost' },
  { label: '平均延迟', icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', color: '#ef4444', key: 'avgLatency' }
]

const modelRanking = computed(() => stats.value?.topModels || [])
const hourlyDistribution = computed(() => stats.value?.hourlyDistribution || [])
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / query.size)))

// 日志里出现过的模型名（筛选用）
const modelNames = computed(() => {
  const names = new Set()
  for (const m of modelRanking.value) {
    if (m.modelName) names.add(m.modelName)
  }
  return [...names]
})

function formatTokens(n) {
  if (!n) return '-'
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
  return n.toString()
}

function getStatValue(card) {
  if (!stats.value) return '-'
  const raw = stats.value[card.key]
  if (raw == null) return '-'
  if (card.key === 'todayCost') return '¥' + Number(raw).toFixed(4)
  if (card.key === 'avgLatency') return Math.round(raw) + 'ms'
  if (card.key === 'todayTokens') return formatTokens(raw)
  return raw
}

function barHeight(count) {
  if (!count) return '0%'
  const max = Math.max(...hourlyDistribution.value.map(h => h.callCount || 0), 1)
  return Math.max(4, Math.round((count / max) * 100)) + '%'
}

function formatTime(t) {
  if (!t) return '-'
  return String(t).replace('T', ' ').substring(0, 19)
}

function statusLabel(s) {
  return { success: '成功', error: '失败', timeout: '超时' }[s] || s
}

async function loadStats() {
  try {
    const res = await getMonitorStats()
    if (res.code === 200 && res.data) {
      stats.value = res.data
    }
  } catch (err) {
    if (!err.isAuthError) message.error('加载监控数据失败: ' + err.message)
  }
}

async function loadLogs() {
  try {
    const params = {
      page: query.page,
      size: query.size
    }
    if (query.modelName) params.modelName = query.modelName
    if (query.status) params.status = query.status
    if (query.startDate) params.startDate = query.startDate
    if (query.endDate) params.endDate = query.endDate

    const res = await getCallLogs(params)
    if (res.code === 200 && res.data) {
      logs.value = res.data.records || []
      total.value = res.data.total || 0
    }
  } catch (err) {
    if (!err.isAuthError) message.error('加载日志失败: ' + err.message)
  }
}

onMounted(async () => {
  loading.value = true
  try {
    await Promise.all([loadStats(), loadLogs()])
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* ===== 整体 ===== */
.monitor-view {
  height: 100%;
  width: 100%;
  background: #f1f5f9;
  overflow: hidden;
}

.monitor-shell {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.monitor-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* ===== 统计卡片行 ===== */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px;
  background: #fff;
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.05);
  transition: all 0.2s ease;
}

.stat-card:hover {
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
  transform: translateY(-2px);
}

.stat-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg { width: 22px; height: 22px; }
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.stat-label {
  font-size: 12px;
  color: #64748b;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  font-variant-numeric: tabular-nums;
}

/* ===== 区块 ===== */
.monitor-section {
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.05);
  border-radius: 16px;
  padding: 20px 24px;
  margin-bottom: 20px;
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.section-icon {
  width: 38px;
  height: 38px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;

  svg { width: 19px; height: 19px; }
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.section-desc {
  font-size: 12px;
  color: #94a3b8;
  margin: 2px 0 0;
}

.empty-hint {
  padding: 28px 0;
  text-align: center;
  color: #94a3b8;
  font-size: 13px;
}

/* ===== 24 小时分布图 ===== */
.hourly-chart {
  padding: 8px 0;
}

.bar-area {
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  gap: 4px;
  align-items: end;
}

.bar-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.bar-track {
  width: 100%;
  height: 96px;
  display: flex;
  align-items: flex-end;
  background: #f8fafc;
  border-radius: 6px;
  overflow: hidden;
}

.bar-fill {
  width: 100%;
  min-height: 2px;
  background: linear-gradient(180deg, #38bdf8, #0ea5e9);
  border-radius: 6px 6px 0 0;
  transition: height 0.4s ease;
}

.bar-label {
  font-size: 10px;
  color: #94a3b8;
}

/* ===== 模型排行 ===== */
.ranking-table {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}

.ranking-header,
.ranking-row {
  display: grid;
  grid-template-columns: 48px 1fr 100px 110px 110px;
  align-items: center;
  padding: 0 16px;
}

.ranking-header {
  background: #f8fafc;
  font-size: 12px;
  color: #64748b;
  height: 40px;
}

.ranking-row {
  height: 46px;
  border-top: 1px solid #f1f5f9;
  font-size: 13px;
  color: #334155;
  transition: background 0.15s ease;

  &:hover { background: #f8fafc; }
}

.rank-col { text-align: center; }
.name-col { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.count-col, .token-col, .cost-col { text-align: right; font-variant-numeric: tabular-nums; }

.rank-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 700;
  background: #f1f5f9;
  color: #64748b;
}

.rank-1 { background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #fff; }
.rank-2 { background: linear-gradient(135deg, #94a3b8, #64748b); color: #fff; }
.rank-3 { background: linear-gradient(135deg, #d97706, #b45309); color: #fff; }

/* ===== 调用日志 ===== */
.filter-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.filter-select,
.filter-date {
  height: 34px;
  padding: 0 12px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #fff;
  font-size: 13px;
  color: #334155;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus { border-color: rgba(14, 165, 233, 0.5); }
}

.log-table {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}

.log-header,
.log-row {
  display: grid;
  grid-template-columns: 150px 1fr 76px 90px 90px 90px;
  align-items: center;
  padding: 0 16px;
}

.log-header {
  background: #f8fafc;
  font-size: 12px;
  color: #64748b;
  height: 40px;
}

.log-row {
  height: 44px;
  border-top: 1px solid #f1f5f9;
  font-size: 13px;
  color: #334155;
  transition: background 0.15s ease;

  &:hover { background: #f8fafc; }
  &.error .col-time { box-shadow: inset 3px 0 0 #ef4444; }
  &.timeout .col-time { box-shadow: inset 3px 0 0 #f59e0b; }
}

.col-time { font-variant-numeric: tabular-nums; color: #64748b; }
.col-model { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.col-tokens, .col-latency, .col-cost { text-align: right; font-variant-numeric: tabular-nums; }

.status-badge {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 9px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;

  &.success { background: rgba(16, 185, 129, 0.12); color: #059669; }
  &.error { background: rgba(239, 68, 68, 0.12); color: #dc2626; }
  &.timeout { background: rgba(245, 158, 11, 0.14); color: #b45309; }
}

/* ===== 分页 ===== */
.pagination-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
  margin-top: 14px;
}

.page-info {
  font-size: 12px;
  color: #94a3b8;
}

.page-btn {
  height: 30px;
  padding: 0 14px;
  border: 1px solid #e2e8f0;
  border-radius: 9px;
  background: #fff;
  font-size: 12px;
  color: #334155;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover:not(:disabled) { border-color: rgba(14, 165, 233, 0.5); color: #0ea5e9; }
  &:disabled { opacity: 0.45; cursor: not-allowed; }
}

/* ===== 响应式 ===== */
@media (max-width: 1100px) {
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .log-header, .log-row { grid-template-columns: 130px 1fr 70px 80px 80px 80px; }
}

@media (max-width: 720px) {
  .stats-row { grid-template-columns: 1fr; }
}
</style>

<template>
  <div class="approval-box">
    <div class="approval-title">⚠️ 工具调用需要审批</div>
    <div class="approval-detail">
      工具 <b>{{ toolName }}</b>，参数：<code>{{ toolInput }}</code>
    </div>
    <div class="approval-actions">
      <button class="btn-approve" :disabled="done" @click="$emit('approve')">✅ 批准执行</button>
      <button class="btn-reject" :disabled="done" @click="$emit('reject')">❌ 拒绝</button>
    </div>
    <div v-if="result" class="approval-result">{{ result }}</div>
  </div>
</template>

<script setup>
/**
 * 工具审批卡片（P8a 方案 D 公共组件）
 * AgentView 调试台与 ChatView 智能模式共用
 */
defineProps({
  toolName: { type: String, required: true },
  toolInput: { type: String, default: '' },
  done: { type: Boolean, default: false },
  result: { type: String, default: '' }
})
defineEmits(['approve', 'reject'])
</script>

<style lang="scss" scoped>
.approval-box {
  margin-bottom: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.35);

  .approval-title { font-size: 13px; font-weight: 600; color: #d97706; }
  .approval-detail {
    font-size: 12px;
    color: var(--text-primary);
    margin: 6px 0;
    code {
      background: var(--bg-tertiary);
      padding: 1px 6px;
      border-radius: 4px;
      font-size: 11px;
    }
  }
  .approval-actions {
    display: flex;
    gap: 8px;
    margin-top: 8px;

    button {
      padding: 5px 12px;
      border-radius: 8px;
      border: none;
      font-size: 12px;
      cursor: pointer;

      &:disabled { opacity: 0.5; cursor: not-allowed; }
    }
    .btn-approve { background: #10b981; color: white; }
    .btn-reject { background: rgba(248, 81, 73, 0.9); color: white; }
  }
  .approval-result {
    margin-top: 8px;
    font-size: 12px;
    color: var(--text-secondary);
  }
}
</style>

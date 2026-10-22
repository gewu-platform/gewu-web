<template>
  <div class="reasoning-block">
    <button class="reasoning-toggle" @click="$emit('toggle')">
      <span class="toggle-arrow" :class="{ open: show }">▸</span>
      推理过程（{{ iterations.length }} 次工具调用）
    </button>
    <div v-show="show" class="reasoning-timeline">
      <div v-for="(iter, i) in iterations" :key="i" class="timeline-step">
        <div class="step-header">
          <span class="step-badge">Step {{ iter.iteration }}</span>
          <span class="step-tool">{{ iter.toolName || '—' }}</span>
        </div>
        <div v-if="iter.thought" class="step-item">
          <span class="step-label">Thought</span>{{ iter.thought }}
        </div>
        <div v-if="iter.toolInput" class="step-item">
          <span class="step-label">Action</span><code>{{ iter.toolInput }}</code>
        </div>
        <div v-if="iter.observation" class="step-item">
          <span class="step-label">Observation</span>{{ iter.observation }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * 工具调用推理时间线（P8a 方案 D 公共组件）
 * AgentView 调试台与 ChatView 智能模式共用
 */
defineProps({
  iterations: { type: Array, default: () => [] },
  show: { type: Boolean, default: true }
})
defineEmits(['toggle'])
</script>

<style lang="scss" scoped>
.reasoning-block { margin-bottom: 8px; }

.reasoning-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: var(--accent);
  font-size: 12px;
  cursor: pointer;
  padding: 2px 0;
}

.toggle-arrow {
  display: inline-block;
  transition: transform 0.15s;
  &.open { transform: rotate(90deg); }
}

.reasoning-timeline {
  margin-top: 8px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
}

.timeline-step {
  padding: 8px 0;
  border-bottom: 1px dashed var(--border-color);

  &:last-child { border-bottom: none; }
}

.step-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;

  .step-badge {
    font-size: 10px;
    font-weight: 600;
    padding: 1px 7px;
    border-radius: 999px;
    background: rgba(14, 165, 233, 0.12);
    color: var(--accent);
  }
  .step-tool {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-primary);
  }
}

.step-item {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 4px;
  line-height: 1.5;
  word-break: break-word;

  .step-label {
    display: inline-block;
    font-size: 10px;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    margin-right: 6px;
    opacity: 0.8;
  }
  code {
    background: var(--bg-secondary);
    padding: 1px 5px;
    border-radius: 4px;
    font-size: 11px;
    color: var(--text-primary);
  }
}
</style>

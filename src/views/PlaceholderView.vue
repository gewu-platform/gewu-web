<template>
  <div class="placeholder-container">
    <div class="placeholder-card">
      <div class="placeholder-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="3"/>
          <path d="M12 8v8m-4-4h8"/>
        </svg>
      </div>
      <h2 class="placeholder-title">{{ placeholder }}</h2>
      <p class="placeholder-desc">该模块正在对齐 java-ai-native 逐步交付，敬请期待</p>
      <router-link to="/" class="back-link">返回对话</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const placeholder = computed(() => route.meta.placeholder || '开发中')
</script>

<style scoped>
.placeholder-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.placeholder-card {
  text-align: center;
  padding: 48px 64px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(148, 163, 184, 0.15);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
}

.placeholder-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(236, 72, 153, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0ea5e9;
}

.placeholder-icon svg {
  width: 32px;
  height: 32px;
}

.placeholder-title {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px;
}

.placeholder-desc {
  font-size: 14px;
  color: #64748b;
  margin: 0 0 24px;
}

.back-link {
  display: inline-block;
  padding: 8px 20px;
  border-radius: 10px;
  background: linear-gradient(135deg, #0ea5e9, #ec4899);
  color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.back-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
}
</style>

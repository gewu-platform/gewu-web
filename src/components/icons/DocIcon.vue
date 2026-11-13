<template>
  <!--
    文件图标（Feather 体系 · 24 网格 · 2px stroke）
    全仓原有 7 处重复内嵌同一 path，收敛到此处：
      KnowledgeView 5 处（导航项/区块头/行内/空态/紧凑行内）
      PromptView   2 处（区块头/空态）

    尺寸默认不设 width/height，交由外层 CSS 控制（.nav-item-icon svg 等）；
    只有需要覆盖 CSS 时才显式传 size。

    variant:
      plain       文件轮廓
      lines       文件 + 两条正文横线
      single-line 文件 + 一条居中横线（空态用）
  -->
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    :width="size || undefined"
    :height="size || undefined"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <template v-if="variant === 'lines'">
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </template>
    <line v-else-if="variant === 'single-line'" x1="9" y1="15" x2="15" y2="15" />
  </svg>
</template>

<script setup>
defineProps({
  /** 显式像素尺寸；不传则交由外层 CSS 控制 */
  size: { type: [Number, String], default: null },
  /** 描边粗细：常规 2，大号空态插图 1.5 */
  strokeWidth: { type: [Number, String], default: 2 },
  /** 图形变体 */
  variant: { type: String, default: 'plain' }
});
</script>

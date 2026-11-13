/**
 * 格物 Gewu — 设计令牌：语义颜色与图标规格
 *
 * 为什么单独成文件：V2.7.0 换品牌色时，全仓有 96 处颜色字面量需要 grep 替换，
 * 其中 6 处散落在各视图的 computed 数据数组里（模块识别色）。收敛到本文件后，
 * 未来调色只改这里。
 *
 * 取值对齐 App.vue :root 的设计令牌：
 *   品牌蓝 = --accent-600、橙 = --warning、绿 = --success、红 = --danger
 */

/** 品牌与状态色（与 :root 令牌同值，供 JS 数据层使用） */
export const COLORS = {
  brand: '#3370FF',   // = --accent-600
  brandDeep: '#2B5FD9', // = --accent-700
  violet: '#7C3AED',  // 模块识别色（紫，非品牌主色）
  teal: '#0D9488',    // 模块识别色（青）
  amber: '#F79009',   // = --warning
  green: '#12B76A',   // = --success
  red: '#D92D20'      // = --danger
};

/**
 * 模块识别色分配表
 *
 * 设计意图：多色导航用于「模块快速识别」，不是历史包袱，因此保留多色；
 * 但每个色必须来自上表，不再在各视图里手写十六进制。
 */
export const MODULE_COLORS = {
  // 知识库三个子页
  knowledgeDocs: COLORS.brand,
  knowledgeSearch: COLORS.amber,
  knowledgeUpload: COLORS.green,

  // 监控四个指标卡
  statCalls: COLORS.brand,
  statTokens: COLORS.green,
  statCost: COLORS.amber,
  statLatency: COLORS.red,

  // 设置六个分区
  settingAccount: COLORS.violet,
  settingModel: COLORS.brand,
  settingChat: COLORS.amber,
  settingData: COLORS.red,
  settingPlugin: COLORS.teal,
  settingSkill: COLORS.green
};

/**
 * 图标渲染尺寸规格
 *
 * 约束：新页面按此表取尺寸，不再随手写 px。
 * 数值来源：现有各视图的实测值（nav-icon-wrap / nav-item-icon / section-icon /
 * stat-icon / doc-file-icon / empty-icon）。
 */
export const ICON_SIZES = {
  /** 侧边栏模块大图标（模块头） */
  navHeader: 20,
  /** 侧边栏子项图标 */
  navItem: 17,
  /** 区块标题左侧图标容器（容器 38~40px） */
  sectionHead: 21,
  /** 指标卡图标 */
  statCard: 20,
  /** 行内小图标（表格里的文件类型标记等） */
  inline: 16,
  /** 紧凑行内（如标签旁） */
  inlineCompact: 14,
  /** 空态插图 */
  emptyState: 40,
  /** 空态插图（次要） */
  emptyStateSm: 36
};

export default { COLORS, MODULE_COLORS, ICON_SIZES };

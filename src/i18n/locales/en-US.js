/**
 * English locale (mirrors zh-CN key structure)
 * Modules: nav/common/header/login (batch 2) + model/approval/placeholder/reasoning (3a)
 *          + promptView/knowledge (3b) + monitor (3c)
 */
export default {
  nav: {
    chat: 'Chat',
    knowledge: 'Knowledge',
    prompt: 'Templates',
    monitor: 'Monitor',
    agent: 'Agent',
    settings: 'Settings'
  },
  common: {
    confirm: 'Confirm',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    create: 'New',
    search: 'Search',
    loading: 'Loading…',
    retry: 'Retry',
    close: 'Close',
    success: 'Done',
    failed: 'Operation failed',
    none: 'No data',
    send: 'Send',
    copy: 'Copy',
    copied: 'Copied',
    download: 'Download',
    upload: 'Upload',
    back: 'Back',
    enable: 'Enable',
    disable: 'Disable',
    enabled: 'Enabled',
    disabled: 'Disabled'
  },
  header: {
    logout: 'Sign out',
    login: 'Sign in / Sign up',
    profile: 'Profile',
    language: 'Language / 语言',
    online: 'Service online',
    offline: 'Service unavailable'
  },
  login: {
    title: 'Sign in',
    register: 'Sign up',
    username: 'Username',
    password: '***',
    email: 'Email',
    submit: 'Sign in',
    toRegister: 'No account? Sign up',
    toLogin: 'Already have an account? Sign in'
  },
  model: {
    title: '🤖 Model Management',
    subtitle: 'View available models and switch the active AI model',
    currentLabel: 'Active model',
    currentBadge: 'Current',
    switching: 'Switching...',
    switchFailed: 'Model switch failed: '
  },
  approval: {
    title: '⚠️ Tool call requires approval',
    body: 'Tool',
    paramsPrefix: ', args: ',
    approve: '✅ Approve',
    reject: '❌ Reject',
    readonly: '⏳ Waiting for an admin to handle the approval on the Agent page'
  },
  placeholder: {
    desc: 'This module is being delivered incrementally against java-ai-native — stay tuned',
    backToChat: 'Back to chat',
    developing: 'Under development'
  },
  reasoning: {
    title: 'Reasoning ({n} tool calls)'
  },
  promptView: {
    sidebar: { title: 'Prompt Templates', sub: 'Versioned template management', new: 'New template' },
    list: { noDesc: 'No description', defaultModel: 'Default model', active: 'Active', inactive: 'Inactive', empty: 'No templates', default: 'Default' },
    tabs: { detail: 'Details', execute: 'Execute' },
    detail: { desc: 'Description', userPrompt: 'User Prompt Template', executeBtn: 'Execute' },
    execute: { fillVars: 'Fill variables', varPlaceholder: 'Value for {v}', noVars: 'This template has no variable placeholders', running: 'Running...', run: 'Execute', result: 'Result' },
    empty: { pick: 'Pick a template on the left to view details or execute' },
    modal: {
      new: 'New Prompt Template', name: 'Template name', namePh: 'e.g. code-review',
      desc: 'Description', descPh: 'What the template is for', sysPh: 'System role setup',
      userPrompt: 'User Prompt Template', userPromptPh: 'Use {variable} placeholders',
      model: 'Model', modelPh: 'Pick a recommended model', temp: 'Temperature',
      nameRequired: 'Template name and User Prompt are required',
      created: 'Template created', createFailed: 'Create failed: '
    },
    msgs: { loadFailed: 'Load templates failed: ', modelsFailed: 'Load models failed: ', execOk: 'Template executed', execFailed: 'Execute failed: ' }
  },
  knowledge: {
    nav: { title: 'Knowledge Base', sub: 'Document management & retrieval' },
    docs: {
      title: 'Documents', desc: '{n} knowledge documents uploaded',
      colName: 'File', colType: 'Type', colSize: 'Size', colChunks: 'Chunks',
      colStatus: 'Status', colTime: 'Uploaded', colAction: 'Actions',
      empty: 'No documents', emptyDesc: 'Switch to the "Upload" tab to add your first document',
      uploadBtn: 'Upload document', viewDetail: 'View details', delete: 'Delete'
    },
    upload: {
      title: 'Upload Document', desc: 'PDF, DOCX, TXT, MD supported',
      drop: 'Drag files here, or click to select',
      dropDesc: 'PDF, DOCX, TXT, MD supported — parsed and vector-indexed automatically',
      progress: 'Uploading document; parsing and vectorization run in the background...'
    },
    search: {
      title: 'Knowledge Search', desc: 'Semantic vector search over knowledge chunks',
      placeholder: 'Type a question or keywords, press Enter to search...', btn: 'Search',
      topK: 'Results:', spinning: 'Semantic searching...',
      found: 'Found {n} related knowledge chunks', similarity: 'Similarity {p}%',
      emptyTitle: 'No related knowledge found', emptyDesc: 'Try different keywords, or upload more documents first'
    },
    detail: { title: 'Document Details', name: 'File', type: 'Type', size: 'Size', chunks: 'Chunks', status: 'Status', uploader: 'Uploaded by', time: 'Uploaded at' },
    status: { pending: 'Pending', processing: 'Processing', done: 'Completed', failed: 'Failed', unknown: 'Unknown' },
    tabs: { docs: 'Documents', search: 'Search', upload: 'Upload' },
    recent: { title: 'Recent uploads' },
    msgs: {
      loadFailed: 'Load documents failed: ', detailFailed: 'Get document details failed: ',
      deleted: 'Document deleted', deleteFailed: 'Delete failed: ',
      deleteTitle: 'Delete document', deleteContent: 'Delete "{name}"? Its vector index will be removed too.',
      okDelete: 'Delete', cancel: 'Cancel',
      badType: 'Unsupported file type: .{ext}, allowed: {allowed}',
      uploaded: 'Document "{name}" uploaded; parsing in progress', uploadFailed: 'Upload failed: ',
      emptyKeyword: 'Please enter search keywords', found: 'Found {n} related knowledge chunks',
      notFound: 'No related knowledge found', searchFailed: 'Search failed: '
    }
  },
  monitor: {
    hours: { title: '24h call distribution', desc: 'Hourly stats for today', tip: '{h}:00 — {n} calls' },
    ranking: { title: 'Model leaderboard', desc: 'Sorted by call count', colModel: 'Model', colCalls: 'Calls', colTokens: 'Total tokens', colCost: 'Cost (CNY)' },
    usage: {
      title: 'Usage reports', desc: 'Day / user / agent views (last {n} days)',
      byDay: 'By day', byUser: 'By user', byAgent: 'By agent',
      d7: 'Last 7 days', d14: 'Last 14 days', d30: 'Last 30 days',
      colDate: 'Date', colUser: 'User', colAgent: 'Source', colCalls: 'Calls',
      colIn: 'Input tokens', colOut: 'Output tokens', colTotal: 'Total tokens', colCost: 'Cost (CNY)'
    },
    logs: {
      title: 'Call logs', desc: 'Recent LLM call records',
      allModels: 'All models', allStatus: 'All statuses',
      success: 'Success', failed: 'Failed', timeout: 'Timeout',
      colTime: 'Time', colModel: 'Model', colStatus: 'Status', colLatency: 'Latency', colCost: 'Cost',
      empty: 'No log records', prev: 'Prev', next: 'Next',
      pageInfo: 'Page {p} / {m} ({t} records)', loadFailed: 'Load logs failed: '
    },
    msgs: { loadFailed: 'Load monitoring data failed: ' },
    stats: { todayCalls: 'Calls today', todayTokens: 'Tokens today', todayCost: 'Cost today', avgLatency: 'Avg latency' }
  }
}

/**
 * English locale (mirrors zh-CN key structure)
 * Modules: nav/common/header/login (batch 2) + model/approval/placeholder/reasoning (3a)
 *          + promptView/knowledge (3b) + monitor (3c)
 */
export default {
  "nav": {
    "chat": "Chat",
    "knowledge": "Knowledge",
    "prompt": "Templates",
    "monitor": "Monitor",
    "agent": "Agent",
    "settings": "Settings"
  },
  "common": {
    "confirm": "Confirm",
    "cancel": "Cancel",
    "save": "Save",
    "delete": "Delete",
    "edit": "Edit",
    "create": "New",
    "search": "Search",
    "loading": "Loading…",
    "retry": "Retry",
    "close": "Close",
    "success": "Done",
    "failed": "Operation failed",
    "none": "No data",
    "send": "Send",
    "copy": "Copy",
    "copied": "Copied",
    "download": "Download",
    "upload": "Upload",
    "back": "Back",
    "enable": "Enable",
    "disable": "Disable",
    "enabled": "Enabled",
    "disabled": "Disabled",
    "exception": "Exception: "
  },
  "header": {
    "logout": "Sign out",
    "login": "Sign in / Sign up",
    "profile": "Profile",
    "language": "Language / 语言",
    "online": "Service online",
    "offline": "Service unavailable"
  },
  "login": {
    "title": "Sign in",
    "register": "Sign up",
    "username": "Username",
    "password": "***",
    "email": "Email",
    "submit": "Sign in",
    "toRegister": "No account? Sign up",
    "toLogin": "Already have an account? Sign in"
  },
  "model": {
    "title": "🤖 Model Management",
    "subtitle": "View available models and switch the active AI model",
    "currentLabel": "Active model",
    "currentBadge": "Current",
    "switching": "Switching...",
    "switchFailed": "Model switch failed: "
  },
  "approval": {
    "title": "⚠️ Tool call requires approval",
    "body": "Tool",
    "paramsPrefix": ", args: ",
    "approve": "✅ Approve",
    "reject": "❌ Reject",
    "readonly": "⏳ Waiting for an admin to handle the approval on the Agent page"
  },
  "placeholder": {
    "desc": "This module is being delivered incrementally against java-ai-native — stay tuned",
    "backToChat": "Back to chat",
    "developing": "Under development"
  },
  "reasoning": {
    "title": "Reasoning ({n} tool calls)"
  },
  "promptView": {
    "sidebar": {
      "title": "Prompt Templates",
      "sub": "Versioned template management",
      "new": "New template"
    },
    "list": {
      "noDesc": "No description",
      "defaultModel": "Default model",
      "active": "Active",
      "inactive": "Inactive",
      "empty": "No templates",
      "default": "Default"
    },
    "tabs": {
      "detail": "Details",
      "execute": "Execute"
    },
    "detail": {
      "desc": "Description",
      "userPrompt": "User Prompt Template",
      "executeBtn": "Execute"
    },
    "execute": {
      "fillVars": "Fill variables",
      "varPlaceholder": "Value for {v}",
      "noVars": "This template has no variable placeholders",
      "running": "Running...",
      "run": "Execute",
      "result": "Result"
    },
    "empty": {
      "pick": "Pick a template on the left to view details or execute"
    },
    "modal": {
      "new": "New Prompt Template",
      "name": "Template name",
      "namePh": "e.g. code-review",
      "desc": "Description",
      "descPh": "What the template is for",
      "sysPh": "System role setup",
      "userPrompt": "User Prompt Template",
      "userPromptPh": "Use {variable} placeholders",
      "model": "Model",
      "modelPh": "Pick a recommended model",
      "temp": "Temperature",
      "nameRequired": "Template name and User Prompt are required",
      "created": "Template created",
      "createFailed": "Create failed: "
    },
    "msgs": {
      "loadFailed": "Load templates failed: ",
      "modelsFailed": "Load models failed: ",
      "execOk": "Template executed",
      "execFailed": "Execute failed: "
    }
  },
  "knowledge": {
    "nav": {
      "title": "Knowledge Base",
      "sub": "Document management & retrieval"
    },
    "docs": {
      "title": "Documents",
      "desc": "{n} knowledge documents uploaded",
      "colName": "File",
      "colType": "Type",
      "colSize": "Size",
      "colChunks": "Chunks",
      "colStatus": "Status",
      "colTime": "Uploaded",
      "colAction": "Actions",
      "empty": "No documents",
      "emptyDesc": "Switch to the \"Upload\" tab to add your first document",
      "uploadBtn": "Upload document",
      "viewDetail": "View details",
      "delete": "Delete"
    },
    "upload": {
      "title": "Upload Document",
      "desc": "PDF, DOCX, TXT, MD supported",
      "drop": "Drag files here, or click to select",
      "dropDesc": "PDF, DOCX, TXT, MD supported — parsed and vector-indexed automatically",
      "progress": "Uploading document; parsing and vectorization run in the background..."
    },
    "search": {
      "title": "Knowledge Search",
      "desc": "Semantic vector search over knowledge chunks",
      "placeholder": "Type a question or keywords, press Enter to search...",
      "btn": "Search",
      "topK": "Results:",
      "spinning": "Semantic searching...",
      "found": "Found {n} related knowledge chunks",
      "similarity": "Similarity {p}%",
      "emptyTitle": "No related knowledge found",
      "emptyDesc": "Try different keywords, or upload more documents first"
    },
    "detail": {
      "title": "Document Details",
      "name": "File",
      "type": "Type",
      "size": "Size",
      "chunks": "Chunks",
      "status": "Status",
      "uploader": "Uploaded by",
      "time": "Uploaded at"
    },
    "status": {
      "pending": "Pending",
      "processing": "Processing",
      "done": "Completed",
      "failed": "Failed",
      "unknown": "Unknown"
    },
    "tabs": {
      "docs": "Documents",
      "search": "Search",
      "upload": "Upload"
    },
    "recent": {
      "title": "Recent uploads"
    },
    "msgs": {
      "loadFailed": "Load documents failed: ",
      "detailFailed": "Get document details failed: ",
      "deleted": "Document deleted",
      "deleteFailed": "Delete failed: ",
      "deleteTitle": "Delete document",
      "deleteContent": "Delete \"{name}\"? Its vector index will be removed too.",
      "okDelete": "Delete",
      "cancel": "Cancel",
      "badType": "Unsupported file type: .{ext}, allowed: {allowed}",
      "uploaded": "Document \"{name}\" uploaded; parsing in progress",
      "uploadFailed": "Upload failed: ",
      "emptyKeyword": "Please enter search keywords",
      "found": "Found {n} related knowledge chunks",
      "notFound": "No related knowledge found",
      "searchFailed": "Search failed: "
    }
  },
  "monitor": {
    "hours": {
      "title": "24h call distribution",
      "desc": "Hourly stats for today",
      "tip": "{h}:00 — {n} calls"
    },
    "ranking": {
      "title": "Model leaderboard",
      "desc": "Sorted by call count",
      "colModel": "Model",
      "colCalls": "Calls",
      "colTokens": "Total tokens",
      "colCost": "Cost (CNY)"
    },
    "usage": {
      "title": "Usage reports",
      "desc": "Day / user / agent views (last {n} days)",
      "byDay": "By day",
      "byUser": "By user",
      "byAgent": "By agent",
      "d7": "Last 7 days",
      "d14": "Last 14 days",
      "d30": "Last 30 days",
      "colDate": "Date",
      "colUser": "User",
      "colAgent": "Source",
      "colCalls": "Calls",
      "colIn": "Input tokens",
      "colOut": "Output tokens",
      "colTotal": "Total tokens",
      "colCost": "Cost (CNY)"
    },
    "logs": {
      "title": "Call logs",
      "desc": "Recent LLM call records",
      "allModels": "All models",
      "allStatus": "All statuses",
      "success": "Success",
      "failed": "Failed",
      "timeout": "Timeout",
      "colTime": "Time",
      "colModel": "Model",
      "colStatus": "Status",
      "colLatency": "Latency",
      "colCost": "Cost",
      "empty": "No log records",
      "prev": "Prev",
      "next": "Next",
      "pageInfo": "Page {p} / {m} ({t} records)",
      "loadFailed": "Load logs failed: "
    },
    "msgs": {
      "loadFailed": "Load monitoring data failed: "
    },
    "stats": {
      "todayCalls": "Calls today",
      "todayTokens": "Tokens today",
      "todayCost": "Cost today",
      "avgLatency": "Avg latency"
    }
  },
  "chat": {
    "sessions": {
      "title": "💬 Sessions",
      "newSession": "New session",
      "delGroup": "Delete group (sessions return to default)",
      "childTag": "↳ child",
      "rename": "Rename",
      "moveToGroup": "Move to group",
      "derive": "Derive sub-session",
      "delSession": "Delete session",
      "empty": "No sessions",
      "fallback": "Session"
    },
    "rename": {
      "title": "Rename session",
      "save": "Save"
    },
    "move": {
      "title": "Move \"{name}\" to group",
      "orNew": "Or create a group",
      "namePh": "Group name (empty = Default)",
      "toDefault": "Move to Default"
    },
    "hero": {
      "title": "Gewu Smart Chat",
      "sub": "Sync calls, streaming output, session memory, persona roleplay",
      "q1": "Tell me about Gewu core capabilities",
      "q1Label": "🌱 What is Gewu?",
      "q2": "How do agent orchestration and the approval gateway work?",
      "q2Label": "⚡ How does agent orchestration work?",
      "q3": "Write a tool-calling example in Java",
      "q3Label": "🛠 Tool Calling example"
    },
    "msg": {
      "me": "Me",
      "ragHits": "📚 Retrieved {n} related chunks from the knowledge base",
      "ragEmpty": "📚 No knowledge base hits",
      "ragFailed": "📚 Knowledge base retrieval failed",
      "attachAlt": "attachment"
    },
    "input": {
      "remove": "Remove",
      "images": "{n} images",
      "withImages": "{n} images attached, keep typing...",
      "placeholder": "Type a question... (Enter to send, paste images directly)",
      "upload": "Upload image (or just Ctrl+V paste)",
      "switchModel": "Switch model"
    },
    "panel": {
      "online": "Backend online",
      "offline": "Backend offline",
      "budget": "Prompt budget",
      "lastTokens": "Tokens of the last run",
      "in": "In",
      "out": "Out",
      "smartTitle": "Let the model call tools autonomously (calc/time/search etc.), with session memory and tool trails",
      "smart": "🧠 Smart",
      "smartOn": ": tools enabled",
      "kbTitle": "Search the selected knowledge documents",
      "kb": "📚 Knowledge",
      "pickDoc": "Select documents:",
      "kbEmpty": "Knowledge base is empty — upload documents on the Knowledge page first",
      "clearHistory": "🗑 Clear session history",
      "estCost": "Est. cost ${cost}"
    },
    "msgs": {
      "renameEmpty": "Name cannot be empty",
      "renamed": "Renamed",
      "renameFailed": "[Gewu] Rename failed: ",
      "moved": "Moved to group: {name}",
      "movedDefault": "Moved to Default",
      "moveFailed": "[Gewu] Move failed: ",
      "dissolved": "Group deleted ({n} sessions returned to Default)",
      "dissolveFailed": "[Gewu] Delete group failed: ",
      "childCreated": "Sub-session created",
      "deriveFailed": "[Gewu] Derive failed: ",
      "cmdFailed": "Command execution failed",
      "switched": "Switched to {name}",
      "switchFailed": "Model switch failed",
      "created": "New session created",
      "createFailed": "Create session failed: ",
      "loadFailed": "Load session failed",
      "delTitle": "Delete session",
      "delContent": "This will permanently delete the session and all its messages. Continue?",
      "ok": "OK",
      "deleted": "Session deleted",
      "delFailed": "Delete failed: ",
      "cleared": "Session cleared",
      "clearTitle": "Clear session",
      "clearContent": "Clear all messages of the current session? (the session itself is kept)",
      "historyCleared": "Session history cleared",
      "clearFailed": "Clear failed: ",
      "skipNonImage": "Skipped non-image file: {name}",
      "skipOversize": "Skipped image over 10MB: {name}",
      "noUrl": "Upload failed: server returned no URL",
      "uploadFailed": "Image upload failed: ",
      "sendFailed": "Send failed: ",
      "reqFailed": "Request failed",
      "streamBroken": "Streaming connection lost"
    },
    "approval": {
      "approved": "✅ Approved, resuming…",
      "failPrefix": "❌ {msg}",
      "exception": "❌ Exception: {msg}",
      "userRejected": "User rejected",
      "rejected": "🚫 Rejected, responding based on the rejection"
    },
    "ctx": {
      "noSession": "Context usage: no session yet (shown after sending)",
      "usage": "Context usage: ~{used} / {threshold} tokens ({percent}%)",
      "autoOn": ", auto-compact above threshold",
      "autoOff": ", auto-compact off"
    }
  },
  "agent": {
    "console": {
      "title": "🤖 Agent Management Console",
      "newAgent": "+ New Agent"
    },
    "table": {
      "name": "Name",
      "desc": "Description",
      "tools": "Tools",
      "maxIter": "Max iterations",
      "temp": "Temperature",
      "approval": "Approval",
      "status": "Status",
      "actions": "Actions",
      "none": "None",
      "enabled": "Enabled",
      "disabled": "Disabled",
      "enable": "Enable",
      "disable": "Disable",
      "edit": "Edit",
      "delete": "Delete",
      "empty": "No agent definitions — click \"New Agent\" to create one",
      "masterTitle": "Master agent: can dispatch sub-agents"
    },
    "tools": {
      "title": "🛠 Tools ({n})",
      "needApproval": "Approval required",
      "auto": "Auto-approved"
    },
    "pending": {
      "title": "⏳ Pending ({n})",
      "empty": "No pending tool calls",
      "approve": "Approve",
      "reject": "Reject"
    },
    "debug": {
      "banner": "Debug bench — quick agent run (not persisted)",
      "bannerWith": ": {name}",
      "bannerDefault": ": default (all tools)",
      "session": "Debug session",
      "select": "Select agent (none = all tools)",
      "recent": "Recent runs",
      "meta": "{n} iterations · {tools}",
      "noTools": "no tools",
      "title": "Agent Debug Bench",
      "sub": "Verify agent planning and tool calls. Try:",
      "q1": "What is (128 + 56) * 3",
      "q1Label": "🔢 Math",
      "q2": "What time is it? Use a tool",
      "q2Label": "🕐 Time",
      "q3": "Search today's tech news",
      "q3Label": "🔍 Search (needs approval)",
      "placeholderWith": "Ask the selected agent…",
      "placeholder": "Ask the agent, Enter to send, Shift+Enter for newline",
      "selected": "Selected agent: {name}",
      "selectedDefault": "Default agent (all tools)",
      "executing": "Running…",
      "send": "Send"
    },
    "modal": {
      "edit": "Edit Agent",
      "newPick": "New Agent · Pick template",
      "newConfig": "New Agent · Configure",
      "blank": "Blank start",
      "blankDesc": "Configure from scratch without a template",
      "name": "Name *",
      "namePh": "e.g. Data analyst",
      "desc": "Description",
      "descPh": "One line for the agent's role",
      "sys": "System prompt",
      "sysPh": "Role setup and behavior constraints",
      "tools": "Tools",
      "kb": "Knowledge binding (auto-retrieved during chat; empty = none)",
      "kbEmpty": "No indexed knowledge documents yet",
      "skill": "Public Skills (prompt packs; checked ones are injected)",
      "skillEmpty": "Skill directory empty or no SKILL.md found",
      "topK": "Retrieval topK (1-10)",
      "maxIter": "Max iterations",
      "temp": "Temperature",
      "role": "Role",
      "roleWorker": "Worker (cannot dispatch)",
      "roleMaster": "master (can dispatch sub-agents)",
      "workers": "Allowed sub-agents (multi-select, non-master only)",
      "workersEmpty": "No selectable sub-agents (create a worker first)",
      "approval": "Approval policy",
      "approvalInherit": "Inherit default (external tools need approval)",
      "approvalAll": "All tools need approval (strictest)",
      "approvalNone": "No approval (trusted agent)",
      "enabled": "Enabled",
      "cancel": "Cancel",
      "repick": "← Re-pick template",
      "save": "Save"
    },
    "msgs": {
      "approved": "Approved",
      "approveFailed": "Approval failed",
      "exception": "Exception: ",
      "rejectedInfo": "Rejected",
      "rejectedBy": "Rejected from console",
      "opFailed": "Operation failed",
      "updated": "Updated",
      "created": "Created",
      "saveFailed": "Save failed",
      "enabledMsg": "Enabled",
      "disabledMsg": "Disabled",
      "deleteConfirm": "Delete agent \"{name}\"? This cannot be undone.",
      "deleted": "Deleted",
      "deleteFailed": "Delete failed",
      "reqFailed": "❌ Request failed",
      "approvedRunning": "✅ Approved, agent resuming…",
      "rejectedContinuing": "🚫 Rejected, agent continues based on the rejection",
      "userRejected": "Rejected by user"
    },
    "labels": {
      "allApproval": "All approved",
      "noApproval": "No approval",
      "inherit": "Inherit default"
    },
    "health": {
      "up": "Engine running",
      "down": "Engine error",
      "checking": "Checking…"
    }
  },
  "settings": {
    "nav": {
      "title": "Settings",
      "sub": "Preferences & configuration"
    },
    "tabs": {
      "account": "Account",
      "model": "Models",
      "chat": "Chat settings",
      "data": "Data",
      "plugin": "Plugins",
      "skill": "Public Skills"
    },
    "account": {
      "title": "Account",
      "desc": "Manage your account information",
      "username": "Username",
      "nickname": "Nickname",
      "editable": "editable",
      "nicknamePh": "Set nickname",
      "email": "Email",
      "notSet": "Not set",
      "notLoggedIn": "Not signed in",
      "password": "Password",
      "saveNickname": "Save nickname",
      "changePassword": "Change password",
      "nicknameUpdated": "Nickname updated",
      "updateFailed": "Update failed: "
    },
    "modelSection": {
      "title": "Model Settings",
      "desc": "View available models and switch the active AI model",
      "current": "Current"
    },
    "provider": {
      "title": "Model Services",
      "desc": "Description",
      "newBtn": "+ New configuration",
      "empty": "No configurations yet — click \"New configuration\" above to create one",
      "chat": "Chat",
      "embedding": "Embedding",
      "current": "Current",
      "notConfigured": "Not configured",
      "activate": "Activate",
      "edit": "Edit",
      "delete": "Delete",
      "formEdit": "Edit Model Service",
      "formNew": "New Model Service",
      "name": "Configuration name",
      "type": "Type",
      "provider": "Provider",
      "apiKey": "API Key",
      "modelName": "Model name / endpoint ID",
      "dim": "Embedding dimension",
      "embeddingMode": "Embedding mode",
      "temp": "Temperature (0-2)",
      "maxTokens": "Max tokens",
      "nameRequired": "Please fill in name, Base URL and model name",
      "apiKeyRequired": "API Key is required for a new configuration",
      "saved": "Saved; applies instantly",
      "saveFailed": "Save failed",
      "deleteTitle": "Delete model service configuration",
      "deleteContent": "Delete \"{name}\"? Related services will fall back to yml configuration.",
      "deleted": "Deleted",
      "deleteFailed": "Delete failed",
      "activated": "Activated: {name}",
      "activateFailed": "Activate failed",
      "testOk": "Connected",
      "testFailed": "Connection failed",
      "testError": "Test failed",
      "testing": "Testing…",
      "testConn": "Test",
      "extraKeep": "Leave blank to keep current",
      "extraNew": "Encrypted on save, never shown again",
      "saveActivate": "Set as active provider after save"
    },
    "chatSettings": {
      "title": "Chat Settings",
      "desc": "Context auto-compact: when a long conversation exceeds the threshold, old messages are merged into a summary to control token usage",
      "autoCompact": "Auto-compact",
      "autoCompactDesc": "Estimate tokens before sending; auto-compact history when uncompressed content exceeds the threshold",
      "threshold": "Compact threshold (tokens)",
      "thresholdDesc": "Auto-compact triggers above this value (1000 - 200000)",
      "keepRecent": "Keep recent messages",
      "keepRecentDesc": "Keep the latest N raw messages out of the summary (2 - 200)",
      "compactNow": "Compact current session now",
      "compacting": "Compacting…",
      "currentSession": "Current session: {id}",
      "noSession": "No active session — start or pick one on the Chat page first",
      "saved": "Compact settings saved; applied globally",
      "saveFailed": "Save failed",
      "summaryDone": "Generated a {n}-char summary (kept {keep} recent raw messages)",
      "compactDone": "Compacted",
      "compactFailed": "Compact failed",
      "compactFailedRetry": "Compact failed — please retry",
      "noActiveSession": "No active session (start/select one on the Chat page to compact)"
    },
    "data": {
      "title": "Data Management",
      "desc": "Clear session history and other local data",
      "clearCurrent": "Clear current session",
      "clearCurrentDesc": "Delete messages of the current conversation",
      "deleteAll": "Delete all sessions",
      "deleteAllDesc": "Delete all conversation records (irreversible)",
      "clearTitle": "Clear messages of the current session?",
      "okClear": "Clear",
      "cleared": "Current session cleared",
      "clearFailed": "Clear failed",
      "deleteAllTitle": "Delete ALL sessions? This cannot be undone!",
      "okDeleteAll": "Delete all",
      "allDeleted": "All sessions deleted",
      "deleteFailed": "Delete failed: "
    },
    "plugin": {
      "title": "Plugin Registry",
      "desc": "Common plugin list (first version = external MCP servers); one-click install bridges tools",
      "refresh": "Refresh list",
      "hint": "Built-in sample endpoints are placeholders — set up your own MCP server and edit the endpoint; empty tool allowlist = all tools",
      "codePh": "Code (e.g. my-plugin)",
      "namePh": "Name",
      "endpointPh": "Endpoint SSE URL",
      "allowPh": "Tool allowlist: a,b or empty = all",
      "add": "Add",
      "colCode": "Code",
      "colName": "Name",
      "colDesc": "Description",
      "colEndpoint": "Endpoint",
      "colAllow": "Tool allowlist",
      "colStatus": "Status",
      "colAction": "Actions",
      "allowAll": "Unrestricted (bridge all)",
      "installed": "Installed",
      "notInstalled": "Not installed",
      "install": "Install",
      "uninstall": "Uninstall",
      "delete": "Delete",
      "empty": "No plugin entries",
      "codeRequired": "Code and endpoint are required",
      "added": "Added: {code}",
      "addFailed": "Add failed",
      "installedMsg": "Installed: {code}",
      "installFailed": "Install failed",
      "uninstalledMsg": "Uninstalled: {code}",
      "uninstallFailed": "Uninstall failed",
      "deleteConfirm": "Delete plugin entry \"{code}\"?",
      "deleteFailed": "Delete failed",
      "exception": "Exception: ",
      "deletedMsg": "Deleted"
    },
    "skill": {
      "title": "Public Skills",
      "desc": "Scan SKILL.md files in a directory as prompt packs for agents",
      "dir": "Scan directory",
      "apply": "Apply & rescan",
      "refresh": "Refresh",
      "current": "Effective: {dir}",
      "readable": "Directory readable",
      "notReadable": "Directory missing or unreadable",
      "count": "Skills: {n}",
      "dirRequired": "Please enter a directory",
      "switched": "Directory switched and rescanned: {dir}",
      "switchFailed": "Switch failed (directory missing or unreadable)",
      "dirPh": "e.g. C:\\Users\\25333\\.agents\\skills",
      "hint": "Note: changes take effect at runtime (in memory only) and fall back to config file / GEWU_SKILLS_DIR env after restart."
    },
    "pwd": {
      "fillAll": "Please fill in all fields",
      "tooShort": "New password must be at least 6 characters",
      "mismatch": "The two new passwords do not match",
      "changed": "Password changed; please sign in again",
      "failed": "Change failed: ",
      "modalTitle": "Change Password",
      "okConfirm": "Confirm",
      "oldPwd": "Current password",
      "oldPwdPh": "Enter current password",
      "newPwd": "New password",
      "newPwdPh": "At least 6 characters",
      "confirmPwd": "Confirm new password",
      "confirmPwdPh": "Re-enter new password"
    },
    "restore": {
      "btn": "Restore defaults",
      "title": "Restore default settings?",
      "content": "This will clear local sign-in state and session records"
    },
    "model": {
      "switched": "Model switched: {id}",
      "switchFailed": "Switch failed: ",
      "loadFailed": "Load model list failed:"
    }
  }
}

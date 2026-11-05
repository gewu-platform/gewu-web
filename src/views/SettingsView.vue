<template>
  <div class="settings-view">
    <div class="settings-shell">
      <!-- 左侧导航 -->
      <aside class="settings-nav">
        <div class="nav-header">
          <div class="nav-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </div>
          <div class="nav-title-group">
            <span class="nav-title">{{ $t('settings.nav.title') }}</span>
            <span class="nav-subtitle">{{ $t('settings.nav.sub') }}</span>
          </div>
        </div>

        <nav class="nav-list">
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="nav-item"
            :class="{ active: activeCategory === cat.id }"
            @click="scrollToSection(cat.id)"
          >
            <div class="nav-item-icon" :style="`background: ${cat.color}15; color: ${cat.color}`">
              <svg v-if="cat.id === 'section-account'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <svg v-if="cat.id === 'section-model'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="4" y="4" width="16" height="16" rx="2"/>
                <rect x="9" y="9" width="6" height="6"/>
                <line x1="9" y1="1" x2="9" y2="4"/>
                <line x1="15" y1="1" x2="15" y2="4"/>
                <line x1="9" y1="20" x2="9" y2="23"/>
                <line x1="15" y1="20" x2="15" y2="23"/>
                <line x1="20" y1="9" x2="23" y2="9"/>
                <line x1="20" y1="14" x2="23" y2="14"/>
                <line x1="1" y1="9" x2="4" y2="9"/>
                <line x1="1" y1="14" x2="4" y2="14"/>
              </svg>
              <svg v-if="cat.id === 'section-skill'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              <svg v-if="cat.id === 'section-plugin'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M9 3v18M15 3v18"/>
              </svg>
              <svg v-if="cat.id === 'section-data'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <ellipse cx="12" cy="5" rx="9" ry="3"/>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
              </svg>
            </div>
            <span class="nav-item-label">{{ cat.label }}</span>
            <svg class="nav-item-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
              <polyline points="6 4 10 8 6 12"/>
            </svg>
          </button>
        </nav>
      </aside>

      <!-- 右侧内容区 -->
      <div class="settings-content">
        <div class="settings-scroll" ref="contentRef">
          <div class="settings-content-inner">

            <!-- 账户设置 -->
            <section class="settings-section" id="section-account">
              <div class="section-heading">
                <div class="section-icon" style="background: linear-gradient(135deg, #6366F1, #8B5CF6)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div>
                  <h2 class="section-title">{{ $t('settings.account.title') }}</h2>
                  <p class="section-desc">{{ $t('settings.account.desc') }}</p>
                </div>
              </div>

              <div class="settings-panel">
                <div class="panel-field">
                  <div class="field-label-row">
                    <label class="field-label">{{ $t('settings.account.username') }}</label>
                  </div>
                  <a-input
                    :value="accountInfo.username"
                    :placeholder="$t('settings.account.notLoggedIn')"
                    size="large"
                    class="field-input"
                    disabled
                  />
                </div>

                <div class="field-divider" />

                <div class="panel-field">
                  <div class="field-label-row">
                    <label class="field-label">{{ $t('settings.account.nickname') }}</label>
                    <span class="field-badge optional">{{ $t('settings.account.editable') }}</span>
                  </div>
                  <a-input
                    v-model:value="profileForm.nickname"
                    :placeholder="$t('settings.account.nicknamePh')"
                    size="large"
                    class="field-input"
                    :disabled="!isLoggedIn"
                  />
                </div>

                <div class="field-divider" />

                <div class="panel-field">
                  <label class="field-label">{{ $t('settings.account.email') }}</label>
                  <a-input
                    :value="accountInfo.email"
                    :placeholder="$t('settings.account.notSet')"
                    size="large"
                    class="field-input"
                    disabled
                  />
                </div>

                <div class="field-divider" />

                <div class="panel-field">
                  <label class="field-label">{{ $t('settings.account.password') }}</label>
                  <a-space>
                    <a-button type="primary" ghost @click="saveProfile" :disabled="!profileChanged || savingProfile">
                      {{ $t('settings.account.saveNickname') }}
                    </a-button>
                    <a-button @click="showPasswordModal">{{ $t('settings.account.changePassword') }}</a-button>
                  </a-space>
                </div>
              </div>
            </section>

            <!-- 模型设置 -->
            <section class="settings-section" id="section-model">
              <div class="section-heading">
                <div class="section-icon" style="background: linear-gradient(135deg, #0ea5e9, #0369a1)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="4" y="4" width="16" height="16" rx="2"/>
                    <rect x="9" y="9" width="6" height="6"/>
                    <line x1="9" y1="1" x2="9" y2="4"/>
                    <line x1="15" y1="1" x2="15" y2="4"/>
                    <line x1="9" y1="20" x2="9" y2="23"/>
                    <line x1="15" y1="20" x2="15" y2="23"/>
                    <line x1="20" y1="9" x2="23" y2="9"/>
                    <line x1="20" y1="14" x2="23" y2="14"/>
                    <line x1="1" y1="9" x2="4" y2="9"/>
                    <line x1="1" y1="14" x2="4" y2="14"/>
                  </svg>
                </div>
                <div>
                  <h2 class="section-title">{{ $t('settings.modelSection.title') }}</h2>
                  <p class="section-desc">{{ $t('settings.modelSection.desc') }}</p>
                </div>
              </div>

              <div class="model-grid">
                <button
                  v-for="m in models"
                  :key="m.id"
                  class="model-card"
                  :class="{ active: m.id === activeModel, switching: switching && m.id !== activeModel }"
                  @click="switchTo(m.id)"
                >
                  <div class="model-card-head">
                    <span class="model-card-id">{{ m.id }}</span>
                    <span v-if="m.id === activeModel" class="model-card-badge">{{ $t('settings.modelSection.current') }}</span>
                  </div>
                  <div class="model-card-meta">
                    <span class="provider-chip">{{ m.provider }}</span>
                    <span class="model-card-name">{{ m.modelName }}</span>
                  </div>
                  <p class="model-card-desc">{{ m.description }}</p>
                </button>
              </div>
            </section>

            <!-- 数据管理 -->            <!-- 模型服务 (T3) -->
            <section class="settings-section" id="section-providers">
              <div class="section-heading">
                <div class="section-icon" style="background: linear-gradient(135deg, #4F46E5, #6366F1)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div>
                  <h2 class="section-title">{{ $t('settings.provider.title') }}</h2>
                  <p class="section-desc">{{ $t('settings.provider.desc') }}</p>
                </div>
              </div>

              <div class="provider-toolbar">
                <button class="provider-btn primary" @click="openProviderForm()">{{ $t('settings.provider.newBtn') }}</button>
              </div>

              <a-spin :spinning="providersLoading">
                <div v-if="providers.length === 0" class="provider-empty">{{ $t('settings.provider.empty') }}</div>
                <div v-else class="provider-list">
                  <div v-for="p in providers" :key="p.id" class="provider-card">
                    <div class="provider-card-head">
                      <span class="provider-card-name">{{ p.name }}</span>
                      <span class="provider-chip" :class="p.providerType">{{ p.providerType === 'chat' ? $t('settings.provider.chat') : $t('settings.provider.embedding') }}</span>
                      <span v-if="p.isActive" class="model-card-badge">{{ $t('settings.provider.current') }}</span>
                    </div>
                    <div class="provider-card-meta">
                      <span class="provider-chip">{{ p.vendor }}</span>
                      <span class="model-card-name">{{ p.modelName }}</span>
                      <span v-if="p.providerType === 'embedding' && p.dimension" class="dim-chip">{{ p.dimension }}d</span>
                      <span class="key-chip">{{ p.hasApiKey ? p.apiKeyMasked : $t('settings.provider.notConfigured') }}</span>
                    </div>
                    <p v-if="p.description" class="model-card-desc">{{ p.description }}</p>
                    <div class="provider-card-actions">
                      <button class="provider-btn small" :disabled="testingId === p.id" @click="testProviderConn(p)">{{ testingId === p.id ? $t('settings.provider.testing') : $t('settings.provider.testConn') }}</button>
                      <button v-if="!p.isActive" class="provider-btn small" :disabled="actingId === p.id" @click="activateProviderRow(p)">{{ $t('settings.provider.activate') }}</button>
                      <button class="provider-btn small" @click="openProviderForm(p)">{{ $t('settings.provider.edit') }}</button>
                      <button class="provider-btn small danger" @click="removeProvider(p)">{{ $t('settings.provider.delete') }}</button>
                    </div>
                  </div>
                </div>
              </a-spin>

              <a-modal
                v-model:visible="providerFormOpen"
                :title="providerForm.id ? $t('settings.provider.formEdit') : $t('settings.provider.formNew')"
                :confirm-loading="providerSaving"
                @ok="saveProviderForm"
              >
                <a-form layout="vertical" style="margin-top: 12px">
                  <a-form-item :label="$t('settings.provider.name')" required>
                    <a-input v-model:value="providerForm.name" :disabled="!!providerForm.id" placeholder="my-chat-model" />
                  </a-form-item>
                  <a-form-item :label="$t('settings.provider.type')" required>
                    <a-radio-group v-model:value="providerForm.providerType" :disabled="!!providerForm.id">
                      <a-radio value="chat">{{ $t('settings.provider.chat') }}</a-radio>
                      <a-radio value="embedding">{{ $t('settings.provider.embedding') }}</a-radio>
                    </a-radio-group>
                  </a-form-item>
                  <a-form-item :label="'API Base URL'" required>
                    <a-input v-model:value="providerForm.baseUrl" placeholder="https://ark.cn-beijing.volces.com/api/v3" />
                  </a-form-item>
                  <a-form-item :label="$t('settings.provider.provider')" >
                    <a-select v-model:value="providerForm.vendor">
                      <a-select-option value="volcengine">volcengine</a-select-option>
                      <a-select-option value="aliyun">aliyun</a-select-option>
                      <a-select-option value="openai">openai</a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item :label="$t('settings.provider.apiKey')" :extra="providerForm.id ? $t('settings.provider.extraKeep') : $t('settings.provider.extraNew')">
                    <a-input-password v-model:value="providerForm.apiSpecialKey" autocomplete="new-password" />
                  </a-form-item>
                  <a-form-item :label="$t('settings.provider.modelName')" required>
                    <a-input v-model:value="providerForm.modelName" placeholder="ep-xxxx / doubao-xxx" />
                  </a-form-item>
                  <template v-if="providerForm.providerType === 'embedding'">
                    <a-form-item :label="$t('settings.provider.dim')" >
                      <a-input-number v-model:value="providerForm.dimension" :min="64" :max="8192" style="width: 100%" />
                    </a-form-item>
                    <a-form-item :label="$t('settings.provider.embeddingMode')" >
                      <a-radio-group v-model:value="providerForm.mode">
                        <a-radio value="multimodal">multimodal</a-radio>
                        <a-radio value="text">text</a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </template>
                  <template v-else>
                    <a-form-item :label="$t('settings.provider.temp')" >
                      <a-slider v-model:value="providerForm.temperatureNum" :min="0" :max="2" :step="0.1" />
                    </a-form-item>
                    <a-form-item :label="$t('settings.provider.maxTokens')" >
                      <a-input-number v-model:value="providerForm.maxTokens" :min="16" :max="32768" style="width: 100%" />
                    </a-form-item>
                  </template>
                  <a-form-item :label="$t('settings.provider.desc')" >
                    <a-input v-model:value="providerForm.description" />
                  </a-form-item>
                  <a-checkbox v-model:checked="providerForm.isActive">{{ $t('settings.provider.saveActivate') }}</a-checkbox>
                </a-form>
              </a-modal>
            </section>

            <!-- 对话设置 (T3 上下文压缩，v1.0.1 自对话侧栏迁入) -->
            <section class="settings-section" id="section-chat">
              <div class="section-heading">
                <div class="section-icon" style="background: linear-gradient(135deg, #f59e0b, #f97316)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                    <line x1="12" y1="22.08" x2="12" y2="12"/>
                  </svg>
                </div>
                <div>
                  <h2 class="section-title">{{ $t('settings.chatSettings.title') }}</h2>
                  <p class="section-desc">{{ $t('settings.chatSettings.desc') }}</p>
                </div>
              </div>

              <div class="settings-panel">
                <label class="compact-opt-row">
                  <input type="checkbox" v-model="compactConf.autoCompact" @change="saveCompactConf" />
                  <div class="compact-opt-text">
                    <span class="compact-opt-label">{{ $t('settings.chatSettings.autoCompact') }}</span>
                    <span class="compact-opt-desc">{{ $t('settings.chatSettings.autoCompactDesc') }}</span>
                  </div>
                </label>
                <div class="compact-opt-row">
                  <div class="compact-opt-text">
                    <span class="compact-opt-label">{{ $t('settings.chatSettings.threshold') }}</span>
                    <span class="compact-opt-desc">{{ $t('settings.chatSettings.thresholdDesc') }}</span>
                  </div>
                  <input class="compact-opt-input" type="number" v-model.number="compactConf.compactThreshold" min="1000" max="200000" @change="saveCompactConf" />
                </div>
                <div class="compact-opt-row">
                  <div class="compact-opt-text">
                    <span class="compact-opt-label">{{ $t('settings.chatSettings.keepRecent') }}</span>
                    <span class="compact-opt-desc">{{ $t('settings.chatSettings.keepRecentDesc') }}</span>
                  </div>
                  <input class="compact-opt-input" type="number" v-model.number="compactConf.compactKeepRecent" min="2" max="200" @change="saveCompactConf" />
                </div>
                <div class="compact-manual">
                  <button class="compact-manual-btn" :disabled="compacting || !chatStore.sessionId" @click="manualCompact">
                    {{ compacting ? $t('settings.chatSettings.compacting') : $t('settings.chatSettings.compactNow') }}
                  </button>
                  <span class="compact-manual-hint">{{ chatStore.sessionId ? $t('settings.chatSettings.currentSession', { id: chatStore.sessionId.slice(0, 8) }) : $t('settings.chatSettings.noActiveSession') }}</span>
                  <div v-if="compactResult" class="compact-manual-result">{{ compactResult }}</div>
                </div>
              </div>
            </section>

            <section class="settings-section" id="section-data">
              <div class="section-heading">
                <div class="section-icon" style="background: linear-gradient(135deg, #ef4444, #dc2626)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <ellipse cx="12" cy="5" rx="9" ry="3"/>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                  </svg>
                </div>
                <div>
                  <h2 class="section-title">{{ $t('settings.data.title') }}</h2>
                  <p class="section-desc">{{ $t('settings.data.desc') }}</p>
                </div>
              </div>

              <div class="settings-panel">
                <div class="data-grid">
                  <button class="data-card" @click="clearCurrentSession">
                    <div class="data-card-icon" style="background: rgba(14, 165, 233, 0.1); color: #0ea5e9">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      </svg>
                    </div>
                    <div class="data-card-text">
                      <span class="data-card-label">{{ $t('settings.data.clearCurrent') }}</span>
                      <span class="data-card-desc">{{ $t('settings.data.clearCurrentDesc') }}</span>
                    </div>
                  </button>
                  <button class="data-card danger-card" @click="clearAllSessions">
                    <div class="data-card-icon" style="background: rgba(239, 68, 68, 0.1); color: #ef4444">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                      </svg>
                    </div>
                    <div class="data-card-text">
                      <span class="data-card-label">{{ $t('settings.data.deleteAll') }}</span>
                      <span class="data-card-desc">{{ $t('settings.data.deleteAllDesc') }}</span>
                    </div>
                  </button>
                </div>
              </div>
            </section>

          </div>
        </div>

          <!-- 插件仓库（V2.0.0 R3） -->
          <section class="settings-section" id="section-plugin">
            <div class="section-heading">
              <div class="section-icon" style="background: linear-gradient(135deg, #8B5CF6, #A855F7)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M9 3v18M15 3v18"/>
                </svg>
              </div>
              <div>
                <h2 class="section-title">{{ $t('settings.plugin.title') }}</h2>
                <p class="section-desc">{{ $t('settings.plugin.desc') }}</p>
              </div>
            </div>

            <div class="plugin-panel">
              <div class="plugin-toolbar">
                <button class="btn btn-secondary" @click="loadPlugins">{{ $t('settings.plugin.refresh') }}</button>
                <span class="plugin-hint">{{ $t('settings.plugin.hint') }}</span>
                <div class="plugin-add-row">
                  <a-input v-model:value="newPlugin.code" :placeholder="$t('settings.plugin.codePh')" style="width: 150px" />
                  <a-input v-model:value="newPlugin.name" :placeholder="$t('settings.plugin.namePh')" style="width: 130px" />
                  <a-input v-model:value="newPlugin.endpoint" :placeholder="$t('settings.plugin.endpointPh')" style="flex: 1" />
                  <a-input v-model:value="newPlugin.toolAllow" :placeholder="$t('settings.plugin.allowPh')" style="width: 220px" />
                  <button class="btn-sm ok" @click="addPluginRow">{{ $t('settings.plugin.add') }}</button>
                </div>
              </div>

              <table v-if="plugins.length" class="plugin-table">
                <thead>
                  <tr>
                    <th>{{ $t('settings.plugin.colCode') }}</th>
                    <th>{{ $t('settings.plugin.colName') }}</th>
                    <th>{{ $t('settings.plugin.colDesc') }}</th>
                    <th>{{ $t('settings.plugin.colEndpoint') }}</th>
                    <th>{{ $t('settings.plugin.colAllow') }}</th>
                    <th>{{ $t('settings.plugin.colStatus') }}</th>
                    <th>{{ $t('settings.plugin.colAction') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="p in plugins" :key="p.id">
                    <td class="td-code">{{ p.code }}</td>
                    <td>{{ p.name }}</td>
                    <td class="td-desc">{{ p.description || '—' }}</td>
                    <td class="td-endpoint">{{ p.endpoint }}</td>
                    <td class="td-allow">{{ p.toolAllow || $t('settings.plugin.allowAll') }}</td>
                    <td>
                      <span class="plugin-status" :class="p.installed ? 'on' : 'off'">
                        {{ p.installed ? $t('settings.plugin.installed') : $t('settings.plugin.notInstalled') }}
                      </span>
                    </td>
                    <td class="td-actions">
                      <button v-if="!p.installed" class="btn-sm ok" @click="installPluginRow(p)">{{ $t('settings.plugin.install') }}</button>
                      <button v-else class="btn-sm" @click="uninstallPluginRow(p)">{{ $t('settings.plugin.uninstall') }}</button>
                      <button v-if="!p.builtin" class="btn-sm danger" @click="deletePluginRow(p)">{{ $t('settings.plugin.delete') }}</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p v-else class="plugin-empty">{{ $t('settings.plugin.empty') }}</p>
            </div>
          </section>

          <!-- 公共 Skill（V2.0.0 R2 / v2.0.1 T2.3 目录可配置） -->
          <section class="settings-section" id="section-skill">
            <div class="section-heading">
              <div class="section-icon" style="background: linear-gradient(135deg, #0EA5E9, #38BDF8)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
              </div>
              <div>
                <h2 class="section-title">{{ $t('settings.skill.title') }}</h2>
                <p class="section-desc">{{ $t('settings.skill.desc') }}</p>
              </div>
            </div>

            <div class="skill-panel">
              <div class="skill-dir-row">
                <label class="skill-dir-label">{{ $t('settings.skill.dir') }}</label>
                <a-input v-model:value="skillDirInput" :placeholder="$t('settings.skill.dirPh')" style="flex: 1" />
                <button class="btn btn-secondary" @click="applySkillDir">{{ $t('settings.skill.apply') }}</button>
                <button class="btn btn-secondary" @click="loadSkillDir">{{ $t('settings.skill.refresh') }}</button>
              </div>
              <div class="skill-meta">
                <span>{{ $t('settings.skill.current', { dir: skillDirInfo.dir || '—' }) }}</span>
                <span class="skill-readable" :class="skillDirInfo.readable ? 'on' : 'off'">
                  {{ skillDirInfo.readable ? $t('settings.skill.readable') : $t('settings.skill.notReadable') }}
                </span>
                <span>{{ $t('settings.skill.count', { n: skillDirInfo.count !== undefined ? skillDirInfo.count : '—' }) }}</span>
              </div>
              <p class="skill-hint">{{ $t('settings.skill.hint') }}</p>
            </div>
          </section>

        <!-- 固定底部操作栏 -->
        <div class="action-bar-fixed">
          <button class="btn btn-secondary" @click="resetSettings">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="1 4 1 10 7 10"/>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
            </svg>
            {{ $t('settings.restore.btn') }}
          </button>
        </div>
      </div>
    </div>

    <!-- 修改密码弹窗 -->
    <a-modal
      v-model:visible="pwdModalOpen"
      :title="$t('settings.pwd.modalTitle')"
      :confirm-loading="changingPwd"
      :ok-text="$t('settings.pwd.okConfirm')"
      :cancel-text="$t('common.cancel')"
      @ok="submitPassword"
    >
      <div class="pwd-form">
        <a-form layout="vertical">
          <a-form-item :label="$t('settings.pwd.oldPwd')" required>
            <a-input-password v-model:value="pwdForm.oldPassword" :placeholder="$t('settings.pwd.oldPwdPh')" />
          </a-form-item>
          <a-form-item :label="$t('settings.pwd.newPwd')" required>
            <a-input-password v-model:value="pwdForm.newPassword" :placeholder="$t('settings.pwd.newPwdPh')" />
          </a-form-item>
          <a-form-item :label="$t('settings.pwd.confirmPwd')" required>
            <a-input-password v-model:value="pwdForm.confirmPassword" :placeholder="$t('settings.pwd.confirmPwdPh')" />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { message, Modal } from 'ant-design-vue'
import { useAuthStore } from '@/stores/auth'
import { useChatStore } from '@/stores/chat'
import { getModelList, switchModel as apiSwitchModel, getCompactSettings, saveCompactSettings, compactSession as apiCompactSession } from '@/api/chat'
import { listProviders, createProvider, updateProvider, deleteProvider, activateProvider, testProvider as apiTestProvider } from '@/api/settings'
import { getProfile, updateProfile, changePassword } from '@/api/user'
import { listPlugins, installPlugin, uninstallPlugin, deletePlugin } from '@/api/settings'
import { listSkills, rescanSkills, getSkillsDir, setSkillsDir } from '@/api/settings'
const { t } = useI18n()

const router = useRouter()
const authStore = useAuthStore()
const chatStore = useChatStore()

// chat store 的 setModel 是本地状态同步（真正切换走 apiSwitchModel）
void router

const contentRef = ref(null)
const activeCategory = ref('section-account')

const categories = computed(() => [
  { id: 'section-account', label: t('settings.tabs.account'), color: '#6366F1' },
  { id: 'section-model', label: t('settings.tabs.model'), color: '#0ea5e9' },
  { id: 'section-chat', label: t('settings.tabs.chat'), color: '#f59e0b' },
  { id: 'section-data', label: t('settings.tabs.data'), color: '#ef4444' },
  { id: 'section-plugin', label: t('settings.tabs.plugin'), color: '#8b5cf6' },
  { id: 'section-skill', label: t('settings.tabs.skill'), color: '#0ea5e9' }
])


// ==================== 对话设置（T3 上下文压缩，自对话侧栏迁入） ====================
const compactConf = reactive({ autoCompact: true, compactThreshold: 8000, compactKeepRecent: 20 })
const compacting = ref(false)
const compactResult = ref('')

async function loadCompactConf() {
  try {
    const r = await getCompactSettings()
    let d = r && (r.data !== undefined ? r.data : r)
    if (d && d.data !== undefined) d = d.data
    if (d) {
      compactConf.autoCompact = !!d.autoCompact
      compactConf.compactThreshold = d.compactThreshold ?? 8000
      compactConf.compactKeepRecent = d.compactKeepRecent ?? 20
    }
  } catch (e) {
    console.warn('[Settings] 压缩配置加载失败（用默认）', e)
  }
}

async function saveCompactConf() {
  try {
    await saveCompactSettings({
      autoCompact: compactConf.autoCompact,
      compactThreshold: Number(compactConf.compactThreshold),
      compactKeepRecent: Number(compactConf.compactKeepRecent)
    })
    message.success(t('settings.chatSettings.saved'))
  } catch (e) {
    message.error(e.response?.data?.message || e.message || t('settings.chatSettings.saveFailed'))
  }
}

async function manualCompact() {
  if (!chatStore.sessionId) {
    message.warning(t('settings.chatSettings.noSession'))
    return
  }
  compacting.value = true
  compactResult.value = ''
  try {
    const r = await apiCompactSession(chatStore.sessionId)
    let d = r && (r.data !== undefined ? r.data : r)
    if (d && d.data !== undefined) d = d.data
    const len = d && d.summary ? d.summary.length : 0
    compactResult.value = t('settings.chatSettings.summaryDone', { n: len, keep: d?.keepRecent ?? '-' })
    message.success(t('settings.chatSettings.compactDone'))
  } catch (e) {
    message.error(e.response?.data?.message || e.message || t('settings.chatSettings.compactFailed'))
    compactResult.value = t('settings.chatSettings.compactFailedRetry')
  } finally {
    compacting.value = false
  }
}

onMounted(() => { loadCompactConf() })

// ==================== 插件仓库（V2.0.0 R3） ====================
const plugins = ref([])
const newPlugin = reactive({ code: '', name: '', endpoint: '', toolAllow: '' })
async function addPluginRow() {
  if (!newPlugin.code || !newPlugin.endpoint) { message.warning(t('settings.plugin.codeRequired')); return }
  try {
    const res = await createPlugin({
      code: newPlugin.code,
      name: newPlugin.name || newPlugin.code,
      transport: 'http_sse',
      endpoint: newPlugin.endpoint,
      toolAllow: newPlugin.toolAllow || null
    })
    if (res.code === 200) { message.success(t('settings.plugin.added', { code: newPlugin.code })); newPlugin.code = ''; newPlugin.name = ''; newPlugin.endpoint = ''; newPlugin.toolAllow = ''; await loadPlugins() }
    else message.error(res.message || t('settings.plugin.addFailed'))
  } catch (e) { message.error(t('settings.plugin.exception') + e.message) }
}
async function loadPlugins() {
  try {
    const res = await listPlugins()
    const data = res?.data !== undefined ? res.data : res
    plugins.value = Array.isArray(data) ? data : []
  } catch (e) { console.error('[Gewu] 插件清单加载失败:', e) }
}
async function installPluginRow(p) {
  try {
    const res = await installPlugin(p.id)
    if (res.code === 200) { message.success(t('settings.plugin.installedMsg', { code: p.code })); await loadPlugins() }
    else message.error(res.message || t('settings.plugin.installFailed'))
  } catch (e) { message.error(t('common.exception') + e.message) }
}
async function uninstallPluginRow(p) {
  try {
    const res = await uninstallPlugin(p.id)
    if (res.code === 200) { message.success(t('settings.plugin.uninstalledMsg', { code: p.code })); await loadPlugins() }
    else message.error(res.message || t('settings.plugin.uninstallFailed'))
  } catch (e) { message.error(t('common.exception') + e.message) }
}
async function deletePluginRow(p) {
  if (!window.confirm(t('settings.plugin.deleteConfirm', { code: p.code }))) return
  try {
    const res = await deletePlugin(p.id)
    if (res.code === 200) { message.success(t('settings.provider.deleted')); await loadPlugins() }
    else message.error(res.message || t('settings.plugin.deleteFailed'))
  } catch (e) { message.error(t('common.exception') + e.message) }
}
loadPlugins()

// ==================== 公共 Skill 目录（v2.0.1 T2.3） ====================
const skillDirInput = ref('')
const skillDirInfo = reactive({ dir: '', readable: false, count: undefined })
async function loadSkillDir() {
  try {
    const res = await getSkillsDir()
    const d = res?.data !== undefined ? res.data : res
    skillDirInfo.dir = d.dir || ''
    skillDirInfo.readable = !!d.readable
    skillDirInput.value = d.dir || ''
    const sl = await listSkills()
    const arr = sl?.data !== undefined ? sl.data : sl
    skillDirInfo.count = Array.isArray(arr) ? arr.length : 0
  } catch (e) { console.error('[Gewu] Skill 目录加载失败:', e) }
}
async function applySkillDir() {
  if (!skillDirInput.value) { message.warning(t('settings.skill.dirRequired')); return }
  try {
    const res = await setSkillsDir(skillDirInput.value)
    const d = res?.data !== undefined ? res.data : res
    if (d.changed) { message.success(t('settings.skill.switched', { dir: d.dir })); await loadSkillDir() }
    else message.error(d.message || t('settings.skill.switchFailed'))
  } catch (e) { message.error(t('common.exception') + e.message) }
}
loadSkillDir()

// ==================== 账户 ====================
const isLoggedIn = computed(() => authStore.isLoggedIn)
const accountInfo = reactive({ username: '', email: '' })
const profileForm = reactive({ nickname: '' })
const savingProfile = ref(false)
const profileChanged = computed(() => profileForm.nickname !== (accountInfo.nickname || ''))

async function loadAccountInfo() {
  if (!authStore.isLoggedIn) return
  // 优先用 store 缓存，同时拉取后端最新
  try {
    const res = await getProfile()
    const data = res?.data !== undefined ? res.data : res
    if (data) {
      accountInfo.username = data.username || t('settings.account.notSet')
      accountInfo.email = data.email || t('settings.account.notSet')
      accountInfo.nickname = data.nickname || ''
      profileForm.nickname = data.nickname || ''
    }
  } catch (e) {
    // /profile 401 时回退 store
    const u = authStore.currentUser
    if (u) {
      accountInfo.username = u.username || t('settings.account.notSet')
      accountInfo.email = u.email || t('settings.account.notSet')
      accountInfo.nickname = u.nickname || ''
      profileForm.nickname = u.nickname || ''
    }
  }
}

async function saveProfile() {
  savingProfile.value = true
  try {
    await updateProfile({ nickname: profileForm.nickname })
    message.success(t('settings.account.nicknameUpdated'))
    await loadAccountInfo()
  } catch (e) {
    message.error(t('settings.account.updateFailed') + (e.message || t('common.failed')))
  } finally {
    savingProfile.value = false
  }
}

// ==================== 修改密码 ====================
const pwdModalOpen = ref(false)
const changingPwd = ref(false)
const pwdForm = reactive({ oldPassword: '', newPassword: '', confirmPassword: '' })

function showPasswordModal() {
  if (!authStore.isLoggedIn) {
    authStore.showLogin()
    return
  }
  pwdForm.oldPassword = ''
  pwdForm.newPassword = ''
  pwdForm.confirmPassword = ''
  pwdModalOpen.value = true
}

async function submitPassword() {
  if (!pwdForm.oldPassword || !pwdForm.newPassword) {
    message.warning(t('settings.pwd.fillAll'))
    return
  }
  if (pwdForm.newPassword.length < 6) {
    message.warning(t('settings.pwd.tooShort'))
    return
  }
  if (pwdForm.newPassword !== pwdForm.confirmPassword) {
    message.warning(t('settings.pwd.mismatch'))
    return
  }
  changingPwd.value = true
  try {
    await changePassword({ oldPassword: pwdForm.oldPassword, newPassword: pwdForm.newPassword })
    message.success(t('settings.pwd.changed'))
    pwdModalOpen.value = false
    setTimeout(() => {
      authStore.logout()
      router.push('/')
    }, 1200)
  } catch (e) {
    message.error(t('settings.pwd.failed') + (e.message || t('common.failed')))
  } finally {
    changingPwd.value = false
  }
}

// ==================== 模型设置 ====================
// ---- T3 模型服务配置中心 ----
const providers = ref([])
const providersLoading = ref(false)
const testingId = ref(null)
const actingId = ref(null)
const providerFormOpen = ref(false)
const providerSaving = ref(false)
const providerForm = reactive({
  id: null, name: '', providerType: 'chat', vendor: 'volcengine', baseUrl: '',
  apiSpecialKey: '', modelName: '', dimension: 2048, mode: 'multimodal',
  temperatureNum: 0.7, maxTokens: 1024, description: '', isActive: false
})

async function loadProviders() {
  providersLoading.value = true
  try {
    const res = await listProviders()
    providers.value = res?.data !== undefined ? res.data : (res || [])
  } catch (e) {
    console.error('[Gewu] 加载模型服务失败:', e)
  } finally {
    providersLoading.value = false
  }
}

function openProviderForm(row) {
  if (row) {
    Object.assign(providerForm, {
      id: row.id, name: row.name, providerType: row.providerType, vendor: row.vendor || 'volcengine',
      baseUrl: row.baseUrl || '', apiSpecialKey: '', modelName: row.modelName || '',
      dimension: row.dimension || 2048, mode: row.mode || 'multimodal',
      temperatureNum: row.temperature != null ? Number(row.temperature) : 0.7,
      maxTokens: row.maxTokens || 1024, description: row.description || '',
      isActive: !!row.isActive
    })
  } else {
    Object.assign(providerForm, {
      id: null, name: '', providerType: 'chat', vendor: 'volcengine', baseUrl: '',
      apiSpecialKey: '', modelName: '', dimension: 2048, mode: 'multimodal',
      temperatureNum: 0.7, maxTokens: 1024, description: '', isActive: false
    })
  }
  providerFormOpen.value = true
}

async function saveProviderForm() {
  if (!providerForm.name || !providerForm.baseUrl || !providerForm.modelName) {
    message.warning(t('settings.provider.nameRequired'))
    return
  }
  if (!providerForm.id && !providerForm.apiSpecialKey) {
    message.warning(t('settings.provider.apiKeyRequired'))
    return
  }
  providerSaving.value = true
  try {
    const payload = {
      name: providerForm.name.trim(), providerType: providerForm.providerType, vendor: providerForm.vendor,
      baseUrl: providerForm.baseUrl.trim(), modelName: providerForm.modelName.trim(),
      description: providerForm.description, isActive: providerForm.isActive
    }
    if (providerForm.apiSpecialKey) payload.apiSpecialKey = providerForm.apiSpecialKey
    if (providerForm.providerType === 'embedding') {
      payload.dimension = providerForm.dimension
      payload.mode = providerForm.mode
    } else {
      payload.temperature = providerForm.temperatureNum
      payload.maxTokens = providerForm.maxTokens
    }
    if (providerForm.id) { await updateProvider(providerForm.id, payload) }
    else { await createProvider(payload) }
    message.success(t('settings.provider.saved'))
    providerFormOpen.value = false
    await loadProviders()
    await loadModels()
  } catch (e) {
    message.error(e.message || t('settings.provider.saveFailed'))
  } finally {
    providerSaving.value = false
  }
}

async function removeProvider(row) {
  Modal.confirm({
    title: t('settings.provider.deleteTitle'),
    content: t('settings.provider.deleteContent', { name: row.name }),
    okType: 'danger',
    async onOk() {
      try {
        await deleteProvider(row.id)
        message.success(t('settings.plugin.deletedMsg'))
        await loadProviders()
        await loadModels()
      } catch (e) {
        message.error(e.message || t('settings.provider.deleteFailed'))
      }
    }
  })
}

async function activateProviderRow(row) {
  actingId.value = row.id
  try {
    await activateProvider(row.id)
    message.success(t('settings.provider.activated', { name: row.name }))
    await loadProviders()
    await loadModels()
  } catch (e) {
    message.error(e.message || t('settings.provider.activateFailed'))
  } finally {
    actingId.value = null
  }
}

async function testProviderConn(row) {
  testingId.value = row.id
  try {
    const res = await apiTestProvider(row.id)
    const d = res?.data !== undefined ? res.data : res
    if (d && d.success) {
      message.success(d.message || t('settings.provider.testOk'), 4)
    } else {
      message.error((d && d.message) || t('settings.provider.testFailed'), 6)
    }
  } catch (e) {
    message.error(e.message || t('settings.provider.testError'), 6)
  } finally {
    testingId.value = null
  }
}

const models = ref([])
const activeModel = ref('')
const switching = ref(false)

async function loadModels() {
  try {
    const res = await getModelList()
    const data = res?.data !== undefined ? res.data : res
    models.value = data.models || []
    activeModel.value = data.activeModel || ''
  } catch (e) {
    console.error(t('settings.model.loadFailed'), e)
  }
}

async function switchTo(modelId) {
  if (modelId === activeModel.value || switching.value) return
  switching.value = true
  try {
    const res = await apiSwitchModel(modelId)
    const data = res?.data !== undefined ? res.data : res
    activeModel.value = data.newModel || modelId
    // 同步 chat store 本地状态（setModel 会重复调 API，直接改值避免双写）
    if (chatStore.currentModel !== undefined) {
      chatStore.currentModel = data.currentModel || modelId
    }
    message.success(t('settings.model.switched', { id: modelId }))
  } catch (e) {
    message.error(t('settings.model.switchFailed') + (e.message || t('common.failed')))
  } finally {
    switching.value = false
  }
}

// ==================== 数据管理 ====================
function clearCurrentSession() {
  Modal.confirm({
    title: t('settings.data.clearTitle'),
    okText: t('settings.data.okClear'),
    cancelText: t('common.cancel'),
    async onOk() {
      try {
        await chatStore.clearHistory()
        message.success(t('settings.data.cleared'))
      } catch (e) {
        message.error(e.message || t('settings.data.clearFailed'))
      }
    }
  })
}

function clearAllSessions() {
  Modal.confirm({
    title: t('settings.data.deleteAllTitle'),
    okText: t('settings.data.okDeleteAll'),
    okType: 'danger',
    cancelText: t('common.cancel'),
    async onOk() {
      try {
        const sessions = chatStore.sessions || []
        for (const s of sessions) {
          await chatStore.removeSession(s.sessionId || s.id)
        }
        localStorage.removeItem('lc4j_session_id')
        message.success(t('settings.data.allDeleted'))
      } catch (e) {
        message.error(t('settings.data.deleteFailed') + (e.message || t('common.failed')))
      }
    }
  })
}

// ==================== 恢复默认 ====================
function resetSettings() {
  Modal.confirm({
    title: t('settings.restore.title'),
    content: t('settings.restore.content'),
    okText: t('chat.msgs.ok'),
    cancelText: t('common.cancel'),
    async onOk() {
      localStorage.removeItem('auth-token')
      localStorage.removeItem('auth-refresh-token')
      localStorage.removeItem('user')
      localStorage.removeItem('lc4j_session_id')
      window.location.reload()
    }
  })
}

function scrollToSection(id) {
  activeCategory.value = id
  const el = document.getElementById(id)
  if (el && contentRef.value) {
    const container = contentRef.value
    const top = el.offsetTop - container.offsetTop
    container.scrollTo({ top, behavior: 'smooth' })
  }
}

onMounted(async () => {
  loadProviders()
  await Promise.all([loadAccountInfo(), loadModels()])
})
</script>

<style scoped>
.settings-view {
  height: 100%;
  width: 100%;
  background: #f8fafc;
}

.settings-shell {
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

/* ===== 左侧导航 ===== */
.settings-nav {
  width: 280px;
  flex-shrink: 0;
  background: #fff;
  border-right: 1px solid rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  padding: 28px 0;
  overflow-y: auto;
}

.nav-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 20px 24px;
  margin-bottom: 4px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}

.nav-avatar {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: linear-gradient(135deg, #0ea5e9, #0369a1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}

.nav-avatar svg {
  width: 20px;
  height: 20px;
}

.nav-title-group {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.nav-title {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.3px;
}

.nav-subtitle {
  font-size: 12px;
  color: #94a3b8;
}

.nav-list {
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: inherit;
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
}

.nav-item:hover {
  background: #f8fafc;
  color: #1e293b;
}

.nav-item.active {
  background: linear-gradient(135deg, rgba(14,165,233,0.08), rgba(3,105,161,0.06));
  color: #0ea5e9;
  font-weight: 600;
}

.nav-item-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.nav-item-icon svg {
  width: 16px;
  height: 16px;
}

.nav-item-label {
  flex: 1;
}

.nav-item-arrow {
  width: 16px;
  height: 16px;
  opacity: 0;
  transition: opacity 0.2s ease;
  color: #94a3b8;
}

.nav-item:hover .nav-item-arrow,
.nav-item.active .nav-item-arrow {
  opacity: 1;
}

/* ===== 右侧内容 ===== */
.settings-content {
  flex: 1;
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.settings-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 32px 40px 32px;
  scroll-behavior: smooth;
}

.settings-content-inner {
  width: 100%;
}

/* ===== 区块 ===== */

/* ---- T3 模型服务配置中心 ---- */
.provider-toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
}

.provider-btn {
  border: 1px solid var(--border-color, #e2e8f0);
  background: var(--bg-secondary, #ffffff);
  color: var(--text-primary, #1e293b);
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.provider-btn:hover:not(:disabled) {
  border-color: var(--accent, #4F46E5);
  color: var(--accent, #4F46E5);
}

.provider-btn.primary {
  background: var(--accent, #4F46E5);
  border-color: var(--accent, #4F46E5);
  color: #ffffff;
}

.provider-btn.primary:hover:not(:disabled) {
  opacity: 0.9;
  color: #ffffff;
}

.provider-btn.small {
  padding: 4px 10px;
  font-size: 12px;
}

.provider-btn.danger:hover:not(:disabled) {
  border-color: var(--danger, #ef4444);
  color: var(--danger, #ef4444);
}

.provider-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.provider-empty {
  text-align: center;
  color: var(--text-secondary, #64748b);
  padding: 32px 0;
  font-size: 13px;
}

.provider-list {
  display: grid;
  gap: 12px;
}

.provider-card {
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 12px;
  padding: 14px 16px;
  background: var(--bg-secondary, #ffffff);
  transition: border-color 0.2s ease;
}

.provider-card:hover {
  border-color: var(--accent, #4F46E5);
}

.provider-card-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.provider-card-name {
  font-weight: 600;
  font-size: 14px;
  color: var(--text-primary, #1e293b);
}

.provider-card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.dim-chip,
.key-chip {
  font-size: 11px;
  color: var(--text-secondary, #64748b);
  background: var(--bg-tertiary, #f1f5f9);
  border-radius: 4px;
  padding: 2px 6px;
  font-family: monospace;
}

.provider-card-actions {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.settings-section {
  width: 100%;
  margin-bottom: 36px;
  animation: section-fade 0.4s ease;
}

.settings-section:last-child {
  margin-bottom: 0;
}

@keyframes section-fade {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.section-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}

.section-icon svg {
  width: 20px;
  height: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  letter-spacing: -0.3px;
}

.section-desc {
  font-size: 13px;
  color: #94a3b8;
  margin: 2px 0 0;
}

/* 设置面板 */
.settings-panel {
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 1px 4px rgba(0,0,0,0.02);
  padding: 24px;
  transition: box-shadow 0.2s ease;
}

.settings-panel:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}

/* 表单字段 */
.panel-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.field-label {
  font-size: 13px;
  font-weight: 600;
  color: #475569;
}

.field-badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 6px;
  font-weight: 600;
}

.field-badge.optional {
  background: rgba(16, 185, 129, 0.08);
  color: #10b981;
}

.field-input {
  width: 100%;
}

.field-divider {
  height: 1px;
  background: rgba(0,0,0,0.04);
  margin: 20px 0;
}

/* ===== 模型卡片网格 ===== */
.model-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 14px;
}

.model-card {
  text-align: left;
  font-family: inherit;
  background: #fff;
  border: 1.5px solid #e2e8f0;
  border-radius: 14px;
  padding: 18px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.model-card:hover {
  border-color: #7dd3fc;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(14,165,233,0.1);
}

.model-card.active {
  border-color: #0ea5e9;
  background: linear-gradient(135deg, rgba(14,165,233,0.05), rgba(3,105,161,0.04));
  box-shadow: 0 4px 16px rgba(14,165,233,0.12);
}

.model-card.switching {
  opacity: 0.6;
  pointer-events: none;
}

.model-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.model-card-id {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  font-family: 'JetBrains Mono', Consolas, monospace;
}

.model-card-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(14, 165, 233, 0.12);
  color: #0284c7;
}

.model-card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.provider-chip {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 6px;
  background: rgba(100, 116, 139, 0.1);
  color: #475569;
}

.model-card-name {
  font-size: 12px;
  color: #64748b;
  font-family: 'JetBrains Mono', Consolas, monospace;
}

.model-card-desc {
  font-size: 12.5px;
  color: #94a3b8;
  margin: 0;
  line-height: 1.5;
}

/* ===== 数据卡片 ===== */
.data-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.data-card {
  padding: 20px;
  border-radius: 12px;
  border: 1.5px solid #e2e8f0;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 14px;
  text-align: left;
  font-family: inherit;
}

.data-card:hover {
  border-color: #7dd3fc;
  transform: translateY(-2px);
}

.data-card.danger-card {
  border-color: #fecaca;
}

.data-card.danger-card:hover {
  border-color: #fca5a5;
  background: #fef2f2;
}

.data-card-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.data-card-icon svg {
  width: 20px;
  height: 20px;
}

.data-card-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.data-card-label {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.data-card-desc {
  font-size: 12px;
  color: #94a3b8;
}

/* Ant Design 对齐 */
:deep(.ant-input),
:deep(.ant-input-password input),
:deep(.ant-select-selector) {
  border-radius: 10px !important;
  border-color: #e2e8f0 !important;
}

:deep(.ant-input:hover),
:deep(.ant-input-password:hover input),
:deep(.ant-select-selector:hover) {
  border-color: #7dd3fc !important;
}

:deep(.ant-input:focus),
:deep(.ant-input-password input:focus),
:deep(.ant-select-focused .ant-select-selector) {
  border-color: #0ea5e9 !important;
  box-shadow: 0 0 0 3px rgba(14,165,233,0.08) !important;
}

/* 固定底部操作栏 */
.action-bar-fixed {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 16px 40px 24px;
  background: #f8fafc;
  border-top: 1px solid rgba(0,0,0,0.06);
  flex-shrink: 0;
}

.btn {
  padding: 12px 28px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  font-family: inherit;
}

.btn svg {
  width: 16px;
  height: 16px;
}

.btn-secondary {
  background: #fff;
  color: #475569;
  border: 1.5px solid #e2e8f0;
}

.btn-secondary:hover {
  border-color: #7dd3fc;
  color: #0ea5e9;
}

/* 密码表单 */
.pwd-form {
  padding-top: 4px;
}

/* 响应式 */
@media (max-width: 1024px) {
  .settings-shell { flex-direction: column; }
  .settings-nav {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid rgba(0,0,0,0.06);
    padding: 16px 0;
  }
  .nav-list { flex-direction: row; padding: 0 12px; overflow-x: auto; }
  .nav-item { white-space: nowrap; }
  .settings-scroll { padding: 24px 20px 40px; }
  .data-grid { grid-template-columns: 1fr; }
  .model-grid { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .action-bar-fixed { flex-direction: column; }
  .btn { justify-content: center; }
}

/* ==================== 对话设置（T3 上下文压缩） ==================== */
.compact-opt-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 0;
  border-bottom: 1px dashed rgba(128, 128, 128, 0.22);
}

.compact-opt-row input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #6366f1;
  cursor: pointer;
  flex-shrink: 0;
}

.compact-opt-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.compact-opt-label {
  font-size: 13px;
  font-weight: 600;
}

.compact-opt-desc {
  font-size: 12px;
  opacity: 0.65;
}

.compact-opt-input {
  width: 110px;
  padding: 6px 10px;
  border: 1px solid rgba(128, 128, 128, 0.35);
  border-radius: 8px;
  font-size: 13px;
  background: transparent;
}

.compact-opt-input:focus {
  outline: none;
  border-color: #6366f1;
}

.compact-manual {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding-top: 14px;
}

.compact-manual-btn {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #6366f1;
  background: transparent;
  color: #6366f1;
  font-size: 13px;
  cursor: pointer;
}

.compact-manual-btn:hover:not(:disabled) {
  background: rgba(99, 102, 241, 0.08);
}

.compact-manual-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.compact-manual-hint {
  font-size: 12px;
  opacity: 0.65;
}

.compact-manual-result {
  width: 100%;
  font-size: 12px;
  opacity: 0.75;
}
.plugin-panel { display: flex; flex-direction: column; gap: 12px; }
.plugin-toolbar { display: flex; align-items: center; gap: 12px; }
.plugin-hint { font-size: 12px; color: #94a3b8; }
.plugin-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.plugin-table th, .plugin-table td { padding: 8px 10px; text-align: left; border-bottom: 1px solid #e2e8f0; }
.plugin-table th { font-weight: 600; color: #64748b; }
.td-code { font-family: monospace; }
.td-endpoint { font-size: 12px; color: #94a3b8; max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.plugin-status { padding: 2px 8px; border-radius: 10px; font-size: 12px; font-weight: 600; }
.plugin-status.on { background: rgba(16, 185, 129, 0.15); color: #10b981; }
.plugin-status.off { background: rgba(148, 163, 184, 0.15); color: #94a3b8; }
.plugin-empty { font-size: 13px; color: #94a3b8; }

.skill-panel { display: flex; flex-direction: column; gap: 10px; }
.skill-dir-row { display: flex; align-items: center; gap: 10px; }
.skill-dir-label { min-width: 72px; font-size: 13px; color: #64748b; }
.skill-meta { display: flex; gap: 16px; font-size: 12px; color: #64748b; }
.skill-readable { padding: 1px 8px; border-radius: 10px; font-weight: 600; }
.skill-readable.on { background: rgba(16, 185, 129, 0.15); color: #10b981; }
.skill-readable.off { background: rgba(239, 68, 68, 0.15); color: #ef4444; }
.skill-hint { font-size: 12px; color: #94a3b8; }

.plugin-add-row { display: flex; gap: 8px; align-items: center; }
.td-allow { font-size: 12px; color: #64748b; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

</style>

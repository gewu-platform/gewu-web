import { ref, watchEffect } from 'vue';

/**
 * P18 暗色模式——主题服务
 *
 * 三态：light / dark / system（跟随系统 prefers-color-scheme）。
 * 持久化到 localStorage（gewu-theme），实际生效主题写入
 * document.documentElement.dataset.theme，供 [data-theme='dark'] 令牌表切换。
 */

const KEY = 'gewu-theme';
const VALID = ['light', 'dark', 'system'];

function initial() {
  const saved = localStorage.getItem(KEY);
  return VALID.includes(saved) ? saved : 'system';
}

const theme = ref(initial());

/* 系统深色监听（system 态实时跟随） */
const mql = window.matchMedia('(prefers-color-scheme: dark)');
const systemDark = ref(mql.matches);
mql.addEventListener('change', (e) => { systemDark.value = e.matches; });

/* 应用到 <html data-theme="..."> */
const applied = ref('light');
watchEffect(() => {
  const t = theme.value === 'system' ? (systemDark.value ? 'dark' : 'light') : theme.value;
  applied.value = t;
  document.documentElement.dataset.theme = t;
});

export function useTheme() {
  function setTheme(v) {
    if (VALID.includes(v)) {
      theme.value = v;
      localStorage.setItem(KEY, v);
    }
  }
  /** 循环切换：light → dark → system */
  function cycle() {
    const next = theme.value === 'light' ? 'dark' : theme.value === 'dark' ? 'system' : 'light';
    setTheme(next);
  }
  return { theme, applied, setTheme, cycle };
}

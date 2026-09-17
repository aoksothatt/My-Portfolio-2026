import { reactive, watch } from 'vue'

const THEME_KEY = 'aoksothatt-theme'
const LANG_KEY = 'aoksothatt-lang'

let initialized = false

export const settings = reactive({
  theme: 'light',
  lang: 'en',
})

function apply() {
  const root = document.documentElement
  root.classList.toggle('dark', settings.theme === 'dark')
  root.setAttribute('lang', settings.lang === 'kh' ? 'km' : 'en')
}

function init() {
  if (initialized) return
  initialized = true
  let theme = null
  try {
    theme = localStorage.getItem(THEME_KEY)
  } catch (e) {
    // ignore
  }
  if (!theme) {
    theme =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
  }
  settings.theme = theme
  try {
    settings.lang = localStorage.getItem(LANG_KEY) || 'en'
  } catch (e) {
    settings.lang = 'en'
  }
  apply()
}

watch(
  () => settings.theme,
  (value) => {
    try {
      localStorage.setItem(THEME_KEY, value)
    } catch (e) {
      // ignore
    }
    apply()
  }
)

watch(
  () => settings.lang,
  (value) => {
    try {
      localStorage.setItem(LANG_KEY, value)
    } catch (e) {
      // ignore
    }
    apply()
  }
)

export function toggleTheme() {
  settings.theme = settings.theme === 'dark' ? 'light' : 'dark'
}

export function setLang(lang) {
  settings.lang = lang
}

export function useSettings() {
  init()
  return { settings, toggleTheme, setLang }
}
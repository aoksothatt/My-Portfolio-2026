<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { t } from '@/i18n'
import { settings, toggleTheme, setLang } from '@/composables/useSettings'
import { useActiveSection } from '@/composables/useActiveSection'

const active = useActiveSection()
const scrolled = ref(false)
const showTop = ref(false)

const NAV = [
  { id: 'home', spark: 'M4 0 L5.2 2.8 L8 4 L5.2 5.2 L4 8 L2.8 5.2 L0 4 L2.8 2.8 Z', solid: true },
  { id: 'about', spark: 'M4 0 L8 4 L4 8 L0 4 Z', solid: false },
  { id: 'education', spark: 'M4 0 L8 7 L0 7 Z', solid: true },
  { id: 'skills', spark: 'M1 1 L7 1 L7 7 L1 7 Z', solid: true },
  { id: 'projects', spark: 'M4 0 L8 4 L4 8 L0 4 Z', solid: true },
  { id: 'loves', spark: 'M4 0 L5.2 2.8 L8 4 L5.2 5.2 L4 8 L2.8 5.2 L0 4 L2.8 2.8 Z', solid: true },
  { id: 'contact', spark: 'M0 6.5 L4 1 L8 6.5 Z', solid: false },
]

function label(id) {
  const name = t.value.nav[id]
  return settings.lang === 'kh' ? `ទៅកាន់ ${name}` : `Go to ${name} section`
}

function go(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

let ticking = false
function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const y = window.scrollY
    scrolled.value = y > 8
    showTop.value = y > 640
    ticking = false
  })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header class="navbar" :class="{ 'is-scrolled': scrolled }">
    <div class="navbar__inner">
      <a class="navbar__brand" href="#home" @click.prevent="go('home')">
        <span class="pixel-sq" aria-hidden="true"></span>
        <span>Aoksothatt</span>
      </a>

      <nav class="nav-dock" :class="{ 'is-scrolled': scrolled }" aria-label="Primary">
        <a
          v-for="item in NAV"
          :key="item.id"
          class="nav-dock__btn"
          :class="{ 'is-active': active === item.id }"
          :href="`#${item.id}`"
          :aria-label="label(item.id)"
          :aria-current="active === item.id ? 'true' : undefined"
          @click.prevent="go(item.id)"
        >
          <span class="nav-dock__spark" aria-hidden="true">
            <svg viewBox="0 0 8 8">
              <path
                :d="item.spark"
                :fill="item.solid ? 'currentColor' : 'none'"
                :stroke="item.solid ? 'none' : 'currentColor'"
                stroke-width="1"
                stroke-linecap="square"
                stroke-linejoin="miter"
              />
            </svg>
          </span>

          <span class="nav-dock__icon">
            <svg
              v-if="item.id === 'home'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="square"
              stroke-linejoin="miter"
              aria-hidden="true"
            >
              <path d="M4 11.2L12 5l8 6.2" />
              <path d="M6.2 9.6V19a1 1 0 0 0 1 1h9.6a1 1 0 0 0 1-1V9.6" />
              <path d="M10 20v-5.8h4V20" />
            </svg>
            <svg
              v-else-if="item.id === 'about'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="square"
              stroke-linejoin="miter"
              aria-hidden="true"
            >
              <circle cx="12" cy="8.2" r="3.2" />
              <path d="M5.6 20c.8-3.6 3.1-5.3 6.4-5.3s5.6 1.7 6.4 5.3" />
            </svg>
            <svg
              v-else-if="item.id === 'education'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="square"
              stroke-linejoin="miter"
              aria-hidden="true"
            >
              <path d="M3 9.4L12 5l9 4.4-9 4.4z" />
              <path d="M6.4 11.6V15c0 1.2 2.5 2.3 5.6 2.3s5.6-1.1 5.6-2.3v-3.4" />
              <path d="M21 9.4V15.6" />
            </svg>
            <svg
              v-else-if="item.id === 'skills'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="square"
              stroke-linejoin="miter"
              aria-hidden="true"
            >
              <rect x="2.8" y="5" width="18.4" height="14" rx="1" />
              <path d="M7 10.8l2.6 2.3L7 15.4" />
              <path d="M12.6 15.4H17" />
            </svg>
            <svg
              v-else-if="item.id === 'projects'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="square"
              stroke-linejoin="miter"
              aria-hidden="true"
            >
              <path d="M3.2 7.4c0-.8.6-1.4 1.4-1.4h3.9c.4 0 .7.1 1 .4l1.3 1.3c.3.3.6.4 1 .4h7.6c.8 0 1.4.7 1.4 1.5v7.8c0 .8-.6 1.5-1.4 1.5H4.6c-.8 0-1.4-.7-1.4-1.5z" />
            </svg>
            <svg
              v-else-if="item.id === 'loves'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="square"
              stroke-linejoin="miter"
              aria-hidden="true"
            >
              <path d="M12 20.2C7.4 16.7 4.3 13.7 4.3 10.5c0-2.2 1.7-3.9 3.9-3.9 1.2 0 2.4.6 3.8 2.1 1.4-1.5 2.6-2.1 3.8-2.1 2.2 0 3.9 1.7 3.9 3.9 0 3.2-3.1 6.2-7.7 9.7z" />
            </svg>
            <svg
              v-else
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="square"
              stroke-linejoin="miter"
              aria-hidden="true"
            >
              <rect x="3.4" y="5.4" width="17.2" height="13.2" rx="1" />
              <path d="M4.6 7.1l7.4 5.4 7.4-5.4" />
            </svg>
          </span>

          <span class="nav-dock__tip" aria-hidden="true">{{ t.nav[item.id] }}</span>
        </a>
      </nav>

      <div class="navbar__actions">
        <div class="lang-switch" role="group" aria-label="Language">
          <button
            type="button"
            class="lang-switch__btn"
            :class="{ 'is-active': settings.lang === 'en' }"
            @click="setLang('en')"
          >
            EN
          </button>
          <button
            type="button"
            class="lang-switch__btn"
            :class="{ 'is-active': settings.lang === 'kh' }"
            @click="setLang('kh')"
          >
            KH
          </button>
        </div>

        <button
          class="icon-btn"
          type="button"
          :aria-label="settings.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleTheme"
        >
          <svg
            v-if="settings.theme === 'dark'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="square"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
          <svg
            v-else
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="square"
            stroke-linejoin="miter"
            aria-hidden="true"
          >
            <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
          </svg>
        </button>
      </div>
    </div>
  </header>

  <button
    class="back-to-top"
    type="button"
    :class="{ 'is-visible': showTop }"
    aria-label="Scroll back to top"
    @click="toTop"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true">
      <path d="M12 20V5M5.5 11.5L12 5l6.5 6.5" />
    </svg>
  </button>
</template>
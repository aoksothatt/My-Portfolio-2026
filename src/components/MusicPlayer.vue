<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { config } from '@/config'
import { t } from '@/i18n'

const VIDEO_ID = '1RctFHyUJkg'
const HOST_ID = 'aoksothatt-youtube-host'

const state = ref('idle')
const currentTime = ref(0)
const duration = ref(null)
const error = ref(false)

let player = null
let readyResolve = null
let ready = null
let pollTimer = null
let apiPromise = null

function loadYouTubeAPI() {
  if (apiPromise) return apiPromise
  apiPromise = new Promise((resolve, reject) => {
    if (window.YT && window.YT.Player) {
      resolve()
      return
    }
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prev === 'function') prev()
      resolve()
    }
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    tag.async = true
    tag.onerror = () => reject(new Error('YouTube IFrame API failed to load'))
    document.head.appendChild(tag)
  })
  return apiPromise
}

function syncTime() {
  if (!player) return
  const ct = player.getCurrentTime()
  if (typeof ct === 'number' && isFinite(ct)) currentTime.value = ct
  const d = player.getDuration()
  if (typeof d === 'number' && isFinite(d) && d > 0) duration.value = d
}

function startPoll() {
  stopPoll()
  pollTimer = setInterval(() => {
    if (player && state.value === 'playing') syncTime()
  }, 500)
}

function stopPoll() {
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
}

function handleState(code) {
  if (code === 1) {
    state.value = 'playing'
    startPoll()
  } else if (code === 2) {
    state.value = 'paused'
    stopPoll()
    syncTime()
  } else if (code === 0) {
    state.value = 'ended'
    stopPoll()
    currentTime.value = 0
  } else if (code === -1) {
    state.value = 'paused'
    syncTime()
  } else if (code === 3) {
    if (state.value !== 'playing') state.value = 'loading'
  }
}

async function ensurePlayer() {
  await loadYouTubeAPI()
  if (player) return
  ready = new Promise((resolve) => {
    readyResolve = resolve
  })
  const origin = window.location.origin
  player = new window.YT.Player(HOST_ID, {
    videoId: VIDEO_ID,
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      playsinline: 1,
      rel: 0,
      enablejsapi: 1,
      ...(origin.startsWith('http') ? { origin } : {}),
    },
    events: {
      onReady: () => {
        readyResolve()
        state.value = 'paused'
        syncTime()
      },
      onError: () => {
        readyResolve()
        error.value = true
        stopPoll()
      },
      onStateChange: (event) => handleState(event.data),
    },
  })
  await ready
}

async function toggle() {
  if (error.value) return
  try {
    if (state.value === 'playing' && player) {
      player.pauseVideo()
      return
    }
    state.value = 'loading'
    await ensurePlayer()
    player.playVideo()
  } catch (e) {
    error.value = true
  }
}

function seek(event) {
  if (error.value || !duration.value || !player) return
  if (typeof event.clientX !== 'number') return
  const rect = event.currentTarget.getBoundingClientRect()
  const ratio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1)
  player.seekTo(ratio * duration.value, true)
  syncTime()
}

const progress = computed(() => (duration.value ? (currentTime.value / duration.value) * 100 : 0))
const fmt = (sec) =>
  `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}`

onBeforeUnmount(() => {
  stopPoll()
  if (player && typeof player.destroy === 'function') player.destroy()
  player = null
})
</script>

<template>
  <div class="player" :class="{ 'is-playing': state === 'playing' }">
    <div class="player__host" aria-hidden="true">
      <div :id="HOST_ID"></div>
    </div>

    <div class="player__row">
      <span class="player__art" aria-hidden="true">
        <span class="px-note">
          <span class="px-note__head"></span>
          <span class="px-note__stem"></span>
        </span>
      </span>
      <div class="player__meta">
        <div class="player__song">{{ config.music.song }}</div>
        <div class="player__artist">{{ config.music.artist }}</div>
      </div>
      <div class="eq" role="presentation" aria-hidden="true">
        <span></span><span></span><span></span><span></span>
      </div>
    </div>

    <div class="player__controls">
      <button
        class="player__btn"
        :class="{ 'is-playing': state === 'playing' }"
        type="button"
        :disabled="error"
        :aria-label="state === 'playing' ? 'Pause' : 'Play'"
        @click="toggle"
      >
        <svg
          v-if="state !== 'playing'"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M7 4.5v15l13-7.5-13-7.5z" />
        </svg>
        <svg
          v-else
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
        </svg>
      </button>

      <div
        class="player__seek"
        :class="{ 'is-disabled': !duration || error }"
        role="slider"
        tabindex="0"
        aria-label="Progress"
        :aria-valuemin="0"
        :aria-valuenow="Math.round(currentTime)"
        :aria-valuemax="Math.round(duration || 0)"
        @click="seek"
        @keydown.enter.prevent="seek"
      >
        <span :style="{ width: progress + '%' }"></span>
      </div>

      <div class="player__time">{{ fmt(currentTime) }} / {{ fmt(duration || 0) }}</div>
    </div>

    <p v-if="error" class="player__err">
      <span class="pixel-sq" aria-hidden="true"></span>
      {{ t.loves.music.unavailable }}
    </p>
  </div>
</template>
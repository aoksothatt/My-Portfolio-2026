<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const layerEl = ref(null)
const particles = ref([])

const SHAPES = [
  'M4 0 L5.2 2.8 L8 4 L5.2 5.2 L4 8 L2.8 5.2 L0 4 L2.8 2.8 Z',
  'M4 0 L8 4 L4 8 L0 4 Z',
  'M4 1 L7 6.5 L1 6.5 Z',
  'M1 1 L7 1 L7 7 L1 7 Z',
]

function rand(min, max) {
  return min + Math.random() * (max - min)
}

function build(count) {
  const list = []
  for (let i = 0; i < count; i++) {
    const nearEdge = Math.random() < 0.6
    const left = nearEdge
      ? Math.random() < 0.5
        ? rand(1, 18)
        : rand(82, 99)
      : rand(8, 92)
    const top = nearEdge
      ? Math.random() < 0.5
        ? rand(3, 22)
        : rand(76, 98)
      : rand(10, 90)
    const size = Math.round(rand(3, 7))
    const dur = Math.round(rand(22, 40))
    list.push({
      left,
      top,
      size,
      shape: Math.random() < 0.4 ? 4 : Math.floor(Math.random() * 4),
      kind: Math.random() < 0.2 ? 'acc' : 'faint',
      dur,
      delay: -Math.random() * dur,
    })
  }
  particles.value = list
}

function prtStyle(p) {
  return {
    left: `${p.left}%`,
    top: `${p.top}%`,
    width: `${p.size}px`,
    height: `${p.size}px`,
    animationDuration: `${p.dur}s`,
    animationDelay: `${p.delay}s`,
  }
}

const SKIP_SELECTOR =
  'a, button, input, select, textarea, iframe, audio, video, [role="button"], .skill-chip'

function spawnRipple(x, y) {
  const layer = layerEl.value
  if (!layer) return
  const ripple = document.createElement('span')
  ripple.className = 'bg-universe__ripple'
  ripple.style.left = `${x}px`
  ripple.style.top = `${y}px`
  for (let i = 0; i < 4; i++) {
    const bit = document.createElement('i')
    ripple.appendChild(bit)
  }
  layer.appendChild(ripple)
  ripple.addEventListener(
    'animationend',
    () => {
      ripple.remove()
    },
    { once: true }
  )
}

function onPointerDown(e) {
  if (e.button !== 0) return
  const target = e.target
  if (target && target.closest && target.closest(SKIP_SELECTOR)) return
  spawnRipple(e.clientX, e.clientY)
}

let isStatic = false

onMounted(() => {
  const layer = layerEl.value
  const coarse = window.matchMedia('(pointer: coarse)')
  build(coarse.matches ? 8 : 16)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
  isStatic = reduce.matches
  if (isStatic) {
    layer.classList.add('is-static')
  } else {
    document.addEventListener('pointerdown', onPointerDown, { passive: true })
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onPointerDown)
})
</script>

<template>
  <aside ref="layerEl" class="bg-universe" aria-hidden="true">
    <span
      v-for="(p, i) in particles"
      :key="i"
      class="bg-universe__prt"
      :class="{ 'bg-universe__prt--acc': p.kind === 'acc' }"
      :style="prtStyle(p)"
    >
      <svg v-if="p.shape < 4" viewBox="0 0 8 8" fill="currentColor">
        <path :d="SHAPES[p.shape]" />
      </svg>
      <svg v-else viewBox="0 0 8 8" fill="currentColor">
        <circle cx="4" cy="4" r="3" />
      </svg>
    </span>
  </aside>
</template>
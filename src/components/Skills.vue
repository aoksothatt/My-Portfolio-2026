<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import {
  siPhp,
  siLaravel,
  siReact,
  siVuedotjs,
  siDocker,
  siGit,
  siMysql,
  siPostgresql,
} from 'simple-icons'
import SectionHeading from './SectionHeading.vue'
import { t } from '@/i18n'

const sectionEl = ref(null)
const inView = ref(false)
let observer = null

onMounted(() => {
  const el = sectionEl.value
  if (!el) return
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        inView.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.2 }
  )
  observer.observe(el)

  const pointerFine = window.matchMedia('(pointer: fine)')
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  canTrail.value = pointerFine.matches && !reducedMotion.matches
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
  if (rafId) cancelAnimationFrame(rafId)
})

const SIZES = [7, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2]
const OPACITIES = [0.75, 0.55, 0.42, 0.33, 0.26, 0.21, 0.17, 0.14, 0.11, 0.08]

const ICONS = {
  PHP: siPhp,
  Laravel: siLaravel,
  'React JS': siReact,
  'Vue JS': siVuedotjs,
  Docker: siDocker,
  'Git & GitHub': siGit,
  MySQL: siMysql,
  PostgreSQL: siPostgresql,
}

function iconOf(name) {
  return ICONS[name] || null
}

function dotClass(status) {
  return status === 'learning' ? 'status-dot--learning' : 'status-dot--using'
}

const canTrail = ref(false)
const snakeEl = ref(null)
const dotEls = []
const DOTS = SIZES.length
const segments = Array.from({ length: DOTS }, () => ({ x: 0, y: 0 }))
let rafId = 0
let running = false
let targetX = 0
let targetY = 0
let sectionRect = null

function recordDot(i, el) {
  dotEls[i] = el
}

function project(e) {
  sectionRect = sectionEl.value.getBoundingClientRect()
  targetX = e.clientX - sectionRect.left
  targetY = e.clientY - sectionRect.top
}

function onEnter(e) {
  if (!canTrail.value || e.pointerType !== 'mouse') return
  project(e)
  for (let i = 0; i < DOTS; i++) {
    segments[i].x = targetX
    segments[i].y = targetY
  }
  snakeEl.value.classList.add('is-active')
  start()
}

function onMove(e) {
  if (!canTrail.value || e.pointerType !== 'mouse' || !snakeEl.value.classList.contains('is-active')) {
    return
  }
  project(e)
  if (!running) start()
}

function onLeave() {
  if (!snakeEl.value) return
  snakeEl.value.classList.remove('is-active')
}

function start() {
  if (rafId) cancelAnimationFrame(rafId)
  running = true
  rafId = requestAnimationFrame(tick)
}

function tick() {
  const head = segments[0]
  head.x += (targetX - head.x) * 0.5
  head.y += (targetY - head.y) * 0.5
  let settled = Math.abs(head.x - targetX) < 1 && Math.abs(head.y - targetY) < 1
  for (let i = 1; i < DOTS; i++) {
    const prev = segments[i - 1]
    const cur = segments[i]
    cur.x += (prev.x - cur.x) * 0.3
    cur.y += (prev.y - cur.y) * 0.3
    if (Math.abs(cur.x - prev.x) > 0.5 || Math.abs(cur.y - prev.y) > 0.5) settled = false
  }
  for (let i = 0; i < DOTS; i++) {
    const el = dotEls[i]
    if (!el) continue
    const s = segments[i]
    const size = SIZES[i]
    el.style.transform = `translate3d(${s.x - size / 2}px, ${s.y - size / 2}px, 0)`
    el.style.opacity = String(OPACITIES[i])
    el.style.width = `${size}px`
    el.style.height = `${size}px`
  }
  if (settled || !snakeEl.value.classList.contains('is-active')) {
    running = false
    rafId = 0
    return
  }
  rafId = requestAnimationFrame(tick)
}
</script>

<template>
  <section
    ref="sectionEl"
    id="skills"
    class="section skills"
    :class="{ 'skills--inview': inView }"
    @pointerenter="onEnter"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <span class="skills__glow" aria-hidden="true"></span>

    <div class="container">
      <SectionHeading :kicker="t.skills.kicker" :title="t.skills.title" />
      <p class="skills__intro" v-reveal>{{ t.skills.intro }}</p>

      <div class="skills__wall">
        <div class="skill-row">
          <div class="skill-row__track">
            <div
              v-for="copy in 2"
              :key="copy"
              class="skill-row__run"
              role="list"
              :aria-hidden="copy === 2 ? 'true' : undefined"
            >
              <span
                v-for="item in t.skills.items"
                :key="item.name"
                class="skill-chip"
                role="listitem"
              >
                <span class="skill-chip__icon" aria-hidden="true">
                  <svg v-if="iconOf(item.name)" viewBox="0 0 24 24" fill="currentColor">
                    <path :d="iconOf(item.name).path" />
                  </svg>
                  <span v-else class="skill-chip__fallback">{{ item.name.slice(0, 1) }}</span>
                </span>
                <span class="skill-chip__name">{{ item.name }}</span>
                <span class="skill-chip__status" aria-hidden="true">
                  <span class="status-dot" :class="dotClass(item.status)"></span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div ref="snakeEl" class="skills__snake" aria-hidden="true">
      <span
        v-for="i in DOTS"
        :key="i"
        class="skills__snake-dot"
        :ref="(el) => recordDot(i - 1, el)"
      ></span>
    </div>
  </section>
</template>
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import SectionHeading from './SectionHeading.vue'
import { t } from '@/i18n'

const rootEl = ref(null)
const inView = ref(false)
let io = null

onMounted(() => {
  io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) inView.value = true
    },
    { threshold: 0.25 }
  )
  if (rootEl.value) io.observe(rootEl.value)
})

onBeforeUnmount(() => {
  if (io) io.disconnect()
})

const pad = (n) => String(n + 1).padStart(2, '0')
</script>

<template>
  <section id="education" class="section">
    <div class="container">
      <SectionHeading :kicker="t.education.kicker" :title="t.education.title" />

      <ol ref="rootEl" class="timeline" :class="{ 'timeline--active': inView }">
        <li
          v-for="(item, i) in t.education.items"
          :key="i"
          class="timeline__item"
          :class="{ 'is-current': item.current }"
          :style="{ transitionDelay: `${i * 110}ms` }"
          v-reveal
        >
          <span class="timeline__node" aria-hidden="true">
            <span class="timeline__step">{{ pad(i) }}</span>
          </span>
          <article class="card edu-card">
            <span class="edu-card__period">{{ item.period }}</span>
            <div class="edu-card__body">
              <h3 class="edu-card__school">{{ item.school }}</h3>
              <p class="edu-card__field">{{ item.field }}</p>
            </div>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>
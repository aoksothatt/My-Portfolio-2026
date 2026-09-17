<script setup>
import SectionHeading from './SectionHeading.vue'
import { t } from '@/i18n'
</script>

<template>
  <section id="about" class="section">
    <div class="container">
      <SectionHeading :kicker="t.about.kicker" :title="t.about.title" />

      <div class="about__grid">
        <div class="about__body" v-reveal>
          <p
            v-for="(p, i) in t.about.paragraphs"
            :key="i"
            class="about__p"
            :class="{ 'is-last': i === t.about.paragraphs.length - 1 }"
          >
            {{ p }}
          </p>
        </div>

        <aside class="card about__card dot-grid" v-reveal:120>
          <div class="about__card-tag">{{ t.about.cardTag }}</div>
          <ul class="facts">
            <li v-for="(f, i) in t.about.facts" :key="i">
              <span class="facts__dot" aria-hidden="true"></span>
              <span class="facts__label">{{ f.label }}</span>
              <span class="facts__value">{{ f.value }}</span>
            </li>
          </ul>
          <div class="about__card-px" aria-hidden="true">
            <span></span><span></span><span></span><span></span>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>
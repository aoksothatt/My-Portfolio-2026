<script setup>
import SectionHeading from './SectionHeading.vue'
import { t } from '@/i18n'
</script>

<template>
  <section id="projects" class="section">
    <div class="container">
      <SectionHeading :kicker="t.projects.kicker" :title="t.projects.title" />

      <div class="projects__grid">
        <article v-for="(p, i) in t.projects.items" :key="i" class="card card-hover project" v-reveal>
          <div class="project__chrome" aria-hidden="true">
            <span class="project__px project__px--1"></span>
            <span class="project__px"></span>
            <span class="project__px"></span>
            <span class="project__chrome-line"></span>
          </div>

          <div class="project__head">
            <h3 class="project__name">{{ p.name }}</h3>
            <span class="project__stack">{{ p.stack }}</span>
          </div>

          <p class="project__desc">{{ p.description }}</p>

          <div class="project__footer">
            <a
              class="btn btn-outline btn--sm"
              :href="p.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ t.projects.viewOnGitHub }}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
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
              v-if="p.demoUrl"
              class="btn btn-primary btn--sm"
              :href="p.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="btn__px" aria-hidden="true"></span>
              {{ t.projects.liveDemo }}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </a>

            <a
              v-if="p.url"
              class="btn btn-outline btn--sm"
              :href="p.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54a3.05 3.05 0 0 0-1.28-1.69c-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18a3.02 3.02 0 0 0 4.11 1.18c.1-.72.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09a4.2 4.2 0 0 1 .11-3.05s.96-.31 3.15 1.18a10.96 10.96 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.7 5.38-5.26 5.67.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.2.66.8.55A11.53 11.53 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"
                />
              </svg>
              {{ p.demoUrl ? t.projects.github : t.projects.viewOnGitHub }}
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
<script setup>
import SectionHeading from './SectionHeading.vue'
import { t } from '@/i18n'
import { config } from '@/config'
</script>

<template>
  <section id="contact" class="section">
    <span class="hero__deco deco-sq float" style="top: 30%; left: 6%" aria-hidden="true"></span>
    <span class="hero__deco deco-sq--big" style="bottom: 20%; right: 8%" aria-hidden="true"></span>

    <div class="container">
      <div class="contact__inner">
        <SectionHeading align="center" :kicker="t.contact.kicker" :title="t.contact.title" />

        <p class="contact__text" v-reveal>{{ t.contact.text }}</p>

        <div class="contact__list" v-reveal:120>
          <a
            class="card card-hover contact__item"
            :href="config.socials.telegram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 3 3 10.5l7.5 3M21 3l-6.5 18-4-7.5M21 3 10.5 13.5" />
            </svg>
            <span>@abcdef_0009</span>
          </a>

          <a class="card card-hover contact__item" :href="`mailto:${config.socials.email}`">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            <span>aoksothatt@gmail.com</span>
          </a>

          <a
            class="card card-hover contact__item"
            :href="config.socials.github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54a3.05 3.05 0 0 0-1.28-1.69c-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18a3.02 3.02 0 0 0 4.11 1.18c.1-.72.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09a4.2 4.2 0 0 1 .11-3.05s.96-.31 3.15 1.18a10.96 10.96 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.7 5.38-5.26 5.67.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.2.66.8.55A11.53 11.53 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"
              />
            </svg>
            <span>github.com/aoksothatt</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
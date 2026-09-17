<script setup>
import { ref } from 'vue'
import { t } from '@/i18n'
import { config } from '@/config'

const imgFailed = ref(false)
</script>

<template>
  <section id="home" class="hero">
    <span class="hero__pix hero__pix--a" aria-hidden="true"></span>
    <span class="hero__pix hero__pix--b" aria-hidden="true"></span>
    <span class="hero__pix hero__pix--c" aria-hidden="true"></span>

    <div class="container hero__inner">
      <div class="hero__copy">
        <p class="hero__label" v-reveal="'instant'">
          <span class="hero__label-bar" aria-hidden="true"></span>
          {{ t.hero.kicker }}
        </p>

        <h1 class="hero__title" v-reveal="'instant'">
          <span class="hero__greet">{{ t.hero.greeting }}</span>
          <span class="hero__name">{{ t.hero.name }}</span>
        </h1>

        <p class="hero__subtitle" v-reveal:80>{{ t.hero.subtitle }}</p>
        <p class="hero__intro" v-reveal:160>{{ t.hero.description }}</p>

        <div class="hero__actions" v-reveal:240>
          <a class="btn btn-primary" href="#projects">
            <span class="btn__px" aria-hidden="true"></span>
            {{ t.hero.viewProjects }}
          </a>
          <a class="btn btn-outline" :href="config.cvPath" download="Aoksothatt-CV.pdf">
            <span class="btn__px" aria-hidden="true"></span>
            {{ t.hero.downloadCv }}
          </a>
        </div>
      </div>

      <div class="hero__portrait">
        <div class="portrait">
          <span class="portrait__corner portrait__corner--tl" aria-hidden="true"></span>
          <span class="portrait__corner portrait__corner--br" aria-hidden="true"></span>
          <span class="portrait__spark" aria-hidden="true">
            <svg viewBox="0 0 8 8" fill="currentColor">
              <path d="M4 0 L5.2 2.8 L8 4 L5.2 5.2 L4 8 L2.8 5.2 L0 4 L2.8 2.8 Z" />
            </svg>
          </span>
          <span class="portrait__gem portrait__gem--a" aria-hidden="true"></span>
          <span class="portrait__gem portrait__gem--b" aria-hidden="true"></span>

          <div class="portrait__media">
            <img
              class="portrait__img"
              :src="config.portrait"
              alt="Portrait of Aoksothatt"
              @error="imgFailed = true"
            />
            <div v-if="imgFailed" class="portrait__fallback" aria-hidden="true">
              <span class="portrait__mono" aria-hidden="true">A</span>
            </div>
          </div>

          <span class="portrait__bar" aria-hidden="true"></span>
        </div>
      </div>
    </div>
  </section>
</template>
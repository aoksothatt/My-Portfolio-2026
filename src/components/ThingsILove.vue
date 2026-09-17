<script setup>
import SectionHeading from './SectionHeading.vue'
import MusicPlayer from './MusicPlayer.vue'
import { t } from '@/i18n'
import { config } from '@/config'
</script>

<template>
  <section id="loves" class="section">
    <div class="container">
      <SectionHeading :kicker="t.loves.kicker" :title="t.loves.title" />

      <div class="loves__grid">
        <article class="card love-card" v-reveal>
          <div class="love-card__head">
            <span class="love-card__ico" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <polygon points="12,9.5 14.4,11 13.6,13.8 10.4,13.8 9.6,11" />
                <line x1="12" y1="9.5" x2="12" y2="4" />
                <line x1="14.4" y1="11" x2="19.5" y2="8" />
                <line x1="13.6" y1="13.8" x2="17" y2="17.5" />
                <line x1="10.4" y1="13.8" x2="7" y2="17.5" />
                <line x1="9.6" y1="11" x2="4.5" y2="8" />
              </svg>
            </span>
            <div>
              <h3 class="love-card__title">{{ t.loves.football.title }}</h3>
              <p class="love-card__sub">{{ t.loves.football.kh }}</p>
            </div>
          </div>

          <div class="love-card__visual dot-grid" aria-hidden="true">
            <svg class="football-svg" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="24" />
              <polygon points="32,27 36,30 34,35 30,35 28,30" />
              <line x1="32" y1="27" x2="32" y2="10" />
              <line x1="36" y1="30" x2="50" y2="20" />
              <line x1="34" y1="35" x2="44" y2="47" />
              <line x1="30" y1="35" x2="20" y2="47" />
              <line x1="28" y1="30" x2="14" y2="20" />
            </svg>
            <span class="visual-px" style="top: 16px; left: 20px"></span>
            <span class="visual-px" style="bottom: 16px; right: 24px; opacity: 0.25"></span>
          </div>

          <p class="love-card__caption">{{ t.loves.football.caption }}</p>
        </article>

        <article class="card love-card" v-reveal:120>
          <div class="love-card__head">
            <span class="love-card__ico" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M9 18V6l10-2v12" />
                <line x1="9" y1="18" x2="9" y2="7" />
                <line x1="19" y1="16" x2="19" y2="5" />
                <circle cx="6.5" cy="18" r="2.5" />
                <circle cx="16.5" cy="16" r="2.5" />
              </svg>
            </span>
            <div>
              <h3 class="love-card__title">{{ t.loves.music.title }}</h3>
              <p class="love-card__sub">{{ t.loves.music.kh }}</p>
            </div>
          </div>

          <MusicPlayer />

          <div class="love-card__facts">
            <p class="love-line">
              <span class="love-line__label">{{ t.loves.music.favoriteArtist }}</span>
              {{ config.music.artist }}
            </p>
            <p class="love-line">
              <span class="love-line__label">{{ t.loves.music.favoriteSong }}</span>
              {{ config.music.song }}
            </p>
          </div>

          <!-- <a
            class="btn btn-outline btn--youtube"
            :href="config.music.youtube"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ t.loves.music.listenOnYouTube }}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a> -->
        </article>

        <article class="card love-card" v-reveal:200>
          <div class="love-card__head">
            <span class="love-card__ico" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M2 18l5-6 4 3 4-6 7 9" />
                <line x1="2" y1="10" x2="2" y2="18" />
                <line x1="22" y1="9" x2="22" y2="18" />
              </svg>
            </span>
            <div>
              <h3 class="love-card__title">{{ t.loves.nature.title }}</h3>
              <p class="love-card__sub">{{ t.loves.nature.kh }}</p>
            </div>
          </div>

          <div class="nature" aria-hidden="true">
            <span class="nature__sun"></span>
            <span class="nature__cloud nature__cloud--a float-slow"><i></i><i></i></span>
            <span class="nature__cloud nature__cloud--b float-slow"><i></i><i></i></span>
            <span class="nature__mtn nature__mtn--back"></span>
            <span class="nature__mtn"></span>
            <span class="nature__trees">
              <span class="tree"><i></i><b></b></span>
              <span class="tree tree--sm"><i></i><b></b></span>
              <span class="tree"><i></i><b></b></span>
            </span>
            <span class="nature__sea"></span>
          </div>

          <p class="love-card__items">{{ t.loves.nature.items }}</p>
          <p class="love-card__caption">{{ t.loves.nature.caption }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

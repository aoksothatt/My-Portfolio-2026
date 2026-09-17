<script setup>
defineProps({
  kicker: { type: String, required: true },
  title: { type: String, required: true },
  align: { type: String, default: 'left' },
})
</script>

<template>
  <header class="section-heading" :class="`section-heading--${align}`" v-reveal>
    <p class="section-heading__kicker">
      <span class="pixel-sq" aria-hidden="true"></span>
      {{ kicker }}
      <span class="pixel-sq" aria-hidden="true"></span>
    </p>
    <h2 class="section-heading__title">{{ title }}</h2>
    <div class="section-heading__rule" aria-hidden="true">
      <span></span><span></span><span></span><span></span><span></span>
    </div>
  </header>
</template>
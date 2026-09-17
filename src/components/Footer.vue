<script setup>
import { t } from '@/i18n'
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <span class="pixel-sq" aria-hidden="true"></span>
        <span>Aoksothatt</span>
      </div>
      <p class="footer__text">{{ t.footer.rights }}</p>
      <p class="footer__text">{{ t.footer.built }}</p>
    </div>
  </footer>
</template>
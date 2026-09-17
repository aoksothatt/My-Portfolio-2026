<script setup>
import { useSettings } from '@/composables/useSettings'
import AppBackground from '@/components/AppBackground.vue'
import Navbar from '@/components/Navbar.vue'
import Hero from '@/components/Hero.vue'
import About from '@/components/About.vue'
import Education from '@/components/Education.vue'
import Skills from '@/components/Skills.vue'
import Projects from '@/components/Projects.vue'
import ThingsILove from '@/components/ThingsILove.vue'
import Contact from '@/components/Contact.vue'
import Footer from '@/components/Footer.vue'

useSettings()
</script>

<template>
  <AppBackground />
  <Navbar />
  <main>
    <Hero />
    <About />
    <Education />
    <Skills />
    <Projects />
    <ThingsILove />
    <Contact />
  </main>
  <Footer />
</template>
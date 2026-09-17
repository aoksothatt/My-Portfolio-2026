import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

const app = createApp(App)

app.directive('reveal', {
  mounted(el, binding) {
    if (binding.value === 'instant') {
      el.classList.add('reveal-visible')
      return
    }
    el.classList.add('reveal')
    const delay = binding.arg ? Number(binding.arg) : 0
    if (delay) el.style.transitionDelay = `${delay}ms`
    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('reveal-visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    )
    io.observe(el)
    el._io = io
  },
  unmounted(el) {
    if (el._io) el._io.disconnect()
  },
})

app.mount('#app')
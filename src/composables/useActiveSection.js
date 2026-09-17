import { onBeforeUnmount, onMounted, ref } from 'vue'

export const SECTION_IDS = [
  'home',
  'about',
  'education',
  'skills',
  'projects',
  'loves',
  'contact',
]

export function useActiveSection() {
  const active = ref('home')
  let io = null

  onMounted(() => {
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) active.value = entry.target.id
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
  })

  onBeforeUnmount(() => {
    if (io) io.disconnect()
  })

  return active
}
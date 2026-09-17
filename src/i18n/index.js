import { computed } from 'vue'
import { settings } from '@/composables/useSettings'
import { en, kh } from './content'

export const t = computed(() => (settings.lang === 'kh' ? kh : en))
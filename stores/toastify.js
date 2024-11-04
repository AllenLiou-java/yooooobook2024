import { defineStore } from 'pinia'

export const useToastifyStore = defineStore('toastify', () => {
  const nuxtApp = useNuxtApp()
  const isToastShow = ref(false)

  watch(isToastShow, (newVal) => {
    if (newVal) {
      showToast()
      isToastShow.value = false
    }
  })

  const showToast = () => {
    nuxtApp.$toast.info('toastify success!!')
  }

  return {
    isToastShow,
    showToast
  }
})

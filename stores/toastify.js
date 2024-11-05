import { defineStore } from 'pinia'

export const useToastifyStore = defineStore('toastify', () => {
  const toast = useNuxtApp().$toast
  const isToastShow = ref(false)
  const content = ref('')
  const options = reactive({
    // info | success | warning | error | default
    type: toast.TYPE.INFO
  })

  watch(isToastShow, (newVal) => {
    if (newVal) {
      toast(content.value, options)
      isToastShow.value = false
      content.value = ''
      options.type = 'info'
    }
  })

  const notify = (toastType, toastMsg) => {
    content.value = toastMsg
    options.type = toastType
    isToastShow.value = true
  }

  return {
    isToastShow,
    content,
    options,
    notify
  }
})

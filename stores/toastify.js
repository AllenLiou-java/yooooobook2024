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

    const notify = (toastType, toastMsg, statusCode) => {
        options.type = toastType
        if (!statusCode) {
            // 使用頁面自訂的訊息
            content.value = toastMsg
        } else {
            // 使用回傳並比對後的訊息
            content.value = mapErrorMessage(toastMsg, statusCode)
        }

        isToastShow.value = true
    }

    return {
        isToastShow,
        content,
        options,
        notify
    }
})

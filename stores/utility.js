import { defineStore } from 'pinia'

export const useUtilityStore = defineStore('utility', () => {
    const isVerifyEmailDialogVisible = ref(false)
    const isResetPasswordDialogVisible = ref(false)

    const setVerifyEmailDialogVisible = (status) => {
        isVerifyEmailDialogVisible.value = status
    }

    const setResetPasswordDialogVisible = (status) => {
        isResetPasswordDialogVisible.value = status
    }

    return {
        isVerifyEmailDialogVisible,
        isResetPasswordDialogVisible,
        setVerifyEmailDialogVisible,
        setResetPasswordDialogVisible
    }
})

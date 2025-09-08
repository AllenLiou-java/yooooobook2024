<template>
    <div
        class="flex items-center max-w-356 w-full bg-[#dd4b39] px-8 py-3 mx-auto cursor-pointer duration-300 hover:bg-secondary"
        @click="handleGoogleLogin"
    >
        <svg class="w-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>google-plus</title>
            <path
                fill="#ffffff"
                d="M23,11H21V9H19V11H17V13H19V15H21V13H23M8,11V13.4H12C11.8,14.4 10.8,16.4 8,16.4C5.6,16.4 3.7,14.4 3.7,12C3.7,9.6 5.6,7.6 8,7.6C9.4,7.6 10.3,8.2 10.8,8.7L12.7,6.9C11.5,5.7 9.9,5 8,5C4.1,5 1,8.1 1,12C1,15.9 4.1,19 8,19C12,19 14.7,16.2 14.7,12.2C14.7,11.7 14.7,11.4 14.6,11H8Z"
            />
        </svg>
        <div class="w-1 h-36 bg-white mx-8"></div>
        <span class="text-20 text-white grow-1">Google +</span>
    </div>
</template>

<script setup>
import { googleTokenLogin } from 'vue3-google-login'

const userStore = useUserStore()
const { setUserLoggedin } = userStore

const { $api } = useNuxtApp()
const { notify } = useToastifyStore()

const runtimeConfig = useRuntimeConfig()
const { googleClientId: GOOGLE_CLIENT_ID } = runtimeConfig.public

// google登入
const handleGoogleLogin = async () => {
    try {
        const { access_token: accessToken } = await googleTokenLogin({
            clientId: GOOGLE_CLIENT_ID
        })

        if (!accessToken) {
            notify('error', '登入失敗')
            return
        }

        const { idToken, refreshToken } = await $api('/api/auth/google', {
            method: 'POST',
            body: {
                accessToken
            },
            initialCache: false
        })

        if (idToken && refreshToken) setUserLoggedin(idToken, refreshToken)
    } catch (err) {
        const { status, statusMessage } = err
        if (status && statusMessage) notify('error', '登入失敗')
    }
}
</script>

<style lang="scss" scoped></style>

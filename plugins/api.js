export default defineNuxtPlugin((nuxtApp) => {
    const userNameCookie = useCookie('userName')
    const emailCookie = useCookie('email')
    const photoUrlCookie = useCookie('photoUrl')
    const userIdCookie = useCookie('userId')
    const idTokenCookie = useCookie('idToken')
    const refreshTokenCookie = useCookie('refreshToken')
    const emailVerifiedCookie = useCookie('emailVerified')
    const signInProviderCookie = useCookie('signInProvider')

    const api = $fetch.create({
        async onResponseError({ response }) {
            if (response.status === 401) {
                userNameCookie.value = null
                emailCookie.value = null
                photoUrlCookie.value = null
                userIdCookie.value = null
                idTokenCookie.value = null
                refreshTokenCookie.value = null
                emailVerifiedCookie.value = null
                signInProviderCookie.value = null
                await nuxtApp.runWithContext(() => navigateTo('/user/logIn'))
            }

            const {
                _data: { statusCode, message, statusMessage }
            } = response

            throw createError({ statusCode, message, statusMessage })
        }
    })

    // Expose to useNuxtApp().$api
    return {
        provide: {
            api
        }
    }
})

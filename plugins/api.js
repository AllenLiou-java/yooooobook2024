export default defineNuxtPlugin((nuxtApp) => {
    const api = $fetch.create({
        async onResponseError({ response }) {
            const {
                _data: { statusCode, message, statusMessage }
            } = response

            if (statusCode === 401) {
                useUserStore().setUserLogout()
                await nuxtApp.runWithContext(() => navigateTo('/user/logIn'))
            }

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

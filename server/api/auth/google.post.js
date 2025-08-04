// 使用 google 的 access_token 換取 firebase 的 token

export default defineEventHandler(async (event) => {
    const { firebaseApiKey, webUrl } = useRuntimeConfig()
    const { accessToken } = await readBody(event)
    const { googleApiUrl } = useRuntimeConfig()

    const firebaseOauthLoginApi = '/v1/accounts:signInWithIdp?key=' + firebaseApiKey

    try {
        const { idToken, refreshToken } = await $fetch(firebaseOauthLoginApi, {
            baseURL: googleApiUrl,
            method: 'POST',
            body: {
                requestUri: webUrl,
                postBody: 'access_token=' + accessToken + '&providerId=google.com',
                returnSecureToken: true,
                returnIdpCredential: true
            }
        })

        return { message: 'success', idToken, refreshToken }
    } catch (error) {
        const { status, statusMessage } = error
        throw createError({ status, statusMessage })
    }
})

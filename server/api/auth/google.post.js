// 使用 google 的 access_token 換取 firebase 的 token

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const { accessToken } = await readBody(event)
  const firebaseApiKey = runtimeConfig.firebaseApiKey
  const webUrl = runtimeConfig.public.webUrl
  const firebaseOauthLoginApi =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=' + firebaseApiKey

  try {
    const { idToken, refreshToken } = await $fetch(firebaseOauthLoginApi, {
      method: 'POST',
      body: {
        requestUri: webUrl,
        postBody: 'access_token=' + accessToken + '&providerId=google.com',
        returnSecureToken: true,
        returnIdpCredential: true
      }
    })

    return { message: 'successfully signed in!', idToken, refreshToken }
  } catch (error) {
    // return { error }
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }
})

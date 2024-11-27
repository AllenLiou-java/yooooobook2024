export const serverApi = (url, options) => {
  const { firebaseApiUrl, firebaseApiKey } = useRuntimeConfig()

  return $fetch(url, {
    baseURL: firebaseApiUrl,
    onRequest({ request, options, error }) {
      options.query = options.query || {}
      options.query.key = firebaseApiKey
      // options.query.auth = idToken
    },
    onRequestError({ request, options, error }) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Firebase not find',
        message: 'Firebase not find'
      })
    },
    ...options
  })
}

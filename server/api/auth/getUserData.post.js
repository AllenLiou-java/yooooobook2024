import { serverApi } from '@/server/utils/database'

export default defineEventHandler(async (event) => {
  const { googleApiUrl } = useRuntimeConfig()
  const { idToken } = await readBody(event)

  const data = await serverApi('/v1/accounts:lookup', {
    baseURL: googleApiUrl,
    method: 'post',
    body: {
      idToken
    }
  })
    .then((result) => result)
    .catch((error) => {
      const statusCode = error.statusCode
      const message = error.data.error.message
      const statusMessage = error.statusMessage

      throw createError({
        statusCode,
        message,
        statusMessage
      })
    })

  return data
})

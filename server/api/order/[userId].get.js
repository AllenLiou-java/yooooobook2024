// import { serverApi } from '@/server/utils/database'

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'userId') || parseCookies(event).userId
  const idToken = getRequestHeader(event, 'idToken')

  const data = await serverApi(`/order/${userId}.json`, {
    query: {
      auth: idToken
    }
  })
    .then((result) => result)
    .catch((error) => {
      const statusCode = error.statusCode
      const message = error.data.error
      const statusMessage = error.statusMessage

      throw createError({
        statusCode,
        message,
        statusMessage
      })
    })

  if (data === null) {
    return {}
  } else {
    return data
  }
})

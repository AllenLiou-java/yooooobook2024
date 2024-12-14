import { serverApi } from '@/server/utils/database'

export default defineEventHandler(async (event) => {
  const memberId = getRouterParam(event, 'memberId')
  const body = await readBody(event)
  const idToken = parseCookies(event).idToken || body.idToken

  const data = await serverApi(`/order/${memberId}/${body.orderId}.json`, {
    query: {
      auth: idToken
    },
    method: 'patch',
    body
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

  return data
})

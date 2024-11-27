import { serverApi } from '@/server/utils/database'

export default defineEventHandler(async (event) => {
  const data = await serverApi('/products_simple.json')
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

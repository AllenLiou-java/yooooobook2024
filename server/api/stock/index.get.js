import { serverApi } from '@/server/utils/database'

export default defineEventHandler(async (event) => {
    const { idToken } = parseCookies(event)

    const data = await serverApi(`/stock.json`, {
        query: {
            auth: idToken
        }
    })
        .then((result) => {
            if (result === null) {
                throw createError({
                    statusCode: 404,
                    message: 'Stock Not Found',
                    statusMessage: 'Stock Not Found'
                })
            }
            return result
        })
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

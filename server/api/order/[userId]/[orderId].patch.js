import { serverApi } from '@/server/utils/database'

export default defineEventHandler(async (event) => {
    const userId = getRouterParam(event, 'userId')
    const orderId = getRouterParam(event, 'orderId')
    const body = await readBody(event)
    const idToken = parseCookies(event).idToken

    const data = await serverApi(`/order/${userId}/${orderId}.json`, {
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

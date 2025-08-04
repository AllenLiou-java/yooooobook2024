import { serverApi } from '@/server/utils/database'

export default defineEventHandler(async (event) => {
    const productId = getRouterParam(event, 'id')
    const body = await readBody(event)
    const { idToken } = parseCookies(event)

    const data = await serverApi(`/stock/${productId}.json`, {
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

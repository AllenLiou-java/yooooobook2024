import { serverApi } from '@/server/utils/database'
// async
export default defineEventHandler(async (event) => {
    const memberId = getRouterParam(event, 'id')
    const idToken = getRequestHeader(event, 'idToken')

    const data = await serverApi(`/users/${memberId}.json`, {
        query: {
            auth: idToken
        },
        method: 'get'
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

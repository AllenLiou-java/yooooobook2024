import { serverApi } from '@/server/utils/database'

export default defineEventHandler(async (event) => {
    const planId = getRouterParam(event, 'planId')
    const orderId = getRouterParam(event, 'orderId')

    const data = await serverApi(`/group_order/${planId}/${orderId}.json`)
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

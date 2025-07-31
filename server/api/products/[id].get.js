import { serverApi } from '@/server/utils/database'

export default defineEventHandler(async (event) => {
    const productId = getRouterParam(event, 'id')

    const data = await serverApi(`/products/${productId}.json`, {})

    if (data === null || !data.launched) {
        throw createError({
            statusCode: 404,
            message: 'Not Found',
            statusMessage: 'Not Found'
        })
    }

    return data
})

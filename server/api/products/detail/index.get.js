import { serverApi } from '@/server/utils/database'

export default defineEventHandler(async (event) => {
    const data = await serverApi('/products.json')
        .then((result) => {
            return Object.values(result).filter((item) => item.launched)
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

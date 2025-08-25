import { serverApi } from '@/server/utils/database'

export default defineEventHandler(async (event) => {
    const { email, subscribe } = await readBody(event)

    try {
        const data = await serverApi('/subscribeList.json', {
            method: 'post',
            body: { email, subscribe }
        })

        console.log('data-server', data)

        return {
            status: 200,
            data
        }
    } catch (error) {
        const statusCode = error.statusCode
        const message = error.data.error
        const statusMessage = error.statusMessage

        throw createError({
            statusCode,
            message,
            statusMessage
        })
    }
})

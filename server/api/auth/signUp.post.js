import { serverApi } from '@/server/utils/database'

export default defineEventHandler(async (event) => {
    const { googleApiUrl } = useRuntimeConfig()
    const { email, password } = await readBody(event)

    const data = await serverApi('/v1/accounts:signUp', {
        baseURL: googleApiUrl,
        method: 'post',
        body: {
            email,
            password,
            returnSecureToken: true
        }
    })
        .then((result) => result)
        .catch((error) => {
            const statusCode = error.statusCode
            const message = error.data.error.message
            const statusMessage = error.statusMessage

            throw createError({
                statusCode,
                message,
                statusMessage
            })
        })

    return data
})

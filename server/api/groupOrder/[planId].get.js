export default defineEventHandler(async (event) => {
    const planId = getRouterParam(event, 'planId')

    const data = await serverApi(`/group_order/${planId}.json`)
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

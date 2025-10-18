export default defineEventHandler(async (event) => {
    const planId = getRouterParam(event, 'planId')
    const orderId = getRouterParam(event, 'orderId')
    const body = await readBody(event)
    // const idToken = parseCookies(event).idToken

    const data = await serverApi(`/group_order/${planId}/${orderId}.json`, {
        // query: {
        //     auth: idToken
        // },
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

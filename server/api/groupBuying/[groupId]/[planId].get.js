import { serverApi } from '@/server/utils/database'

export default defineEventHandler(async (event) => {
    const groupId = getRouterParam(event, 'groupId')
    const planId = getRouterParam(event, 'planId')
    const idToken = getRequestHeader(event, 'idToken')

    const planContent = await serverApi(`/group_buying/${groupId}/${planId}.json`, {
        query: {
            auth: idToken
        }
    })
        .then((result) => {
            return {
                ...result,
                products: result.products.filter((item) => item.launch)
            }
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

    const productDetailList = await serverApi(`/products.json`, {
        query: {
            auth: idToken
        }
    })
        .then((result) => {
            const productList = Object.values(result).map((item) => {
                const { name, bookIntroduction, imgSrc, productId } = item
                return {
                    name,
                    bookIntroduction,
                    imgSrc,
                    productId
                }
            })

            return productList
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

    // 將productDetailList合併到planContent的products屬性中(將productId相同者合併)
    const updatedProducts = planContent.products.map((planProd) => {
        // 找到對應的 productDetail
        const detail = productDetailList.find((p) => p.productId === planProd.productId)

        // 合併（planProd 在前，detail 在後，detail 會覆蓋同名屬性）
        return {
            ...planProd,
            ...detail
        }
    })

    // 更新 planContent
    const newPlanContent = {
        ...planContent,
        products: updatedProducts
    }

    return newPlanContent
})

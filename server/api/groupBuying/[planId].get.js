import { serverApi } from '@/server/utils/database'

export default defineEventHandler(async (event) => {
    const planId = getRouterParam(event, 'planId')

    try {
        // 取得團購計畫
        const planContent = await serverApi(`/group_buying/${planId}.json`)

        if (!planContent)
            return {
                success: false,
                message: '資料不存在',
                data: null,
                error: {
                    code: 'NOT_FOUND',
                    details: 'No record found'
                }
            }

        const { buildTime, group, launch, plan } = planContent
        const flatPlanContent = {
            buildTime,
            group,
            launch,
            ...plan,
            products: plan.products.filter((item) => item.launch)
        }

        // 取得產品詳細資料
        const productDetailList = await serverApi(`/products.json`).then((result) =>
            Object.values(result).map(
                ({ name, content, bookIntroduction, notice, imgSrc, productId }) => ({
                    name,
                    content,
                    bookIntroduction,
                    notice,
                    imgSrc,
                    productId
                })
            )
        )

        // const stockList = await serverApi('/stock.json').then((stockItem) => {
        //     return Object.entries(stockItem).map(([pid, { qty }]) => ({
        //         productId: pid,
        //         stock: qty
        //     }))
        // })

        // 將productDetailList與stockList合併到planContent的products屬性中(根據productId相同者合併)
        const updatedProducts = flatPlanContent.products.map((planProd) => {
            // 合併（planProd 在前，detail 在後，detail 會覆蓋同名屬性）
            return {
                ...planProd,
                ...productDetailList.find((p) => p.productId === planProd.productId)
                // ...stockList.find((p) => p.productId === planProd.productId)
            }
        })

        return {
            success: true,
            message: '操作成功',
            data: {
                ...flatPlanContent,
                products: updatedProducts
            },
            error: null
        }
    } catch (error) {
        const { statusCode = 500, statusMessage = 'Internal Server Error', data } = error
        throw createError({
            statusCode,
            message: data?.error || '伺服器處理失敗',
            statusMessage
        })
    }
})

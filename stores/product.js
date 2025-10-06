import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', () => {
    const orderStore = useOrderStore()
    const { $api } = useNuxtApp()

    const productList = ref([])
    const productDetailList = ref([])
    const stockList = ref({})

    async function updateStock() {
        const stockApi = apiList.stock
        // 取得所有產品庫存清單
        await getAllStock()

        // 根據orderInCart中產品，計算出更新庫存後的清單

        const updatedOrders = orderStore.ordersInCart.map(({ productId, qty }) => {
            return {
                productId,
                qty: Math.max(stockList.value[productId] - qty, 0)
            }
        })

        const patchStockInfo = Object.fromEntries(
            updatedOrders.map(({ productId, qty }) => [productId, { qty }])
        )

        // 使用patchAllStock的api更新庫存清單
        const { serverPath: url, method } = stockApi.patchAllStock

        await $api(url, {
            method,
            body: patchStockInfo
        })
    }

    const setStockList = (productId, stockQty) => {
        stockList.value[productId] = stockQty
    }

    const getAllStock = async () => {
        const data = await $api(apiList.stock.getAllStock.serverPath)

        const allStock = Object.fromEntries(
            Object.entries(data).map(([key, value]) => [key, value.qty])
        )

        stockList.value = allStock
    }

    const getStockById = async (productId) => {
        if (!Object.keys(stockList.value).includes(productId)) {
            const { qty } = await $api(
                apiList.stock.getStockById.serverPath.replace(':productId', productId)
            )

            setStockList(productId, qty)
        }
    }

    return {
        productList,
        productDetailList,
        stockList,
        setStockList,
        updateStock,
        getStockById,
        getAllStock
    }
})

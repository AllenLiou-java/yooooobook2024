import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', () => {
    const orderStore = useOrderStore()
    const productList = ref([])
    const productDetailList = ref([])
    const stockList = ref({})

    async function updateStock() {
        const orders = orderStore.ordersInCart
        const stockApi = apiList.stock
        const { $api } = useNuxtApp()

        if (orders.length > 0) {
            for (let i = 0; i < orders.length; i++) {
                const { qty: currentStock } = await $api(
                    stockApi.getStock.serverPath.replace(':productId', orders[i].productId),
                    {
                        method: stockApi.getStock.method
                    }
                )
                const orderQty = orders[i].qty
                const updatedQty = currentStock - orderQty

                if (updatedQty >= 0) {
                    await $api(
                        stockApi.patchStock.serverPath.replace(':productId', orders[i].productId),
                        {
                            method: stockApi.patchStock.method,
                            body: {
                                qty: updatedQty
                            }
                        }
                    )
                } else {
                    ordersInCart[i].qty = 0
                }
            }
        }
    }

    const setStockList = (productId, stockQty) => {
        stockList.value[productId] = stockQty
    }

    const getStock = async (productId) => {
        const productIdList = Object.keys(stockList.value)
        if (productIdList.length === 0 || !productIdList.includes(productId)) {
            const { qty } = await $api(
                apiList.stock.getStock.serverPath.replace(':productId', productId)
            )

            setStockList(productId, qty)
        }
    }

    return { productList, productDetailList, stockList, setStockList, updateStock, getStock }
})

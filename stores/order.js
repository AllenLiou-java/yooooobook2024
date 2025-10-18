import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', () => {
    const { stockList } = useProductStore()
    const ordersInCart = ref([])
    const isOrderLoading = ref(false)
    const userOrderInfo = ref([])

    const qtyInCart = computed(() => {
        return ordersInCart.value.length
    })

    function addOrderInCart(order) {
        const orderList = ordersInCart.value
        const orderIndex = orderList.findIndex((item) => item.productId === order.productId)

        if (orderIndex === -1) {
            orderList.push(order)
        } else {
            const maxStock = stockList[order.productId]
            // Math.min 決定訂購數量要加總還是取上限
            orderList[orderIndex].qty = Math.min(orderList[orderIndex].qty + order.qty, maxStock)
        }

        ordersInCart.value = orderList
    }

    function addOrderInStorage(order) {
        const orderList = JSON.parse(localStorage.getItem('orderList')) || []
        const orderIndex = orderList.findIndex((item) => item.productId === order.productId)

        if (orderIndex === -1) {
            orderList.push(order)
        } else {
            const maxStock = stockList[order.productId]
            // Math.min 決定訂購數量要加總還是取上限
            orderList[orderIndex].qty = Math.min(orderList[orderIndex].qty + order.qty, maxStock)
        }

        localStorage.setItem('orderList', JSON.stringify(orderList))
    }

    function updateOrderQtyInCart(productId, additionalQty) {
        const order = ordersInCart.value.find((item) => item.productId === productId)
        if (order) order.qty += additionalQty
    }

    function setOrderInStorage(productId, additionalQty) {
        // if (order.qty === 0) return

        const orderList = JSON.parse(localStorage.getItem('orderList')) || []
        const orderIndex = orderList.findIndex((orderItem) => orderItem.productId === productId)

        localStorage.setItem('orderList', JSON.stringify(orderList))
        orderList[orderIndex].qty += additionalQty
        localStorage.setItem('orderList', JSON.stringify(orderList))
    }

    function getOrderListInStorage() {
        return JSON.parse(localStorage.getItem('orderList'))
    }

    function deleteOrder(productId) {
        const orderList = ordersInCart.value
        const orderIndex = orderList.findIndex((orderItem) => orderItem.productId === productId)
        orderList.splice(orderIndex, 1)
        ordersInCart.value = orderList
        localStorage.setItem('orderList', JSON.stringify(orderList))
    }

    function clearAllOrder() {
        ordersInCart.value = []
        localStorage.removeItem('orderList')
    }

    // 共用補 0 工具
    const pad = (n) => String(n).padStart(2, '0')

    // 產生日期字串
    function orderDateCreater() {
        const now = new Date()
        const year = now.getFullYear()
        const month = pad(now.getMonth() + 1)
        const day = pad(now.getDate())
        const hour = pad(now.getHours())
        const minutes = pad(now.getMinutes())

        return `${year}/${month}/${day} ${hour}:${minutes}`
    }

    // 產生訂單 ID
    function orderIdCreater() {
        const now = new Date()
        const year = String(now.getFullYear()).slice(2)
        const month = pad(now.getMonth() + 1)
        const day = pad(now.getDate())
        const hour = pad(now.getHours())
        const minutes = pad(now.getMinutes())
        const seconds = pad(now.getSeconds())
        const random = Math.floor(Math.random() * 900 + 100) // 100–999

        return `${year}${month}${day}${hour}${minutes}${seconds}${random}`
    }

    async function patchOrderInfo(orderInfo) {
        const { name, address, email, phone, bankAccountNo, buyer, taxId, isFromGroup } = orderInfo
        const { idToken, userId } = useUserStore()
        const { notify } = useToastifyStore()
        const { $api } = useNuxtApp()
        const router = useRouter()

        if (!idToken) return

        const orderList = ordersInCart.value.map(
            ({ productName, productId, content, imgSrc, discount, qty }) => ({
                productId,
                productName,
                qty,
                unitPrice: discount,
                totalPrice: discount * qty,
                content,
                imgSrc
            })
        )

        const totalPrice = orderList.reduce((sum, i) => sum + i.totalPrice, 0)

        const info = {
            buyer,
            receiver: {
                name,
                address
            },
            email,
            phone,
            taxId,
            bankAccountNo,
            orderId: orderIdCreater(),
            orderList,
            totalPrice,
            oderDate: orderDateCreater(),
            status: '1',
            isClosed: false,
            delivery: {
                company: '',
                trackingNo: '',
                trackingUrl: ''
            },
            remark: '',
            isFromGroup,
            files: []
        }

        try {
            // 更新訂單
            await $api(
                apiList.order.patchOrderInfo.serverPath.replace(
                    ':userId/:orderId',
                    `${userId}/${info.orderId}`
                ),
                {
                    method: apiList.order.patchOrderInfo.method,
                    body: info
                }
            )

            // 寄訂單確認信
            await $api('/api/mail/orderComfirmed', {
                method: 'post',
                body: {
                    orderInfo: info
                }
            })

            // 導向成功頁面
            await router.push({
                path: `/cart/success/${info.orderId}`
            })

            notify('info', '訂單資訊已發送至指定信箱')
        } catch (e) {
            notify('error', e.message, e.statusCode)
        }
    }

    async function patchGroupOrderInfo(orderInfo) {
        const { name, address, email, phone, bankAccountNo, buyer, taxId, isFromGroup, planId } =
            orderInfo
        const { notify } = useToastifyStore()
        const { $api } = useNuxtApp()
        const router = useRouter()

        const orderList = ordersInCart.value.map(
            ({ productName, productId, content, imgSrc, discount, qty }) => ({
                productId,
                productName,
                qty,
                unitPrice: discount,
                totalPrice: discount * qty,
                content,
                imgSrc
            })
        )

        const totalPrice = orderList.reduce((sum, i) => sum + i.totalPrice, 0)

        const info = {
            buyer,
            receiver: {
                name,
                address
            },
            email,
            phone,
            taxId,
            bankAccountNo,
            orderId: orderIdCreater(),
            orderList,
            totalPrice,
            oderDate: orderDateCreater(),
            status: '1',
            isClosed: false,
            delivery: {
                company: '',
                trackingNo: '',
                trackingUrl: ''
            },
            remark: '',
            isFromGroup,
            files: []
        }

        try {
            // 更新訂單
            const { serverPath, method } = apiList.groupOrder.patchOrderInfo
            await $api(serverPath.replace(':planId/:orderId', `${planId}/${info.orderId}`), {
                method,
                body: info
            })

            // 寄訂單確認信
            await $api('/api/mail/orderComfirmed', {
                method: 'post',
                body: {
                    orderInfo: info
                }
            })

            // 導向成功頁面
            await router.push({
                path: `/cart/success/${info.orderId}`
            })

            await router.push({ name: 'ezbuy-success', query: { planId, orderId: info.orderId } })

            notify('info', '訂單資訊已發送至指定信箱')
        } catch (e) {
            notify('error', e.message, e.statusCode)
        }
    }

    function $reset() {
        // ordersInCart.value = []
        isOrderLoading.value = false
        userOrderInfo.value = []
    }

    return {
        ordersInCart,
        qtyInCart,
        isOrderLoading,
        userOrderInfo,
        addOrderInCart,
        addOrderInStorage,
        updateOrderQtyInCart,
        getOrderListInStorage,
        setOrderInStorage,
        deleteOrder,
        clearAllOrder,
        orderDateCreater,
        orderIdCreater,
        patchOrderInfo,
        patchGroupOrderInfo,
        $reset
    }
})

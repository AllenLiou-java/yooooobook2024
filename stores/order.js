import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', () => {
  const ordersInCart = ref([])
  const isOrderLoading = ref(false)
  const userOrderInfo = ref([])

  const qtyInCart = computed(() => {
    return ordersInCart.value.length
  })

  function addOrderInCart(productInfo, orderQty) {
    const {
      name: productName,
      productId,
      content,
      imgSrc,
      price: { discount }
    } = productInfo

    const order = {
      productName,
      productId,
      content,
      imgSrc,
      discount,
      qty: orderQty
    }

    updateOrdersInCart(order, orderQty)
    setOrderInStorage(order, orderQty)
  }

  function updateOrdersInCart(order, newOrderQty) {
    if (order.qty === 0) return

    const orderList = ordersInCart.value
    if (orderList.length === 0) {
      orderList.push(order)
    } else {
      const orderIndex = orderList.findIndex((orderItem) => orderItem.productId === order.productId)
      if (orderIndex < 0) {
        orderList.push(order)
      } else {
        orderList[orderIndex].qty = orderList[orderIndex].qty + newOrderQty
      }
      ordersInCart.value = orderList
    }
  }

  function getOrderListInStorage() {
    return JSON.parse(localStorage.getItem('orderList'))
  }

  function setOrderInStorage(order, newOrderQty) {
    if (order.qty === 0) return

    const orderList = JSON.parse(localStorage.getItem('orderList')) || []
    const orderIndex = orderList.findIndex((orderItem) => orderItem.productId === order.productId)
    if (orderIndex < 0) {
      orderList.push(order)
      localStorage.setItem('orderList', JSON.stringify(orderList))
    } else {
      orderList[orderIndex].qty = orderList[orderIndex].qty + newOrderQty
      localStorage.setItem('orderList', JSON.stringify(orderList))
    }
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

  function setTimeDateFmt(s) {
    return s < 10 ? '0' + s : s
  }

  function oderDateCreater() {
    const now = new Date()
    const _year = now.getFullYear()
    let _month = now.getMonth() + 1
    let _day = now.getDate()
    let _hour = now.getHours()
    let _minutes = now.getMinutes()

    _month = setTimeDateFmt(_month)
    _day = setTimeDateFmt(_day)
    _hour = setTimeDateFmt(_hour)
    _minutes = setTimeDateFmt(_minutes)

    const orderDate = `${_year.toString()}/${_month.toString()}/${_day} ${_hour}:${_minutes}`
    return orderDate
  }

  function orderIdCreater() {
    const now = new Date()
    const _year = now.getFullYear()
    let _month = now.getMonth() + 1
    let _day = now.getDate()
    let _hour = now.getHours()
    let _minutes = now.getMinutes()
    let _seconds = now.getSeconds()

    _month = setTimeDateFmt(_month)
    _day = setTimeDateFmt(_day)
    _hour = setTimeDateFmt(_hour)
    _minutes = setTimeDateFmt(_minutes)
    _seconds = setTimeDateFmt(_seconds)
    const orderCode =
      _year.toString().slice(2, 4) +
      _month.toString() +
      _day +
      _hour +
      _minutes +
      _seconds +
      Math.round(Math.random() * (999 - 100) + 100).toString()

    return orderCode
  }

  async function patchOrderInfo(oderInfo) {
    isOrderLoading.value = true
    const { name, address, email, phone, bankAccountNo, buyer, taxId } = oderInfo
    const orderList = ordersInCart.value.map((orderItem) => {
      const { productName, productId, content, imgSrc, discount, qty } = orderItem
      return {
        productId,
        productName,
        qty,
        totalPrice: discount * qty,
        unitPrice: discount,
        content,
        imgSrc
      }
    })

    let orderListTotalPrice = null
    orderList.forEach((orderItem) => {
      orderListTotalPrice += orderItem.totalPrice
    })

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
      totalPrice: orderListTotalPrice,
      oderDate: oderDateCreater(),
      status: '1',
      isClosed: false,
      delivery: {
        company: '',
        trackingNo: '',
        trackingUrl: ''
      },
      remark: '',
      isFromGroup: false,
      files: []
    }

    const { notify } = useToastifyStore()
    const router = useRouter()
    const { idToken, userId } = useUserStore()

    if (idToken) {
      try {
        const { $api } = useNuxtApp()

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

        clearAllOrder()
        await router.push({
          path: `/cart/success/${info.orderId}`
        })

        await $api('/api/mail', {
          method: 'post',
          body: {
            orderInfo: info
          }
        })

        notify('info', '訂單資訊已發送至指定信箱')
        isOrderLoading.value = false
      } catch (e) {
        notify('error', e.message, e.statusCode)
      }
    }
  }

  function $reset() {
    ordersInCart.value = []
    isOrderLoading.value = false
    userOrderInfo.value = []
  }

  return {
    ordersInCart,
    qtyInCart,
    isOrderLoading,
    userOrderInfo,
    addOrderInCart,
    updateOrdersInCart,
    getOrderListInStorage,
    setOrderInStorage,
    deleteOrder,
    clearAllOrder,
    setTimeDateFmt,
    oderDateCreater,
    orderIdCreater,
    patchOrderInfo,
    $reset
  }
})

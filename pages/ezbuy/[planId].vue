<template>
    <div class="py-80 lt-md:py-60 min-h-[calc(100vh-96px-346px)] px-72 lt-md:px-36">
        <h1 class="mb-24 text-blue_dark">{{ groupBuyingPlan.title }}</h1>
        <p class="mb-16 bg-[#fbe45d] inline-block px-8 py-4 rounded-6">
            優惠期間：{{ groupBuyingPlan.promotionPeriod }}
        </p>
        <div class="mb-32 lt-md:mb-24">
            <p class="leading-24 mb-8" v-for="partContent in groupBuyingPlan.content">
                {{ partContent }}
            </p>
        </div>

        <div>
            <img
                class="mb-44 lt-md:mb-24 rounded-6 lt-md:hidden"
                :src="groupBuyingPlan.bannerImg.pc"
                alt="banner_cover"
            />
            <img
                class="mb-44 lt-md:mb-24 rounded-6 hidden lt-md:block"
                :src="groupBuyingPlan.bannerImg.mobile"
                alt="banner_cover"
            />
        </div>

        <div class="flex flex-wrap gap-x-20 gap-y-60">
            <CardBookOrder
                class="w-[calc(33%-16px)] lt-xl:w-[calc(50%-20px)] lt-md:w-full shrink-0"
                v-for="productDetail in groupBuyingPlan.products"
                v-bind="productDetail"
                @addOrder="addOrderEmit"
                @checkout="checkoutEmit"
            />
        </div>
    </div>
</template>

<script setup>
const route = useRoute()
const { planId } = route.params
const router = useRouter()

const { $api } = useNuxtApp()

const productStore = useProductStore()

const { data: groupBuyingPlan, error } = await useAsyncData('groupBuyingPlan', async () => {
    const info = await $api(
        apiList.groupBuying.getGroupBuyingPlan.serverPath.replace(':planId', `${planId}`)
    )

    productStore.$patch((state) => {
        state.productDetailList = info
    })
    return info
})

// 取得產品庫存
await callOnce(async () => {
    await productStore.getAllStock()
})

const orderStore = useOrderStore()
const { addOrderInCart, addOrderInStorage } = orderStore
const { ordersInCart } = storeToRefs(orderStore)

const addOrderEmit = (order) => {
    addOrderInCart(order)
    addOrderInStorage(order)
}

const checkoutEmit = (order) => {
    const { qty } = order
    const hasOrders = ordersInCart.value.length > 0

    // 沒有任何商品可結帳就不動作
    if (!hasOrders && qty === 0) return

    if (qty > 0) addOrderEmit(order)

    router.push({ name: 'ezbuy-cart', query: { id: 'ezbuy', planId } })
}

onBeforeUnmount(() => {
    productStore.$patch((state) => {
        state.productDetailList = []
    })
})
</script>

<style lang="scss" scoped></style>

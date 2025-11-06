<template>
    <div v-if="success" class="bg-[#d2e7f9]">
        <div
            v-if="groupBuyingPlan.launch"
            class="py-80 lt-md:py-60 min-h-[calc(100vh-96px-346px)] px-72 lt-md:px-36"
        >
            <h1 class="mb-24 text-blue_dark">【{{ groupBuyingPlan.title }}】</h1>
            <p class="mb-16 bg-[#fbe45d] inline-block px-8 py-4 rounded-6">
                優惠期間：即日起 - {{ groupBuyingPlan.closingDate }}
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
        <div v-else class="container flex-center gap-x-40 gap-y-30 flex-col py-40">
            <h1>活動截止</h1>
            <div class="text-20">
                <p class="mb-12 lt-sm:text-16">
                    感謝各位熱烈支持，【{{ groupBuyingPlan.title }}】已截止。
                </p>
                <p class="mb-12 lt-sm:text-16">
                    若您想透過優惠活動購入書籍，請持續關注我們的最新消息。
                </p>
                <p class="mb-32 lt-sm:text-16">留下您的聯絡資料，若有優惠活動將主動通知您。</p>
                <iframe
                    class="pr-12"
                    src="https://forms.gle/aWdUeppATzAhPvbYA"
                    width="100%"
                    height="600"
                    frameborder="0"
                    marginheight="0"
                    marginwidth="0"
                    >載入中…</iframe
                >
            </div>
        </div>
    </div>
    <div v-else class="py-80 lt-md:py-60 min-h-[calc(100vh-96px-346px)] px-72 lt-md:px-36">
        {{ message }}
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'group-buying-layout'
})

const { planId } = useRoute().params
const router = useRouter()

const { $api } = useNuxtApp()

const productStore = useProductStore()
const { getAllStock } = productStore

const orderStore = useOrderStore()
const { addOrderInCart, addOrderInStorage } = orderStore
const { ordersInCart } = storeToRefs(orderStore)

const {
    data: {
        value: { success, message, data: groupBuyingPlan }
    }
} = await useAsyncData('groupBuyingPlan', async () => {
    const info = await $api(
        apiList.groupBuying.getGroupBuyingPlan.serverPath.replace(':planId', `${planId}`)
    )

    if (info.data) {
        productStore.$patch((state) => {
            state.productDetailList = info.data.products
        })

        await getAllStock()

        info.data.products = info.data.products.map((p) => ({
            ...p,
            stock: productStore.stockList[p.productId]
        }))

        return info
    } else {
        return info
    }
})

if (!groupBuyingPlan) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not found'
    })
}

const addOrderEmit = (order) => {
    addOrderInCart(order)
    addOrderInStorage(order)
}

const checkoutEmit = (order) => {
    const { qty } = order

    const hasOrders = Array.isArray(ordersInCart.value) && ordersInCart.value.length > 0

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

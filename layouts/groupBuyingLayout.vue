<template>
    <ConfirmDialog group="headless">
        <template #container="{ message, acceptCallback, rejectCallback }">
            <div class="flex flex-col items-center p-28 rounded-full">
                <div
                    class="rounded-full inline-flex justify-center items-center bg-white h-84 w-84 -mt-72"
                >
                    <span class="material-icons text-blue text-104"> help </span>
                </div>
                <span class="font-bold text-24 block mb-8 mt-20">{{ message.header }}</span>
                <p class="mb-0">{{ message.message }}</p>
                <div class="flex items-center gap-8 mt-20">
                    <Button
                        class="min-w-120"
                        :label="message.acceptLabel"
                        @click="acceptCallback"
                    ></Button>
                    <Button
                        class="min-w-120"
                        :label="message.rejectLabel"
                        outlined
                        @click="rejectCallback"
                    ></Button>
                </div>
            </div>
        </template>
    </ConfirmDialog>
    <div class="bg-blue_dark tracking-widest z-999 w-full fixed">
        <div class="container py-18">
            <div class="flex justify-between items-center flex-grow-1">
                <AppLogo />

                <CartButton :qty="qtyInCart" @click="cartSidebarVisible = true" />
            </div>
        </div>
        <Sidebar
            v-model:visible="cartSidebarVisible"
            :dismissable="false"
            header="購物車"
            position="right"
            block-scroll
            class="border-0"
            :pt="{
                header: {
                    class: 'bg-blue_light text-white'
                },
                closeButton: {
                    class: 'bg-blue_light group hover:bg-white border-0 focus-visible:outline-none'
                },
                closeIcon: {
                    class: 'text-white group-hover:text-blue_light'
                }
            }"
            @show="blocked = true"
        >
            <ScrollPanel class="h-[calc(100vh-166px)] pr-16 my-16">
                <ul>
                    <li v-for="order in ordersInCart" :key="order.productId" class="pt-16 text-14">
                        <div class="flex items-center gap-12">
                            <ClientOnly>
                                <img class="w-80" :src="order.imgSrc" alt="order.productId" />
                            </ClientOnly>
                            <div>
                                <p class="mb-8">{{ order.productName }}</p>
                                <p class="mb-8 text-secondary">
                                    $ {{ thousandthsFormat(order.discount * order.qty) }}
                                </p>

                                <div class="flex items-center">
                                    <button
                                        class="material-icons text-20 p-2 cursor-pointer bg-blue rounded-2xl text-white border-0"
                                        @click="updateOrderQty('minus', order.productId)"
                                    >
                                        remove
                                    </button>
                                    <span class="mx-12 w-24 text-center">{{ order.qty }}</span>
                                    <button
                                        class="material-icons text-20 p-2 cursor-pointer bg-blue rounded-2xl text-white border-0"
                                        @click="updateOrderQty('add', order.productId)"
                                    >
                                        add
                                    </button>
                                </div>
                            </div>
                            <span
                                class="material-icons cursor-pointer"
                                @click="deleteOrderItem(order.productId)"
                            >
                                delete
                            </span>
                        </div>
                        <Divider />
                    </li>
                </ul>
            </ScrollPanel>
            <Divider class="m-0" />
            <div class="grid grid-cols-2 gap-18 pt-16">
                <Button
                    label="關閉"
                    class="grow border-none leading-20"
                    @click="cartSidebarVisible = false"
                />
                <Button
                    label="結帳"
                    class="grow border-none leading-20 bg-secondary hover:bg-[#d80545]"
                    @click="toCartPage"
                />
            </div>
        </Sidebar>
    </div>
    <div class="pt-60">
        <slot />
    </div>
    <LayoutFooter />
    <SideSocialGroup />
</template>

<script setup>
import LayoutFooter from '@/components/layout/Footer.vue'
import SideSocialGroup from '@/components/SideSocialGroup.vue'
import ConfirmDialog from 'primevue/confirmdialog'

const router = useRouter()
const confirm = useConfirm()
const blocked = ref(false)
const cartSidebarVisible = ref(false)

const orderStore = useOrderStore()
const { ordersInCart, qtyInCart } = storeToRefs(orderStore)
const { updateOrderQtyInCart, setOrderInStorage, deleteOrder } = orderStore

const productStore = useProductStore()
const { getStockById } = productStore
const { stockList } = storeToRefs(productStore)

const updateOrderQty = async (calculateType, productId) => {
    const order = ordersInCart.value.find((item) => item.productId === productId)
    if (!order) return

    // ➖ 減少數量
    if (calculateType === 'minus') {
        if (order.qty > 1) {
            updateOrderQtyInCart(productId, -1)
            setOrderInStorage(productId, -1)
        } else {
            confirm.require({
                group: 'headless',
                header: '刪除',
                message: '您確定要刪除嗎?',
                rejectLabel: '取消',
                acceptLabel: '確定',
                accept: () => deleteOrder(productId)
            })
        }
        return
    }

    // ➕ 增加數量
    await getStockById(productId)
    const stock = stockList.value[productId]
    if (order.qty < stock) {
        updateOrderQtyInCart(productId, 1)
        setOrderInStorage(productId, 1)
    }
}

const deleteOrderItem = (productId) => {
    confirm.require({
        group: 'headless',
        header: '刪除',
        message: '您確定要刪除嗎?',
        rejectLabel: '取消',
        acceptLabel: '確定',
        accept: () => {
            deleteOrder(productId)
        },
        reject: () => {
            console.log('cancel')
        }
    })
}

const toCartPage = () => {
    router.push('/cart')
    cartSidebarVisible.value = false
}

onMounted(() => {
    const orderListInStorage = JSON.parse(localStorage.getItem('orderList'))
    if (orderListInStorage !== null) {
        orderStore.$patch({
            ordersInCart: orderListInStorage
        })
    }
})
</script>

<style lang="scss" scoped></style>

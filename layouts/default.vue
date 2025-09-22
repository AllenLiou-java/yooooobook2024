<template>
    <div class="layout relative">
        <CustomLoading />

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

        <Dialog
            v-model:visible="isVerifyEmailDialogVisible"
            modal
            header="Email 信箱驗證"
            :showHeader="false"
            :style="{ width: '30rem', margin: '0px 16px', paddingTop: '24px' }"
        >
            <div class="flex-center flex-col">
                <div class="border-blue border-solid inline-block p-10 rounded-full mb-24">
                    <div class="i-me-rocket_launch size-36"></div>
                </div>
                <p class="font-bold mb-16 text-20">驗證信已寄出囉！</p>
                <p class="block mb-16">
                    記得前往信箱
                    <span class="text-secondary">{{ email }}</span> 收取驗證信喔！
                </p>
                <p class="block mb-24">
                    ※若收件匣無信件，請 <span class="text-secondary">檢查垃圾郵件匣</span>。
                </p>

                <Button
                    class="w-full"
                    type="button"
                    label="了解"
                    @click="utilityStore.setVerifyEmailDialogVisible(false)"
                ></Button>
            </div>
        </Dialog>

        <Dialog
            v-model:visible="isResetPasswordDialogVisible"
            modal
            header="密碼重置"
            :showHeader="false"
            :style="{ width: '30rem', margin: '0px 16px', paddingTop: '24px' }"
        >
            <div class="flex-center flex-col">
                <div class="border-blue border-solid inline-block p-10 rounded-full mb-24">
                    <div class="i-me-rocket_launch size-36"></div>
                </div>
                <p class="font-bold mb-16 text-20">重置信件已寄出囉！</p>
                <p class="block mb-16">
                    請前往信箱
                    <span class="text-secondary">{{ email }}</span> 收取重置信喔！
                </p>
                <p class="block mb-24">
                    ※若收件匣無信件，請 <span class="text-secondary">檢查垃圾郵件匣</span>。
                </p>

                <Button
                    class="w-full"
                    type="button"
                    label="了解"
                    @click="utilityStore.setResetPasswordDialogVisible(false)"
                ></Button>
            </div>
        </Dialog>

        <LayoutHeader @set-visible="setVisible" />

        <div>
            <slot />
        </div>
        <LayoutFooter />

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
        <SideSocialGroup />
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import AOS from 'aos'
import 'aos/dist/aos.css'
import LayoutHeader from '@/components/layout/Header.vue'
import LayoutFooter from '@/components/layout/Footer.vue'
import SideSocialGroup from '@/components/SideSocialGroup.vue'
import ConfirmDialog from 'primevue/confirmdialog'

const utilityStore = useUtilityStore()
const { isVerifyEmailDialogVisible, isResetPasswordDialogVisible } = storeToRefs(utilityStore)

const userStore = useUserStore()
const { email } = storeToRefs(userStore)

const blocked = ref(false)

const cartSidebarVisible = ref(false)
const router = useRouter()
const toCartPage = () => {
    router.push('/cart')
    cartSidebarVisible.value = false
}
const route = useRoute()
useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - 有良冊股份有限公司` : '有良冊股份有限公司'
    },
    meta: [{ property: 'og:title', content: ` ${route.meta.title} - 有良冊股份有限公司` }]
})

useSeoMeta({
    title: '有良冊股份有限公司',
    ogTitle: '有良冊股份有限公司',
    keywords:
        '有良冊,公司登記,公司申請,公司登記實務及案例解析,有限公司,股份有限公司,應備文件詳析,company registration,增資,發行新股,公司登記基礎,公司登記進階,工商登記諮詢',
    ogSiteName: '有良冊股份有限公司',
    ogType: 'website',
    ogLocale: 'zh_TW',
    description:
        '《有良冊》致力於出版公司登記專書，並透過本網站與Facebook粉絲專頁分享公司法及公司登記實務知識，另提供免費公司登記諮詢服務。【加入官方 LINE 好友👉 https://lin.ee/f8oZLym】',
    ogDescription:
        '《有良冊》致力於出版公司登記專書，並透過本網站與Facebook粉絲專頁分享公司法及公司登記實務知識，另提供免費公司登記諮詢服務。【加入官方 LINE 好友👉 https://lin.ee/f8oZLym】',
    ogImage: '/yooooobook.jpg'
})
const { initProfile } = useUserStore()

const idToken = useCookie('idToken')

if (idToken.value) {
    await useAsyncData('profile', () => initProfile())
}

const setVisible = () => {
    cartSidebarVisible.value = true
}

const orderStore = useOrderStore()
const { ordersInCart } = storeToRefs(orderStore)
const { updateOrderQtyInCart, setOrderInStorage, deleteOrder } = useOrderStore()
const { getStock } = useProductStore()
const { stockList } = storeToRefs(useProductStore())

const confirm = useConfirm()
const updateOrderQty = async (calculateType, productId) => {
    const orderList = ordersInCart.value
    const orderIndex = orderList.findIndex((orderItem) => orderItem.productId === productId)
    if (calculateType === 'minus') {
        if (orderList[orderIndex].qty - 1 > 0) {
            updateOrderQtyInCart(productId, -1)
            setOrderInStorage(productId, -1)
        } else {
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
    } else {
        await getStock(productId)
        const stock = stockList.value[productId]
        if (orderList[orderIndex].qty + 1 <= stock) {
            updateOrderQtyInCart(productId, 1)
            setOrderInStorage(productId, 1)
        }
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

onMounted(() => {
    const orderListInStorage = JSON.parse(localStorage.getItem('orderList'))
    if (orderListInStorage !== null) {
        orderStore.$patch({
            ordersInCart: orderListInStorage
        })
    }

    AOS.init({
        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 120, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 800, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: true, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom' // defines which position of the element regarding to window should trigger the animation
    })
})
</script>

<style lang="scss" scoped></style>

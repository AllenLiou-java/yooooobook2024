<template>
    <div>
        <div class="relative text-white">
            <div class="container h-500 lt-md:h-320 relative">
                <div class="absolute bottom-20 w-[calc(100%-80px)] left-60 z-100 lt-md:left-30">
                    <h1
                        class="relative text-52 before:(content-[''] absolute top-1/2 left-0 -translate-y-1/2 w-6 h-[80%] bg-[#35e3eb]) pl-20"
                    >
                        訂單內容
                    </h1>
                    <hr class="bg-white mt-32 mb-24" />
                    <Breadcrumb :link-list="routeList" />
                </div>
            </div>
            <div
                class="absolute top-0 left-0 bg-[url('@/assets/images/home/city.png')] bg-cover bg-no-repeat bg-bottom w-full h-full z-[-1]"
            />
            <div class="mask-70"></div>
        </div>
        <div class="container pt-48 pb-80 text-primary">
            <template v-if="isOrderInfoShow">
                <div class="font-black flex justify-between items-center">
                    <p class="text-32 text-brown">訂單摘要</p>
                    <NuxtLink class="underline underline-offset-4" to="/order">回到上一頁</NuxtLink>
                </div>
                <Divider class="lt-md:hidden" />
                <ul class="mb-24 lt-md:(border-1 border-solid border-gray_light p-16 mt-20)">
                    <li class="font-black mb-12 grid grid-cols-[110px_auto]">
                        <span class="w-110 inline-block">訂單信息</span>
                        <span class="text-secondary">{{ mapOrderStatus(orderInfo.status) }}</span>
                    </li>
                    <li class="mb-12 grid grid-cols-[110px_auto]">
                        <span class="w-110 inline-block">訂單號碼：</span>
                        <span>{{ orderInfo.orderId }}</span>
                    </li>
                    <li class="mb-12 grid grid-cols-[110px_auto]">
                        <span class="w-110 inline-block">訂單日期：</span>
                        <span>{{ orderInfo.oderDate }}</span>
                    </li>
                    <li class="mb-12">
                        <span class="w-110 inline-block mb-8">訂單內容：</span>
                        <DataTable
                            :value="orderInfo.orderList"
                            row-group-mode="rowspan"
                            :group-rows-by="['orderId', 'oderDate']"
                            striped-rows
                            show-gridlines
                            class="w-[50%] lt-lg:w-[80%] lt-md:w-[100%]"
                        >
                            <Column
                                field="productName"
                                header="產品名稱"
                                header-class="bg-blue text-white"
                                :pt="{
                                    headerContent: {
                                        class: 'block text-center'
                                    }
                                }"
                                style="width: 30%"
                            ></Column>
                            <Column
                                field="qty"
                                header="數量"
                                header-class="bg-blue text-white"
                                class="text-center"
                                :pt="{
                                    headerContent: {
                                        class: 'block text-center'
                                    }
                                }"
                                style="width: 2%"
                            ></Column>
                            <Column
                                field="totalPrice"
                                header="金額"
                                header-class="bg-blue text-white"
                                class="text-center"
                                style="width: 2%"
                                :pt="{
                                    headerContent: {
                                        class: 'block text-center'
                                    }
                                }"
                            >
                                <template #body="slotProps">
                                    {{ thousandthsFormat(slotProps.data.totalPrice) }}
                                </template>
                            </Column>
                            <ColumnGroup type="footer">
                                <Row>
                                    <Column
                                        footer="總金額:"
                                        :colspan="2"
                                        footer-style="text-align:right"
                                    />
                                    <Column
                                        class="text-secondary text-center"
                                        :footer="thousandthsFormat(orderInfo.totalPrice)"
                                    />
                                </Row>
                            </ColumnGroup>
                        </DataTable>
                    </li>
                </ul>
                <ul class="mb-24 lt-md:(border-1 border-solid border-gray_light p-16)">
                    <li class="font-black mb-12">
                        <span class="w-110 inline-block">物流信息</span>
                    </li>
                    <li class="mb-12 grid grid-cols-[110px_auto]">
                        <span class="w-110 inline-block">收貨地址：</span>
                        <span>{{ orderInfo.receiver.address }}</span>
                    </li>
                </ul>

                <p class="text-32 font-black text-brown">訂購人資訊</p>
                <Divider class="lt-md:hidden" />
                <ul class="lt-md:(border-1 border-solid border-gray_light p-16 p-16 mt-20)">
                    <li class="mb-12 grid grid-cols-[110px_auto]">
                        <span class="w-110 inline-block">收件人：</span>
                        <span>{{ orderInfo.receiver.name }}</span>
                    </li>
                    <li class="mb-12 grid grid-cols-[110px_auto]">
                        <span class="w-110 inline-block">聯絡電話：</span>
                        <span>{{ orderInfo.phone }}</span>
                    </li>
                    <li class="mb-12 grid grid-cols-[110px_auto]">
                        <span class="w-110 inline-block">發票買受人：</span>
                        <span>{{ orderInfo.buyer }}</span>
                    </li>
                    <li class="mb-12 grid grid-cols-[110px_auto]">
                        <span class="w-110 inline-block">統一編號：</span>
                        <span>{{ orderInfo.taxId }}</span>
                    </li>
                    <li class="mb-12 grid grid-cols-[110px_auto]">
                        <span class="w-110 inline-block">帳戶後5碼：</span>
                        <span>{{ orderInfo.bankAccountNo }}</span>
                    </li>
                </ul>
            </template>
            <template v-else>
                <div class="h-[20vh] flex-center">
                    <p class="text-20">查無訂單資料 ></p>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'

const route = useRoute()
const { notify } = useToastifyStore()
const userStore = useUserStore()
const { userId, idToken } = storeToRefs(userStore)
const orderStore = useOrderStore()
const { userOrderInfo } = storeToRefs(orderStore)

definePageMeta({
    middleware: (to, from) => {
        const idToken = useCookie('idToken')
        if (idToken) {
            return true
        } else {
            return false
        }
    }
})
const routeList = [
    {
        name: '首頁',
        linkTo: '/'
    },
    {
        name: '訂單查詢',
        linkTo: '/order'
    },
    {
        name: '訂單內容'
    }
]

const { data: orderInfo, error } = await useAsyncData('orderInfo', () => {
    if (!idToken.value) return {}
    if (userOrderInfo.value.length === 0) {
        return $fetch(
            apiList.order.getOrderInfo.serverPath.replace(
                ':userId/:orderId',
                `${userId.value}/${route.params.orderId}`
            ),
            {
                method: apiList.order.getOrderInfo.method,
                onRequest({ options }) {
                    options.headers.set('idToken', idToken.value)
                }
            }
        )
    } else {
        return userOrderInfo.value.filter((order) => order.orderId === route.params.orderId)[0]
    }
})

if (error.value?.statusCode === 401) {
    userStore.setUserLogout()
    orderStore.$reset()
    notify('error', '權限失效，請重新登入')
    await navigateTo('/user/logIn')
}

const isOrderInfoShow = computed(() => {
    if (typeof orderInfo.value === 'object') {
        if (Object.keys(orderInfo.value).length > 0) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
})
</script>

<style lang="scss" scoped></style>

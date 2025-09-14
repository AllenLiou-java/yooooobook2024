<template>
    <div>
        <div class="relative text-white">
            <div class="container h-500 lt-md:h-320 relative">
                <div class="absolute bottom-20 w-[calc(100%-80px)] left-60 z-100 lt-md:left-30">
                    <h1
                        class="relative text-52 before:(content-[''] absolute top-1/2 left-0 -translate-y-1/2 w-6 h-[80%] bg-[#35e3eb]) pl-20"
                    >
                        訂單查詢
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

        <div class="container pt-48 pb-80">
            <template v-if="isTableShow">
                <DataTable
                    :value="Object.values(orderList)"
                    row-hover
                    paginator
                    :rows="5"
                    :rows-per-page-options="[5, 10, 20]"
                    table-style="min-width: 50rem"
                    :sort-field="defaultSort.field"
                    :sort-order="defaultSort.sortOrder"
                >
                    <Column
                        :pt="{
                            headerContent: {
                                class: 'block text-center '
                            }
                        }"
                        field="orderId"
                        header="訂單號碼"
                        body-class="text-center"
                        sortable
                        style="width: 12%"
                    ></Column>
                    <Column
                        :pt="{
                            headerContent: {
                                class: 'block text-center'
                            }
                        }"
                        field="oderDate"
                        header="訂單日期"
                        body-class="text-center"
                        sortable
                        style="width: 12%"
                    ></Column>
                    <Column
                        :pt="{
                            headerContent: {
                                class: 'block text-center'
                            }
                        }"
                        header="產品名稱"
                        style="width: 25%"
                    >
                        <template #body="{ data }">
                            <ul>
                                <li v-for="orderItem in data.orderList" :key="orderItem.productId">
                                    {{ orderItem.productName }}
                                </li>
                            </ul>
                        </template>
                    </Column>
                    <Column
                        :pt="{
                            headerContent: {
                                class: 'block text-center'
                            }
                        }"
                        field="orderList"
                        header="訂購數"
                        style="width: 6%"
                    >
                        <template #body="{ data }">
                            <ul>
                                <li
                                    v-for="orderItem in data.orderList"
                                    :key="orderItem.productId"
                                    class="text-center"
                                >
                                    {{ orderItem.qty }}
                                </li>
                            </ul>
                        </template>
                    </Column>
                    <Column
                        :pt="{
                            headerContent: {
                                class: 'block text-center'
                            }
                        }"
                        header="總金額"
                        body-class="text-center"
                        style="width: 6%"
                    >
                        <template #body="{ data }">
                            {{ thousandthsFormat(data.totalPrice) }}
                        </template>
                    </Column>
                    <Column
                        :pt="{
                            headerContent: {
                                class: 'block text-center'
                            }
                        }"
                        field="status"
                        header="訂單狀態"
                        body-class="text-center"
                        style="width: 14%"
                    >
                        <template #body="{ data }">
                            {{ mapOrderStatus(data.status) }}
                        </template>
                    </Column>
                    <Column
                        :pt="{
                            headerContent: {
                                class: 'block text-center'
                            }
                        }"
                        header="操作"
                        body-class="text-center"
                        style="width: 8%"
                    >
                        <template #body="{ data }">
                            <NuxtLink
                                class="border border-blue border-solid text-blue px-12 py-6 w-96 block rounded-6 hover:(bg-blue text-white)"
                                :to="`/order/${data.orderId}`"
                                >查看詳情</NuxtLink
                            >
                        </template>
                    </Column>
                </DataTable>
            </template>
            <template v-else>
                <div class="h-[20vh] flex-center">
                    <p class="text-20">
                        若要查詢訂單，請先進行<NuxtLink
                            class="underline underline-offset-4"
                            to="/user/logIn"
                            >登入</NuxtLink
                        >
                    </p>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
useHead({
    title: '訂單查詢'
})

definePageMeta({
    title: '訂單查詢'
})

useSeoMeta({
    description: '查詢您送出的訂單資訊，同時掌握目前的訂單進度喔。',
    ogDescription: '查詢您送出的訂單資訊，同時掌握目前的訂單進度喔。',
    ogTitle: '訂單查詢 - 有良冊股份有限公司',
    ogImage: '/yooooobook.jpg',
    ogUrl: 'https://www.yooooobook.com/order'
})

const defaultSort = ref({
    field: 'oderDate',
    sortOrder: -1
})

const routeList = [
    {
        name: '首頁',
        linkTo: '/'
    },
    {
        name: '訂單查詢',
        linkTo: ''
    }
]

// const firstPage = ref(4)

const orderStore = useOrderStore()
const { notify } = useToastifyStore()
const userStore = useUserStore()
const { userId, idToken } = storeToRefs(userStore)

const { data: orderList, error } = await useAPI(
    apiList.order.getOrderList.serverPath.replace(':userId', userId.value),
    {
        method: 'get',
        onRequest({ options }) {
            options.headers.set('idToken', idToken.value)
        }
    }
)

if (error.value?.statusCode === 401) {
    notify('error', '權限失效，請重新登入')
    userStore.$reset()
    orderStore.$reset()
}

const isTableShow = computed(() => {
    if (typeof orderList.value === 'string') return false
    if (orderList.value) {
        return true
    } else {
        return false
    }
})

onMounted(() => {
    if (typeof orderList.value === 'string') return
    orderStore.$patch({
        userOrderInfo: Object.values(orderList.value)
    })
})
</script>

<style lang="scss" scoped></style>

<template>
    <!-- fixed -->
    <div class="bg-blue_dark tracking-widest z-999 w-full">
        <BlockUI :blocked="blocked" full-screen />
        <div class="container py-18 flex-center">
            <div
                class="flex justify-between items-center flex-grow-1 lt-md:(flex-col items-start justify-center)"
            >
                <AppLogo />

                <ul class="flex justify-between max-w-530 w-full mx-16 lt-lg:hidden">
                    <li
                        v-for="routeItem in routeList"
                        :key="routeItem.label"
                        class="relative group mx-12 py-4 hover:(border-0 border-b-2 border-solid border-[#35e3ea] )"
                    >
                        <NuxtLink no-prefetch :to="routeItem.route" class="pt-16 pb-24">
                            <span
                                v-if="routeItem.icon"
                                class="material-icons text-20 mr-4 text-white group-hover:text-[#35e3ea] align-text-top"
                                :class="routeItem.icon"
                                >{{ routeItem.iconName }}</span
                            >
                            <span class="text-white align-text-top group-hover:text-[#35e3ea]">{{
                                routeItem.label
                            }}</span>
                        </NuxtLink>
                        <div
                            v-if="routeItem.items?.length > 0"
                            id="sub_list"
                            class="absolute top-[44px] left-[-30px] w-130 bg-white border-0 border-t-9 border-[#35e3ea] border-solid invisible group-hover:(visible) z-99"
                        >
                            <ul id="sub_list" class="flex-center flex-col py-2">
                                <li
                                    v-for="item in routeItem.items"
                                    :key="item.label"
                                    class="border-0 border-b-1 border-solid border-gray_light text-[#35e3ea] last:border-0"
                                >
                                    <NuxtLink no-prefetch :to="item.route">
                                        <span
                                            class="text-gray_dark hover:text-[#4989a6] font-bold px-20 py-16 block"
                                            >{{ item.label }}</span
                                        >
                                    </NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>

                <div
                    class="min-w-184 h-60 shrink-0 flex flex-col justify-between lt-lg:(flex-row) lt-md:(flex-col mt-16)"
                >
                    <div class="flex-center lt-lg:mr-0 gap-12 mb-8 lt-lg:mb-0 lt-md:mb-8">
                        <CartButton :qty="qtyInCart" @click="$emit('setVisible')" />
                        <SearchButton :product-list="productList" @select="onProductSelect" />
                    </div>

                    <div class="flex justify-end items-center ml-12 lt-md:(justify-start ml-0)">
                        <UserMenu />
                    </div>
                </div>
            </div>
            <div>
                <Sidebar
                    v-model:visible="visible"
                    class="border-blue_dark"
                    :pt="{
                        root: {
                            class: 'bg-blue_dark'
                        },
                        header: {
                            class: 'text-white'
                        }
                    }"
                    header="有良冊股份有限公司"
                    position="full"
                    block-scroll
                >
                    <template #header>
                        <h1>
                            <NuxtLink
                                class="w-230 h-25 block bg-logo indent-[101%] whitespace-nowrap overflow-hidden"
                                to="/"
                                @click="visible = false"
                                >有良冊股份有限公司</NuxtLink
                            >
                        </h1>
                    </template>
                    <Divider class="m-0" />
                    <ul class="mt-12 ml-24">
                        <li v-for="routeItem in routeList" :key="routeItem.label" class="mb-24">
                            <template v-if="routeItem.items?.length > 0">
                                <p class="text-white text-24 mb-12">
                                    <span
                                        v-if="routeItem.icon"
                                        class="material-icons mr-16 text-white align-bottom"
                                    >
                                        {{ routeItem.icon }}
                                    </span>
                                    {{ routeItem.label }}
                                    <span class="material-icons"> arrow_drop_down </span>
                                </p>

                                <ul class="ml-52">
                                    <li
                                        v-for="item in routeItem.items"
                                        :key="item.label"
                                        class="mb-12"
                                    >
                                        <NuxtLink
                                            no-prefetch
                                            class="text-white text-24"
                                            :to="item.route"
                                            @click="visible = false"
                                            >{{ item.label }}</NuxtLink
                                        >
                                    </li>
                                </ul>
                            </template>
                            <template v-else>
                                <span
                                    v-if="routeItem.icon"
                                    class="material-icons mr-16 text-white align-bottom"
                                >
                                    {{ routeItem.icon }}
                                </span>
                                <NuxtLink
                                    no-prefetch
                                    class="text-white text-24"
                                    :to="routeItem.route"
                                    @click="visible = false"
                                    >{{ routeItem.label }}</NuxtLink
                                ></template
                            >
                        </li>
                    </ul>
                </Sidebar>
                <span
                    class="material-icons text-white text-48 cursor-pointer ml-16 hidden lt-lg:block"
                    @click="visible = true"
                >
                    menu
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
const { $api } = useNuxtApp()
const router = useRouter()
const { notify } = useToastifyStore()

const visible = ref(false)
const blocked = ref(false)

// === Stores ===

const orderStore = useOrderStore()
const { qtyInCart } = storeToRefs(orderStore)

const productStore = useProductStore()

const routeList = ref([
    {
        label: '首頁',
        icon: 'home',
        iconName: 'home',
        route: '/'
    },
    {
        label: '訂購書籍',
        icon: 'store',
        route: '/bookstore'
    },
    {
        label: '購物相關',
        icon: 'info',
        items: [
            {
                label: '訂單查詢',
                route: '/order'
            },
            {
                label: '購物須知',
                route: '/shoppingInfo'
            },
            {
                label: '常見問題',
                route: '/faq'
            }
        ]
    },
    {
        label: '檔案下載',
        icon: 'cloud_download',
        route: '/file'
    },
    {
        label: '聯絡我們',
        icon: 'contacts',
        route: '/contact'
    }
])

const { data: productList, error } = await useAsyncData('products', () => {
    const productList = productStore.productList
    if (Object.keys(productList).length > 0) {
        return productList
    } else {
        return $api(apiList.product.getSimpleListInfo.serverPath)
    }
})

if (error.value) {
    if (import.meta.client) {
        const message = error.value.cause.message
        const statusCode = error.value.cause.statusCode

        notify('error', message, statusCode)
    }
}

const onProductSelect = (product) => {
    router.push(`/bookstore/${product.productId}`)
}

onMounted(async () => {
    productStore.$patch({
        productList: productList.value
    })
})
</script>

<style lang="scss" scoped></style>

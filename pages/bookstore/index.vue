<template>
    <div>
        <div class="relative text-white">
            <div class="container h-500 lt-md:h-320 relative">
                <div class="absolute bottom-20 w-[calc(100%-80px)] left-60 z-100 lt-md:left-30">
                    <h1
                        class="relative text-52 before:(content-[''] absolute top-1/2 left-0 -translate-y-1/2 w-6 h-[80%] bg-[#35e3eb]) pl-20"
                    >
                        訂購書籍
                    </h1>
                    <hr class="bg-white mt-32 mb-24" />
                    <Breadcrumb :link-list="routeList" />
                </div>
            </div>
            <div
                class="absolute top-0 left-0 bg-[url('@/assets/images/banner/0001.png')] bg-cover bg-no-repeat bg-bottom w-full h-full z-[-1]"
            />
            <div class="mask-70"></div>
        </div>

        <div
            class="container text-primary flex pt-48 pb-80 font-bold lt-lg:flex-wrap lt-sm:justify-center"
        >
            <div
                class="max-w-310 w-full self-start border border-gray_light border-solid p-24 mr-60 mb-40 lt-lg:(max-w-500 mr-0 border-0 mb-20)"
            >
                <h2
                    class="text-28 relative pl-16 py-4 before:(content-[''] absolute top-1/2 left-0 -translate-y-1/2 w-2 h-[100%] bg-blue_dark)"
                >
                    Menu
                </h2>
                <hr class="bg-gray_light h-2 my-16" />
                <ul
                    class="h-120 pr-16 overflow-y-auto lt-lg:(flex gap-16 h-auto overflow-x-auto pb-12 px-12)"
                >
                    <li
                        v-for="product in productList"
                        :key="product.name"
                        class="text-20 pb-16 mb-16 border-0 border-b-1 border-solid border-gray_light lt-lg:(text-16 border-none px-12 py-8 mb-0 rounded-full shrink-0 bg-brown )"
                    >
                        <NuxtLink
                            class="text-gray_dark lt-lg:(text-white)"
                            :to="{
                                name: 'bookstore-productId',
                                params: { productId: product.productId }
                            }"
                            >{{ product.name }}</NuxtLink
                        >
                    </li>
                </ul>
            </div>

            <ul class="flex flex-wrap lt-sm:(justify-center)">
                <li
                    v-for="product in productList"
                    :key="product.productId"
                    class="relative w-251 border border-solid p-12 mx-16 mb-32 group hover:(shadow-2xl translate-y-4 duration-500) lt-sm:mx-0"
                >
                    <div v-if="product.isNew">
                        <div class="bg"></div>
                        <div class="absolute top-25 left-20 text-white -rotate-45">新品</div>
                    </div>
                    <div v-if="product.isOnSale">
                        <div class="bg"></div>
                        <div class="absolute top-18 left-20 text-white -rotate-45 text-14">
                            限時<br />優惠
                        </div>
                    </div>

                    <NuxtLink
                        :to="{
                            name: 'bookstore-productId',
                            params: { productId: product.productId }
                        }"
                        class="flex-center flex-col text-primary"
                    >
                        <div class="w-230 h-230 flex-center mb-12">
                            <img class="h-215" :src="product.imgSrc" alt="bookImg" />
                        </div>
                        <h3 class="mb-20 h-44">{{ product.name }}</h3>
                        <p class="mb-4 text-14 line-through">
                            定價：{{ thousandthsFormat(product.price.originalPrice) }} 元
                        </p>
                        <p class="text-secondary mb-12">
                            優惠價：{{ thousandthsFormat(product.price.discount) }} 元
                        </p>
                        <div
                            class="w-full text-blue text-center border border-solid p-8 group-hover:(bg-blue text-white duration-300) lt-md:(bg-blue text-white)"
                        >
                            詳細資料
                        </div>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
useHead({
    title: '訂購書籍'
})

definePageMeta({
    title: '書籍列表'
})

useSeoMeta({
    description: '出版品完整列表。',
    ogDescription: '出版品完整列表。',
    ogTitle: '書籍列表 - 有良冊股份有限公司',
    ogImage: '/yooooobook.jpg',
    ogUrl: 'https://www.yooooobook.com/bookstore'
})

const routeList = [
    {
        name: '首頁',
        linkTo: '/'
    },
    {
        name: '訂購書籍',
        linkTo: ''
    }
]

const { notify } = useToastifyStore()

const productStore = useProductStore()
const { data: productList, error } = await useAsyncData('products', () => {
    const productList = productStore.productList
    if (Object.keys(productList).length > 0) {
        return productList
    } else {
        return $fetch(apiList.product.getListInfo.serverPath)
    }
})

if (error.value) {
    if (import.meta.client) {
        const message = error.value.cause.message
        const statusCode = error.value.cause.statusCode

        notify('error', message, statusCode)
    }
}

onMounted(() => {
    productStore.$patch({
        productList: productList.value
    })
})
</script>

<style lang="scss" scoped>
.bg {
    position: absolute;
    width: 0;
    height: 0;
    border-top: 75px solid #e44;
    border-right: 75px solid transparent;
}
</style>

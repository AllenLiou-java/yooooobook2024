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
        class="max-w-310 w-full h-230 border border-gray_light border-solid p-24 mr-60 mb-40 lt-sm:mr-0"
      >
        <h2
          class="text-28 relative pl-16 py-4 before:(content-[''] absolute top-1/2 left-0 -translate-y-1/2 w-2 h-[100%] bg-blue_dark)"
        >
          Menu
        </h2>
        <hr class="bg-gray_light h-2 my-16" />
        <ul class="h-120 overflow-y-auto">
          <li
            v-for="product in productList"
            :key="product.name"
            class="text-20 pb-16 mb-16 border-0 border-b-1 border-solid border-gray_light"
          >
            <NuxtLink
              class="text-gray_dark"
              :to="{ name: 'bookstore-productId', params: { productId: product.productId } }"
              >{{ product.name }}</NuxtLink
            >
          </li>
        </ul>
      </div>

      <ul class="flex flex-wrap lt-sm:(justify-center)">
        <li
          v-for="product in productList"
          :key="product.productId"
          class="w-251 border border-solid flex-center flex-col p-12 mx-16 mb-32 group hover:(shadow-2xl translate-y-4 duration-500) lt-sm:mx-0"
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
          <NuxtLink
            class="w-full text-blue text-center border border-solid p-8 group-hover:(bg-blue text-white duration-300) lt-md:(bg-blue text-white)"
            :to="{ name: 'bookstore-productId', params: { productId: product.productId } }"
            >詳細資料</NuxtLink
          >
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
const { data: productList, error } = await useAPI(apiList.product.getListInfo.serverPath)

if (error.value) {
  if (import.meta.client) {
    const message = error.value.cause.message
    const statusCode = error.value.cause.statusCode

    notify('error', message, statusCode)
  }
}

const productStore = useProductStore()

onMounted(() => {
  productStore.$patch({
    productList: productList.value
  })
})

// const productList = ref([
//   {
//     name: '公司登記實務及案例解析(共三冊)',
//     imgSrc:
//       'https://firebasestorage.googleapis.com/v0/b/yooooobook-dev.appspot.com/o/Product%2Fbooks.png?alt=media&token=8fdf139e-19e7-48cd-83a6-0d59b75cdaee',
//     productId: 'AA00001',
//     price: {
//       originalPrice: 5500,
//       discount: 5200
//     }
//   },
//   {
//     name: '公司登記實務',
//     imgSrc:
//       'https://firebasestorage.googleapis.com/v0/b/yooooobook-dev.appspot.com/o/Product%2Fbooks.png?alt=media&token=8fdf139e-19e7-48cd-83a6-0d59b75cdaee',
//     productId: 'AA00002',
//     price: {
//       originalPrice: 4800,
//       discount: 4200
//     }
//   }
// ])
</script>

<style lang="scss" scoped></style>

<!-- eslint-disable vue/no-v-html -->
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
        class="absolute top-0 left-0 bg-[url('@/assets/images/home/city.png')] bg-cover bg-no-repeat bg-bottom w-full h-full z-[-1]"
      />
      <div class="mask-70"></div>
    </div>
    <div
      class="container text-primary flex pt-48 pb-80 font-bold flex-wrap lt-sm:justify-center gap-60"
    >
      <div
        class="max-w-310 w-full h-230 border border-gray_light border-solid p-24 shrink-0 lt-sm:mr-0"
      >
        <h2
          class="text-28 relative pl-16 py-4 before:(content-[''] absolute top-1/2 left-0 -translate-y-1/2 w-2 h-[100%] bg-blue_dark)"
        >
          Menu
        </h2>
        <hr class="bg-gray_light h-2 my-16" />
        <ul class="h-120 overflow-y-auto">
          <li
            v-for="productItem in productList"
            :key="productItem.name"
            class="text-20 pb-16 mb-16 border-0 border-b-1 border-solid border-gray_light"
          >
            <NuxtLink
              class="text-gray_dark"
              :to="{ name: 'bookstore-productId', params: { productId: productItem.productId } }"
              >{{ productItem.name }}</NuxtLink
            >
          </li>
        </ul>
      </div>
      <div class="max-w-910 w-full">
        <div class="flex gap-32 mb-44 flex-wrap">
          <div class="max-w-352 w-full border border-solid px-8 py-32">
            <img :src="product.imgSrc" alt="productImg" />
          </div>
          <div class="mt-20 mb-12 max-w-412 w-full">
            <h3 class="text-26 text-brown mb-16">{{ product.name }}</h3>
            <ul class="list-disc pl24 mb-16">
              <li v-for="(content, contentIdx) in product.content" :key="contentIdx">
                {{ content }}
              </li>
            </ul>
            <hr class="bg-brown my-12" />
            <div class="flex gap-32">
              <p>
                定價：<del>{{ thousandthsFormat(product.price.originalPrice) }}元</del>
              </p>
              <p class="text-secondary">
                優惠價：{{ thousandthsFormat(product.price.discount) }}元
              </p>
            </div>
            <hr class="bg-brown my-12" />
            <div class="flex items-center mb-16">
              <label for="orderQty">數量：</label>
              <InputNumber
                v-model="orderQty"
                input-id="orderQty"
                show-buttons
                button-layout="horizontal"
                :min="0"
                :max="stock.qty"
                input-class="w-80"
              >
                <template #incrementbuttonicon>
                  <span class="material-icons"> add </span>
                </template>
                <template #decrementbuttonicon>
                  <span class="material-icons"> remove </span>
                </template>
              </InputNumber>
            </div>
            <p class="mb-16">庫存： {{ stock }}</p>
            <div class="flex text-white gap-12">
              <div
                class="max-w-200 w-full bg-blue text-center py-16 rounded-3xl cursor-pointer hover:bg-blue_dark"
                @click="addCart(product)"
              >
                加入購物車
              </div>

              <div
                class="max-w-200 w-full bg-secondary text-center text-white py-16 rounded-3xl cursor-pointer hover:bg-[#d80545]"
                @click="checkout(product)"
              >
                前往結帳
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 class="text-20 text-blue mb-20">書籍試閱 (請點擊篇名)</h4>
          <div v-if="previewBookPhotos" class="flex flex-wrap gap-12">
            <BookPreview
              v-for="book in previewBookPhotos"
              :key="book.name"
              :tag-name="book.name"
              :image-urls="book.links"
            />
          </div>
        </div>

        <hr class="bg-gray_light my-28" />

        <div>
          <h4 class="text-20 text-blue mb-16">團購優惠價格</h4>
          <p class="mb-12">
            若有團購需求，請透過官方
            <a
              class="underline underline-offset-4 text-blue_dark text-20"
              href="https://lin.ee/f8oZLym"
              target="_blank"
              >Line</a
            >
            或 來電洽詢（0978-940-828）。
          </p>
          <div v-for="(plan, planIdx) in product.plans" :key="planIdx" class="mb-32">
            <template v-if="plan.isShow">
              <h5
                v-if="plan.type === 'person'"
                class="text-16 mt-0 mb-12 bg-blue inline-block text-white px-8 py-4"
              >
                個人團購
              </h5>
              <h5 v-else class="text-16 mt-0 mb-12 bg-secondary inline-block text-white px-8 py-4">
                公會團購
              </h5>
              <DataTable :value="plan.priceList" show-gridlines class="w-full">
                <Column
                  :pt="{
                    headerContent: {
                      class: 'block text-center'
                    }
                  }"
                  class="text-center"
                  header-class="bg-brown text-white"
                  field="title"
                  header="方案"
                ></Column>
                <Column
                  :pt="{
                    headerContent: {
                      class: 'block text-center'
                    }
                  }"
                  class="text-center"
                  header-class="bg-brown text-white"
                  field="price"
                  header="價格"
                >
                  <template #body="slotProps">
                    NT$ {{ thousandthsFormat(slotProps.data.price) }}
                  </template>
                </Column>
              </DataTable>
              <ul class="list-disc mt-12 pl-20">
                <li v-for="(planContent, idx) in plan.content" :key="idx">{{ planContent }}</li>
              </ul>
            </template>
          </div>
        </div>

        <hr class="bg-gray_light my-28" />

        <div>
          <h4 class="text-20 text-blue mb-20">書籍簡介</h4>
          <div
            v-for="(summarySegment, idx) in product.bookIntroduction.summary"
            :key="idx"
            class="mb-16"
            v-html="summarySegment"
          ></div>
        </div>

        <hr class="bg-gray_light my-28" />

        <div>
          <h4 class="text-20 text-blue mb-20">詳細資料</h4>
          <p
            v-for="(detailSegment, idx) in product.bookIntroduction.detail"
            :key="idx"
            class="mb-16"
            v-html="detailSegment"
          ></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import BookPreview from '@/components/BookPreview.vue'
import bookImgLink from '@/assets/js/bookImgLink'
const orderQty = ref(0)
const route = useRoute()
const router = useRouter()

useHead({
  title: () => `訂購書籍【${mapProductName(route.params.productId)}】`
})

definePageMeta({
  title: '訂購書籍'
})

useSeoMeta({
  description: '前往訂購頁面，可預覽出版品內容，並了解出版品詳細資訊。',
  ogDescription: '前往訂購頁面，可預覽出版品內容，並了解出版品詳細資訊。',
  ogTitle: '訂購書籍 - 有良冊股份有限公司',
  ogImage: '/yooooobook.jpg'
})

const routeList = [
  {
    name: '首頁',
    linkTo: '/'
  },
  {
    name: '訂購書籍',
    linkTo: '/bookstore'
  },
  {
    name: `${mapProductName(route.params.productId)}`,
    linkTo: ''
  }
]

const previewBookPhotos = computed(() => {
  const productId = route.params.productId
  return Object.values(bookImgLink[productId])
})

const { addOrderInCart } = useOrderStore()
const { ordersInCart } = storeToRefs(useOrderStore())
const addCart = (product) => {
  addOrderInCart(product, orderQty.value)
  orderQty.value = 0
}

const productStore = useProductStore()

const { data: product } = await useAsyncData('product', () => {
  const productDetailList = productStore.productDetailList

  if (Object.keys(productDetailList).includes(route.params.productId)) {
    return productDetailList[route.params.productId]
  } else {
    return $fetch(
      apiList.product.getItemInfo.serverPath.replace(':productId', route.params.productId)
    )
  }
})

const { data: productList } = await useAsyncData('productList', () => {
  const productList = productStore.productList

  if (Object.keys(productList).length > 0) {
    return productList
  } else {
    return $fetch(apiList.product.getListInfo.serverPath)
  }
})

const { data: _stock } = await useAPI(
  apiList.stock.getStock.serverPath.replace(':productId', route.params.productId)
)

const stock = computed(() => {
  if (_stock.value.qty >= 100) {
    return '>=100'
  } else {
    return _stock.value.qty
  }
})

const { notify } = useToastifyStore()
const { idToken } = storeToRefs(useUserStore())
const checkout = (product) => {
  if (orderQty.value > 0 || ordersInCart.value.length > 0) {
    router.push('/cart')
  } else {
    notify('info', '請選擇訂購的數量')
  }

  if (idToken.value) {
    addCart(product)
  }
}

onMounted(() => {
  const currentProductId = route.params.productId
  // 將productList更新到store
  productStore.$patch({
    productList: productList.value
  })

  // 確認product (detail)資料是否存在store的productDetailList中，若無則更新
  const detailList = productStore.productDetailList
  if (!Object.keys(detailList).includes(currentProductId)) {
    detailList[product.value.productId] = product.value

    productStore.$patch({
      productDetailList: detailList
    })
  }
})
</script>

<style lang="scss" scoped></style>

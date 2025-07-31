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
                class="absolute top-0 left-0 bg-[url('@/assets/images/banner/0001.png')] bg-cover bg-no-repeat bg-bottom w-full h-full z-[-1]"
            />
            <div class="mask-70"></div>
        </div>

        <div
            class="container text-primary flex flex-wrap pt-48 pb-80 font-bold lt-lg:flex-wrap lt-sm:justify-center"
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
                        v-for="productItem in productList"
                        :key="productItem.name"
                        class="text-20 pb-16 mb-16 border-0 border-b-1 border-solid border-gray_light lt-lg:(text-16 border-none px-12 py-8 mb-0 rounded-full shrink-0 bg-brown )"
                    >
                        <NuxtLink
                            class="text-gray_dark lt-lg:(text-white)"
                            :to="{
                                name: 'bookstore-productId',
                                params: { productId: productItem.productId }
                            }"
                            >{{ productItem.name }}</NuxtLink
                        >
                    </li>
                </ul>
            </div>

            <div class="max-w-910 w-full" v-if="productDetail">
                <div class="flex gap-32 mb-44 lt-md:flex-wrap">
                    <div class="border border-solid p-8 self-start shrink-0 lt-sm:m-auto">
                        <img
                            class="w-334 h-334 object-contain lt-sm:(w-280 h-280)"
                            :src="productDetail.imgSrc"
                            alt="productImg"
                        />
                    </div>
                    <div class="max-w-412 w-full shrink-1">
                        <h3 class="text-26 text-brown mb-16">{{ productDetail.name }}</h3>
                        <ul class="list-disc pl24 mb-16">
                            <li
                                v-for="(content, contentIdx) in productDetail.content"
                                :key="contentIdx"
                            >
                                {{ content }}
                            </li>
                        </ul>
                        <hr class="bg-brown my-12" />
                        <div class="flex gap-32">
                            <p>
                                定價：<del
                                    >{{
                                        thousandthsFormat(productDetail.price.originalPrice)
                                    }}元</del
                                >
                            </p>
                            <p class="text-secondary">
                                優惠價：{{ thousandthsFormat(productDetail.price.discount) }}元
                            </p>
                        </div>
                        <!-- <div class="mt-10" v-html="productDetail.price.remarkContent"></div> -->

                        <hr class="bg-brown my-12" />
                        <div class="flex items-center mb-16">
                            <label for="orderQty">數量：</label>
                            <InputNumber
                                v-model="orderQty"
                                input-id="orderQty"
                                show-buttons
                                button-layout="horizontal"
                                :min="0"
                                :max="_stock.qty"
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
                            <template v-if="_stock.qty > 0">
                                <div
                                    class="max-w-200 w-full bg-blue text-center py-16 rounded-3xl cursor-pointer hover:bg-blue_dark"
                                    @click="addOrder(productDetail)"
                                >
                                    加入購物車
                                </div>
                            </template>
                            <template v-else>
                                <a
                                    class="block max-w-200 w-full bg-primary text-center text-white py-16 rounded-3xl cursor-pointer hover:bg-[#444444]"
                                    href="https://lin.ee/f8oZLym"
                                    target="_blank"
                                    >官方LINE洽詢</a
                                >
                            </template>

                            <div
                                class="max-w-200 w-full bg-secondary text-center text-white py-16 rounded-3xl cursor-pointer hover:bg-[#d80545]"
                                @click="checkout(productDetail)"
                            >
                                前往結帳
                            </div>
                        </div>
                        <div v-if="_stock.qty === 0" class="mt-12 bg-light p-16">
                            <p class="mb-12 leading-24">
                                ※ 書籍印刷中，預計「4月中旬」有現貨，可先
                                <a
                                    class="font-700 text-secondary underline inline-block"
                                    target="_blank"
                                    href="https://forms.gle/wkuyDojT4JheDxXb9"
                                    >填寫訂購單📋</a
                                >，補貨後 <u>敝司會主動聯繫您</u> 匯款並安排出貨。
                            </p>
                            <p class="text-blue">有任何問題，請來電洽詢（0978-940-828）</p>
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
                    <h4 class="text-20 text-blue mb-20 text-secondary">
                        <span class="material-icons align-sub"> new_releases </span>
                        <span class="ml-8 align-bottom">勘誤公告</span>
                    </h4>

                    <DataTable
                        v-if="productDetail.erratum !== ''"
                        :value="productDetail.erratum"
                        show-gridlines
                        table-style="min-width: 50rem"
                    >
                        <Column
                            :pt="{
                                headerContent: {
                                    class: 'block text-center'
                                }
                            }"
                            header-class="bg-brown text-white"
                            style="width: 12%"
                            field="chapter"
                            header="章節"
                        ></Column>
                        <Column
                            :pt="{
                                headerContent: {
                                    class: 'block text-center'
                                }
                            }"
                            header-class="bg-brown text-white"
                            style="width: 30%"
                            field="title"
                            header="標題"
                        >
                            <template #body="{ data }">
                                <div class="tracking-wide leading-24" v-html="data.title"></div>
                            </template>
                        </Column>
                        <Column
                            :pt="{
                                headerContent: {
                                    class: 'block text-center'
                                }
                            }"
                            header-class="bg-brown text-white"
                            style="width: 50%"
                            field="content"
                            header="更正內容"
                        >
                            <template #body="{ data }">
                                <p
                                    v-for="(dataItem, idx) in data.content"
                                    :key="idx"
                                    class="mb-16 tracking-wide leading-24"
                                    v-html="dataItem"
                                ></p>
                            </template>
                        </Column>
                        <Column
                            :pt="{
                                headerContent: {
                                    class: 'block text-center'
                                }
                            }"
                            header-class="bg-brown text-white"
                            field="preview"
                            header="附件預覽"
                        >
                            <template #body="{ data }">
                                <FileDownload
                                    v-if="data.filePath"
                                    :file-path="data.filePath"
                                    mode="preview"
                                >
                                    <span
                                        class="material-icons cursor-pointer hover:text-brown_dark"
                                    >
                                        preview
                                    </span>
                                </FileDownload>
                            </template>
                        </Column>
                        <Column
                            :pt="{
                                headerContent: {
                                    class: 'block text-center'
                                }
                            }"
                            header-class="bg-brown text-white"
                            field="download"
                            header="附件下載"
                        >
                            <template #body="{ data }">
                                <FileDownload
                                    v-if="data.filePath"
                                    :file-path="data.filePath"
                                    mode="download"
                                >
                                    <span
                                        class="material-icons cursor-pointer hover:text-brown_dark"
                                    >
                                        download
                                    </span>
                                </FileDownload>
                            </template>
                        </Column>
                        <Column
                            :pt="{
                                headerContent: {
                                    class: 'block text-center'
                                }
                            }"
                            header-class="bg-brown text-white"
                            field="postDate"
                            header="勘誤時間"
                        ></Column>
                    </DataTable>
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
                    <div
                        v-for="(plan, planIdx) in productDetail.plans"
                        :key="planIdx"
                        class="mb-32"
                    >
                        <template v-if="plan.isShow">
                            <h5
                                v-if="plan.type === 'person'"
                                class="text-16 mt-0 mb-12 bg-blue inline-block text-white px-8 py-4"
                            >
                                個人團購
                            </h5>
                            <h5
                                v-else
                                class="text-16 mt-0 mb-12 bg-secondary inline-block text-white px-8 py-4"
                            >
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
                                <li v-for="(planContent, idx) in plan.content" :key="idx">
                                    {{ planContent }}
                                </li>
                            </ul>
                        </template>
                    </div>
                </div>

                <hr class="bg-gray_light my-28" />

                <div>
                    <h4 class="text-20 text-blue mb-20">書籍簡介</h4>
                    <div
                        v-for="(summarySegment, idx) in productDetail.bookIntroduction.summary"
                        :key="idx"
                        class="mb-16"
                        v-html="summarySegment"
                    ></div>
                </div>

                <hr class="bg-gray_light my-28" />

                <div>
                    <h4 class="text-20 text-blue mb-20">詳細資料</h4>
                    <p
                        v-for="(detailSegment, idx) in productDetail.bookIntroduction.detail"
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

// 取得指定產品資料
const productStore = useProductStore()

const { data: productDetail, error: productDetailError } = await useAsyncData(
    'product',
    async () => {
        const productDetailList = storeToRefs(productStore).productDetailList
        const currentProductId = route.params.productId

        if (productDetailList.value.some((item) => item.productId === currentProductId)) {
            const productDetailInfo = productDetailList.value.find(
                (item) => item.productId === currentProductId
            )

            return productDetailInfo
        } else {
            const res = await $fetch(
                apiList.product.getItemInfo.serverPath.replace(':productId', currentProductId)
            )

            // 將productDetail更新到store的productDetailList
            productStore.$patch({
                productDetailList: [...productDetailList.value, res]
            })

            return res
        }
    }
)

// productDetail錯誤，轉跳至error.vue
if (productDetailError.value) {
    const { statusCode, statusMessage } = productDetailError.value
    throw createError({
        statusCode,
        statusMessage
    })
}

// 取得所有產品列表
const { data: productList } = await useAsyncData('productList', async () => {
    const productList = productStore.productList

    if (Object.keys(productList).length > 0) {
        return productList
    }

    const res = await $fetch(apiList.product.getListInfo.serverPath)

    // 將productList更新到store
    productStore.$patch({
        productList: res
    })
    return res
})

useHead({
    title: () => `訂購書籍【${productDetail.value?.name}】`
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
        name: productDetail.value?.name,
        linkTo: ''
    }
]

// 載入預覽圖
const previewBookPhotos = computed(() => {
    const productId = route.params.productId
    if (typeof bookImgLink[productId] !== 'object') return []
    return Object.values(bookImgLink[productId])
})

const { addOrderInCart, addOrderInStorage } = useOrderStore()
const { ordersInCart } = storeToRefs(useOrderStore())
const addOrder = (product) => {
    if (orderQty.value === 0) return

    const order = {
        productName: product.name,
        productId: product.productId,
        content: product.content,
        imgSrc: product.imgSrc,
        discount: product.price.discount,
        qty: orderQty.value
    }

    addOrderInCart(order)
    addOrderInStorage(order)
    orderQty.value = 0
}

// 取得產品庫存
const { data: _stock } = await useAPI(
    apiList.stock.getStock.serverPath.replace(':productId', route.params.productId)
)

const stock = computed(() => {
    if (_stock.value.qty >= 100) {
        return '>100'
    } else {
        return _stock.value.qty
    }
})

const { notify } = useToastifyStore()
const { idToken } = storeToRefs(useUserStore())
const checkout = (product) => {
    if (ordersInCart.value.length === 0 && orderQty.value === 0) {
        notify('info', '請選擇訂購的數量')
    } else if (orderQty.value > 0 && idToken.value) {
        router.push('/cart')
        addOrder(product)
    } else {
        router.push('/cart')
    }
}

onMounted(() => {
    if (_stock.value?.qty) {
        productStore.setStockList(route.params.productId, _stock.value.qty)
    }
})
</script>

<style lang="scss" scoped></style>

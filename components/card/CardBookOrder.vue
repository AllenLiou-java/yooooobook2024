<template>
    <div
        style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
        class="rounded-[6px] overflow-hidden"
    >
        <p
            :style="{ backgroundColor: bookIntroduction.primaryColor }"
            class="text-white py-12 pl-24 font-bold tracking-tight text-gray_dark"
        >
            {{ name }}
        </p>
        <div class="px-28 py-20">
            <div class="flex-center flex-col mb-12">
                <div class="flex flex-col gap-12 w-full">
                    <img
                        class="object-contain w-[80%] h-210 self-center"
                        :src="imgSrc"
                        alt="book_cover"
                    />
                    <div>
                        <InputNumber
                            v-model="orderQty"
                            :input-id="`${productId}-orderQty`"
                            show-buttons
                            button-layout="horizontal"
                            :min="0"
                            :max="stock"
                            input-class="w-80"
                            class="mb-12 w-full h-36"
                        >
                            <template #incrementbuttonicon>
                                <span class="material-icons"> add </span>
                            </template>
                            <template #decrementbuttonicon>
                                <span class="material-icons"> remove </span>
                            </template>
                        </InputNumber>
                        <p class="mb-12 ml-8 text-gray_dark">
                            庫存：{{ stock > 100 ? '>100' : stock }}
                        </p>
                        <div class="flex-center gap-14 w-full">
                            <div
                                @click="addOrder"
                                class="w-[50%] text-white bg-blue rounded-3xl cursor-pointer hover:bg-blue_dark text-center p-8 text-14"
                            >
                                加入購物車
                            </div>
                            <div
                                @click="checkout"
                                class="w-[50%] text-white bg-secondary rounded-3xl cursor-pointer hover:bg-[#d80545] text-center p-8 text-14"
                            >
                                前往結帳
                            </div>
                        </div>
                    </div>
                </div>
                <Divider></Divider>
                <div class="flex flex-col leading-normal gap-x-16 w-full">
                    <p class="mb-12">★ {{ bookIntroduction.slogan }}</p>

                    <p class="mb-12">
                        <span class="text-secondary px-6 mx-6 font-bold"
                            >優惠價 {{ price.discount }}元</span
                        >
                        <span class="text-14 text-gray ml-6"
                            >( 定價 {{ price.originalPrice }}元 )</span
                        >
                    </p>

                    <Accordion class="mb-24 w-full">
                        <AccordionTab
                            :pt="{
                                header: {
                                    class: 'bg-white border-0 border-b border-solid border-blue_light'
                                },
                                headerAction: {
                                    class: 'text-blue_light tracking-wide px-0'
                                },
                                toggleableContent: {
                                    class: 'pt-18'
                                },
                                content: {
                                    class: 'p-0'
                                }
                            }"
                            header="書籍簡介"
                        >
                            <p class="m-0" v-for="(item, idx) in bookIntroduction.overview">
                                {{ item }}
                            </p>
                        </AccordionTab>
                    </Accordion>

                    <div class="mb-16 flex flex-col gap-8">
                        <BookPreview
                            :ref="
                                (el) => {
                                    previewRefs[`ref_preview_${book.name}`] = el
                                }
                            "
                            v-for="book in previewBookPhotos"
                            :key="book.name"
                            :tag-name="book.name"
                            :image-urls="book.links"
                        >
                            <template #openButton>
                                <button
                                    class="w-full border-0 p-4 rounded-6 text-center bg-[#e8e8e7] text-black h-32 hover:(border-2 border-solid border-gray)"
                                >
                                    <span class="material-icons align-sub text-gray_dark text-20">
                                        visibility
                                    </span>
                                    預覽【{{ book.name }}】
                                </button>
                            </template>
                        </BookPreview>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import bookImgLink from '@/assets/js/bookImgLink'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    imgSrc: {
        type: String,
        required: true
    },
    bookIntroduction: {
        type: Object,
        required: true
    },
    price: {
        type: Object,
        required: true
    },
    content: {
        type: Array,
        required: true
    }
})

const productStore = useProductStore()
const { stockList } = storeToRefs(productStore)
const orderStore = useOrderStore()
const { ordersInCart } = storeToRefs(orderStore)

const stock = computed(() => stockList.value[props.productId])

const emit = defineEmits(['addOrder', 'checkout'])

const route = useRoute()
const previewRefs = ref({})

const orderQty = ref(0)

// 載入預覽圖
const previewBookPhotos = computed(() => {
    const productId = props.productId
    if (typeof bookImgLink[productId] !== 'object') return []
    return Object.values(bookImgLink[productId])
})

const openBookPreview = () => {
    const queryBookName = route.query.preview
    if (!queryBookName) return

    const refBookList = Object.keys(previewRefs.value)
    const isExisted = refBookList.includes(`ref_preview_${queryBookName}`)

    if (isExisted) {
        previewRefs.value[`ref_preview_${queryBookName}`].openPreviewMode()
    }
}

const addOrder = () => {
    if (orderQty.value === 0) return

    const { name, productId, imgSrc, price, content } = props
    const order = {
        productName: name,
        productId,
        imgSrc,
        discount: price.discount > 0 ? price.discount : price.originalPrice,
        content,
        qty: orderQty.value
    }

    emit('addOrder', order)
    orderQty.value = 0
}

const checkout = () => {
    // if (ordersInCart.value.length === 0 || orderQty.value === 0) return
    const { name, productId, imgSrc, price, content } = props
    const order = {
        productName: name,
        productId,
        imgSrc,
        discount: price.discount > 0 ? price.discount : price.originalPrice,
        content,
        qty: orderQty.value
    }
    emit('checkout', order)
}

onMounted(() => {
    openBookPreview()
})
</script>

<style lang="scss" scoped></style>

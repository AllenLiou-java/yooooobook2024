<template>
    <div
        style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
        class="rounded-[6px] overflow-hidden"
    >
        <p
            :style="{ backgroundColor: bookInfo.primaryColor }"
            class="text-white py-12 pl-24 font-bold tracking-tight text-gray_dark"
        >
            {{ bookInfo.bookName }}
        </p>
        <div class="px-28 py-20">
            <div class="flex-center lt-lg:flex-row lt-sm:flex-col gap-12 lt-xl:(flex-col) mb-12">
                <img
                    class="object-cover size-full w-180"
                    :src="bookInfo.bookImageUrl"
                    alt="book_cover"
                />
                <div class="flex flex-col p-4 leading-normal">
                    <p class="mb-6">{{ bookInfo.slogan }}</p>

                    <div class="pl-16">
                        <p class="mb-12">
                            <span class="bg-secondary text-white px-6 mx-6 font-bold"
                                >優惠價 {{ bookInfo.price.discountPrice }}元</span
                            >
                            <span class="text-14 text-gray ml-6"
                                >( 定價 {{ bookInfo.price.originalPrice }}元 )</span
                            >
                        </p>
                        <!-- :style="{ backgroundColor: bookInfo.primaryColor }" -->
                        <div class="mb-24">
                            <!-- <a
                                v-for="previewItem in bookInfo.preview"
                                :key="previewItem.name"
                                target="_blank"
                                class="block mb-8 p-4 rounded-6 text-center bg-[#e8e8e7] text-black h-32 hover:(border-2 border-solid border-gray)"
                                :href="previewItem.linkUrl"
                            >
                                <span class="material-icons align-sub text-gray_dark text-20">
                                    visibility
                                </span>
                                預覽【{{ previewItem.name }}】</a
                            > -->

                            <BookPreview
                                v-for="book in previewBookPhotos"
                                :key="book.name"
                                :tag-name="book.name"
                                :image-urls="book.links"
                            >
                                <template #openButton>
                                    <button
                                        class="w-full border-0 mb-8 p-4 rounded-6 text-center bg-[#e8e8e7] text-black h-32 hover:(border-2 border-solid border-gray)"
                                    >
                                        <span
                                            class="material-icons align-sub text-gray_dark text-20"
                                        >
                                            visibility
                                        </span>
                                        預覽【{{ book.name }}】
                                    </button>
                                </template>
                            </BookPreview>
                        </div>

                        <p
                            class="text-14 mr-24 mb-12"
                            v-for="(item, idx) in bookInfo.content"
                            :key="idx"
                        >
                            {{ item }}
                        </p>
                        <a class="underline hover:font-bold" href="#orderFrom">前往填寫訂購單 ▶</a>
                    </div>
                </div>
            </div>
            <p
                v-for="(noticeItem, nidx) in bookInfo.notice"
                :key="nidx"
                class="rounded-6 bg-[#8d111d] p-12 text-14 text-white leading-normal font-bold"
            >
                {{ noticeItem }}
            </p>
        </div>
    </div>
</template>

<script setup>
import bookImgLink from '@/assets/js/bookImgLink'

const props = defineProps({
    bookInfo: {
        type: Object,
        required: true
    }
})

const route = useRoute()

// 載入預覽圖
const previewBookPhotos = computed(() => {
    const productId = props.bookInfo.productId
    if (typeof bookImgLink[productId] !== 'object') return []
    return Object.values(bookImgLink[productId])
})
</script>

<style lang="scss" scoped></style>

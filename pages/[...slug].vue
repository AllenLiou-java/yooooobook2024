<template>
    <div class="bg-blue_dark h-[100vh] flex-center flex-col px-20">
        <img class="w-240 mb-16 -ml-44" :src="imageSrc('/error/error_icon.png')" alt="error-icon" />
        <h1 class="text-110 strokeText text-blue_dark" data-stroke="404">404</h1>
        <p class="text-white text-40 mb-4">找不到這個頁面</p>
        <p class="text-white text-20 mb-44">您可能輸入了錯誤的網址或頁面已被刪除</p>
        <!-- <NuxtLink
        class="max-w-320 w-full bg-[#f5dd00] text-blue_dark font-bold text-center py-12 hover:bg-white duration-300"
        to="/"
        >返回首頁</NuxtLink
        > -->
        <button
            type="button"
            class="max-w-320 w-full bg-[#f5dd00] text-blue_dark font-bold text-center py-12 hover:bg-white duration-300"
            @click="handleError"
        >
            返回首頁
        </button>
    </div>
</template>

<script setup>
definePageMeta({
    layout: false
})

const { imageSrc } = getImageSrc()

const handleError = () =>
    navigateTo({
        path: '/'
    })
</script>

<style lang="scss" scoped>
.strokeText {
    text-shadow:
        -1px -1px 0 white,
        1px -1px 0 white,
        -1px 1px 0 white,
        1px 1px 0 white;
}
</style>

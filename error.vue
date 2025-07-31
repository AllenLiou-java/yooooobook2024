<template>
    <div class="bg-blue_dark h-[100vh] flex-center flex-col">
        <ClientOnly>
            <img
                class="w-240 mb-16 -ml-44"
                :src="imageSrc('/error/error_icon.png')"
                alt="error-icon"
            />
        </ClientOnly>
        <h1 class="text-110 strokeText text-blue_dark" :data-stroke="error.statusCode">
            {{ error.statusCode }}
        </h1>
        <p class="text-white text-40 mb-4">
            {{ mapErrorMessage(error.statusMessage, error.statusCode) }}
        </p>
        <p class="text-white text-20 mb-28">{{ error.statusMessage }}</p>

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
const { imageSrc } = getImageSrc()

const prop = defineProps({
    error: {
        type: Object,
        required: true
    }
})

const handleError = () => clearError({ redirect: '/' })
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

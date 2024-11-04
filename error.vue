<template>
  <div class="bg-blue_dark h-[100vh] flex-center flex-col">
    <img class="w-240 mb-16 -ml-44" :src="imageSrc('/error/error_icon.png')" alt="error-icon" />
    <h1 class="text-110 strokeText text-blue_dark" :data-stroke="errorMessageFilter.statusCode">
      {{ errorMessageFilter.statusCode }}
    </h1>
    <p v-if="errorMessageFilter.errorMessage_CH" class="text-white text-40 mb-4">
      {{ errorMessageFilter.errorMessage_CH }}
    </p>
    <p class="text-white text-20 mb-44">{{ errorMessageFilter.errorMessage_EN }}</p>
    <NuxtLink
      class="max-w-320 w-full bg-[#f5dd00] text-blue_dark font-bold text-center py-12 hover:bg-white duration-300"
      to="/"
      >返回首頁</NuxtLink
    >
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

const errorMessageFilter = computed(() => {
  const errorFilter = errorMessageCollect.value.filter(
    (errorItem) => prop.error.statusCode === errorItem.statusCode
  )[0]

  if (errorFilter) {
    return errorFilter
  } else {
    const { statusCode, statusMessage } = prop.error
    const errorMessage = {
      statusCode,
      errorMessage_EN: statusMessage.split(':')[0]
    }

    return errorMessage
  }
})

const errorMessageCollect = ref([
  {
    statusCode: 404,
    errorMessage_CH: '查無此頁面',
    errorMessage_EN: 'Page not found'
  }
])
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

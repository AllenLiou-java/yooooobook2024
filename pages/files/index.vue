<template>
  <div>
    <div class="relative text-white">
      <div class="container h-500 lt-md:h-320 relative">
        <div class="absolute bottom-20 w-[calc(100%-80px)] left-60 z-100 lt-md:left-30">
          <h1
            class="relative text-52 before:(content-[''] absolute top-1/2 left-0 -translate-y-1/2 w-6 h-[80%] bg-[#35e3eb]) pl-20"
          >
            檔案下載
          </h1>
          <hr class="bg-white mt-32 mb-24" />
          <!-- <p class="font-bold">首頁 - 檔案下載</p> -->
          <Breadcrumb :link-list="routeList" />
        </div>
      </div>
      <div
        class="absolute top-0 left-0 bg-[url('@/assets/images/banner/0002.png')] bg-cover bg-no-repeat bg-bottom w-full h-full z-[-1]"
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
            v-for="file in fileList"
            :key="file.name"
            class="text-20 pb-16 mb-16 border-0 border-b-1 border-solid border-gray_light"
          >
            <NuxtLink
              class="text-gray_dark"
              :to="{ name: 'files-book', params: { book: file.name } }"
              >{{ file.name }}</NuxtLink
            >
          </li>
        </ul>
      </div>

      <ul class="flex flex-wrap lt-sm:(justify-center)">
        <li
          v-for="file in fileList"
          :key="file.name"
          class="w-251 border border-solid flex-center flex-col p-12 mx-16 mb-32 group hover:(shadow-2xl translate-y-4 duration-500) lt-sm:mx-0"
        >
          <div class="w-230 h-230 flex-center mb-12">
            <img class="h-215" :src="imageSrc(file.imgPath)" alt="bookImg" />
          </div>
          <h3 class="mb-20">{{ file.name }}</h3>
          <p class="text-brown_dark mb-12">附件下載</p>
          <NuxtLink
            class="w-full text-blue text-center border border-solid p-8 group-hover:(bg-blue text-white duration-300) lt-md:(bg-blue text-white)"
            :to="{ name: 'files-book', params: { book: file.name } }"
            >詳細資料</NuxtLink
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import fileList from '@/assets/js/fileList'
const { imageSrc } = getImageSrc()

useHead({
  title: '檔案下載'
})

definePageMeta({
  title: '檔案下載列表'
})

useSeoMeta({
  description: '出版品完整列表',
  ogDescription: '出版品完整列表。',
  ogTitle: '檔案下載列表 - 有良冊股份有限公司',
  ogImage: '/yooooobook.jpg',
  ogUrl: 'https://www.yooooobook.com/files'
})

const routeList = [
  {
    name: '首頁',
    linkTo: '/'
  },
  {
    name: '檔案下載',
    linkTo: ''
  }
]
</script>

<style lang="scss" scoped></style>

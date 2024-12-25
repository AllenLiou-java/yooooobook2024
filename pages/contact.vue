<template>
  <div>
    <div class="relative text-white">
      <div class="container h-500 lt-md:h-320 relative">
        <div class="absolute bottom-20 w-[calc(100%-80px)] left-60 z-100 lt-md:left-30">
          <h1
            class="relative text-52 before:(content-[''] absolute top-1/2 left-0 -translate-y-1/2 w-6 h-[80%] bg-[#35e3eb]) pl-20"
          >
            聯絡我們
          </h1>
          <hr class="bg-white mt-32 mb-24" />
          <Breadcrumb :link-list="routeList" />
        </div>
      </div>
      <div
        class="absolute top-0 left-0 bg-[url('@/assets/images/banner/Contact.jpg')] lt-lg:bg-[url('@/assets/images/banner/Contact_pad.jpg')] lt-sm:bg-[url('@/assets/images/banner/Contact_t.jpg')] bg-cover bg-no-repeat bg-right-center w-full h-full"
      />
    </div>
    <div class="container max-w-845 my-60 font-bold text-primary tracking-wide">
      <h2 class="text-brown">有良冊 聯絡資訊</h2>
      <hr class="bg-gray_light my-24" />
      <div class="flex justify-between flex-wrap lt-sm:flex-col">
        <div class="w-327 mr-16 mb-24 lt-md:(w-full mr-0)">
          <ul>
            <li class="mb-8">連絡電話 : 0978 940 828</li>
            <li class="flex flex-wrap mb-8">
              <p class="mb-8">電子信箱 :</p>
              <ul class="ml-8">
                <li class="mb-8">info@yooooobook.com</li>
                <li class="mb-8">yooooobook@gmail.com</li>
              </ul>
            </li>
            <li>
              LINE官方帳號 :
              <a
                class="text-secondary underline underline-offset-4"
                href="https://lin.ee/f8oZLym"
                target="_blank"
                >@yooooobook</a
              >
            </li>
          </ul>
          <hr class="bg-gray_light my-20" />
          <p class="text-blue_light mb-16">匯款資訊：</p>
          <ul>
            <li class="mb-8">匯款銀行：<span class="text-brown_dark">玉山銀行 - 台中分行</span></li>
            <li class="mb-8">銀行代碼：<span class="text-brown_dark">808</span></li>
            <li class="mb-8">銀行帳戶：<span class="text-brown_dark">1366940052966</span></li>
            <li class="mb-8">戶名：<span class="text-brown_dark">有良冊股份有限公司</span></li>
          </ul>
        </div>
        <div class="flex-center text-white flex-wrap">
          <a href="https://lin.ee/f8oZLym" target="_blank">
            <div class="text-white bg-[#0cc95c] w-196 h-286 flex-center flex-col p-20 mr-28 mb-28">
              <img
                class="w-158 mb-20"
                :src="imageSrc('/contact/line qrcode.png')"
                alt="line-qrcode-img"
              />
              <p class="mb-4">LINE官方帳號</p>
              <p class="mb-16">請點擊加入</p>
              <p class="text-12">@yooooobook</p>
            </div>
          </a>
          <a href="https://www.facebook.com/yooooobook" target="_blank">
            <div class="text-white bg-[#456cb3] w-196 h-286 flex-center flex-col p-20 mr-28 mb-28">
              <img
                class="w-158 mb-20"
                :src="imageSrc('/contact/FB qrcode.png')"
                alt="fb-qrcode-img"
              />
              <p class="mb-4">FB粉絲專頁</p>
              <p class="mb-8">請點擊加入</p>
              <div class="flex border border-solid border-white p-4 rounded-2xl">
                <img class="w-17 mr-4" :src="imageSrc('/contact/FB icon.png')" alt="FB-icon" />

                <div class="flex-center w-72 bg-white rounded-xl">
                  <p class="text-black text-12 pr-10">有良冊</p>
                  <span class="material-icons text-14 text-[#9e9e9f]"> search </span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: '聯絡我們'
})

definePageMeta({
  title: '聯絡我們'
})

useSeoMeta({
  description:
    '任何訂購問題或公司登記相關問題，歡迎【加入官方 LINE 好友👉 https://lin.ee/f8oZLym】與我們聯繫喔。',
  ogDescription:
    '任何訂購問題或公司登記相關問題，歡迎【加入官方 LINE 好友👉 https://lin.ee/f8oZLym】與我們聯繫喔。',
  ogTitle: '聯絡我們 - 有良冊股份有限公司',
  ogImage: '/yooooobook.jpg',
  ogUrl: 'https://www.yooooobook.com/contact'
})

const { imageSrc } = getImageSrc()

const routeList = [
  {
    name: '首頁',
    linkTo: '/'
  },
  {
    name: '聯絡我們',
    linkTo: ''
  }
]
</script>

<style lang="scss" scoped></style>

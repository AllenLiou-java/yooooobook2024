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
          <p class="font-bold">首頁 - 聯絡我們</p>
        </div>
      </div>
      <div
        class="absolute top-0 left-0 bg-[url('@/assets/images/banner/0006.png')] bg-cover bg-no-repeat bg-right-bottom w-full h-full z-[-1]"
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
              LINE官方帳號 <a class="text-primary" href="https://lin.ee/f8oZLym">@yooooobook</a>
            </li>
          </ul>
          <hr class="bg-gray_light my-20" />
          <p class="text-blue_light mb-16">匯款資訊：</p>
          <ul>
            <li class="mb-8">匯款銀行：玉山銀行 - 台中分行</li>
            <li class="mb-8">銀行代碼：808</li>
            <li class="mb-8">銀行帳戶：1366940052966</li>
            <li class="mb-8">戶名：有良冊股份有限公司</li>
          </ul>
        </div>
        <div class="flex-center text-white flex-wrap">
          <div class="bg-[#0cc95c] w-196 h-286 flex-center flex-col p-20 mr-28 mb-28">
            <img
              class="w-158 mb-20"
              :src="getContactImageUrl('/line qrcode.png')"
              alt="line-qrcode-img"
            />
            <p class="mb-4">LINE官方帳號</p>
            <p class="mb-16">請點擊加入</p>
            <a class="text-white text-12" href="https://lin.ee/f8oZLym" target="_blank"
              >@yooooobook</a
            >
          </div>
          <div class="bg-[#456cb3] w-196 h-286 flex-center flex-col p-20 mr-28 mb-28">
            <img
              class="w-158 mb-20"
              :src="getContactImageUrl('/FB qrcode.png')"
              alt="fb-qrcode-img"
            />
            <p class="mb-4">FB粉絲專頁</p>
            <p class="mb-8">請點擊加入</p>
            <div class="flex border border-solid border-white p-4 rounded-2xl">
              <img class="w-17 mr-4" :src="getContactImageUrl('/FB icon.png')" alt="FB-icon" />
              <div class="flex-center w-72 bg-white rounded-xl">
                <p class="text-black text-12 pr-10">有良冊</p>
                <span class="material-icons text-14 text-[#9e9e9f]"> search </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getContactImageUrl } = useAssets()
</script>

<style lang="scss" scoped></style>

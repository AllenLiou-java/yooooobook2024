<template>
  <div>
    <div class="container text-gray_dark font-bold">
      <div
        class="flex ml-40 mt-30 mb-60 border border-solid border-blue_light py-30 lt-md:(flex-col ml-0)"
      >
        <div class="w-3/6 px-60 lt-md:(w-full mb-40 px-30)">
          <h2 class="text-blue_dark text-center mb-30">會員登入</h2>
          <div class="flex flex-col justify-center">
            <div class="flex flex-col gap-2 mb-16">
              <label class="mb-8" for="email">電子郵件 Email</label>
              <InputText
                id="email"
                v-model="email"
                class="rounded-0 border-gray_dark"
                aria-describedby="email-help"
              />
              <small id="email-help">Enter your email.</small>
            </div>
            <div class="flex flex-col gap-2 mb-16">
              <label class="mb-8" for="password">密碼 Password</label>
              <InputText
                id="password"
                v-model="password"
                class="rounded-0 border-gray_dark"
                aria-describedby="password-help"
              />
              <small id="password-help">Enter your password.</small>
            </div>
            <NuxtLink
              class="self-end text-gray_dark mb-16 pb-4 border-0 border-b-1 border-solid hover:text-black"
              to="/user/resetPassword"
              >忘記密碼?</NuxtLink
            >
            <div
              class="bg-blue text-white text-center p-12 mb-16 cursor-pointer hover:bg-blue_dark"
            >
              登入
            </div>
            <NuxtLink class="text-center" to="/user/signup"
              ><span
                class="text-gray_dark mb-16 pb-4 border-0 border-b-1 border-solid hover:text-black"
                >還不是會員嗎?馬上註冊!</span
              ></NuxtLink
            >
          </div>
        </div>
        <div class="w-1 h-auto bg-gray_light lt-md:(w-5/6 h-1 self-center my-40)"></div>
        <div class="w-3/6 px-60 text-center lt-md:(w-full mb-20 px-30)">
          <h2 class="text-blue_dark mb-30">您也可以使用下列方式登入</h2>
          <div class="h-[calc(100%-90px)] flex-center flex-col">
            <p class="text-16 mb-12">直接使用您的Google+登入，只需幾秒鐘</p>
            <div
              class="flex items-center max-w-356 w-full bg-[#dd4b39] px-8 py-3 mx-auto cursor-pointer"
            >
              <svg class="w-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>google-plus</title>
                <path
                  fill="#ffffff"
                  d="M23,11H21V9H19V11H17V13H19V15H21V13H23M8,11V13.4H12C11.8,14.4 10.8,16.4 8,16.4C5.6,16.4 3.7,14.4 3.7,12C3.7,9.6 5.6,7.6 8,7.6C9.4,7.6 10.3,8.2 10.8,8.7L12.7,6.9C11.5,5.7 9.9,5 8,5C4.1,5 1,8.1 1,12C1,15.9 4.1,19 8,19C12,19 14.7,16.2 14.7,12.2C14.7,11.7 14.7,11.4 14.6,11H8Z"
                />
              </svg>
              <div class="w-1 h-36 bg-white mx-8"></div>
              <span class="text-20 text-white grow-1">Google +</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const email = ref(null)
const password = ref(null)
</script>

<style lang="scss" scoped></style>

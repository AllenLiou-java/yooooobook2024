<template>
  <div class="container font-bold">
    <div
      class="ml-40 mt-30 mb-60 border border-solid border-blue_light px-20 py-30 lt-md:(flex-col ml-0)"
    >
      <h2 class="text-blue_dark mb-30 text-center">會員註冊</h2>
      <div class="max-w-466 mx-auto">
        <div class="flex flex-col gap-2 mb-16">
          <label class="mb-8" for="userName">會員姓名 User name</label>
          <InputText
            id="userName"
            v-model="userName"
            class="rounded-0 border-gray_dark"
            aria-describedby="userName-help"
          />
          <small id="userName-help">Enter your user name.</small>
        </div>
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
        <div class="flex flex-col gap-2 mb-16">
          <label class="mb-8" for="repeatPassword">再次確認密碼 Repeat Password</label>
          <InputText
            id="repeatPassword"
            v-model="repeatPassword"
            class="rounded-0 border-gray_dark"
            aria-describedby="repeatPassword-help"
          />
          <small id="repeatPassword-help">Enter your repeat password.</small>
        </div>
        <div class="bg-blue text-white text-center p-12 mb-16 cursor-pointer hover:bg-blue_dark">
          註冊
        </div>
        <NuxtLink class="text-center block" to="/user/login"
          ><span class="text-gray_dark mb-16 pb-4 border-0 border-b-1 border-solid hover:text-black"
            >已是會員了嗎？馬上登入！</span
          ></NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const userName = ref(null)
const email = ref(null)
const password = ref(null)
const repeatPassword = ref(null)
</script>

<style lang="scss" scoped></style>

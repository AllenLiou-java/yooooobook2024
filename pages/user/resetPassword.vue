<template>
  <div class="container font-bold">
    <div
      class="ml-40 mt-30 mb-60 border border-solid border-blue_light px-20 py-30 lt-md:(flex-col ml-0)"
    >
      <h2 class="text-blue_dark mb-30 text-center">忘記密碼</h2>
      <div class="max-w-466 mx-auto">
        <div class="flex flex-col gap-2 mb-16">
          <label class="mb-8" for="email">請輸入註冊時的電子郵件 Email</label>
          <InputText
            id="email"
            v-model="email"
            class="rounded-0 border-gray_dark"
            aria-describedby="email-help"
          />
          <small id="email-help">Enter your email.</small>
        </div>

        <div class="flex">
          <div
            class="bg-blue text-white text-center p-12 cursor-pointer hover:bg-blue_dark mr-12 grow-3 lt-sm:grow-1"
          >
            註冊
          </div>
          <NuxtLink
            class="bg-gray p-12 hover:bg-gray_dark grow-1 text-center lt-sm:grow-1"
            to="/user/login"
            ><span class="text-gray_dark text-white">返回</span></NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const email = ref(null)
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <div class="relative text-white bg-gradient-to-r from-[#153D5B] to-[#082C4B]">
      <div class="container h-500 lt-md:h-320 relative flex items-end lt-sm:flex-col-reverse">
        <div class="w-full ml-40 mb-20 z-100">
          <h1
            class="relative text-52 before:(content-[''] absolute top-1/2 left-0 -translate-y-1/2 w-6 h-[80%] bg-[#35e3eb]) pl-20"
          >
            {{ pageInfo.name }}
          </h1>
          <hr class="bg-white mt-32 mb-24" />
          <p class="font-bold">首頁 - {{ pageInfo.name }}</p>
        </div>

        <NuxtImg fit="cover" class="ml-20 mb-20" src="/Logo-1.png" sizes="160px md:253px"></NuxtImg>
      </div>
    </div>
    <NuxtPage></NuxtPage>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: (to, from) => {
    if (to.fullPath === '/user') {
      return navigateTo({
        path: '/user/login'
      })
    }
  }
})

const route = useRoute()

const pageInfo = computed(() => {
  const pages = [
    {
      fullPath: '/user/login',
      name: '會員登入'
    },
    {
      fullPath: '/user/signup',
      name: '會員註冊'
    },
    {
      fullPath: '/user/resetPassword',
      name: '忘記密碼'
    }
  ]

  const fullPath = route.fullPath

  return pages.filter((page) => page.fullPath === fullPath)[0]
})
// const route = useRoute()
// console.log(route)
</script>

<style lang="scss" scoped></style>

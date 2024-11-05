<template>
  <div class="relative">
    <LayoutHeader />
    <div class="min-h-[calc(100vh-316px)]">
      <slot />
    </div>

    <LayoutFooter />
  </div>
</template>

<script setup>
const userStore = useUserStore()
const { initProfile } = userStore

const idToken = useCookie('idToken')

if (idToken.value) {
  useAsyncData('profile', initProfile)
}
</script>

<style lang="scss" scoped></style>

<template>
  <div class="container">
    <p>Custom layout</p>

    <slot />
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

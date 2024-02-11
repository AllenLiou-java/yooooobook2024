<template>
  <div>
    <cart-header />
    <div class="layout">
      <nuxt />
    </div>

    <div class="bg-secondary">
      <p
        class="copyright container text-light text-center mb-0 py-3"
        style="user-select: none"
      >
        Copyright © 2024 Yooooobook All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
import CartHeader from '~/components/Header/CartHeader.vue'
export default {
  name: 'CartPage',
  components: { CartHeader },
}
</script>

<style lang="scss" scoped>
.layout {
  margin-top: 100px;
  min-height: calc(100vh - 156px);
}
.copyright {
  @include media-w414 {
    font-size: 12px;
  }
}
</style>

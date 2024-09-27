<template>
  <div class="bg-primary container">
    <button @click="addCount">加1</button>
    <p>{{ counter }}</p>
    <p>{{ doubleCount }}</p>

    <div class="max-w-320 h-180 myphoto"></div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'

definePageMeta({
  layout: 'custom-layout'
})

const counterStore = useCounterStore()
const { addCount } = counterStore
const { counter, doubleCount } = storeToRefs(counterStore)
</script>

<style lang="scss">
.p-accordion-header {
  background-color: #003756;
}

.myphoto {
  @include bg-cover('https://news.immigration.gov.tw/Uploads/%E4%B8%AD%E7%A7%8B%E7%AF%802.jpg');
}
</style>

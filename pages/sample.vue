<template>
  <div class="bg-primary container py-60">
    <button @click="addCount">加1</button>
    <p>{{ counter }}</p>
    <p>{{ doubleCount }}</p>

    <div class="max-w-320 h-180 myphoto"></div>
    <img v-if="userPhotoUrl" :src="userPhotoUrl" alt="userImg" />

    <!-- <p>productInfo: {{ productInfo }}</p> -->
    <p>stock: {{ stock }}</p>
    <!-- <p>data: {{ data }}</p> -->

    <Button class="m-12" label="取得庫存" @click="fetchStock()" />
    <Button class="m-12" label="修改庫存" @click="patchStock()" />
    <!-- <img class="w-full h-[60vh] object-cover object-center" :src="imageSrc(urlRef)" alt="banner" /> -->
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'

const { $api } = useNuxtApp()
const { notify } = useToastifyStore()

const stock = ref({})

// const { data} = await useAPI('/api/stock/AA00001')

const fetchStock = async () => {
  console.log('fetchStock')

  try {
    const data = await $api('/api/stock/AA00001')
    stock.value = data
  } catch (e) {
    const { statusCode, message } = e
    console.log(statusCode, message)

    notify('error', message, statusCode)
  }
}

const patchStock = async () => {
  console.log('patchStock')

  try {
    const data = await $api('/api/stock/AA00001', {
      method: 'patch',
      body: {
        qty: 36
      }
    })

    stock.value = data
  } catch (e) {
    const { statusCode, message } = e

    notify('error', message, statusCode)
  }
}

// const { data, status, error, refresh } = await useFetch('/api/stock/AA00001')
// console.log('test', data.value, status.value, error.value)

definePageMeta({
  layout: 'custom-layout'
})

// const { imageSrc } = getImageSrc()
// const urlRef = ref('/home/city.png')

const counterStore = useCounterStore()
const { addCount } = counterStore
const { counter, doubleCount } = storeToRefs(counterStore)

const userStore = useUserStore()
const { photoUrl: userPhotoUrl } = storeToRefs(userStore)
</script>

<style lang="scss">
.p-accordion-header {
  background-color: #003756;
}

.myphoto {
  @include bg-cover('https://news.immigration.gov.tw/Uploads/%E4%B8%AD%E7%A7%8B%E7%AF%802.jpg');
}
</style>

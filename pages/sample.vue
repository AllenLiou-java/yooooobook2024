<template>
  <div class="bg-primary container">
    <button @click="addCount">加1</button>
    <p>{{ counter }}</p>
    <p>{{ doubleCount }}</p>

    <div class="max-w-320 h-180 myphoto"></div>
    <p>{{ fireData }}</p>
    <p>error: {{ fireError }}</p>
    <p>memberLoginUrl: {{ memberLoginUrl }}</p>
    <!-- <Toast /> -->
    <Button label="Show" @click="show()" />
    <img class="w-full h-[60vh] object-cover object-center" :src="imageSrc(urlRef)" alt="banner" />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { API } from '~/apis'
const { notify } = useToastifyStore()

const show = () => {
  // useNuxtApp().$toast.info('toastify success')
  notify('warning', '注意錯誤')
  // refresh()
}

definePageMeta({
  layout: 'custom-layout'
})

const { imageSrc } = getImageSrc()
const urlRef = ref('/home/city.png')

// import { http } from '@/composables/http'

// RuntimeConfig
// const config = useRuntimeConfig()
// if (import.meta.server) {
//   console.log('firebaseApiUrl:', config.firebaseApiUrl)
// } else {
//   console.log('API pubic:', config.public.googleApiUrl)
// }

// const { data: fireData } = await useFirebaseApi('/stock/AA00001.json')

const fireData = ref({})
const fireError = ref('')

await useHttp.get('/stock/AA00001.json').then((res) => {
  fireData.value = res.data.value
})

const memberLoginUrl = ref('')
onMounted(() => {
  memberLoginUrl.value = API.member.login.url
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

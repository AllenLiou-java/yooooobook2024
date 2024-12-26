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
    <button @click="sendMail(order)">發送信件</button>

    <Button
      type="button"
      label="訂單送出"
      :loading="loading"
      class="flex-row-reverse gap-4"
      @click="load"
    >
      <template #icon>
        <span class="material-icons leading-18"> arrow_forward </span>
      </template>
    </Button>

    <!-- <button @click="getOrder">取得訂單</button> -->
    <button @click="getOrderList">取得訂單</button>
    <!-- <button @click="patchOrder">新增訂單</button> -->

    <div class="card flex flex-column align-items-center gap-3">
      <DataTable :value="Object.values(productList)" table-style="min-width: 50rem">
        <Column field="name" header="Name"></Column>
        <!-- <Column field="price" header="Price"></Column> -->
        <!-- <Column field="quantity" header="Quantity"></Column> -->
      </DataTable>

      <Button
        type="button"
        :label="selectedProduct ? selectedProduct.name : 'Select a Product'"
        aria-haspopup="true"
        aria-controls="overlay_panel"
        @click="toggleProduct"
      />

      <OverlayPanel ref="productPanel" append-to="body">
        <DataTable
          :value="Object.values(productList)"
          selection-mode="single"
          :paginator="true"
          :rows="5"
        >
          <Column field="name" header="Name" sortable style="min-width: 12rem"></Column>
          <!-- <Column header="Image">
            <template #body="slotProps">
              <img
                :src="`https://primefaces.org/cdn/primevue/images/product/${selectedProduct.image}`"
                :alt="slotProps.data.image"
                class="w-4rem shadow-1"
              />
            </template>
          </Column>
          <Column field="price" header="Price" sortable style="min-width: 8rem">
            <template #body="slotProps"> $ {{ slotProps.data.price }} </template>
          </Column> -->
        </DataTable>
      </OverlayPanel>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import OverlayPanel from 'primevue/overlaypanel'

const loading = ref(false)

const load = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}

// const { data } = await useAPI('/api/stock/AA00001')

const { $api } = useNuxtApp()
const { notify } = useToastifyStore()

const stock = ref({})

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
const { photoUrl: userPhotoUrl, idToken } = storeToRefs(userStore)

const sendMail = (orderInfo) => {
  $fetch('/api/mail', {
    method: 'post',
    body: {
      orderInfo
    }
  })
}

const order = ref({
  bankAccountNo: '98765',
  buyer: 'allen liou.co',
  delivery: {
    company: '',
    trackingNo: '',
    trackingUrl: ''
  },
  email: 'mydevmailsend@gmail.com',
  isClosed: false,
  isFromGroup: false,
  oderDate: '2024/12/11 17:24',
  orderId: '241211172438681',
  orderList: [
    {
      content: ['公司登記實務及案例解析(增資 · 發行新股篇)'],
      imgSrc:
        'https://firebasestorage.googleapis.com/v0/b/yooooobook-dev.appspot.com/o/Product%2Fbook2.png?alt=media',
      productId: 'AA00002',
      productName: ' 公司法：規範與案例（二版）',
      qty: 3,
      totalPrice: 6000,
      unitPrice: 2000
    },
    {
      content: ['有限公司篇【532頁】', '股份有限公司篇【964頁】', '應備文件詳析篇【296頁】'],
      imgSrc:
        'https://firebasestorage.googleapis.com/v0/b/yooooobook-dev.appspot.com/o/Product%2Fbooks.png?alt=media',
      productId: 'AA00001',
      productName: '公司登記實務及案例解析(共三冊)',
      qty: 4,
      totalPrice: 20800,
      unitPrice: 5200
    }
  ],
  phone: '0988765432',
  receiver: {
    address: '台中市西屯區文心路2段100號',
    name: 'allen liou'
  },
  remark: '',
  status: '1',
  taxId: '96385274',
  totalPrice: 26800
})

// const getOrder = async () => {
//   const data = await $fetch('/api/order/3VlG9FnECLeK4j5CStguCFa3BCt1/241215205852480')

//   console.log('data', data)
// }

const getOrderList = async () => {
  const data = await $fetch('/api/order/3VlG9FnECLeK4j5CStguCFa3BCt1', {
    method: 'get',
    onRequest({ options }) {
      options.headers.set('idToken', idToken.value)
    }
  })

  console.log('data', data)
}

// const patchOrder = async () => {
//   const data = await $fetch('/api/order/3VlG9FnECLeK4j5CStguCFa3BCt1/241215205852500', {
//     method: 'patch',
//     body: order.value
//   })

//   console.log('data', data)
// }

const productStore = useProductStore()
const { data: productList, error } = await useAsyncData('products', () => {
  const productList = productStore.productList
  if (Object.keys(productList).length > 0) {
    return productList
  } else {
    return $fetch(apiList.product.getListInfo.serverPath)
  }
})

if (error.value) {
  if (import.meta.client) {
    const message = error.value.cause.message
    const statusCode = error.value.cause.statusCode

    notify('error', message, statusCode)
  }
}

const productPanel = ref()
const selectedProduct = ref()

const toggleProduct = (event) => {
  // console.log(productPanel.value)

  productPanel.value.toggle(event)
}

// const onProductSelect = (event) => {
//   productPanel.value.hide()
// }
</script>

<style lang="scss">
.p-accordion-header {
  background-color: #003756;
}

.myphoto {
  @include bg-cover('https://news.immigration.gov.tw/Uploads/%E4%B8%AD%E7%A7%8B%E7%AF%802.jpg');
}
</style>

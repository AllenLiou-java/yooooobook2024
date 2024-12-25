<template>
  <div class="layout relative">
    <CustomLoading />
    <LayoutHeader @set-visible="setVisible" />
    <div class="min-h-[calc(100vh-316px)] pt-92 lt-md-pt-133">
      <slot />
    </div>
    <LayoutFooter />

    <Sidebar
      v-model:visible="cartSidebarVisible"
      :dismissable="false"
      header="購物車"
      position="right"
      block-scroll
      class="border-0"
      :pt="{
        header: {
          class: 'bg-blue_light text-white'
        },
        closeButton: {
          class: 'bg-blue_light group hover:bg-white border-0 focus-visible:outline-none'
        },
        closeIcon: {
          class: 'text-white group-hover:text-blue_light'
        }
      }"
      @show="blocked = true"
    >
      <ScrollPanel class="h-[calc(100vh-166px)] pr-16 my-16">
        <ul>
          <li v-for="order in ordersInCart" :key="order.productId" class="pt-16 text-14">
            <div class="flex items-center gap-12">
              <ClientOnly>
                <img class="w-80" :src="order.imgSrc" alt="order.productId" />
              </ClientOnly>
              <div>
                <p class="mb-8">{{ order.productName }}</p>
                <div class="flex justify-between items-center">
                  <div class="flex items-center">
                    <span
                      class="material-icons p-2 cursor-pointer"
                      @click="updateOrderQty('minus', order.productId)"
                    >
                      remove
                    </span>
                    <span class="mx-8">{{ order.qty }}</span>
                    <span
                      class="material-icons p-2 cursor-pointer"
                      @click="updateOrderQty('add', order.productId)"
                    >
                      add
                    </span>
                  </div>
                  $ {{ thousandthsFormat(order.discount * order.qty) }}
                </div>
              </div>
              <span class="material-icons cursor-pointer" @click="deleteOrder(order.productId)">
                delete
              </span>
            </div>
            <Divider />
          </li>
        </ul>
      </ScrollPanel>
      <Divider class="m-0" />
      <div class="grid grid-cols-2 gap-18 pt-16">
        <Button
          label="關閉"
          class="grow border-none leading-20"
          @click="cartSidebarVisible = false"
        />
        <Button
          label="結帳"
          class="grow border-none leading-20 bg-secondary hover:bg-[#d80545]"
          @click="toCartPage"
        />
      </div>
    </Sidebar>
    <SideSocialGroup />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import LayoutHeader from '@/components/layout/Header.vue'
import LayoutFooter from '@/components/layout/Footer.vue'
import SideSocialGroup from '@/components/SideSocialGroup.vue'

const blocked = ref(false)

const cartSidebarVisible = ref(false)
const router = useRouter()
const toCartPage = () => {
  router.push('/cart')
  cartSidebarVisible.value = false
}
const route = useRoute()
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - 有良冊股份有限公司` : '有良冊股份有限公司'
  },
  meta: [{ property: 'og:title', content: ` ${route.meta.title} - 有良冊股份有限公司` }]
})

useSeoMeta({
  title: '有良冊股份有限公司',
  ogTitle: '有良冊股份有限公司',
  keywords:
    '有良冊,公司登記,公司申請,公司登記實務及案例解析,有限公司,股份有限公司,應備文件詳析,company registration,增資,發行新股，公司登記基礎，公司登記進階，工商登記諮詢',
  ogSiteName: '有良冊股份有限公司',
  ogType: 'website',
  ogLocale: 'zh_TW',
  description:
    '《有良冊》致力於出版公司登記專書，並透過本網站與Facebook粉絲專頁分享公司法及公司登記實務知識，另提供免費公司登記諮詢服務。【加入官方 LINE 好友👉 https://lin.ee/f8oZLym】',
  ogDescription:
    '《有良冊》致力於出版公司登記專書，並透過本網站與Facebook粉絲專頁分享公司法及公司登記實務知識，另提供免費公司登記諮詢服務。【加入官方 LINE 好友👉 https://lin.ee/f8oZLym】',
  ogImage: '/yooooobook.jpg'
})
const { initProfile } = useUserStore()

const idToken = useCookie('idToken')

if (idToken.value) {
  await useAsyncData('profile', () => initProfile())
}

const setVisible = () => {
  cartSidebarVisible.value = true
}

const orderStore = useOrderStore()
const { ordersInCart } = storeToRefs(orderStore)
const { updateOrdersInCart, setOrderInStorage, deleteOrder } = useOrderStore()

const updateOrderQty = (calculateType, productId) => {
  const orderList = JSON.parse(JSON.stringify(ordersInCart.value))

  const orderIndex = orderList.findIndex((orderItem) => orderItem.productId === productId)

  const order = orderList[orderIndex]
  if (calculateType === 'minus') {
    updateOrdersInCart(order, -1)
    setOrderInStorage(order, -1)
  } else {
    updateOrdersInCart(order, 1)
    setOrderInStorage(order, 1)
  }
}

onMounted(() => {
  const orderListInStorage = JSON.parse(localStorage.getItem('orderList'))
  if (orderListInStorage !== null) {
    orderStore.$patch({
      ordersInCart: orderListInStorage
    })
  }
})
</script>

<style lang="scss" scoped></style>

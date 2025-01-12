<template>
  <div class="bg-blue_dark tracking-widest z-999 fixed w-full">
    <BlockUI :blocked="blocked" full-screen />
    <div class="container py-18 flex-center">
      <div
        class="flex justify-between items-center flex-grow-1 lt-md:(flex-col items-start justify-center)"
      >
        <h1>
          <NuxtLink
            class="w-230 h-25 block bg-logo indent-[101%] whitespace-nowrap overflow-hidden"
            to="/"
            >有良冊股份有限公司</NuxtLink
          >
        </h1>
        <ul class="flex justify-between max-w-530 w-full mx-16 lt-lg:hidden">
          <li
            v-for="routeItem in routeList"
            :key="routeItem.label"
            class="relative group mx-12 py-4 hover:(border-0 border-b-2 border-solid border-[#35e3ea] )"
          >
            <NuxtLink no-prefetch :to="routeItem.route" class="pt-16 pb-24">
              <span
                v-if="routeItem.icon"
                class="material-icons text-20 mr-4 text-white group-hover:text-[#35e3ea] align-text-top"
                :class="routeItem.icon"
                >{{ routeItem.iconName }}</span
              >
              <span class="text-white align-text-top group-hover:text-[#35e3ea]">{{
                routeItem.label
              }}</span>
            </NuxtLink>
            <div
              v-if="routeItem.items?.length > 0"
              id="sub_list"
              class="absolute top-[44px] left-[-30px] w-130 bg-white border-0 border-t-9 border-[#35e3ea] border-solid invisible group-hover:(visible) z-99"
            >
              <ul id="sub_list" class="flex-center flex-col py-2">
                <li
                  v-for="item in routeItem.items"
                  :key="item.label"
                  class="border-0 border-b-1 border-solid border-gray_light text-[#35e3ea] last:border-0"
                >
                  <NuxtLink no-prefetch :to="item.route">
                    <span class="text-gray_dark hover:text-[#4989a6] font-bold px-20 py-16 block">{{
                      item.label
                    }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div
          class="min-w-184 h-60 shrink-0 flex flex-col justify-between lt-lg:(flex-row) lt-md:(flex-col mt-16)"
        >
          <div class="flex-center lt-lg:mr-0 gap-12 mb-8 lt-lg:mb-0 lt-md:mb-8">
            <div class="text-white cursor-pointer" @click="emit('setVisible')">
              <span
                class="material-icons align-text-top text-22 mr-2"
                :class="qtyInCart > 0 ? 'text-brown_light' : ''"
              >
                shopping_cart
              </span>
              <span class="text-14 align-middle" :class="qtyInCart > 0 ? 'text-brown_light' : ''"
                >購物車({{ qtyInCart }})</span
              >
            </div>

            <Button
              class="bg-brown_dark px-8 py-4 text-center cursor-pointer text-14 font-bold p-0 m-0 border-0 rounded-4"
              aria-haspopup="true"
              aria-controls="overlay_panel"
              @click="toggleProductPanel"
            >
              <template #default>
                <span class="material-icons mr-2"> search </span>
                書籍搜尋
              </template>
            </Button>

            <OverlayPanel ref="productPanel" append-to="body" @hide="blocked = false">
              <DataTable
                :value="Object.values(productList)"
                selection-mode="single"
                :paginator="true"
                :rows="5"
                @row-select="onProductSelect"
              >
                <Column field="name" header="產品名稱" sortable style="min-width: 12rem"></Column>
                <Column header="產品圖片">
                  <template #body="slotProps">
                    <img
                      :src="slotProps.data.imgSrc"
                      :alt="slotProps.data.productId"
                      class="w-64"
                    />
                  </template>
                </Column>
                <Column field="price" header="價格" sortable style="min-width: 8rem">
                  <template #body="slotProps"> $ {{ slotProps.data.price.discount }} </template>
                </Column>
              </DataTable>
            </OverlayPanel>
          </div>

          <div class="flex justify-end items-center ml-12 lt-md:(justify-start ml-0)">
            <template v-if="!isUserLoggedIn">
              <NuxtLink no-prefetch to="/user/login" class="text-brown_light cursor-pointer">
                <span class="material-icons align-text-top text-22 mr-6"> person </span>
                <span class="text-16 align-middle">會員登入</span>
              </NuxtLink>
            </template>
            <template v-else>
              <div class="card flex justify-content-center relative cursor-pointer group">
                <div
                  aria-haspopup="true"
                  aria-controls="overlay_tmenu"
                  class="font-black rounded-full border border-solid text-blue border-blue bg-white text-14 px-12 py-4 group-hover:( bg-brown_light)"
                  :style="onPopup ? popupActiveStyle : ''"
                  @click="toggle"
                >
                  <p class="w-120 whitespace-nowrap text-ellipsis overflow-hidden text-center">
                    {{ userName }}
                  </p>
                </div>

                <TieredMenu
                  id="overlay_tmenu"
                  ref="menu"
                  :model="loginMenu"
                  popup
                  @show="onPopup = true"
                  @hide="onPopup = false"
                >
                  <template #item="{ item, props }">
                    <NuxtLink
                      v-if="item.route"
                      class="gap-8"
                      :to="item.route"
                      v-bind="props.action"
                    >
                      <span class="material-icons"> {{ item.icon }} </span>
                      <span>{{ item.label }}</span>
                    </NuxtLink>
                    <p v-else class="px-12 py-8 gap-8" v-bind="props.action">
                      <span class="material-icons"> {{ item.icon }} </span>
                      <span>{{ item.label }}</span>
                    </p>
                  </template>
                </TieredMenu>
                <span
                  class="material-icons text-20 text-gray bg-white rounded-full absolute end-[-10px] bottom-[-4px] absolute"
                >
                  expand_circle_down
                </span>
              </div>
              <div>
                <ConfirmDialog></ConfirmDialog>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div>
        <Sidebar
          v-model:visible="visible"
          class="border-blue_dark"
          :pt="{
            root: {
              class: 'bg-blue_dark'
            },
            header: {
              class: 'text-white'
            }
          }"
          header="有良冊股份有限公司"
          position="full"
          block-scroll
        >
          <template #header>
            <h1>
              <NuxtLink
                class="w-230 h-25 block bg-logo indent-[101%] whitespace-nowrap overflow-hidden"
                to="/"
                @click="visible = false"
                >有良冊股份有限公司</NuxtLink
              >
            </h1>
          </template>
          <Divider class="m-0" />
          <ul class="mt-12 ml-24">
            <li v-for="routeItem in routeList" :key="routeItem.label" class="mb-24">
              <template v-if="routeItem.items?.length > 0">
                <p class="text-white text-24 mb-12">
                  <span v-if="routeItem.icon" class="material-icons mr-16 text-white align-bottom">
                    {{ routeItem.icon }}
                  </span>
                  {{ routeItem.label }}
                  <span class="material-icons"> arrow_drop_down </span>
                </p>

                <ul class="ml-52">
                  <li v-for="item in routeItem.items" :key="item.label" class="mb-12">
                    <NuxtLink
                      no-prefetch
                      class="text-white text-24"
                      :to="item.route"
                      @click="visible = false"
                      >{{ item.label }}</NuxtLink
                    >
                  </li>
                </ul>
              </template>
              <template v-else>
                <span v-if="routeItem.icon" class="material-icons mr-16 text-white align-bottom">
                  {{ routeItem.icon }}
                </span>
                <NuxtLink
                  no-prefetch
                  class="text-white text-24"
                  :to="routeItem.route"
                  @click="visible = false"
                  >{{ routeItem.label }}</NuxtLink
                ></template
              >
            </li>
          </ul>
        </Sidebar>
        <span
          class="material-icons text-white text-48 cursor-pointer ml-16 hidden lt-lg:block"
          @click="visible = true"
        >
          menu
        </span>
      </div>
    </div>
  </div>
  <ConfirmDialog group="headless">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="flex flex-col items-center p-28 rounded-full">
        <div class="rounded-full inline-flex justify-center items-center bg-white h-84 w-84 -mt-72">
          <span class="material-icons text-blue text-104"> help </span>
        </div>
        <span class="font-bold text-24 block mb-8 mt-20">{{ message.header }}</span>
        <p class="mb-0">{{ message.message }}</p>
        <div class="flex items-center gap-8 mt-20">
          <Button class="min-w-120" label="登出" @click="acceptCallback"></Button>
          <Button class="min-w-120" label="取消" outlined @click="rejectCallback"></Button>
        </div>
      </div>
    </template>
  </ConfirmDialog>
</template>

<script setup>
import TieredMenu from 'primevue/tieredmenu'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import { storeToRefs } from 'pinia'

const router = useRouter()
const { notify } = useToastifyStore()
const visible = ref(false)
const blocked = ref(false)

const orderStore = useOrderStore()
const { qtyInCart } = storeToRefs(orderStore)

const routeList = ref([
  {
    label: '首頁',
    icon: 'home',
    iconName: 'home',
    route: '/'
  },
  {
    label: '訂購書籍',
    icon: 'store',
    route: '/bookstore'
  },
  {
    label: '購物相關',
    icon: 'info',
    items: [
      {
        label: '訂單查詢',
        route: '/order'
      },
      {
        label: '購物須知',
        route: '/shoppingInfo'
      },
      {
        label: '常見問題',
        route: '/faq'
      }
    ]
  },
  {
    label: '檔案下載',
    icon: 'cloud_download',
    route: '/file'
  },
  {
    label: '聯絡我們',
    icon: 'contacts',
    route: '/contact'
  }
])

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

const toggleProductPanel = (event) => {
  productPanel.value.toggle(event)
  blocked.value = true
}

const onProductSelect = (event) => {
  router.push(`/bookstore/${event.data.productId}`)

  productPanel.value.hide()
}

const userStore = useUserStore()
const { setUserLogout } = userStore
const { isUserLoggedIn, userName, idToken, signInProvider } = storeToRefs(userStore)

const menu = ref()

const toggle = (event) => {
  menu.value.toggle(event)
}

const onPopup = ref(false)

const popupActiveStyle = computed(() => {
  return { backgroundColor: '#facc15' }
})

const confirm = useConfirm()
const confirmLogout = () => {
  confirm.require({
    group: 'headless',
    header: '登出',
    message: '您是否確定要登出?',
    rejectLabel: '取消',
    acceptLabel: '登出',
    accept: () => {
      setUserLogout()
      notify('info', '登出成功')
    },
    reject: () => {
      console.log('logout cancel')
    }
  })
}

const { $api } = useNuxtApp()
const confirmEmailVerify = async () => {
  const emailVerified = useCookie('emailVerified').value
  if (emailVerified) return

  const idToken = useCookie('idToken').value
  const emailVerify = apiList.member.sendEmailVerify

  try {
    await $api(emailVerify.serverPath, {
      method: emailVerify.method,
      body: {
        idToken
      }
    })
    notify('info', '請前往信箱收取驗證信')
  } catch (e) {
    notify('error', e.message, e.statusCode)
  }
}

const loginMenu = ref([])
const updateLoginMenuItem = () => {
  loginMenu.value = []

  if (!idToken.value) return
  loginMenu.value.push({
    label: '登出',
    icon: 'logout',
    command: () => {
      confirmLogout()
    }
  })
  if (signInProvider.value === 'password') {
    loginMenu.value.push({
      label: '重設密碼',
      icon: 'password',
      route: '/user/resetPassword'
    })
  }
  const emailVerifiedCookie = useCookie('emailVerified').value

  if (!emailVerifiedCookie) {
    loginMenu.value.push({
      label: '信箱驗證',
      icon: 'verified',
      command: () => {
        confirmEmailVerify()
      }
    })
  }
}

watch(idToken, async (newVal, oldVal) => {
  if (import.meta.server) return
  if (!newVal) return
  await updateEmailVerify()
  updateLoginMenuItem()
})

// 更新emailVerified狀態
const updateEmailVerify = async () => {
  const cookieidToken = useCookie('idToken').value
  const cookieEmailVerified = useCookie('emailVerified').value
  if (!cookieidToken) return
  if (cookieEmailVerified) return

  const userDataResponse = await $api(apiList.member.getUserData.serverPath, {
    method: apiList.member.getUserData.method,
    body: {
      idToken: cookieidToken
    }
  }).catch((e) => {
    console.log('e', e.message, e.statusCode)
  })

  if (!userDataResponse) return
  const user = userDataResponse.users[0]

  userStore.$patch({
    emailVerified: user.emailVerified
  })

  useCookie('emailVerified').value = user.emailVerified

  const patchMemberInfo = apiList.member.patchMemberInfo
  await $api(patchMemberInfo.serverPath.replace(':memberId', user.localId), {
    method: patchMemberInfo.method,
    body: {
      memberInfo: {
        emailVerified: user.emailVerified
      }
    }
  })
}

onMounted(async () => {
  await updateEmailVerify()
  updateLoginMenuItem()

  productStore.$patch({
    productList: productList.value
  })
})

const emit = defineEmits(['setVisible'])
</script>

<style lang="scss" scoped>
.bg-logo {
  @include bg-cover('@/assets/images/home/Logo.png');
}
</style>

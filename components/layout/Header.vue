<template>
  <div class="bg-blue_dark tracking-widest z-999">
    <div class="container py-16 flex-center">
      <div
        class="flex justify-between items-center flex-grow-1 lt-md:(flex-col items-start justify-center)"
      >
        <h1 class="">
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
                class="text-20 mr-4 text-white group-hover:text-[#35e3ea] align-text-top"
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
          <div class="flex-center lt-lg:mr-12">
            <IconField icon-position="left">
              <InputIcon
                :pt="{
                  root: {
                    class: 'left-6'
                  }
                }"
              >
                <template #default>
                  <span class="material-icons text-16 rotate-y-180 text-black"> search </span>
                </template>
              </InputIcon>
              <InputText
                id="bookName"
                v-model="textSearch"
                placeholder="書籍名稱"
                class="text-14 max-w-140 lt-md:max-w-177 h-25 rounded-0 enabled:focus:outline-none pl-28"
              />
            </IconField>
            <Button
              class="bg-brown_dark w-53 h-25 text-center cursor-pointer rounded-0 text-14 font-bold p-0 m-0 border-0"
              label="搜尋"
            />
          </div>
          <!-- <ClientOnly> -->
          <div class="flex items-center">
            <div class="text-white cursor-pointer mr-16">
              <span class="material-icons align-text-top text-22 mr-2"> shopping_cart </span>

              <span class="text-14 align-middle">購物車(0)</span>
            </div>

            <template v-if="!isUserLoggedIn">
              <NuxtLink no-prefetch to="/user/login" class="text-brown_light cursor-pointer">
                <span class="material-icons align-text-top text-22 mr-2"> person </span>
                <span class="text-14 align-middle">會員登入</span>
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
                  {{ userName }}
                </div>

                <TieredMenu
                  id="overlay_tmenu"
                  ref="menu"
                  :model="items"
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
                  class="material-icons text-20 text-gray bg-white rounded-full absolute end-[-10px] bottom-[-4px]"
                >
                  expand_circle_down
                </span>
              </div>
              <div>
                <ConfirmDialog></ConfirmDialog>
              </div>
            </template>
          </div>
          <!-- </ClientOnly> -->
        </div>
      </div>
      <div>
        <Sidebar
          v-model:visible="visible"
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
        >
          <ul class="mt-40 w-1/2 mx-auto">
            <li v-for="routeItem in routeList" :key="routeItem.label" class="mb-24">
              <template v-if="routeItem.items?.length > 0">
                <p class="text-white text-24 mb-12">{{ routeItem.label }}</p>
                <ul class="ml-32">
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
              <template v-else
                ><NuxtLink
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
import Sidebar from 'primevue/sidebar'
import TieredMenu from 'primevue/tieredmenu'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import { storeToRefs } from 'pinia'

const visible = ref(false)

const routeList = ref([
  {
    label: '首頁',
    icon: 'material-icons',
    iconName: 'home',
    route: '/'
  },
  {
    label: '訂購書籍',
    route: '/bookstore'
  },
  {
    label: '購物相關',
    items: [
      {
        label: '訂單查詢',
        route: '/orderSearch'
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
    route: '/files'
  },
  {
    label: '聯絡我們',
    route: '/contact'
  }
])

const textSearch = ref(null)

const userStore = useUserStore()
const { setUserLogout } = userStore
const { isUserLoggedIn, userName, emailVerified } = storeToRefs(userStore)

const menu = ref()

const items = ref([
  {
    label: '登出',
    icon: 'logout',
    command: () => {
      confirmLogout()
    }
  },
  {
    label: '重設密碼',
    icon: 'password',
    route: '/user/resetPassword'
  }
  // {
  //   label: '信箱驗證',
  //   icon: 'verified',
  //   command: () => {
  //     confirmEmailVerify()
  //   }
  // }
])

const toggle = (event) => {
  menu.value.toggle(event)
}

const onPopup = ref(false)

const popupActiveStyle = computed(() => {
  return { backgroundColor: '#facc15' }
})

const { notify } = useToastifyStore()
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
  if (emailVerified.value) return

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

const setEmailVarifyItem = () => {
  if (!emailVerified.value) {
    items.value.push({
      label: '信箱驗證',
      icon: 'verified',
      command: () => {
        confirmEmailVerify()
      }
    })
  }
}

onMounted(() => {
  setEmailVarifyItem()
})
</script>

<style lang="scss" scoped>
.bg-logo {
  @include bg-cover('@/assets/images/home/Logo.png');
}
</style>

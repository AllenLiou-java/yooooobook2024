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
            <NuxtLink :to="routeItem.route" class="pt-16 pb-24">
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
                  <NuxtLink :to="item.route">
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
          <div class="flex items-center">
            <div class="text-white cursor-pointer mr-16">
              <span class="material-icons align-text-top text-22 mr-2"> shopping_cart </span>
              <span class="text-14 align-middle">購物車(0)</span>
            </div>
            <NuxtLink to="/user/login" class="text-brown_light cursor-pointer">
              <span class="material-icons align-text-top text-22 mr-2"> person </span>
              <span class="text-14 align-middle">會員登入</span>
            </NuxtLink>
          </div>
        </div>
      </div>
      <span class="material-icons text-white text-48 cursor-pointer ml-16 hidden lt-lg:block">
        menu
      </span>
    </div>
  </div>
</template>

<script setup>
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
</script>

<style lang="scss" scoped>
.bg-logo {
  @include bg-cover('@/assets/images/home/Logo.png');
}
</style>

<template>
  <div>
    <div class="relative text-white">
      <div class="container h-500 lt-md:h-320 relative">
        <div class="absolute bottom-20 w-[calc(100%-80px)] left-60 z-100 lt-md:left-30">
          <h1
            class="relative text-52 before:(content-[''] absolute top-1/2 left-0 -translate-y-1/2 w-6 h-[80%] bg-[#35e3eb]) pl-20"
          >
            檔案下載
          </h1>
          <hr class="bg-white mt-32 mb-24" />
          <Breadcrumb :link-list="routeList" />
        </div>
      </div>
      <div
        class="absolute top-0 left-0 bg-[url('@/assets/images/banner/0003.png')] bg-cover bg-no-repeat bg-bottom w-full h-full z-[-1]"
      />
      <div class="mask-70"></div>
    </div>
    <div class="container text-primary flex lt-lg:flex-wrap pt-48 pb-80 font-bold">
      <div class="max-w-310 w-full h-230 border border-gray_light border-solid p-24 mr-60 mb-40">
        <h2
          class="text-28 relative pl-16 py-4 before:(content-[''] absolute top-1/2 left-0 -translate-y-1/2 w-2 h-[100%] bg-blue_dark)"
        >
          Menu
        </h2>
        <hr class="bg-gray_light h-2 my-16" />
        <ul class="h-120 overflow-y-auto">
          <li
            v-for="file in fileList"
            :key="file.name"
            class="text-20 pb-16 mb-16 border-0 border-b-1 border-solid border-gray_light"
          >
            <NuxtLink
              :class="queryFileName === file.name ? 'text-blue_light' : 'text-gray_dark'"
              :to="{ name: 'file-book', params: { book: file.name } }"
              >{{ file.name }}</NuxtLink
            >
          </li>
        </ul>
      </div>
      <div class="w-full">
        <div class="flex flex-wrap mb-40">
          <div class="w-352 max-h-352 flex-center border border-solid mr-20 mb-20 p-20">
            <img
              v-if="fileInfo.imgPath"
              class="max-h-328 object-contain"
              :src="imageSrc(fileInfo.imgPath)"
              alt="bookImg"
            />
          </div>

          <div class="grow-1">
            <h3 class="text-blue text-28 mb-12">{{ fileInfo.series }}</h3>
            <h4 class="text-brown text-28">{{ fileInfo.name }}</h4>
            <hr class="bg-brown h-1 mt-20 mb-16" />
            <p class="text-20">文件表格下載區</p>
          </div>
        </div>
        <div>
          <DataTable
            v-model:filters="filters"
            :value="fileInfo.content"
            show-gridlines
            :loading="loading"
          >
            <template #header>
              <div>
                <label for="keyword" class="block text-20 mb-8 text-blue_dark">關鍵字搜尋：</label>
                <IconField icon-position="left">
                  <InputIcon>
                    <span class="material-icons text-20"> search </span>
                  </InputIcon>

                  <InputText
                    id="keyword"
                    v-model="filters['global'].value"
                    placeholder="請輸入關鍵字"
                  />
                </IconField>
              </div>
            </template>
            <template #empty> <p class="text-center">無附件資料</p> </template>
            <template #loading> <p class="text-black text-20">載入附件資料，請稍後</p> </template>
            <Column
              header-class="bg-brown text-white"
              class="w-30 text-center"
              field="code"
              header="項次"
              :pt="{
                headerTitle: {
                  class: 'mx-auto'
                }
              }"
            >
              <template #body="slotProps">
                {{ slotProps.index + 1 }}
              </template>
            </Column>
            <Column
              header-class="bg-brown text-white"
              class="w-350"
              field="title"
              header="附件名稱"
            >
              <template #body="{ data }">
                {{ data.title }}
              </template>
            </Column>
            <Column
              header-class="bg-brown text-white"
              class="w-60 text-center"
              field="link"
              header="下載"
              :pt="{
                headerTitle: {
                  class: 'mx-auto'
                }
              }"
            >
              <template #body="slotProps">
                <NuxtLink :to="slotProps.data.link" target="_blank" external>
                  <span class="material-icons text-28 text-black"> download_for_offline </span>
                </NuxtLink>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FilterMatchMode } from 'primevue/api'
import fileList from '@/assets/js/fileList'
const { imageSrc } = getImageSrc()

const route = useRoute()

useHead({
  title: () => `檔案下載【${route.params.book}】`
})

definePageMeta({
  title: '檔案下載'
})

useSeoMeta({
  description: '前往下載公司登記常用的各式表單。',
  ogDescription: '前往下載公司登記常用的各式表單。',
  ogTitle: '檔案下載 - 有良冊股份有限公司',
  ogImage: '/yooooobook.jpg'
})

const routeList = [
  {
    name: '首頁',
    linkTo: '/'
  },
  {
    name: '檔案下載',
    linkTo: '/file'
  },
  {
    name: `${route.params.book}`,
    linkTo: ''
  }
]

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})
const loading = ref(true)

const queryFileName = ref('')
const fileInfo = ref({})

watch(route, (newRoute) => {
  const book = newRoute.params.book
  setFilteredfile(fileList, book)
})

onMounted(() => {
  const book = route.params.book
  setFilteredfile(fileList, book)
  loading.value = false
})

const setFilteredfile = (fileList, bookName) => {
  const initFile = {
    series: '',
    name: '',
    content: [],
    imgPath: ''
  }

  fileInfo.value = fileList.filter((item) => item.name === bookName)[0] || initFile
  queryFileName.value = bookName
}
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <Carousel
      :value="banners"
      :num-visible="1"
      :num-scroll="1"
      :show-navigators="false"
      :autoplay-interval="3000"
      indicators-content-class="absolute left-3/6 bottom-20 -translate-x-1/2"
      content-class="relative"
    >
      <template #item="slotProps">
        <div class="relative mx-auto">
          <img
            class="w-full h-[60vh] object-cover object-center"
            :src="imageSrc(slotProps.data.imgPath)"
            :alt="slotProps.data.altName"
          />
        </div>
      </template>
    </Carousel>

    <div class="py-64 bg-[#f2eeeb]">
      <div class="container flex-center flex-wrap gap-32">
        <div class="text-center mb-24">
          <h2 class="text-blue_dark text-36 mb-16 font-serif">Who Should Read This Book</h2>
          <p class="text-blue_dark text-24 mb-16">有良冊出版書籍最適合那些讀者呢？</p>
          <img :src="imageSrc('/home/reader02.png')" class="mr-20 h-120" alt="readers" />
          <img
            :src="imageSrc('/home/reader01.png')"
            class="mr-20 h-120"
            style="transform: rotateY(180deg)"
            alt="readers"
          />
          <img :src="imageSrc('/home/reader03.png')" class="h-120" alt="readers" />
        </div>

        <div class="mb-24 lt-xl:mb-0">
          <ul class="text-blue_dark">
            <li class="mb-16 flex flex-nowrap">
              <span class="material-icons text-brown_dark text-52 mr-4 shrink-0"> task_alt </span>
              <p
                class="inline-block text-20 lt-md:text-16 border-solid border-3 border-l-none px-12 py-8 rounded-r-[6px]"
              >
                會計師、記帳士、記帳及報稅代理人等公司登記從業人員
              </p>
            </li>
            <li class="mb-16 flex flex-nowrap">
              <span class="material-icons text-brown_dark text-52 mr-4 shrink-0"> task_alt </span>
              <p
                class="inline-block text-20 lt-md:text-16 border-solid border-3 border-l-none px-12 py-8 rounded-r-[6px]"
              >
                公司欲自行辦理公司登記者
              </p>
            </li>
            <li class="flex flex-nowrap">
              <span class="material-icons text-brown_dark text-52 mr-4 shrink-0"> task_alt </span>
              <p
                class="inline-block text-20 lt-md:text-16 border-solid border-3 border-l-none px-12 py-8 rounded-r-[6px]"
              >
                公司登記機關承辦人員
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="text-white relative pt-80">
      <div
        class="container flex justify-between lt-lg:justify-center max-w-1000 flex-wrap-reverse mb-100"
      >
        <ul class="list-disc pl-24 mr-32">
          <li class="text-20 lt-md:text-16 mb-8">公司有能力自己辦理公司登記</li>
          <li class="text-20 lt-md:text-16 mb-8">提升專業知識，協助客戶辦理公司登記</li>
          <li class="text-20 lt-md:text-16 mb-8">塑造自身專業形象，讓客戶願意花更多錢委託代辦</li>
          <li class="text-20 lt-md:text-16">建立口碑，讓更多公司成為你的客戶</li>
        </ul>
        <div class="mb-24">
          <h2 class="text-32 mb-32 font-serif">What Will You Learn?</h2>
          <ul class="flex justify-between items-center">
            <li v-for="(business, idx) in businessImgPath" :key="idx">
              <img class="mr-8 w-48" :src="imageSrc(business.imgPath)" :alt="business.altName" />
            </li>
          </ul>
        </div>
      </div>
      <div class="container flex flex-center flex-col">
        <h2 class="text-80 mb-24 font-serif">You Have To Read This Book</h2>
        <p class="text-28 text-[#d2c49d] mb-48 italic">為什麼一定要選擇有良冊出版書籍呢？</p>
        <ul class="flex flex-center flex-wrap relative bottom-[-44px]">
          <li v-for="feature in features" :key="feature.title" class="mb-16 ml-[-6px]">
            <CardDoc :feature="feature"></CardDoc>
          </li>
        </ul>
      </div>
      <div
        class="absolute top-0 left-0 bg-[url('@/assets/images/home/city.png')] bg-cover bg-top bg-fixed w-full h-full z-[-1]"
      />
      <div class="mask-90" />
    </div>
  </div>
</template>

<script setup>
import Carousel from 'primevue/carousel'

useHead({
  title: '首頁'
})

definePageMeta({
  title: '首頁'
})

const { imageSrc } = getImageSrc()

const banners = ref([
  {
    imgPath: '/banner/0001.png',
    altName: 'book-1'
  },
  {
    imgPath: '/banner/0003.png',
    altName: 'book-2'
  },
  {
    imgPath: '/banner/0004.png',
    altName: 'book-3'
  }
])

const businessImgPath = ref([
  {
    imgPath: '/business/01.png',
    altName: 'badge-1'
  },
  {
    imgPath: '/business/02.png',
    altName: 'badge-2'
  },
  {
    imgPath: '/business/03.png',
    altName: 'badge-3'
  },
  {
    imgPath: '/business/04.png',
    altName: 'badge-4'
  },
  {
    imgPath: '/business/05.png',
    altName: 'badge-5'
  },
  {
    imgPath: '/business/06.png',
    altName: 'badge-6'
  }
])

const features = [
  {
    title: '文件完備',
    content: '整理公司登記所需要用到的各項文件範例，不用愁沒有參考範本。'
  },
  {
    title: '用詞精準',
    content: '範例精準表達各項公司登記應記載事項及相關說明，不用再煩惱不知道文件內容該怎麼呈現。'
  },
  {
    title: '於法有據',
    content:
      '每份文件、登記案件範例皆有補充相關法令函釋並載明其法源依據，使申請書件符合公司法及相關法令所規定之形式要件，不再擔心文件不符遭登記機關否准。'
  },
  {
    title: '範例詳盡',
    content:
      '完整整理從公司的設立到解散登記，以及公司存續 時可能發生的變更登記範例，遇到變更登記時能有所參考。'
  },
  {
    title: '由簡入繁',
    content:
      '從各項登記之基礎點切入，彙整各項登記可能會遇到的問題並加以說明，讓你熟稔各項公司登記後，即使遇到再複雜的變更登記案件，也能輕鬆掌握要點。'
  }
]
</script>

<style lang="scss" scoped></style>

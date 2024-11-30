<template>
  <div class="relative">
    <LayoutHeader />
    <div class="min-h-[calc(100vh-316px)]">
      <slot />
    </div>

    <LayoutFooter />
  </div>
</template>

<script setup>
import LayoutHeader from '@/components/layout/Header.vue'
import LayoutFooter from '@/components/layout/Footer.vue'
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
  await useAsyncData('profile', initProfile)
}
</script>

<style lang="scss" scoped></style>

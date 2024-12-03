<template>
  <div>
    <h1>訂單查詢</h1>
    <Breadcrumb :link-list="routeList" text-color="#032C4B" />
  </div>
</template>

<script setup>
useHead({
  title: '訂單查詢'
})

definePageMeta({
  title: '訂單查詢'
})

useSeoMeta({
  description: '查詢您送出的訂單資訊，同時掌握目前的訂單進度喔。',
  ogDescription: '查詢您送出的訂單資訊，同時掌握目前的訂單進度喔。',
  ogTitle: '訂單查詢 - 有良冊股份有限公司',
  ogImage: '/yooooobook.jpg',
  ogUrl: 'https://www.yooooobook.com/orderSearch'
})

const routeList = [
  {
    name: '首頁',
    linkTo: '/'
  },
  {
    name: '訂單查詢',
    linkTo: ''
  }
]
</script>

<style lang="scss" scoped></style>

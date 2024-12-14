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

// const order = ref({
//   bankAccountNo: '12345',
//   buyer: 'Allen co.',
//   delivery: {
//     company: '',
//     trackingNo: '',
//     trackingUrl: ''
//   },
//   email: 'devliou769@gmail.com',
//   isClosed: false,
//   isFromGroup: false,
//   oderDate: '2024/01/11 11:51',
//   orderId: '240111115126123',
//   orderList: [
//     {
//       productId: 'AA00001',
//       productName: '公司登記實務及案例解析(共三冊)',
//       qty: 3,
//       totalPrice: 15600,
//       unitPrice: 5200
//     }
//   ],
//   phone: '0911123456',
//   receiver: {
//     address: 'Taichung',
//     name: 'Allen Liou'
//   },
//   remark: '',
//   status: '1',
//   taxId: '12345678',
//   totalPrice: 15600
// })

// const orderListInCart = ref([
//   {
//     content: ['有限公司篇【532頁】', '股份有限公司篇【964頁】', '應備文件詳析篇【296頁】'],
//     imgSrc:
//       'https://firebasestorage.googleapis.com/v0/b/yooooobook-dev.appspot.com/o/Product%2Fbooks.png?alt=media&token=8fdf139e-19e7-48cd-83a6-0d59b75cdaee',
//     isFromGroup: false,
//     name: '公司登記實務及案例解析(共三冊)',
//     plans: [
//       {
//         content: ['可各別開立發票', '如需另外寄送，每一地址酌收行政處理費300元'],
//         isShow: true,
//         priceList: [
//           { price: 5200, title: '5套以下' },
//           { price: 4000, title: '5-9套' },
//           { price: 3800, title: '10套以上' }
//         ],
//         type: 'person'
//       },
//       {
//         content: [
//           '可各別寄送',
//           '可各別開立發票',
//           '公會/協會推廣價<span class="text-danger font-weight-bold px-1">預購期間限定</span>',
//           '預購期間<span class="text-danger font-weight-bold px-1">1月20日 - 2月14日 </span> (或洽本公司line帳號)'
//         ],
//         isShow: true,
//         priceList: [{ price: 3600, title: '不計套數' }],
//         type: 'group'
//       }
//     ],
//     price: {
//       discount: 5200,
//       discountList: { '<10': 4000, '<5': 5200, '>=10': 3800 },
//       originalPrice: 5500,
//       promote: 3600
//     },
//     productId: 'AA00001',
//     qty: 2,
//     stock: 27
//   }
// ])
</script>

<style lang="scss" scoped></style>

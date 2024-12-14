<template>
  <div class="py-48 container flex flex-col justify-center items-center" style="max-width: 800px">
    <span class="material-icons text-120 text-blue_dark mb-16"> check_circle_outline </span>
    <h3 class="text-blue mb-48 text-28">感謝您的購買，您的訂單資訊如下：</h3>

    <div v-if="order !== null" class="text-blue leading-24">
      <DataTable
        :value="order.orderList"
        row-group-mode="rowspan"
        :group-rows-by="['orderId', 'oderDate']"
        table-class="mb-32"
        striped-rows
        show-gridlines
      >
        <template #header>
          <p class="text-18 font-bold">
            訂單編號： <span class="text-secondary">{{ order.orderId }}</span>
          </p>
        </template>
        <Column field="productName" header="產品名稱" header-class="bg-blue text-white"></Column>
        <Column
          field="qty"
          header="數量"
          header-class="bg-blue text-white"
          class="text-center"
        ></Column>
        <Column
          field="totalPrice"
          header="總金額"
          header-class="bg-blue text-white"
          class="text-center"
        >
          <template #body="slotProps">
            {{ thousandthsFormat(slotProps.data.totalPrice) }}
          </template>
        </Column>
        <ColumnGroup type="footer">
          <Row>
            <Column footer="訂單總金額:" :colspan="2" footer-style="text-align:right" />
            <Column class="text-secondary" :footer="thousandthsFormat(order.totalPrice)" />
          </Row>
        </ColumnGroup>
      </DataTable>
    </div>

    <ul class="self-start ml-20 mb-20 list-square leading-24">
      <li class="mb-16">
        請於
        <u class="font-bold text-secondary">3日內</u>
        完成匯款並於匯款後至有良冊LINE官方帳號
        <a class="text-secondary underline underline-offset-4" href="https://lin.ee/f8oZLym"
          >@yooooobook</a
        >
        告知您的<span class="text-secondary">「訂單編號」</span>、<span class="text-secondary"
          >「匯款金額」</span
        >及<span class="text-secondary">「帳號末5碼」</span
        >，我們將每天進行統一對帳，如無問題將不另行通知。
      </li>
      <li class="mb-12">
        <p class="mb-8">匯款資訊：</p>
        <ul class="ml-16 list-circle">
          <li>
            <label class="mb-0">匯款銀行：</label
            ><span style="color: #f75000">玉山銀行 - 台中分行</span>
          </li>
          <li><label class="mb-0">銀行代碼：</label><span style="color: #f75000">808</span></li>
          <li>
            <label class="mb-0">銀行帳戶：</label><span style="color: #f75000">1366940052966</span>
          </li>
          <li>
            <label class="mb-0">戶名：</label><span style="color: #f75000">有良冊股份有限公司</span>
          </li>
        </ul>
      </li>
      <li class="mb-12">
        若想查詢訂單進度，可前往<u class="mx-1"
          ><nuxt-link class="font-black text-blue" to="/orderSearch"> 訂單查詢 </nuxt-link></u
        >了解處理進度。
      </li>
      <li class="mb-12">有關訂單詳細資料以及匯款資訊，可至您的電子郵件匣中查閱。</li>
    </ul>

    <NuxtLink
      class="bg-blue text-white hover:bg-blue_dark rounded-3xl cursor-pointer px-16 py-8"
      to="/"
      >返回首頁</NuxtLink
    >
  </div>
</template>

<script setup>
definePageMeta({
  middleware: [
    function (to, from) {
      const idToken = useCookie('idToken')

      if (!idToken.value) {
        return navigateTo({
          path: '/user/login'
        })
      }
    }
  ]
})
const route = useRoute()
const { userId, idToken } = useUserStore()
const { notify } = useToastifyStore()

const { data: order, error } = await useAPI(`/api/order/${userId}`, {
  method: 'post',
  body: {
    orderId: route.params.orderId,
    idToken
  }
})

if (import.meta.client) {
  if (!order.value) {
    const { statusMessage, statusCode } = error.value.cause
    notify('error', statusMessage, statusCode)
  }
}

// const order = {
//   bankAccountNo: '98765',
//   buyer: 'allen liou.co',
//   delivery: {
//     company: '',
//     trackingNo: '',
//     trackingUrl: ''
//   },
//   email: 'mydevmailsend@gmail.com',
//   isClosed: false,
//   isFromGroup: false,
//   oderDate: '2024/12/11 17:24',
//   orderId: '241211172438681',
//   orderList: [
//     {
//       content: ['公司登記實務及案例解析(增資 · 發行新股篇)'],
//       imgSrc:
//         'https://firebasestorage.googleapis.com/v0/b/yooooobook-dev.appspot.com/o/Product%2Fbook2.png?alt=media',
//       productId: 'AA00002',
//       productName: ' 公司法：規範與案例（二版）',
//       qty: 3,
//       totalPrice: 6000,
//       unitPrice: 2000
//     },
//     {
//       content: ['有限公司篇【532頁】', '股份有限公司篇【964頁】', '應備文件詳析篇【296頁】'],
//       imgSrc:
//         'https://firebasestorage.googleapis.com/v0/b/yooooobook-dev.appspot.com/o/Product%2Fbooks.png?alt=media',
//       productId: 'AA00001',
//       productName: '公司登記實務及案例解析(共三冊)',
//       qty: 4,
//       totalPrice: 20800,
//       unitPrice: 5200
//     }
//   ],
//   phone: '0988765432',
//   receiver: {
//     address: '台中市西屯區文心路2段100號',
//     name: 'allen liou'
//   },
//   remark: '',
//   status: '1',
//   taxId: '96385274',
//   totalPrice: 26800
// }
</script>

<style lang="scss" scoped></style>

<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <div class="relative text-white">
      <div class="container h-500 lt-md:h-320 relative">
        <div class="absolute bottom-20 w-[calc(100%-80px)] left-60 z-100 lt-md:left-30">
          <h1
            class="relative text-52 before:(content-[''] absolute top-1/2 left-0 -translate-y-1/2 w-6 h-[80%] bg-[#35e3eb]) pl-20"
          >
            購物須知
          </h1>
          <hr class="bg-white mt-32 mb-24" />
          <p class="font-bold">首頁 - 購物須知</p>
        </div>
      </div>
      <div
        class="absolute top-0 left-0 bg-[url('@/assets/images/banner/0004.png')] bg-cover bg-no-repeat bg-bottom w-full h-full z-[-1]"
      />
      <div class="mask-70"></div>
    </div>

    <div class="container text-primary flex lt-lg:flex-wrap pt-48 pb-0 leading-[1.5] font-bold">
      <div
        class="max-w-310 w-full min-h-220 max-h-260 border border-gray_light border-solid p-24 mr-60 mb-40"
      >
        <h2
          class="text-28 relative pl-16 py-4 before:(content-[''] absolute top-1/2 left-0 -translate-y-1/2 w-2 h-[100%] bg-blue_dark)"
        >
          購物須知
        </h2>
        <hr class="bg-gray_light h-2 my-16" />
        <ul>
          <li class="text-20 pb-16 mb-16 border-0 border-b-1 border-solid border-gray_light">
            <NuxtLink
              :class="
                currentSection === '#purchase-description' ? 'text-blue_light' : 'text-gray_dark'
              "
              to="#purchase-description"
              >書籍購買相關</NuxtLink
            >
          </li>
          <li class="text-20 pb-16 mb-16 border-0 border-b-1 border-solid border-gray_light">
            <NuxtLink
              :class="currentSection === '#exchange-policy' ? 'text-blue_light' : 'text-gray_dark'"
              to="#exchange-policy"
              >退換貨相關辦法</NuxtLink
            >
          </li>
        </ul>
      </div>

      <div>
        <h3 class="text-24">有良冊 購物須知</h3>
        <hr class="bg-gray_light my-16" />

        <div>
          <p class="mb-8">親愛的顧客，您好：</p>
          <p class="mb-8">感謝您對有良冊的支持與愛護</p>
          <p>為維護您的權益，首先要請您先閱讀以下在有良冊官方網站購買書籍的購物須知。</p>
        </div>
        <hr class="bg-gray_light my-16" />

        <div id="purchase-description">
          <h4 class="text-blue text-20 mb-16">【 書籍購買相關 】</h4>
          <ul class="mb-16 pl-24 list-disc">
            <li class="mb-8">於有良冊官方網站購物消費，需先註冊成為會員，以利後續追蹤訂單狀態。</li>
            <li>有良冊官方網站購物流程：</li>
          </ul>
          <div class="flex flex-wrap lt-md:block mb-24">
            <div
              v-for="(step, index) in buyProcess"
              :key="step.title"
              class="flex items-center mb-24 lt-md:(block text-center mb-0)"
            >
              <div :class="step.widthClass">
                <p class="bg-blue_dark text-center text-white py-6">{{ step.title }}</p>
                <div class="flex-center h-86 bg-[#dddddd] p-16 lt-sm:h-auto">
                  <p class="text-black">
                    {{ step.content }}
                  </p>
                </div>
              </div>

              <span
                v-if="buyProcess.length - 1 > index"
                class="material-icons text-28 text-[#dddddd] lt-md:rotate-90 shrink-0"
              >
                play_arrow
              </span>
            </div>
          </div>
          <p class="mb-12">
            送出訂單後，須於<span class="text-[red]">三日內付款完成</span
            >，超過三日未付款完成，即取消訂單。
          </p>
          <ul>
            <li v-for="desc in descriptions" :key="desc.key" class="mb-16">
              <p class="text-blue_light mb-12">{{ desc.title }}</p>
              <ul>
                <li
                  v-for="(content, idx) in desc.content"
                  :key="idx"
                  class="mb-8 pl-20 relative before:(content-['※'] absolute top-0 left-0)"
                  v-html="content"
                ></li>
              </ul>
            </li>
          </ul>
          <p>因電腦螢幕顯色設定不同，所顯示之商品顏色與實際會有些許色差，敬請見諒。</p>
        </div>
        <hr class="bg-gray_light my-32" />

        <div id="exchange-policy">
          <h4 class="text-blue text-20 mb-16">【 退換貨相關辦法 】</h4>
          <ol class="marker:text-blue_light">
            <li v-for="policy in exchangePolicy" :key="policy.title" class="mb-16">
              <p class="text-blue_light mb-12">{{ policy.title }}</p>
              <ul class="pl-20 marker:text-primary mb-32" :class="policy.contentListTypeClass">
                <li
                  v-for="(content, idx) in policy.content"
                  :key="idx"
                  class="mb-8"
                  v-html="content"
                ></li>
              </ul>
              <div v-if="policy.others.length > 0" v-html="policy.others"></div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const currentSection = ref(null)
const buyProcess = [
  {
    title: 'Step 1',
    content: '選擇書籍和購買數量',
    width: 122,
    widthClass: 'w-full max-w-122 lt-md:max-w-full'
  },
  {
    title: 'Step 2',
    content: '加入購物車',
    width: 122,
    widthClass: 'w-full max-w-122 lt-md:max-w-full'
  },
  {
    title: 'Step 3',
    content: '登入會員/註冊會員',
    width: 171,
    widthClass: 'w-full max-w-171 lt-md:max-w-full'
  },
  {
    title: 'Step 4',
    content: '確定結帳，並確認書籍寄送地址、匯款資訊、發票資料',
    width: 272,
    widthClass: 'w-full max-w-272 lt-md:max-w-full'
  },
  {
    title: 'Step 5',
    content: '確認購買資訊並送出訂單，Email將收到感謝訂購信',
    width: 212,
    widthClass: 'w-full max-w-212 lt-md:max-w-full'
  },
  {
    title: 'Step 6',
    content:
      '當您匯款完成，請透過Email或有良冊官方LINE，告知您的「訂單編號」、「匯款金額」、「帳號末5碼」',
    width: 393,
    widthClass: 'w-full max-w-393 lt-md:max-w-full'
  },
  {
    title: 'Step 7',
    content: '訂單成立',
    width: 120,
    widthClass: 'w-full max-w-120 lt-md:max-w-full'
  }
]

const descriptions = [
  {
    title: '商品配送工作時間：',
    content: [
      '皆以郵局方式寄出書籍，於每次出貨時，寄發出貨通知信，還請多加留意。',
      '書籍配送時間一律為3-7個工作天送達商品。配送時間以每筆訂單完成付款時間開始算起，<br/>因商品數量有限，需要時間做調度作業，敬請見諒。',
      '若有特別需求，請於下訂單時備註說明，以利出貨作業。'
    ],
    key: 1
  },
  {
    title: '商品配送運費：',
    content: ['台灣地區：每筆訂單皆已包含運費。'],
    key: 2
  },
  {
    title: '付款方式：',
    content: [
      '僅提供付款方式為轉帳匯款。<br/>需在3日內轉帳付款完成，若超過3 日未付款，此筆訂單即取消，還請多加注意。'
    ],
    key: 3
  },
  {
    title: '缺貨狀況注意事項：',
    content: [
      '因書籍每批印刷數量有限，將有可能發生缺貨情形。<br/>若您在購買時對於缺貨書籍有需求，歡迎您透過官方LINE帳號洽詢客服人員，我們將會與您聯繫。',
      '有良冊官方網站每筆訂單成立時間皆不一樣，將依完成付款時間順序為準。'
    ],
    key: 4
  }
]

const exchangePolicy = [
  {
    title: '商品7天鑑賞期',
    content: [
      '如有退貨需求，請於收到商品7天內於LINE官方帳號留言，等候專人為您處理，並提供以下資訊。<br />客服人員收到後將會協助您進行退貨。',
      '本公司提供商品7天鑑賞期(含例假日)，若商品未經拆封、使用或被汙損，即可申請退換貨。',
      '商品退換請保持原商品完整性(含贈品)，並妥善包裝使用原包裝送回，若商品(含贈品)完整性不齊全或因包裝不妥導致寄回損壞，恕無法辦理退換。',
      '若收到之商品有瑕疵狀況或損壞情形，請務必於七日鑑賞期間，拍下商品瑕疵照片並與客服反應，以協助確認為商品本身瑕疵或為運送問題；惟若無事先告知客服，則一概不以瑕疵品前提受理退換申請。',
      '七天鑑賞期係指猶豫期而非試用期，商品須在完整可復原為全新狀態下才能進行退貨。'
    ],
    others: [
      '<div class="border border-blue_light border-solid rounded-3xl px-32 py-20"><p class="mb-8">退貨需提供以下資訊：</p><ul class="pl-24 list-disc text-blue_light"><li>訂單編號</li><li>姓名</li><li>聯絡電話</li><li>退貨書籍名稱</li><li>退貨原因及照片</li></ul></div>'
    ],
    contentListTypeClass: 'list-alpha'
  },
  {
    title: '退貨須知',
    content: [
      '退貨商品須為未經使用，且無非人為瑕疵所造成的污損、故障，7天鑑賞期僅供您猶豫並確認商品是否符合您的需求，並非商品的試用期，請保留完整的原始包裝（含外包裝紙盒），否則恕不接受退貨。 若有任何退貨問題，請加入我們LINE官方帳號與我們聯繫 以下情況無法接受退貨：'
    ],
    others: [
      '<ul class="list-alpha marker:text-primary pl-40"><li>超過 7 天的商品鑑賞期</li><li>無退回所有商品及贈品</li><li>退貨商品包裝破損不完整，盒裝外觀不得有明顯刮傷、破損、受潮、塗寫文字</li><li>惡意或大量退貨</li></ul>'
    ],
    contentListType: 'list-none'
  },
  {
    title: '退款說明',
    content: [
      '由客服人員確認退貨成功後，退款款項將先扣除每套$300行政處理費，方將剩餘退款費用轉帳至您提供的銀行帳戶中。'
    ],
    others: [],
    contentListType: 'list-none'
  }
]

const setCurrentSection = () => {
  const route = useRoute()
  currentSection.value = route.hash
}

onMounted(() => {
  setCurrentSection()
})
onUpdated(() => {
  setCurrentSection()
})
</script>

<style lang="scss" scoped></style>

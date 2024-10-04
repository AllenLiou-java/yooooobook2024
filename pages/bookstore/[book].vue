<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <div class="relative text-white">
      <div class="container h-500 lt-md:h-320 relative">
        <div class="absolute bottom-20 w-[calc(100%-80px)] left-60 z-100">
          <h1
            class="relative text-52 before:(content-[''] absolute top-1/2 left-0 -translate-y-1/2 w-6 h-[80%] bg-[#35e3eb]) pl-20"
          >
            訂購書籍
          </h1>
          <hr class="bg-white mt-32 mb-24" />
          <p class="font-bold">首頁 - 訂購書籍 - {{ route.params.book }}</p>
        </div>
      </div>
      <div
        class="absolute top-0 left-0 bg-[url('@/assets/images/home/city.png')] bg-cover bg-no-repeat bg-bottom w-full h-full z-[-1]"
      />
      <div class="mask-70"></div>
    </div>
    <div
      class="container text-primary flex pt-48 pb-80 font-bold flex-wrap lt-sm:justify-center gap-60"
    >
      <div
        class="max-w-310 w-full h-230 border border-gray_light border-solid p-24 shrink-0 lt-sm:mr-0"
      >
        <h2
          class="text-28 relative pl-16 py-4 before:(content-[''] absolute top-1/2 left-0 -translate-y-1/2 w-2 h-[100%] bg-blue_dark)"
        >
          Menu
        </h2>
        <hr class="bg-gray_light h-2 my-16" />
        <ul class="h-120 overflow-y-auto">
          <li
            v-for="productItem in productList"
            :key="productItem.name"
            class="text-20 pb-16 mb-16 border-0 border-b-1 border-solid border-gray_light"
          >
            <NuxtLink
              class="text-gray_dark"
              :to="{ name: 'bookstore-book', params: { book: productItem.name } }"
              >{{ productItem.name }}</NuxtLink
            >
          </li>
        </ul>
      </div>
      <div>
        <div class="flex gap-32 mb-44 flex-wrap">
          <div class="max-w-352 w-full border border-solid px-8 py-32">
            <img :src="product.imgSrc" alt="productImg" />
          </div>
          <div class="mt-20 mb-12">
            <h3 class="text-26 text-brown mb-16">{{ product.name }}</h3>
            <ul class="list-disc pl24 mb-16">
              <li v-for="(content, contentIdx) in product.content" :key="contentIdx">
                {{ content }}
              </li>
            </ul>
            <hr class="bg-brown my-12" />
            <div class="flex gap-32">
              <p>
                定價：<del>{{ product.price.originalPrice }}元</del>
              </p>
              <p class="text-secondary">優惠價：{{ product.price.discount }}元</p>
            </div>
            <hr class="bg-brown my-12" />
            <div class="flex items-center mb-16">
              <label for="orderQty">數量：</label>
              <InputNumber
                v-model="orderQty"
                input-id="orderQty"
                show-buttons
                button-layout="horizontal"
                :min="0"
                input-class="w-80"
              >
                <template #incrementbuttonicon>
                  <span class="material-icons"> add </span>
                </template>
                <template #decrementbuttonicon>
                  <span class="material-icons"> remove </span>
                </template>
              </InputNumber>
            </div>
            <p class="mb-16">庫存： {{ 3 }}</p>
            <div class="flex text-white gap-12">
              <div
                class="max-w-200 w-full bg-blue text-center py-16 rounded-3xl cursor-pointer hover:bg-blue_dark"
              >
                加入購物車
              </div>
              <div
                class="max-w-200 w-full bg-secondary text-center py-16 rounded-3xl cursor-pointer hover:bg-[#d80545]"
              >
                前往結帳
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 class="text-20 text-blue mb-16">團購優惠價格</h4>
          <p class="mb-12">
            若有團購需求，請透過官方
            <a
              class="underline text-blue_dark text-20"
              href="https://lin.ee/f8oZLym"
              target="_blank"
              >Line</a
            >
            或 來電洽詢（0978-940-828）。
          </p>
          <div v-for="(plan, planIdx) in product.plans" :key="planIdx" class="mb-32">
            <template v-if="plan.isShow">
              <h5
                v-if="plan.type === 'person'"
                class="text-16 mt-0 mb-12 bg-blue inline-block text-white px-8 py-4"
              >
                個人團購
              </h5>
              <h5 v-else class="text-16 mt-0 mb-12 bg-secondary inline-block text-white px-8 py-4">
                公會團購
              </h5>
              <DataTable :value="plan.priceList" show-gridlines class="w-full">
                <Column
                  :pt="{
                    headerContent: {
                      class: 'block text-center'
                    }
                  }"
                  class="text-center"
                  header-class="bg-brown text-white"
                  field="title"
                  header="方案"
                ></Column>
                <Column
                  :pt="{
                    headerContent: {
                      class: 'block text-center'
                    }
                  }"
                  class="text-center"
                  header-class="bg-brown text-white"
                  field="price"
                  header="價格"
                >
                  <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.price) }}
                  </template>
                </Column>
              </DataTable>
              <ul class="list-disc mt-12 pl-20">
                <li v-for="(planContent, idx) in plan.content" :key="idx">{{ planContent }}</li>
              </ul>
            </template>
          </div>
        </div>

        <hr class="bg-gray_light my-28" />

        <div>
          <h4 class="text-20 text-blue mb-20">書籍試閱 (請點擊篇名)</h4>
        </div>

        <hr class="bg-gray_light my-28" />

        <div>
          <h4 class="text-20 text-blue mb-20">書籍簡介</h4>
          <p
            v-for="(summarySegment, idx) in product.bookIntroduction.summary"
            :key="idx"
            class="mb-16"
            v-html="summarySegment"
          ></p>
        </div>

        <hr class="bg-gray_light my-28" />

        <div>
          <h4 class="text-20 text-blue mb-20">詳細資料</h4>
          <p
            v-for="(detailSegment, idx) in product.bookIntroduction.detail"
            :key="idx"
            class="mb-16"
            v-html="detailSegment"
          ></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
const route = useRoute()
const orderQty = ref(0)

const productList = ref([
  {
    name: '公司登記實務及案例解析(共三冊)',
    imgSrc:
      'https://firebasestorage.googleapis.com/v0/b/yooooobook-dev.appspot.com/o/Product%2Fbooks.png?alt=media&token=8fdf139e-19e7-48cd-83a6-0d59b75cdaee',
    productId: 'AA00001',
    price: {
      originalPrice: 5500,
      discount: 5200
    }
  },
  {
    name: '公司登記實務',
    imgSrc:
      'https://firebasestorage.googleapis.com/v0/b/yooooobook-dev.appspot.com/o/Product%2Fbooks.png?alt=media&token=8fdf139e-19e7-48cd-83a6-0d59b75cdaee',
    productId: 'AA00002',
    price: {
      originalPrice: 4800,
      discount: 4200
    }
  }
])

const product = ref({
  name: '公司登記實務及案例解析(共三冊)',
  imgSrc:
    'https://firebasestorage.googleapis.com/v0/b/yooooobook-dev.appspot.com/o/Product%2Fbooks.png?alt=media&token=8fdf139e-19e7-48cd-83a6-0d59b75cdaee',
  productId: 'AA00001',
  price: {
    originalPrice: 5500,
    discount: 5200
  },
  content: ['有限公司篇【532頁】', '股份有限公司篇【964頁】', '應備文件詳析篇【296頁】'],
  bookIntroduction: {
    summary: [
      '做為創業者開了家公司，但不知道公司登記相關流程及申請手續嗎?<br />又或者不清楚公司哪些變更是需要向公司登記機關提出申請，<br />結果沒有在期限內申請而被裁罰嗎?',
      '又或是知道要申請變更登記，但不知道應該準備什麼文件，<br />以及文件有哪些地方是需要注意、哪些程序是需要踐行，<br />導致一直遲遲無法取得登記核准文件嗎?',
      '做為提供公司登記服務的從業人員，<br />明明依照相關規定檢附文件，<br />但還是常常被公司登記機關通知補正，<br />結果自己卻還是不知道哪裡錯，<br />導致案件延宕甚至被退件，<br />最後沒有在客戶要求的時間內完成，<br />不僅重創己身的專業形象，更可能因此失去了重要的客戶。',
      '&ldquo;現在，只要擁有這一本，就可以搞定公司登記!&rdquo;'
    ],
    detail: [
      '公司登記實務及案例解析-有限公司篇 ISBN：978-626-97707-0-0<br />規格：平裝 / 532頁 / 21 x 29.7 x 2.8 cm / 單色印刷 / 初版',
      '公司登記實務及案例解析-股份有限公司篇 ISBN：978-626-97707-1-7<br />規格：平裝 / 532頁 / 21 x 29.7 x 5 cm / 單色印刷 / 初版',
      '公司登記實務及案例解析-應備文件詳析篇 ISBN：978-626-97707-2-4<br />規格：平裝 / 532頁 / 21 x 29.7 x 1.6 cm / 單色印刷 / 初版',
      'CST : 公司法<br />出版地 : 台灣'
    ]
  },
  plans: [
    {
      isShow: true,
      content: ['可各別開立發票', '如需另外寄送，每一地址酌收行政處理費300元'],
      priceList: [
        {
          title: '5-9套',
          price: 4000
        },
        {
          title: '10套以上',
          price: 3800
        }
      ],
      type: 'person'
    },
    {
      isShow: true,
      content: ['可各別開立發票'],
      priceList: [
        {
          title: '4-6套',
          price: 3000
        },
        {
          title: '7套以上',
          price: 2800
        }
      ],
      type: 'group'
    }
  ]
})

const formatCurrency = (value) => {
  return value.toLocaleString('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    maximumFractionDigits: 0
  })
}
</script>

<style lang="scss" scoped></style>

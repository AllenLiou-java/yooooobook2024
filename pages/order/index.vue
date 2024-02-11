<template>
  <div class="purchase">
    <div
      class="container d-flex justify-content-center align-items-start flex-wrap flex-lg-nowrap mb-5"
    >
      <img
        style="width: 450px"
        class="mb-4 mb-lg-0"
        :src="productInfo.imgSrc"
        alt="books_photo"
      />
      <div class="px-4" style="width: 450px">
        <h3 class="mb-3 text-auxiliary" style="font-size: 24px">
          {{ productInfo.name }}
        </h3>
        <ul class="book pl-4 mb-3">
          <li
            v-for="(item, idx) in productInfo.content"
            :key="idx"
            class="book__item"
            style="font-size: 18px"
          >
            {{ item }}
          </li>
        </ul>
        <div
          class="d-flex flex-wrap mb-3 py-3 border-top-auxiliary border-bottom-auxiliary"
        >
          <Formatter
            data-type="NumberComma"
            :origin-data="productInfo.price.originalPrice"
            class="mb-0 mr-4"
          >
            <template #default="propsData">
              定價：<del>{{ propsData.formatData }}</del
              >元
            </template>
          </Formatter>
          <Formatter
            data-type="NumberComma"
            :origin-data="productInfo.price.discount"
            class="discount_price text-danger mb-0"
          >
            <template #default="propsData">
              優惠價：{{ propsData.formatData }}元
            </template>
          </Formatter>
          <div class="clearfix"></div>
        </div>

        <client-only>
          <div class="form d-flex align-items-center mb-3">
            <label class="mb-0" for="orderQty">數量：</label>
            <minus style="font-size: 24px" class="pointer" @click="minusQty" />
            <input
              id="orderQty"
              v-model.number="orderQty"
              type="text"
              @change="checkOrderQty($event.target.value)"
            />
            <plus style="font-size: 24px" class="pointer" @click="addQty" />
          </div>
        </client-only>
        <!-- <p style="user-select: none">庫存數：{{ stock }}</p> -->

        <a class="btn btn-secondary px-3 py-2 mb-4" @click.prevent="toCheckout"
          >前往預購</a
        >

        <p class="mb-2 font-weight-bold"><u>優惠表</u></p>
        <client-only>
          <table class="mb-1">
            <thead>
              <tr>
                <th>5套以下</th>
                <th>5-9套</th>
                <th>10套以上</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>$5,200</td>
                <td>$4,000</td>
                <td>$3,800</td>
              </tr>
            </tbody>
          </table>
        </client-only>
        <ul class="pl-4 mb-4">
          <li>可各別開立發票</li>
          <li>如需另外寄送，每一地址酌收行政處理費300元</li>
        </ul>
        <p></p>
        <p
          class="mb-1 px-2 py-1 text-light bg-info d-inline-block"
          style="letter-spacing: 1.2px"
        >
          ※公會/協會等名義團體推廣價
          <u class="font-weight-bold text-danger"> 3600</u> 元<br />
        </p>
        <ul class="pl-4 mb-2">
          <li>不計套數</li>
          <li>可各別寄送</li>
          <li>可各別開立發票</li>
          <li>
            公會/協會推廣價<span class="text-danger font-weight-bold px-1"
              >預購期間限定</span
            >
          </li>
          <li>
            預購期間<span class="text-danger font-weight-bold px-1"
              >1月20日 - 2月14日 </span
            >(或<a
              class="font-weight-bold"
              href="https://lin.ee/f8oZLym"
              target="_blank"
              >洽本公司line帳號</a
            >)
          </li>
        </ul>
        <p class="mb-0">
          詳情請加入本公司官方line洽詢<br />（Line ID：
          <a
            class="text-danger font-weight-bold"
            href="https://lin.ee/f8oZLym"
            target="_blank"
            >@yooooobook</a
          >
          ）
        </p>
        <div class="mt-2 px-4 py-2 bg-light">
          <p>
            ＊ 團購表單：
            <a
              href="https://docs.google.com/spreadsheets/d/1hksBguAKLL7zh-zui4y79u0SigBNPG11J_dZL8cSBMM/edit#gid=0"
              target="_blank"
              class="mx-2"
            >
              <client-only>
                <FileFind style="font-size: 24px; cursor: pointer" />
              </client-only>
            </a>
            <client-only>
              <DownloadBox
                style="font-size: 24px; cursor: pointer"
                @click="downloadForm"
              />
            </client-only>
          </p>
          <p>
            「團購者請填妥表單後寄至本公司 e-mail：<a
              href="mailto:yooooobook@gmail.com"
              target="_blank"
            >
              yooooobook@gmail.com
            </a>
            或官方Line帳號」
          </p>
        </div>
      </div>
    </div>

    <div class="container">
      <h4 class="mb-3 text-info font-weight-bold">【 退換貨政策 】</h4>
      <ol class="pl-4">
        <li class="mb-3">
          <h5 class="text-dark">商品7天鑑賞期</h5>
          <ul class="pl-4" style="list-style-type: lower-alpha">
            <li class="mb-2">
              如有退貨需求，請於收到商品7天內於<u class="text-danger px-1"
                >LINE官方帳號</u
              >留言，等候專人為您處理，並提供「姓名」、「訂單編號」、「連絡電話」、「退貨商品名稱」、「退貨原因及照片」等資料，客服人員收到後將會協助您進行退貨。
            </li>
            <li class="mb-2">
              本公司提供商品<u class="text-danger px-1">7天鑑賞期(含例假日)</u
              >，若商品未經拆封、使用或被汙損，即可申請退換貨。
            </li>
            <li class="mb-2">
              商品退換請保持原商品完整性(含贈品)，並妥善包裝使用原包裝送回，若商品(含贈品)完整性不齊全或因包裝不妥導致寄回損壞，恕無法辦理退換。
            </li>
            <li class="mb-2">
              若收到之商品有瑕疵狀況或損壞情形，請務必於七日鑑賞期間，拍下商品瑕疵照片並與客服反應，以協助確認為商品本身瑕疵或為運送問題；惟若無事先告知客服，則一概不以瑕疵品前提受理退換申請。
            </li>
            <li class="mb-2">
              七天鑑賞期係指猶豫期而非試用期，商品須在完整可復原為全新狀態下才能進行退貨。
            </li>
          </ul>
        </li>
        <li class="mb-3">
          <h5 class="text-dark">退貨須知</h5>
          <p class="mb-2">
            退貨商品須為未經使用，且無非人為瑕疵所造成的污損、故障，7天鑑賞期僅供您猶豫並確認商品是否符合您的需求，並非商品的試用期，請保留完整的原始包裝（含外包裝紙盒），否則恕不接受退貨。
            若有任何退貨問題，請加入我們LINE官方帳號與我們聯繫
            以下情況無法接受退貨：
          </p>
          <ul class="pl-4" style="list-style-type: lower-alpha">
            <li class="mb-2">超過 7 天的商品鑑賞期</li>
            <li class="mb-2">無退回所有商品及贈品</li>
            <li class="mb-2">
              退貨商品包裝破損不完整，盒裝外觀不得有明顯刮傷、破損、受潮、塗寫文字
            </li>
            <li class="mb-2">惡意或大量退貨</li>
          </ul>
        </li>
        <li class="mb-3">
          <h5 class="text-dark">退款說明</h5>
          <p>
            由客服人員確認退貨成功後，退款款項將先扣除每套$300行政處理費，方將剩餘退款費用轉帳至您提供的銀行帳戶中。
          </p>
        </li>
        <li class="mb-3">
          <h5 class="text-dark">換貨須知</h5>
          <ul class="pl-4" style="list-style-type: lower-alpha">
            <li class="mb-2">
              換貨商品須為未經使用，且無非人為瑕疵所造成的污損、故障，我們將提供換貨服務，換貨後恕無法再辦理退貨，請保留完整的原始包裝（含外包裝紙盒），否則恕不接受換貨。
            </li>
            <li class="mb-2">請於7日內申請換貨。</li>
          </ul>
        </li>
        <li class="mb-3">
          <h5 class="text-dark">換貨流程</h5>
          <p>
            由客服人員確認換貨後，請將原商品寄回本公司，我們將於收到退回商品後重新寄送新的商品。
          </p>
        </li>
      </ol>
    </div>

    <Toaster :title="toastSet.title" :content="toastSet.content" />
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import { lockScroll, downloadFile, normalDiscount } from '@/assets/js/tool'
import Toaster from '@/components/Toaster/Toaster.vue'
import Formatter from '@/components/Formatter.vue'

export default {
  components: {
    Toaster,
    Formatter,
  },
  async asyncData(context) {
    // 取得路由上的參數 productId (未來改成由透過路由參數傳遞)
    // const productId = context.app.router.currentRoute.params
    const productId = 'AA00001'
    try {
      const { data } = await context.app.$api.stock.getStock(productId)
      if (data) {
        return { stock: data.qty }
      } else {
        return { stock: 0 }
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },
  data() {
    return {
      productInfo: {
        productId: 'AA00001',
        name: '公司登記實務及案例解析(共三冊)',
        content: [
          '有限公司篇【532頁】',
          '股份有限公司篇【964頁】',
          '應備文件詳析篇【296頁】',
        ],
        price: {
          originalPrice: 5500,
          promote: 3600,
          discount: 5200,
          discountList: {
            '<5': 5200,
            '<10': 4000,
            '>=10': 3800,
          },
        },
        // qty: 0,
        imgSrc: require('@/assets/img/books.png'),
        isFromGroup: false,
      },
      toastSet: {
        title: '',
        content: '',
      },
      orderQty: 0,
    }
  },
  head() {
    return {
      title: '預購書籍 - 有良冊股份有限公司',
      meta: [
        {
          // hid: 'description',
          name: 'description',
          content: '預購書籍 - 有良冊股份有限公司',
        },
        {
          // hid: 'og:description',
          property: 'og:description',
          content: '預購書籍 - 有良冊股份有限公司',
        },
        {
          // hid: 'og:title',
          property: 'og:title',
          content: '預購書籍 - 有良冊股份有限公司',
        },
        {
          // hid: 'og:image',
          property: 'og:image',
          content: '/yooooobook.jpg',
        },
        {
          // hid: 'og:url',
          property: 'og:url',
          content: 'https://www.yooooobook.com/order',
        },
      ],
    }
  },
  computed: {},
  mounted() {
    this.setDiscountPrice(this.orderQty)
  },
  methods: {
    async toCheckout() {
      const orderQty = this.orderQty

      if (!this.isLoggedIn()) return
      if (orderQty <= 0) return

      try {
        // 判斷庫存是否足夠
        // const productId = context.app.router.currentRoute.params
        const productId = 'AA00001'
        const { data } = await this.$api.stock.getStock(productId)

        if (data) {
          const stock = data.qty
          if (orderQty <= stock) {
            if (process.client) {
              const orderListInCart = Cookie.get('orderListInCart')

              // 將orderList存入Cookie
              // 已加入購物車 -> 修改該筆資料
              // 未加入購物車 -> 新增該筆資料
              if (orderListInCart) {
                const orderInfo = this.productInfo
                orderInfo.qty = orderQty

                // 確認item是否在購物車有紀錄
                const arrOrderListInCart = JSON.parse(orderListInCart)
                const dataIdx = arrOrderListInCart.findIndex(function (item) {
                  return item.productId === orderInfo.productId
                })

                if (dataIdx >= 0) {
                  arrOrderListInCart[dataIdx] = orderInfo
                } else {
                  arrOrderListInCart.push(orderInfo)
                }

                // 將訂單列表存入Cookie
                const strOrderList = JSON.stringify(arrOrderListInCart)
                Cookie.set('orderListInCart', strOrderList)
              } else {
                // Cookie中尚無orderList，則存入
                const orderList = []
                this.productInfo.qty = orderQty
                orderList.push(this.productInfo)
                const strOrderList = JSON.stringify(orderList)
                Cookie.set('orderListInCart', strOrderList)
              }
            }
            this.$router.push('/cart')
          } else {
            this.openToast('庫存不足', '訂購數量不得超過庫存數')
            this.productInfo.qty = stock
            this.stock = stock
          }
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },
    checkOrderQty(qty) {
      let orderQty = Number(qty)
      // 若val非數字，則為0
      if (!orderQty) {
        orderQty = 0
      } else {
        orderQty = qty
      }

      const stock = parseInt(this.stock)

      if (orderQty >= stock) {
        this.orderQty = stock
      } else if (orderQty < 0 || stock < 1) {
        this.orderQty = 0
      } else {
        this.orderQty = orderQty
      }

      this.setDiscountPrice(this.orderQty)
    },
    minusQty() {
      const orderQty = this.orderQty

      if (orderQty - 1 >= 0) {
        this.orderQty--
        this.setDiscountPrice(orderQty - 1)
      }
    },
    addQty() {
      const orderQty = this.orderQty
      const stock = parseInt(this.stock)

      if (orderQty + 1 <= stock) {
        this.orderQty++
        this.setDiscountPrice(orderQty + 1)
      }
    },
    setDiscountPrice(qty) {
      let orderQty = Number(qty)
      const stock = parseInt(this.stock)

      if (orderQty <= 0) {
        orderQty = 0
      }

      if (orderQty >= stock) {
        orderQty = stock
      }

      if (this.productInfo.isFromGroup) {
        this.productInfo.price.discount = this.productInfo.price.promote
      } else {
        const priceList = this.productInfo.price.discountList
        this.productInfo.price.discount = normalDiscount(orderQty, priceList)
      }
    },
    isLoggedIn() {
      const uid = Cookie.get('userUid')
      const emailVerified = Cookie.get('emailVerified') === 'true'

      if (!uid) {
        // 開啟loginmodal
        this.openToast('尚未登入', '請先進行登入')
        this.$store.commit('setModalType', 'login')
        this.$store.commit('setOpenLoginModal', true)
        lockScroll()
        return false
      } else if (!emailVerified) {
        // 開啟logoutmodal
        this.openToast('尚未驗證', '請先進行Email驗證')
        this.$store.commit('setOpenLogoutModal', true)
        lockScroll()
        return false
      } else {
        return true
      }
    },
    openToast(title, content) {
      this.toastSet.title = title
      this.toastSet.content = content
      this.$bvToast.show('my-toast')
    },
    downloadForm() {
      const refPath = '/Document/團體預購表格(範例).xlsx'
      const filename = '團體預購表格(範例).xlsx'
      const storage = this.$firebase.storage()
      downloadFile(storage, refPath, filename)
    },
  },
}
</script>

<style lang="scss" scoped>
@import './order.scss';
table {
  border-collapse: collapse;
}

th,
td {
  padding: 4px 16px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #957b4a;
  color: white;
}
</style>

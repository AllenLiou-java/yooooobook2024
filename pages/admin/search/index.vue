<template>
  <div class="search px-4">
    <MultiFunctionTable
      :fields="fields"
      :items="items"
      :enable-download="enableDownload"
      style="max-width: 1400px"
    >
    </MultiFunctionTable>
  </div>
</template>

<script>
import MultiFunctionTable from '@/components/Table/MultiFunctionTable.vue'
import { switchDeliveryCompany, switchOrderStatus } from '~/assets/js/tool'

export default {
  components: {
    MultiFunctionTable,
  },
  middleware: ['auth'],
  async asyncData(context) {
    const isAdministrator =
      context.$cookies.get('isAdministrator') === true ||
      context.$cookies.get('isAdministrator') === 'true'

    if (isAdministrator) {
      const idToken = context.$cookies.get('id_token')
      let orders
      const orderListOfUid = []

      try {
        // 取得所有訂單資料
        const { data } = await context.app.$api.order.getAllOrders(idToken)
        orders = data
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }

      // 在orderList中的每筆資料加入uid與「備註」欄位
      if (orders) {
        Object.entries(orders).forEach((orderOfUid) => {
          const uid = orderOfUid[0]
          const orders = Object.values(orderOfUid[1])

          // 增加每筆order的屬性
          orders.map((order) => {
            // 增加uid屬性
            order.uid = uid
            // 若無「備註」欄位屬性，則加入此屬性
            if (!order.remark) {
              order.remark = ''
            }
            // 若無「files」欄位屬性，則加入此屬性
            if (!order.files) {
              order.files = []
            }
            return order
          })
          orderListOfUid.push(orders)
        })

        // 將二維陣列轉為一維陣列
        const orderList = orderListOfUid.reduce(
          (previousValue, currentValue, currentIndex, array) => {
            return previousValue.concat(currentValue)
          }
        )

        context.store.commit('setAllOrderList', orderList)

        return {
          items: orderList,
        }
      }
    }
    return {
      items: [],
    }
  },
  data() {
    return {
      fields: [
        {
          key: 'No',
          label: '編號',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '60px',
          },
          formatter: (value, key, item) => {
            return item
          },
        },
        {
          key: 'orderId',
          label: '訂單號碼',
          class: ['align-middle', 'text-center', 'position-sticky'],
          thStyle: {
            'min-width': '160px',
            color: '#dc3545',
          },
          stickyColumn: true,
        },
        {
          key: 'oderDate',
          label: '訂單日期',
          sortable: true,
          sortDirection: 'desc',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '160px',
          },
        },
        {
          key: 'productName',
          label: '產品名稱',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '300px',
          },
        },
        {
          key: 'qty',
          label: '訂購數',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '80px',
            color: '#dc3545',
          },
        },
        {
          key: 'totalPrice',
          label: '總金額',
          sortable: true,
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '80px',
            color: '#dc3545',
          },
        },
        {
          key: 'status',
          label: '訂單狀態',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '260px',
          },
          formatter: (value, key, item) => {
            return switchOrderStatus(value)
          },
          filterByFormatted: true,
        },
        {
          key: 'address',
          label: '收貨地址',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '400px',
            color: '#28a745',
          },
          formatter: (value, key, item) => {
            return item.receiver.address
          },
          filterByFormatted: true,
        },
        {
          key: 'deliveryCo',
          label: '送貨方式',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '100px',
            color: '#28a745',
          },
          formatter: (value, key, item) => {
            return switchDeliveryCompany(item.delivery.company)
          },
          filterByFormatted: true,
        },
        {
          key: 'buyer',
          label: '發票買受人',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '160px',
            color: '#17a2b8',
          },
        },
        {
          key: 'receiver',
          label: '收件人',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '160px',
            color: '#17a2b8',
          },
          formatter: (value, key, item) => {
            return item.receiver.name
          },
          filterByFormatted: true,
        },
        {
          key: 'email',
          label: '電子信箱',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '120px',
            color: '#17a2b8',
          },
        },
        {
          key: 'phone',
          label: '聯絡電話',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '120px',
            color: '#17a2b8',
          },
        },
        {
          key: 'taxId',
          label: '統一編號',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '100px',
            color: '#17a2b8',
          },
        },
        {
          key: 'bankAccountNo',
          label: '帳號後5碼',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '100px',
            color: '#17a2b8',
          },
        },
        {
          key: 'isClosed',
          label: '訂單完成',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '100px',
          },
          formatter: (value, key, item) => {
            return value ? '結單' : '處理中'
          },
          filterByFormatted: true,
        },
        {
          key: 'remark',
          label: '是否備註',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '100px',
          },
        },
        {
          key: 'actions',
          label: '操作',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '120px',
          },
        },
      ],
      enableDownload: true,
      items: [],
    }
  },
  head() {
    return {
      title: '訂單管理 - 有良冊股份有限公司',
      meta: [
        {
          name: 'description',
          content: '訂單管理 - 有良冊股份有限公司',
        },
        {
          property: 'og:description',
          content: '訂單管理 - 有良冊股份有限公司',
        },
        {
          property: 'og:title',
          content: '訂單管理 - 有良冊股份有限公司',
        },
        {
          property: 'og:image',
          content: '/yooooobook.jpg',
        },
        {
          property: 'og:url',
          content: 'https://www.yooooobook.com/admin/search',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import './search.scss';
</style>

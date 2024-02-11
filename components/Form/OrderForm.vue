<template>
  <div>
    <b-form novalidate @submit.prevent="onSubmit" @reset.prevent="onReset">
      <b-container fluid>
        <b-row cols="1" cols-md="2" cols-lg="3">
          <b-col v-for="(item, idx) in inputSetup" :key="idx">
            <b-form-group
              :id="'fieldset-' + idx"
              :label="item.title"
              :label-for="item.attrName"
            >
              <b-form-input
                :id="item.attrName"
                v-model="inputValue[item.attrName]"
                :state="
                  item.attrName === 'buyer'
                    ? buyerValidation
                    : item.attrName === 'recipient'
                    ? recipientValidation
                    : item.attrName === 'address'
                    ? addressValidation
                    : item.attrName === 'email'
                    ? emailValidation
                    : item.attrName === 'phone'
                    ? phoneValidation
                    : item.attrName === 'taxId'
                    ? taxIdValidation
                    : item.attrName === 'account'
                    ? accountValidation
                    : false
                "
                :type="item.type"
                :required="item.required"
                :placeholder="item.placeholder"
                trim
              ></b-form-input>

              <b-form-invalid-feedback
                :state="
                  item.attrName === 'buyer'
                    ? buyerValidation
                    : item.attrName === 'recipient'
                    ? recipientValidation
                    : item.attrName === 'address'
                    ? addressValidation
                    : item.attrName === 'email'
                    ? emailValidation
                    : item.attrName === 'phone'
                    ? phoneValidation
                    : item.attrName === 'taxId'
                    ? taxIdValidation
                    : item.attrName === 'account'
                    ? accountValidation
                    : false
                "
              >
                {{ item.invalidFeedback }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col v-if="orderMode !== 'single'">
            <b-form-group label="數量" class="mb-0 p-0">
              <b-form-input
                id="orderQty"
                v-model.number="inputValue.mainOrderQty"
                type="number"
                :state="orderQtyValidation"
                required
                placeholder="請輸入此地址寄送套數"
                min="1"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col v-if="orderMode === 'single'">
            <b-form-group label="備註" class="mb-0 p-0">
              <b-form-textarea
                id="textarea"
                v-model="inputValue.buyerRemark"
                placeholder="若分別開立多張發票，請在此備註〔填寫格式：發票抬頭 – 統編 – 套數〕"
                rows="3"
                max-rows="8"
                trim
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>

        <div
          v-for="(
            deliveryInputSetupItem, setupItemIdx
          ) in deliveryInputSetupGroup"
          :key="setupItemIdx"
        >
          <p class="mb-2 font-weight-bold" style="font-size: 24px">
            地址 {{ setupItemIdx + 1 }}
          </p>
          <b-row cols="1" cols-md="2" cols-lg="3" class="position-relative">
            <Close
              class="text-dark rounded position-absolute"
              style="
                width: 28px;
                height: 28px;
                font-size: 28px;
                right: 10px;
                top: 10px;
                cursor: pointer;
              "
              @click="removeDeliveryItem(setupItemIdx)"
            />
            <b-col
              v-for="(item, setupIdx) in deliveryInputSetupItem"
              :key="setupIdx"
            >
              <b-form-group
                :id="'fieldset-' + setupIdx"
                :label="item.title"
                :label-for="item.attrName"
              >
                <b-form-input
                  :id="item.attrName"
                  v-model="inputValue.deliveryList[setupItemIdx][item.attrName]"
                  :state="
                    item.attrName === 'buyer'
                      ? deliveryItemBuyerValidation(setupItemIdx)
                      : item.attrName === 'recipient'
                      ? deliveryItemRecipientValidation(setupItemIdx)
                      : item.attrName === 'address'
                      ? deliveryItemAddressValidation(setupItemIdx)
                      : item.attrName === 'phone'
                      ? deliveryItemPhoneValidation(setupItemIdx)
                      : item.attrName === 'taxId'
                      ? deliveryItemTaxIdValidation(setupItemIdx)
                      : item.attrName === 'account'
                      ? deliveryItemAccountValidation(setupItemIdx)
                      : false
                  "
                  :type="item.type"
                  :required="item.required"
                  :placeholder="item.placeholder"
                  trim
                ></b-form-input>

                <b-form-invalid-feedback
                  :state="
                    item.attrName === 'buyer'
                      ? deliveryItemBuyerValidation(setupItemIdx)
                      : item.attrName === 'recipient'
                      ? deliveryItemRecipientValidation(setupItemIdx)
                      : item.attrName === 'address'
                      ? deliveryItemAddressValidation(setupItemIdx)
                      : item.attrName === 'phone'
                      ? deliveryItemPhoneValidation(setupItemIdx)
                      : item.attrName === 'taxId'
                      ? deliveryItemTaxIdValidation(setupItemIdx)
                      : item.attrName === 'account'
                      ? deliveryItemAccountValidation(setupItemIdx)
                      : item.attrName === 'orderQty'
                      ? deliveryItemOrderQtyValidation(setupItemIdx)
                      : false
                  "
                >
                  {{ item.invalidFeedback }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="數量" class="mb-0 p-0">
                <b-form-input
                  id="deliveryListOrderQty"
                  v-model.number="
                    inputValue.deliveryList[setupItemIdx].orderQty
                  "
                  type="number"
                  :state="deliveryItemOrderQtyValidation(setupItemIdx)"
                  required
                  placeholder="請輸入此地址寄送套數"
                  min="1"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </div>

        <b-col v-if="orderMode !== 'single'">
          <b-button variant="success" @click="addDeliveryItem"
            ><Plus class="mr-2" />新增地址</b-button
          >
        </b-col>
      </b-container>

      <div class="d-flex justify-content-end">
        <b-button
          v-for="(btnItem, idx) in btnSetup"
          :key="idx"
          :type="btnItem.type"
          :variant="btnItem.variant"
          class="ml-3"
          >{{ btnItem.btnName }}</b-button
        >
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  props: {
    inputSetup: {
      type: Array,
      required: true,
    },
    btnSetup: {
      type: Array,
      required: true,
    },
    formData: {
      type: Object,
      default() {
        return {
          buyer: '',
          recipient: '',
          address: '',
          email: '',
          phone: '',
          taxId: '',
          account: '',
          buyerRemark: '',
          deliveryList: [],
        }
      },
    },
    orderMode: {
      type: String,
      default() {
        return 'single'
      },
    },
  },
  data() {
    return {
      inputValue: this.formData,
      deliveryInputSetup: [
        {
          title: '收件人姓名',
          type: 'text',
          placeholder: '請輸入姓名',
          attrName: 'recipient',
          required: true,
          invalidFeedback: '請輸入收件人姓名',
        },
        {
          title: '收件人地址',
          type: 'text',
          placeholder: '請輸入地址',
          attrName: 'address',
          required: true,
          invalidFeedback: '請輸入地址',
        },
        {
          title: '聯絡電話',
          type: 'tel',
          placeholder: '請輸入電話號碼',
          attrName: 'phone',
          required: true,
          invalidFeedback: '請輸入電話號碼',
        },
        {
          title: '發票抬頭',
          type: 'text',
          placeholder: '請輸入發票抬頭',
          attrName: 'buyer',
          required: true,
          invalidFeedback: '請輸入發票抬頭',
        },
        {
          title: '統一編號',
          type: 'text',
          placeholder: '請輸入統一編號(選填)',
          attrName: 'taxId',
          required: false,
          invalidFeedback: '請輸入8碼統一編號',
        },
      ],
      deliveryInputSetupGroup: [],
    }
  },
  computed: {
    buyerValidation() {
      const data = this.inputValue.buyer
      return this.inputValidate('buyer', data)
    },
    recipientValidation() {
      const data = this.inputValue.recipient
      return this.inputValidate('recipient', data)
    },
    addressValidation() {
      const data = this.inputValue.address
      return this.inputValidate('address', data)
    },
    emailValidation() {
      const data = this.inputValue.email
      return this.inputValidate('email', data)
    },
    phoneValidation() {
      const data = this.inputValue.phone
      return this.inputValidate('phone', data)
    },
    taxIdValidation() {
      const data = this.inputValue.taxId
      return this.inputValidate('taxId', data)
    },
    accountValidation() {
      const data = this.inputValue.account
      return this.inputValidate('account', data)
    },
    orderQtyValidation() {
      const data = this.inputValue.mainOrderQty
      return this.inputValidate('orderQty', data)
    },
    deliveryItemBuyerValidation() {
      return (idx) => {
        const data = this.inputValue.deliveryList[idx].buyer
        return this.inputValidate('buyer', data)
      }
    },
    deliveryItemRecipientValidation() {
      return (idx) => {
        const data = this.inputValue.deliveryList[idx].recipient
        return this.inputValidate('recipient', data)
      }
    },
    deliveryItemAddressValidation() {
      return (idx) => {
        const data = this.inputValue.deliveryList[idx].address
        return this.inputValidate('address', data)
      }
    },
    deliveryItemPhoneValidation() {
      return (idx) => {
        const data = this.inputValue.deliveryList[idx].phone
        return this.inputValidate('phone', data)
      }
    },
    deliveryItemTaxIdValidation() {
      return (idx) => {
        const data = this.inputValue.deliveryList[idx].taxId
        return this.inputValidate('taxId', data)
      }
    },
    deliveryItemAccountValidation() {
      return (idx) => {
        const data = this.inputValue.deliveryList[idx].account
        return this.inputValidate('account', data)
      }
    },
    deliveryItemOrderQtyValidation() {
      return (idx) => {
        const data = this.inputValue.deliveryList[idx].orderQty
        return this.inputValidate('orderQty', data)
      }
    },
  },
  methods: {
    onSubmit() {
      const inputValidation = this.listValidator(this.inputValue)
      // 驗證deliveryList的內容
      const deliveryListInputValidation = this.deliveryListValidator()

      if (!inputValidation) return
      if (!deliveryListInputValidation) return
      if (!this.checkOrderQty()) return

      this.$emit('submitEvent', this.inputValue)
    },
    deliveryListValidator() {
      const deliveryList = this.inputValue.deliveryList
      const result = []
      for (let i = 0; i < deliveryList.length; i++) {
        const item = deliveryList[i]
        const validatorItem = this.listValidator(item)
        result.push(validatorItem)
      }
      return !result.includes(false)
    },
    listValidator(list) {
      const keyList = Object.keys(list)
      const resultMap = keyList.map((key) => {
        const input = list[key]
        return this.inputValidate(key, input)
      })
      return !resultMap.includes(false)
    },
    onReset() {
      this.$emit('resetEvent')
    },
    addDeliveryItem() {
      const deliveryInputSetupGroup = this.deliveryInputSetupGroup
      const deliveryInputSetup = this.deliveryInputSetup
      deliveryInputSetupGroup.push(deliveryInputSetup)

      const deliveryItem = {
        buyer: '',
        recipient: '',
        address: '',
        phone: '',
        taxId: '',
        orderQty: 1,
      }
      this.inputValue.deliveryList.push(deliveryItem)
    },
    removeDeliveryItem(index) {
      this.deliveryInputSetupGroup.splice(index, 1)
      this.inputValue.deliveryList.splice(index, 1)
    },
    inputValidate(type, input) {
      const data = input
      if (type === 'buyer') {
        return data.length !== 0
      } else if (type === 'recipient') {
        return data.length !== 0
      } else if (type === 'address') {
        return data.length !== 0
      } else if (type === 'email') {
        const emailRule =
          // eslint-disable-next-line no-useless-escape
          /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        return data.search(emailRule) !== -1
      } else if (type === 'phone') {
        const phoneRule =
          /^(\d{2,3}-?|\(\d{2,3}\))\d{3,4}-?\d{4}|09\d{2}(\d{6}|-\d{3}-\d{3})$/

        return data.search(phoneRule) !== -1
      } else if (type === 'taxId') {
        return data.length === 0 || data.length === 8
      } else if (type === 'account') {
        return data.length === 5
      } else if (type === 'orderQty') {
        return data > 0
      } else {
        return true
      }
    },
    clearDeliveryItem() {
      this.deliveryInputSetupGroup = []
      this.inputValue.deliveryList = []
    },
    checkOrderQty() {
      const mainOrderQty = this.inputValue.mainOrderQty
      const minorOrderQty = this.inputValue.deliveryList.map((item) => {
        return item.orderQty
      })

      const accumulateOrderQty = [mainOrderQty, ...minorOrderQty].reduce(
        (acc, cur) => {
          return acc + cur
        }
      )

      const totalOrderQty = this.inputValue.totalOrderQty

      if (accumulateOrderQty !== totalOrderQty) {
        this.$emit(
          'orderQtyError',
          '數量不符',
          '「地址寄送數量總和」與「總訂購數量」不符'
        )
        return false
      }

      return true
    },
  },
}
</script>

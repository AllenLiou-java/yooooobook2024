<template>
    <div class="py-48 px-20">
        <div class="flex justify-center mb-48">
            <ul class="inline-flex flex-col">
                <li
                    v-for="order in ordersInCart"
                    :key="order.productId"
                    class="p-16 mb-24 bg-gray_light rounded-8"
                >
                    <div
                        class="grid grid-cols-12 gap-12 lt-sm:(flex flex-col items-center) lt-md-text-14 bg-white p-12 rounded-6 max-w-640 lt-sm:(max-w-300 w-full)"
                    >
                        <img
                            class="w-120 h-120 object-contain col-span-3"
                            :src="order.imgSrc"
                            :alt="order.productId"
                        />
                        <div class="col-span-5 flex flex-col justify-center">
                            <p class="mb-8 font-black">{{ order.productName }}</p>
                            <ul>
                                <li v-for="(item, idx) in order.content" :key="idx">{{ item }}</li>
                            </ul>
                        </div>
                        <p class="col-span-3 flex-center">
                            NT {{ thousandthsFormat(order.discount * order.qty) }}
                        </p>
                        <div class="flex lt-sm:flex-row-reverse flex-col flex-center gap-12">
                            <button
                                class="material-icons text-20 p-2 cursor-pointer bg-brown rounded-2xl text-white border-0"
                                @click="updateOrderQty('add', order.productId)"
                            >
                                add
                            </button>
                            <p class="col-span-1">{{ thousandthsFormat(order.qty) }} 件</p>
                            <button
                                class="material-icons text-20 p-2 cursor-pointer bg-brown rounded-2xl text-white border-0"
                                @click="updateOrderQty('minus', order.productId)"
                            >
                                remove
                            </button>
                        </div>
                    </div>
                </li>
                <p class="self-end font-black">合計： NT {{ thousandthsFormat(totalPrice) }}</p>
            </ul>
        </div>
        <Divider id="formHeaderLine" />
        <div class="card flex-center">
            <Stepper v-model:active-step="active">
                <StepperPanel>
                    <template #header="{ index, clickCallback }">
                        <button
                            class="bg-transparent border-none inline-flex flex-col gap-2"
                            @click="clickCallback"
                        >
                            <span
                                :class="[
                                    'rounded-6 border-2 border-solid w-60 h-60 inline-flex items-center justify-center',
                                    {
                                        'bg-gray_dark border-gray': index <= active,
                                        'border-[#e2e8f0]': index > active
                                    }
                                ]"
                            >
                                <IconTransport
                                    img-width="32px"
                                    img-height="32px"
                                    :fill-color="index <= active ? 'white' : 'black'"
                                ></IconTransport>
                            </span>
                            <span class="text-12 mx-auto text-brown_dark">STEP 1</span>
                        </button>
                    </template>
                    <template #content="{ nextCallback }">
                        <form>
                            <div class="flex flex-col gap-2 mx-auto min-h-256 max-w-384">
                                <div class="text-center mt-12 mb-24 text-32 font-semibold">
                                    訂購人資訊
                                </div>
                                <div class="flex flex-col gap-2 mb-16">
                                    <label class="mb-8" for="name">收件人姓名</label>
                                    <input
                                        id="name"
                                        v-bind="nameAttrs"
                                        v-model="name"
                                        autofocus
                                        type="text"
                                        class="rounded-0 border-gray_dark border-1 px-12 py-8 focus:(outline-none ring-2 ring-gray_dark border-0) mb-4"
                                        autocomplete="name"
                                        placeholder="請輸入姓名"
                                    />
                                    <small class="text-secondary text-14">{{
                                        basicErrors.name
                                    }}</small>
                                </div>
                                <div class="flex flex-col gap-2 mb-16">
                                    <label class="mb-8" for="address">收件人地址</label>
                                    <input
                                        id="address"
                                        v-bind="addressAttrs"
                                        v-model="address"
                                        type="text"
                                        class="rounded-0 border-gray_dark border-1 px-12 py-8 focus:(outline-none ring-2 ring-gray_dark border-0) mb-4"
                                        autocomplete="address"
                                        placeholder="請輸入地址"
                                    />
                                    <small class="text-secondary text-14">{{
                                        basicErrors.address
                                    }}</small>
                                </div>
                                <!-- <div class="flex flex-col gap-2 mb-16">
                  <label class="mb-8" for="email">Email</label>
                  <input
                    id="email"
                    v-bind="emailAttrs"
                    v-model="email"
                    type="email"
                    class="rounded-0 border-gray_dark border-1 px-12 py-8 focus:(outline-none ring-2 ring-gray_dark border-0) mb-4"
                    autocomplete="email"
                    placeholder="example@gmail.com"
                  />
                  <small class="text-secondary text-14">{{ basicErrors.email }}</small>
                </div> -->
                                <div class="flex flex-col gap-2 mb-16">
                                    <label class="mb-8" for="phone">聯絡電話</label>
                                    <input
                                        id="phone"
                                        v-bind="phoneAttrs"
                                        v-model="phone"
                                        type="tel"
                                        class="rounded-0 border-gray_dark border-1 px-12 py-8 focus:(outline-none ring-2 ring-gray_dark border-0) mb-4"
                                        autocomplete="phone"
                                        placeholder="請輸入市話 或 手機號碼"
                                    />
                                    <small class="text-secondary text-14">{{
                                        basicErrors.phone
                                    }}</small>
                                </div>
                                <div class="flex flex-col gap-2 mb-16">
                                    <label class="mb-8" for="bankAccountNo">匯款帳戶後5碼</label>
                                    <input
                                        id="bankAccountNo"
                                        v-bind="bankAccountNoAttrs"
                                        v-model="bankAccountNo"
                                        type="text"
                                        class="rounded-0 border-gray_dark border-1 px-12 py-8 focus:(outline-none ring-2 ring-gray_dark border-0) mb-4"
                                        autocomplete="bankAccountNo"
                                        placeholder="尚未確認匯款帳號，請填 00000"
                                    />
                                    <small class="text-secondary text-14">{{
                                        basicErrors.bankAccountNo
                                    }}</small>
                                </div>
                            </div>
                            <div class="flex pt-4 justify-between">
                                <Button
                                    type="button"
                                    class="flex-row-reverse gap-4 leading-24"
                                    label="回上頁"
                                    @click="$router.back()"
                                >
                                    <template #icon>
                                        <span class="material-icons"> arrow_back </span>
                                    </template>
                                </Button>
                                <Button
                                    type="button"
                                    class="flex-row-reverse gap-4 leading-24"
                                    label="下一步"
                                    @click="basicInfoConfirm(basicHandleSubmit(), nextCallback)"
                                >
                                    <template #icon>
                                        <span class="material-icons"> arrow_forward </span>
                                    </template>
                                </Button>
                            </div>
                        </form>
                    </template>
                </StepperPanel>
                <StepperPanel>
                    <template #header="{ index, clickCallback }">
                        <button
                            class="bg-transparent border-none inline-flex flex-col gap-2"
                            @click="basicInfoConfirm(basicHandleSubmit(), clickCallback)"
                        >
                            <span
                                :class="[
                                    'rounded-6 border-2 border-solid w-60 h-60 inline-flex items-center justify-center',
                                    {
                                        'bg-gray_dark border-gray': index <= active,
                                        'border-[#e2e8f0]': index > active
                                    }
                                ]"
                            >
                                <IconInvoice
                                    img-width="32px"
                                    img-height="32px"
                                    :fill-color="index <= active ? 'white' : 'black'"
                                ></IconInvoice>
                            </span>
                            <span
                                :class="{ invisible: index > active }"
                                class="text-12 mx-auto text-brown_dark"
                                >STEP 2</span
                            >
                        </button>
                    </template>
                    <template #content="{ prevCallback, nextCallback }">
                        <div class="flex flex-col gap-2 mx-auto min-h-256 max-w-384">
                            <div class="text-center mt-12 mb-24 text-32 font-semibold">
                                發票資訊
                            </div>
                            <div class="flex flex-col gap-2 mb-16">
                                <label class="mb-8" for="bankAccountNo">發票買受人 ( 選填 )</label>
                                <input
                                    id="buyer"
                                    v-bind="buyerAttrs"
                                    v-model="buyer"
                                    type="text"
                                    class="rounded-0 border-gray_dark border-1 px-12 py-8 focus:(outline-none ring-2 ring-gray_dark border-0) mb-4"
                                    autocomplete="buyer"
                                />
                                <small class="text-secondary text-14">{{
                                    basicErrors.buyer
                                }}</small>
                            </div>
                            <div class="flex flex-col gap-2 mb-16">
                                <label class="mb-8" for="bankAccountNo">統一編號 ( 選填 )</label>
                                <input
                                    id="taxId"
                                    v-bind="taxIdAttrs"
                                    v-model="taxId"
                                    type="text"
                                    class="rounded-0 border-gray_dark border-1 px-12 py-8 focus:(outline-none ring-2 ring-gray_dark border-0) mb-4"
                                    autocomplete="taxId"
                                />
                                <small class="text-secondary text-14">{{
                                    basicErrors.taxId
                                }}</small>
                            </div>
                        </div>
                        <div class="flex pt-4 justify-between">
                            <Button
                                type="button"
                                class="gap-4 leading-24"
                                label="上一步"
                                severity="secondary"
                                @click="prevCallback"
                            >
                                <template #icon>
                                    <span class="material-icons"> arrow_back </span>
                                </template>
                            </Button>

                            <Button
                                type="button"
                                class="flex-row-reverse gap-4 leading-24"
                                label="下一步"
                                @click="nextCallback"
                            >
                                <template #icon>
                                    <span class="material-icons"> arrow_forward </span>
                                </template>
                            </Button>
                        </div>
                    </template>
                </StepperPanel>
                <StepperPanel>
                    <template #header="{ index, clickCallback }">
                        <button
                            class="bg-transparent border-none inline-flex flex-col gap-2"
                            @click="clickCallback"
                        >
                            <span
                                :class="[
                                    'rounded-6 border-2 border-solid w-60 h-60 inline-flex items-center justify-center',
                                    {
                                        'bg-gray_dark border-gray': index <= active,
                                        'border-[#e2e8f0]': index > active
                                    }
                                ]"
                            >
                                <IconConfirm
                                    img-width="32px"
                                    img-height="32px"
                                    :fill-color="index <= active ? 'white' : 'black'"
                                ></IconConfirm>
                            </span>
                            <span
                                :class="{ invisible: index > active }"
                                class="text-12 mx-auto text-brown_dark"
                                >STEP 3</span
                            >
                        </button>
                    </template>
                    <template #content="{ prevCallback }">
                        <div class="flex flex-col gap-2 mx-auto min-h-256 max-w-420">
                            <div class="text-center mt-12 mb-24 text-32 font-semibold">
                                訂單確認
                            </div>
                            <div class="mb-32">
                                <table class="w-full text-16 border border-solid border">
                                    <thead class="bg-brown_dark text-white">
                                        <tr>
                                            <th colspan="2" class="px-12 py-8 text-20">
                                                訂購人資訊
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td
                                                class="border border-solid px-12 py-8 font-semibold"
                                            >
                                                收件人姓名
                                            </td>
                                            <td class="border border-solid px-12 py-8 w-[65%]">
                                                {{ name }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                class="border border-solid px-12 py-8 font-semibold"
                                            >
                                                收件人地址
                                            </td>
                                            <td class="border border-solid px-12 py-8">
                                                {{ address }}
                                            </td>
                                        </tr>
                                        <!-- <tr>
                      <td class="border border-solid px-12 py-8 font-semibold">Email</td>
                      <td class="border border-solid px-12 py-8">{{ email }}</td>
                    </tr> -->
                                        <tr>
                                            <td
                                                class="border border-solid px-12 py-8 font-semibold"
                                            >
                                                聯絡電話
                                            </td>
                                            <td class="border border-solid px-12 py-8">
                                                {{ phone }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                class="border border-solid px-12 py-8 font-semibold"
                                            >
                                                匯款帳戶後5碼
                                            </td>
                                            <td class="border border-solid px-12 py-8">
                                                {{ bankAccountNo }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="w-full text-16 border border-solid border">
                                    <thead class="bg-brown_dark text-white">
                                        <tr>
                                            <th colspan="2" class="px-12 py-8 text-20">發票資訊</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td
                                                class="border border-solid px-12 py-8 font-semibold"
                                            >
                                                發票買受人
                                            </td>
                                            <td class="border border-solid px-12 py-8 w-[65%]">
                                                {{ buyer }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                class="border border-solid px-12 py-8 font-semibold"
                                            >
                                                統一編號
                                            </td>
                                            <td class="border border-solid px-12 py-8">
                                                {{ taxId }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="flex pt-4 justify-between">
                            <Button
                                type="button"
                                class="gap-4 leading-24"
                                label="上一步"
                                severity="secondary"
                                @click="prevCallback"
                            >
                                <template #icon>
                                    <span class="material-icons"> arrow_back </span>
                                </template>
                            </Button>

                            <Button
                                type="button"
                                class="flex-row-reverse gap-4 leading-24"
                                label="訂單送出"
                                :loading="isOrderLoading"
                                @click="onSubmit"
                            >
                                <template #icon>
                                    <span class="material-icons"> arrow_forward </span>
                                </template>
                            </Button>
                        </div>
                    </template>
                </StepperPanel>
            </Stepper>
        </div>
    </div>
</template>

<script setup>
import Stepper from 'primevue/stepper'
import StepperPanel from 'primevue/stepperpanel'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { storeToRefs } from 'pinia'
import { useConfirm } from 'primevue/useconfirm'
import IconTransport from '@/components/icon/Transport.vue'
import IconInvoice from '@/components/icon/Invoice.vue'
import IconConfirm from '@/components/icon/Confirm.vue'

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

const active = ref(0)

const orderStore = useOrderStore()
const { ordersInCart, isOrderLoading } = storeToRefs(orderStore)
const { patchOrderInfo, updateOrderQtyInCart, setOrderInStorage, deleteOrder } = orderStore

const { updateStock, getStock } = useProductStore()
const { stockList } = storeToRefs(useProductStore())

const totalPrice = computed(() => {
    if (ordersInCart.value.length === 0) {
        return 0
    } else {
        const total = ordersInCart.value.reduce((sum, order) => sum + order.discount * order.qty, 0)
        return total
    }
})

const {
    errors: basicErrors,
    values: basicValues,
    defineField,
    handleSubmit: basicHandleSubmit
} = useForm({
    validationSchema: yup.object({
        name: yup.string().required('請輸入收件人姓名'),
        address: yup.string().min(6, '請填寫正確地址').required('請輸入收件地址'),
        // email: yup.string().email('請確認Email是否正確').required('請填入Email'),
        phone: yup.string().min(7, '請確認填寫的電話號碼').required('請輸入電話號碼'),
        bankAccountNo: yup.string().length(5, '請確認匯款帳戶後5碼').required('請輸入匯款帳戶後5碼')
    })
})

const [name, nameAttrs] = defineField('name')
const [address, addressAttrs] = defineField('address')
// const [email, emailAttrs] = defineField('email')
const [phone, phoneAttrs] = defineField('phone')
const [bankAccountNo, bankAccountNoAttrs] = defineField('bankAccountNo')

const basicInfoConfirm = (submit, nextCallback) => {
    if (ordersInCart.value.length === 0) return

    submit()

    const errorLength = Object.keys(basicErrors.value).length
    const valueLength = Object.keys(basicValues).length

    if (errorLength === 0 && valueLength === 4) {
        nextCallback()
        const formHeaderLine = document.getElementById('formHeaderLine')

        window.scrollTo({
            top: getPosition(formHeaderLine).y - 120,
            behavior: 'smooth'
        })
    }
}

const { defineField: defineInvoiceField } = useForm({
    validationSchema: yup.object({
        buyer: yup.string(),
        taxId: yup.string()
    })
})

const [buyer, buyerAttrs] = defineInvoiceField('buyer')
const [taxId, taxIdAttrs] = defineInvoiceField('taxId')

const userStore = storeToRefs(useUserStore())

const onSubmit = async () => {
    orderStore.$patch((state) => {
        state.isOrderLoading = true
    })

    await patchOrderInfo({
        name: name.value,
        address: address.value,
        email: userStore.email.value,
        phone: phone.value,
        bankAccountNo: bankAccountNo.value,
        buyer: buyer.value || '',
        taxId: taxId.value || ''
    })

    await updateStock()

    orderStore.$patch((state) => {
        state.isOrderLoading = false
    })
}

const confirm = useConfirm()
const updateOrderQty = async (calculateType, productId) => {
    const orderList = ordersInCart.value
    const orderIndex = orderList.findIndex((orderItem) => orderItem.productId === productId)
    if (calculateType === 'minus') {
        if (orderList[orderIndex].qty - 1 > 0) {
            updateOrderQtyInCart(productId, -1)
            setOrderInStorage(productId, -1)
        } else {
            confirm.require({
                group: 'headless',
                header: '刪除',
                message: '您確定要刪除嗎?',
                rejectLabel: '取消',
                acceptLabel: '確定',
                accept: () => {
                    deleteOrder(productId)
                },
                reject: () => {
                    console.log('cancel')
                }
            })
        }
    } else {
        await getStock(productId)
        const stock = stockList.value[productId]
        if (orderList[orderIndex].qty + 1 <= stock) {
            updateOrderQtyInCart(productId, 1)
            setOrderInStorage(productId, 1)
        }
    }
}
</script>

<style lang="scss" scoped>
.p-stepper {
    flex-basis: 40rem;
}
</style>

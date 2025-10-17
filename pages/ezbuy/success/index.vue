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
                <Column
                    field="productName"
                    header="產品名稱"
                    header-class="bg-blue text-white"
                ></Column>
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
                        <Column
                            class="text-secondary"
                            :footer="thousandthsFormat(order.totalPrice)"
                        />
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
                告知您的<span class="text-secondary">「訂單編號」</span>、<span
                    class="text-secondary"
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
                    <li>
                        <label class="mb-0">銀行代碼：</label
                        ><span style="color: #f75000">808</span>
                    </li>
                    <li>
                        <label class="mb-0">銀行帳戶：</label
                        ><span style="color: #f75000">1366940052966</span>
                    </li>
                    <li>
                        <label class="mb-0">戶名：</label
                        ><span style="color: #f75000">有良冊股份有限公司</span>
                    </li>
                </ul>
            </li>
            <li class="mb-12">
                若想查詢訂單進度，可前往<u class="mx-1"
                    ><nuxt-link class="font-black text-blue" to="/order"> 訂單查詢 </nuxt-link></u
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
            const { planId, orderId } = to.query

            if (!planId || !orderId) {
                return false
            }
        }
    ]
})

const { planId, orderId } = useRoute().query

const orderStore = useOrderStore()
const userStore = useUserStore()
const { notify } = useToastifyStore()

const { data: order, error } = await useAPI(
    apiList.groupOrder.getOrderInfo.serverPath.replace(':planId/:orderId', `${planId}/${orderId}`),
    {
        method: apiList.groupOrder.getOrderInfo.method
    }
)

if (error.value?.statusCode === 401) {
    notify('error', '權限失效，請重新登入')
    userStore.$reset()
    orderStore.$reset()
}
</script>

<style lang="scss" scoped></style>

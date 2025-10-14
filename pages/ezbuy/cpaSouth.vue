<template>
    <div v-if="isShow" class="container flex gap-x-40 gap-y-60 flex-col py-40">
        <div class="w-full">
            <h1 class="mb-24 text-blue_dark">【2025 南區會計師公會團購延期】</h1>
            <p class="mb-16 bg-[#fbe45d] inline-block px-8 py-4 rounded-6">
                優惠期間：即日起 - 10/31
            </p>
            <div class="mb-24">
                <p class="mb-8 leading-24">各位南區會計師公會會員，您是否錯過了本次的團購呢？</p>
                <p class="mb-8 leading-24">
                    又或者您想追加購買【公司登記實務及案例解析(共三冊)】與
                    【公司登記實務及案例解析(增資 · 發行新股篇)】呢？
                </p>
                <p class="mb-8 leading-24">若您仍有購書需求，記得把握最後的優惠期間唷！</p>
            </div>
            <div>
                <img
                    class="mb-16 lt-md:hidden"
                    src="@/assets/images/banner/home_03_pc.jpg"
                    alt="banner_cover"
                />
                <img
                    class="mb-16 hidden lt-md:block"
                    src="@/assets/images/banner/home_03_t.jpg"
                    alt="banner_cover"
                />
            </div>

            <ul class="mb-32 tracking-wide leading-[1.5] text-20">
                <li>📘【減資篇】</li>
                <li>📘【增資 · 發行新股增補篇】</li>
                <li>📘【增資 · 發行新股篇】</li>
                <li>📘 基礎篇【共三冊】</li>
            </ul>
            <div class="mb-32">
                <h2 class="mb-16 text-blue_dark">【新書簡介】</h2>

                <div class="flex lt-lg:flex-col gap-32">
                    <CardBookIntro
                        class="w-[50%] lt-lg:w-full"
                        v-for="book in newBookList"
                        :key="book.bookName"
                        :bookInfo="book"
                    />
                </div>
            </div>
            <div>
                <h2 class="mb-16 text-blue_dark">【加購優惠】</h2>
                <div class="flex lt-lg:flex-col gap-32">
                    <CardBookIntro
                        class="w-[50%] lt-lg:w-full"
                        v-for="book in oldBookList"
                        :key="book.bookName"
                        :bookInfo="book"
                    />
                </div>
            </div>
        </div>
        <div
            id="orderForm"
            style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
            class="w-full py-20 rounded-6 bg-[#c8bcab]"
        >
            <div class="w-[92%] mx-auto mb-24">
                <h2
                    class="text-black text-32 relative pl-16 py-4 mb-16 before:(content-[''] absolute top-1/2 left-0 -translate-y-1/2 w-2 h-[100%] bg-black)"
                >
                    訂購表單
                </h2>
                <div class="px-16 py-12 bg-white rounded-6">
                    <p class="text-20 font-bold mb-12">★ 購買流程</p>
                    <ul class="list-decimal pl-28 tracking-wide leading-[1.5] text-16 mb-24">
                        <li class="mb-8">填寫表單 (下方)</li>
                        <li class="mb-8">
                            提交表單後，依據以下匯款資訊 安排匯款
                            <ul class="mt-4">
                                <li>
                                    <span class="text-secondary font-bold">匯款銀行：</span
                                    ><span class="text-blue_dark">玉山銀行 - 台中分行</span>
                                </li>
                                <li>
                                    <span class="text-secondary font-bold">銀行代碼：</span
                                    ><span class="text-blue_dark">808</span>
                                </li>
                                <li>
                                    <span class="text-secondary font-bold">銀行帳戶：</span
                                    ><span class="text-blue_dark">1366940052966</span>
                                </li>
                                <li>
                                    <span class="text-secondary font-bold">戶名：</span
                                    ><span class="text-blue_dark">有良冊股份有限公司</span>
                                </li>
                            </ul>
                        </li>
                        <li>
                            透過官方line帳號(
                            <a class="underline" href="https://lin.ee/f8oZLym" target="_blank"
                                >@yooooobook</a
                            >
                            )，或是撥打電話 (0978-940-828) 告知匯款 完成
                        </li>
                    </ul>
                    <div>
                        <p class="text-20 font-bold mb-12">★ 價目表</p>

                        <table class="text-16 border border-solid border mb-20">
                            <tbody>
                                <tr>
                                    <th class="border border-solid">品項</th>
                                    <th class="border border-solid">優惠價</th>
                                </tr>
                                <tr>
                                    <td class="border border-solid px-12 py-8 font-semibold w-225">
                                        【 減資篇 】
                                    </td>
                                    <td class="border border-solid px-12 py-8 font-semibold">
                                        1,500
                                    </td>
                                </tr>
                                <tr>
                                    <td class="border border-solid px-12 py-8 font-semibold">
                                        【 增資 · 發行新股增補篇 】
                                    </td>
                                    <td class="border border-solid px-12 py-8 font-semibold">
                                        500
                                    </td>
                                </tr>
                                <tr>
                                    <td class="border border-solid px-12 py-8 font-semibold">
                                        【 增資 · 發行新股篇 】
                                    </td>
                                    <td class="border border-solid px-12 py-8 font-semibold">
                                        1,500
                                    </td>
                                </tr>
                                <tr>
                                    <td class="border border-solid px-12 py-8 font-semibold">
                                        套書【共三冊】
                                    </td>
                                    <td class="border border-solid px-12 py-8 font-semibold">
                                        3,600
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <iframe
                class="pr-12"
                src="https://forms.gle/pBnjQQmBPUhJygjLA"
                width="100%"
                height="600"
                frameborder="0"
                marginheight="0"
                marginwidth="0"
                >載入中…</iframe
            >
        </div>
    </div>
    <div v-else class="container flex-center gap-x-40 gap-y-60 flex-col py-40">
        <h1>首波優惠活動已結束</h1>
        <div class="text-20">
            <p class="mb-12">
                感謝各位同圓心會計師的熱烈支持，《減資篇》與《增資．發行新股增補篇》首波優惠活動已結束。
            </p>
            <p class="mb-32">
                若您仍有購書需求，請持續關注我們的最新消息，或留下聯絡資料，我們將在下次優惠活動時主動通知您。
            </p>
            <iframe
                class="pr-12"
                src="https://forms.gle/aWdUeppATzAhPvbYA"
                width="100%"
                height="600"
                frameborder="0"
                marginheight="0"
                marginwidth="0"
                >載入中…</iframe
            >
        </div>
    </div>
</template>

<script setup>
useHead({
    title: '【優惠活動】訂購表單'
})

definePageMeta({
    title: '【優惠活動】訂購表單'
})
useSeoMeta({
    description: '首波新書出版優惠活動。',
    ogDescription: '首波新書出版優惠活動。。',
    ogTitle: '【優惠活動】訂購表單 - 有良冊股份有限公司',
    ogImage: '/yooooobook.jpg',
    ogUrl: 'https://www.yooooobook.com/ezbuy'
})

const isShow = ref(true)

const newBookList = ref([
    {
        bookName: '公司登記實務及案例解析【減資篇】',
        productId: 'AA00004',
        bookImageUrl:
            'https://firebasestorage.googleapis.com/v0/b/yooooobook-a7f4d.appspot.com/o/Products%2Fbook5.png?alt=media',
        slogan: '★ 書表齊全、案例精選，減資申請好幫手！',
        price: {
            originalPrice: 2000,
            discountPrice: 1500
        },
        preview: [
            {
                name: '減資篇',
                linkUrl: 'https://www.yooooobook.com/bookstore/AA00004?preview=減資篇'
            }
        ],
        content: [
            '針對 有限公司、股份有限公司 及 無票面金額股股份有限公司之 減資變更登記 實務，蒐集多起特殊案例，詳列 應備書表與案例中 查核報告書應製附表 ，協助辦理相關變更登記事項。'
        ],
        primaryColor: '#16336e',
        notice: []
    },
    {
        bookName: '公司登記實務及案例解析【增資 · 發行新股增補篇】',
        productId: 'AA00003',
        bookImageUrl:
            'https://firebasestorage.googleapis.com/v0/b/yooooobook-a7f4d.appspot.com/o/Products%2Fbook4-2.png?alt=media',
        slogan: '★ 查核報告書附表全公開，節省撰寫時間！',
        price: {
            originalPrice: 800,
            discountPrice: 500
        },
        preview: [
            {
                name: '增資·發行新股增補篇',
                linkUrl: 'https://www.yooooobook.com/bookstore/AA00003?preview=增資·發行新股增補篇'
            }
        ],
        content: [
            '依據【增資．發行新股篇】一書中各項變更登記案例情形，彙編製作查核報告書所需的各式查核附表。',
            '增補資料包括： 資本額變動表、減資明細表、股東繳納現金股款明細表、股息紅利轉增資配股明細表、盈餘分配表 等附表。'
        ],
        primaryColor: '#877254',
        notice: [
            '本書僅包含【增資．發行新股篇】中查核報告書各式附表，如要瞭解完整案例內容，須加購【增資．發行新股篇】'
        ]
    }
])

const oldBookList = ref([
    {
        bookName: '公司登記實務及案例解析【增資·發行新股篇】',
        productId: 'AA00002',
        bookImageUrl:
            'https://firebasestorage.googleapis.com/v0/b/yooooobook-a7f4d.appspot.com/o/Products%2Fbook4-1.png?alt=media',
        slogan: '★ 聚焦實務操作，一書掌握增資與發行新股關鍵！',
        price: {
            originalPrice: 2200,
            discountPrice: 1500
        },
        preview: [
            {
                name: '增資·發行新股篇',
                linkUrl: 'https://www.yooooobook.com/bookstore/AA00002?preview=增資·發行新股篇'
            }
        ],
        content: [
            '建立在「公司登記實務及案例解析(共三冊)」之基礎下，做更進一步的延伸探討。',
            '將各種常見之有限公司增資及股份有限公司發行新股時，可能會涉及其他變更登記事項情形，以個案方式呈現該類型變更登記應附送書表之注意事項。'
        ],
        primaryColor: '#6a2d05',
        notice: ['建議可加購【 增資 · 發行新股增補篇 】']
    },
    {
        bookName: '《公司登記實務及案例解析【共三冊】》',
        productId: 'AA00001',
        bookImageUrl:
            'https://firebasestorage.googleapis.com/v0/b/yooooobook-a7f4d.appspot.com/o/Products%2Fbook1%262%263.png?alt=media',
        slogan: '★ 基礎實務技巧全面掌握，協助擴展您的業務！',
        price: {
            originalPrice: 5500,
            discountPrice: 3600
        },
        preview: [
            {
                name: '有限公司篇',
                linkUrl: 'https://www.yooooobook.com/bookstore/AA00001?preview=有限公司篇'
            },
            {
                name: '股份有限公司篇',
                linkUrl: 'https://www.yooooobook.com/bookstore/AA00001?preview=股份有限公司篇'
            },
            {
                name: '應備文件詳析篇',
                linkUrl: 'https://www.yooooobook.com/bookstore/AA00001?preview=應備文件詳析篇'
            }
        ],
        content: [
            '完整收錄有限公司、股份有限公司各式登記事項範例，讓您一目了然。',
            '將法令規定與實務完美連結，易讀好懂且於法有據，為您提供最實用的指引'
        ],
        primaryColor: '#00395b',
        notice: []
    }
])
</script>

<style lang="scss" scoped></style>

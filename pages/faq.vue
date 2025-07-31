<!-- eslint-disable vue/no-v-html -->
<template>
    <div>
        <div class="relative text-white bg-#ebf4f6">
            <div class="container h-500 lt-md:h-320 relative text-blue_dark">
                <div class="absolute bottom-20 w-[calc(100%-80px)] left-60 z-100 lt-md:left-30">
                    <h1
                        class="relative text-52 before:(content-[''] absolute top-1/2 left-0 -translate-y-1/2 w-6 h-[80%] bg-[#35e3eb]) pl-20"
                    >
                        常見問題
                    </h1>
                    <hr class="bg-gray_light mt-32 mb-24" />
                    <Breadcrumb :link-list="routeList" text-color="#082C4B" />
                </div>
            </div>
            <div
                class="absolute top-0 left-0 bg-[url('@/assets/images/banner/QA.jpg')] lt-lg:bg-[url('@/assets/images/banner/QA_pad.jpg')] lt-sm:bg-[url('@/assets/images/banner/QA_t.jpg')] bg-no-repeat bg-contain bg-right-bottom w-full h-full"
            />
        </div>
        <div class="container pl-60 py-60">
            <IconField icon-position="left" class="mb-60">
                <InputIcon
                    :pt="{
                        root: {
                            class: 'top-12 left-8'
                        }
                    }"
                >
                    <span class="material-icons text-28 rotate-y-180 text-black"> search </span>
                </InputIcon>
                <InputText
                    id="keyword"
                    v-model="filter"
                    placeholder="問題關鍵字搜尋"
                    class="w-full"
                />
            </IconField>

            <Accordion multiple :active-index="activeIndex">
                <AccordionTab
                    v-for="(tab, index) in filteredTabs"
                    :key="tab.title"
                    :pt="{
                        header: {
                            class: 'bg-white '
                        },
                        headerAction: {
                            class: 'text-blue_light tracking-wide px-0'
                        }
                    }"
                >
                    <template #header>
                        <p v-html="`Q${index + 1} ${tab.title}`"></p>
                    </template>
                    <ul
                        class="list-disc px-24 leading-[1.5] tracking-wide font-medium text-primary"
                    >
                        <li
                            v-for="(t_content, idx) in tab.content"
                            :key="idx"
                            v-html="t_content"
                        ></li>
                    </ul>
                </AccordionTab>
            </Accordion>
        </div>
    </div>
</template>

<script setup>
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'

useHead({
    title: '常見問題'
})

definePageMeta({
    title: '常見問題'
})

useSeoMeta({
    description: '有關訂購過程常見的問題，透過搜尋欄更有效找到解答。',
    ogDescription: '有關訂購過程常見的問題，透過搜尋欄更有效找到解答。',
    ogTitle: '常見問題 - 有良冊股份有限公司',
    ogImage: '/yooooobook.jpg',
    ogUrl: 'https://www.yooooobook.com/faq'
})

const routeList = [
    {
        name: '首頁',
        linkTo: '/'
    },
    {
        name: '常見問題',
        linkTo: ''
    }
]

const activeIndex = ref([])

const filter = ref('')
const tabs = ref([
    {
        title: '訂購流程與匯款方式',
        content: [
            '<div><p class="mb-24">前往「訂購書籍」頁面訂購 ▶ 三日內匯款完成 ▶ 確認收到款項後即完成訂購 ▶三日內完成出貨，發票隨貨寄出 ▶缺頁或破損請於收到後七日內連繫客服寄回進行換貨。</p><p class="bg-[#d8d8d8] inline-block px-16 py-6 mb-24">備註1：請於 <span class="text-[red]">3日內</span> 將款項匯款至以下：</p><ul class="mb-24"><li>匯款銀行：玉山銀行 - 台中分行</li><li>銀行代碼：808</li><li>銀行帳戶：1366940052966</li><li>戶名：有良冊股份有限公司</li></ul><p class="mb-24">並於匯款後至有良冊LINE官方帳號(@yooooobook)告知您的<span class="text-[red]">「訂單編號」</span>、<span class="text-[red]">「匯款金額」</span>及<span class="text-[red]">「帳號末5碼」</span>等資料， 我們將每天進行統一對帳，如無問題將不另行通知。</p><p class="border-1 border-solid border-[#d8d8d8] inline-block p-4">備註2：若想查詢訂單進度，可前往<span class="text-blue_light">「訂單查詢」</span> 了解處理進度。</p></div>'
        ],
        contentWord: [
            '前往「訂購書籍」頁面訂購 ▶ 三日內匯款完成 ▶ 確認收到款項後即完成訂購 ▶三日內完成出貨，發票隨貨寄出 ▶缺頁或破損請於收到後七日內連繫客服寄回進行換貨。 備註1：請於 3日內 將款項匯款至以下： 匯款銀行：玉山銀行 - 台中分行 銀行代碼：808 銀行帳戶：1366940052966 戶名：有良冊股份有限公司 並於匯款後至有良冊LINE官方帳號(@yooooobook)告知您的「訂單編號」、「匯款金額」及「帳號末5碼」等資料， 我們將每天進行統一對帳，如無問題將不另行通知。 備註2：若想查詢訂單進度，可前往「訂單查詢」 了解處理進度。'
        ]
    },
    {
        title: '訂購後未於時間內匯款',
        content: [
            '視同未完成訂購，若需購買請 重新填單 或 聯繫客服 (請加入有良冊LINE官方帳號 <a href="https://lin.ee/f8oZLym" target="_blank" class="text-[red]">@yooooobook</a> )後再匯款。'
        ],
        contentWord: [
            '視同未完成訂購，若需購買請 重新填單 或 聯繫客服 (請加入有良冊LINE官方帳號 @yooooobook )後再匯款。'
        ]
    },
    {
        title: '下訂後想增加訂單數量',
        content: [
            '已匯款者：請另外填寫新訂購訂單並匯款，我們於出貨時亦會依據訂單完成順序分批寄送。',
            '尚未匯款者：請聯繫客服 (請加入有良冊LINE官方帳號 <a href="https://lin.ee/f8oZLym" target="_blank" class="text-[red]">@yooooobook</a> ) 更改數量。'
        ],
        contentWord: [
            '已匯款者：請另外填寫新訂購訂單並匯款，我們於出貨時亦會依據訂單完成順序分批寄送。',
            '尚未匯款者：請聯繫客服 (請加入有良冊LINE官方帳號 @yooooobook ) 更改數量。'
        ]
    },
    {
        title: '下訂後想要減少訂單數量',
        content: [
            '已匯款者：請聯繫客服 (請加入有良冊LINE官方帳號 <a href="https://lin.ee/f8oZLym" target="_blank" class="text-[red]">@yooooobook</a> ) 修改數量，並提供退款帳號，最遲將於十個工作天內完成退款。',
            '尚未匯款者：請聯繫客服 (請加入有良冊LINE官方帳號 <a href="https://lin.ee/f8oZLym" target="_blank" class="text-[red]">@yooooobook</a> ) 更改數量。'
        ],
        contentWord: [
            '已匯款者：請聯繫客服 (請加入有良冊LINE官方帳號 @yooooobook ) 修改數量，並提供退款帳號，最遲將於十個工作天內完成退款。',
            '尚未匯款者：請聯繫客服 (請加入有良冊LINE官方帳號 @yooooobook ) 更改數量。'
        ]
    },
    {
        title: '訂購金額是否需付額外的運費',
        content: ['運費部分將由本公司負擔，不需額外支付運費。'],
        contentWord: ['運費部分將由本公司負擔，不需額外支付運費。']
    },
    {
        title: '預計什麼時候可以收到商品',
        content: ['訂單成立後三日內完成出貨。'],
        contentWord: ['訂單成立後三日內完成出貨。']
    },
    // {
    //   title: '預購有什麼好處，預購截止後還可以購買嗎',
    //   content: [
    //     '因本套書係依據預購數量印製數量，故本次預購銷售完畢後倘有剩餘存貨，還是可以購買本公司商品，惟不保證預購期間結束後是否有多餘商品供貨，仍建議於預購期間完成預購程序，以免向隅。'
    //   ]
    // },
    {
        title: '如果有公司登記相關問題，該如何聯繫你們',
        content: [
            '書籍內容勘誤：請聯繫客服 (請加入有良冊LINE官方帳號 <a href="https://lin.ee/f8oZLym" target="_blank" class="text-[red]">@yooooobook</a> )',
            '公司登記問題：<ul><li>可以加入我們的有良冊LINE官方帳號 <a href="https://lin.ee/f8oZLym" target="_blank" class="text-[red]">@yooooobook</a>，並留下您的問題，我們會提供您完整的資訊。</li><li>惟各公司登記機關對於所轄申請案件具有行政裁量權，案件仍應以所轄公司登記機關之規定辦理。</li></ul>'
        ],
        contentWord: [
            '書籍內容勘誤：請聯繫客服 (請加入有良冊LINE官方帳號 @yooooobook )',
            '公司登記問題：可以加入我們的有良冊LINE官方帳號 @yooooobook，並留下您的問題，我們會提供您完整的資訊。惟各公司登記機關對於所轄申請案件具有行政裁量權，案件仍應以所轄公司登記機關之規定辦理。'
        ]
    },
    {
        title: '加入有良冊LINE官方帳號有什麼好處',
        content: [
            '如果有任何需求需要聯絡，可以透過有良冊LINE官方帳號 <a href="https://lin.ee/f8oZLym" target="_blank" class="text-[red]">@yooooobook</a>',
            '免費提供公司登記問題回復，並詳述您的問題，我們會提供完整的資訊。',
            '如果書籍有錯誤需更正的地方，我們都會透過LINE官方帳號及E-MAIL通知書籍勘誤修正處。',
            '我們會不定期發送公司登記實務案例及相關函釋解析，讓讀者可及時取得公司登記相關的最新規定。',
            '本公司預計未來將陸續推出公司登記實務案例進階篇相關書籍，並將透過LINE官方帳號通知新書預購資訊。'
        ],
        contentWord: [
            '如果有任何需求需要聯絡，可以透過有良冊LINE官方帳號 @yooooobook',
            '免費提供公司登記問題回復，並詳述您的問題，我們會提供完整的資訊。',
            '如果書籍有錯誤需更正的地方，我們都會透過LINE官方帳號及E-MAIL通知書籍勘誤修正處。',
            '我們會不定期發送公司登記實務案例及相關函釋解析，讓讀者可及時取得公司登記相關的最新規定。',
            '本公司預計未來將陸續推出公司登記實務案例進階篇相關書籍，並將透過LINE官方帳號通知新書預購資訊。'
        ]
    },
    {
        title: '可否單買整套書中的其中一本',
        content: ['目前皆以套書方式進行販售，無法單本拆封。'],
        contentWord: ['目前皆以套書方式進行販售，無法單本拆封。']
    },
    {
        title: '如何查詢我的訂單狀態',
        content: [
            '登入會員後，點選<span class="text-blue_light">「購物相關 ▶ 訂單查詢」</span>，即可查詢訂單狀態。'
        ],
        contentWord: ['登入會員後，點選「購物相關 ▶ 訂單查詢」，即可查詢訂單狀態。']
    },
    {
        title: '為什麼匯款後訂單狀態還未顯示已收到款項',
        content: [
            '因人工對帳無法即時更新入帳資訊，若<span class="text-[red]">匯款後三個工作天後</span>仍未更新訂單狀態，敬請聯繫客服(請加入有良冊LINE官方帳號 <a href="https://lin.ee/f8oZLym" target="_blank" class="text-[red]">@yooooobook</a> )進行確認。'
        ],
        contentWord: [
            '因人工對帳無法即時更新入帳資訊，若匯款後三個工作天後仍未更新訂單狀態，敬請聯繫客服(請加入有良冊LINE官方帳號 @yooooobook )進行確認'
        ]
    }
    // {
    //   title: '除了本次出版套書外，有其他公司登記實務相關書籍可以購買嗎',
    //   content: ['本公司已著手規劃中，未來將陸續推出公司登記實務進階篇相關書籍，敬請期待！。']
    // }
])

const filteredTabs = computed(() => {
    const keyword = filter.value

    if (keyword === '') return tabs.value

    return tabs.value
        .filter((tab) => {
            const title = tab.title
            const content = tab.contentWord

            const isKeywordInTitle = (function () {
                if (title.toLowerCase().includes(keyword.toLowerCase())) {
                    return true
                } else {
                    return false
                }
            })()

            const isKeywordInConent = (function () {
                const filteredData = content.filter((itemContent) => {
                    if (itemContent.toLowerCase().includes(keyword.toLowerCase())) {
                        return true
                    } else {
                        return false
                    }
                })

                if (filteredData.length > 0) {
                    return true
                } else {
                    return false
                }
            })()

            if (isKeywordInConent || isKeywordInTitle) {
                return true
            } else {
                return false
            }
        })
        .map((tab) => {
            const title = JSON.parse(JSON.stringify(tab.title))
            const content = JSON.parse(JSON.stringify(tab.content))

            const newTitle = title.replace(
                keyword,
                `<span class="bg-secondary text-white px-6">${keyword}</span>`
            )

            const newContent = content.map((itemContent) => {
                const matchWord = itemContent.match(new RegExp(keyword, 'i'))

                return itemContent.replace(
                    new RegExp(keyword, 'i'),
                    `<span class="bg-secondary text-white px-6">${matchWord}</span>`
                )
            })

            return {
                title: newTitle,
                content: newContent
            }
        })
})

watch(filteredTabs, (newVal) => {
    const length = newVal.length
    if (filter.value === '' || length === 0) {
        activeIndex.value = []
    } else {
        activeIndex.value = [...Array(length)].map((_, index) => index)
    }
})
</script>

<style lang="scss" scoped>
.highlight {
    background-color: #f24;
    color: white;
    padding: 0px 5px;
}
</style>

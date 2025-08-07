<template>
    <div>
        <Carousel
            :value="banners"
            :num-visible="1"
            :num-scroll="1"
            :show-navigators="false"
            :autoplay-interval="3000"
            indicators-content-class="absolute left-3/6 bottom-20 -translate-x-1/2"
            content-class="relative"
        >
            <template #item="slotProps">
                <div class="relative mx-auto">
                    <NuxtLink :to="slotProps.data.linkTo">
                        <img
                            class="object-contain object-center w-full"
                            :src="imageSrc(slotProps.data.imgPath)"
                            :alt="slotProps.data.altName"
                        />
                    </NuxtLink>
                </div>
            </template>
        </Carousel>

        <div class="py-64 bg-[#f2eeeb]">
            <div class="container flex-center flex-wrap gap-32">
                <div class="text-center mb-24">
                    <h2 class="text-blue_dark text-36 mb-16 font-serif" data-aos="fade-up">
                        Who Should Read This Book
                    </h2>
                    <p class="text-blue_dark text-24 mb-16" data-aos="fade-up" data-aos-delay="50">
                        有良冊出版書籍最適合那些讀者呢？
                    </p>
                    <img
                        :src="imageSrc('/home/reader01.png')"
                        class="h-120"
                        style="transform: rotateY(180deg)"
                        alt="readers"
                        data-aos="fade-up"
                        data-aos-duration="1500"
                    />
                    <img
                        :src="imageSrc('/home/reader02.png')"
                        class="mx-20 h-120"
                        alt="readers"
                        data-aos="fade-up"
                        data-aos-delay="100"
                        data-aos-duration="1500"
                    />
                    <img
                        :src="imageSrc('/home/reader03.png')"
                        class="h-120"
                        alt="readers"
                        data-aos="fade-up"
                        data-aos-delay="150"
                        data-aos-duration="1500"
                    />
                </div>

                <div class="mb-24 lt-xl:mb-0">
                    <ul class="text-blue_dark">
                        <li class="mb-16 flex flex-nowrap" data-aos="fade-up">
                            <span class="material-icons text-brown_dark text-52 mr-4 shrink-0">
                                task_alt
                            </span>
                            <p
                                class="inline-block text-20 lt-md:text-16 border-solid border-3 border-l-none px-12 py-8 rounded-r-[6px]"
                            >
                                會計師、記帳士、記帳及報稅代理人等公司登記從業人員
                            </p>
                        </li>
                        <li class="mb-16 flex flex-nowrap" data-aos="fade-up" data-aos-delay="150">
                            <span class="material-icons text-brown_dark text-52 mr-4 shrink-0">
                                task_alt
                            </span>
                            <p
                                class="inline-block text-20 lt-md:text-16 border-solid border-3 border-l-none px-12 py-8 rounded-r-[6px]"
                            >
                                公司欲自行辦理公司登記者
                            </p>
                        </li>
                        <li class="flex flex-nowrap" data-aos="fade-up" data-aos-delay="300">
                            <span class="material-icons text-brown_dark text-52 mr-4 shrink-0">
                                task_alt
                            </span>
                            <p
                                class="inline-block text-20 lt-md:text-16 border-solid border-3 border-l-none px-12 py-8 rounded-r-[6px]"
                            >
                                公司登記機關承辦人員
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="text-white relative pt-80">
            <div
                class="container flex justify-between lt-lg:justify-center max-w-1000 flex-wrap-reverse mb-100"
            >
                <ul class="list-disc pl-24 mr-32">
                    <li
                        class="text-20 lt-md:text-16 mb-8"
                        data-aos="flip-left"
                        data-aos-duration="1500"
                    >
                        公司有能力自己辦理公司登記
                    </li>
                    <li
                        class="text-20 lt-md:text-16 mb-8"
                        data-aos="flip-left"
                        data-aos-delay="150"
                        data-aos-duration="1500"
                    >
                        提升專業知識，協助客戶辦理公司登記
                    </li>
                    <li
                        class="text-20 lt-md:text-16 mb-8"
                        data-aos="flip-left"
                        data-aos-delay="300"
                        data-aos-duration="1500"
                    >
                        塑造自身專業形象，讓客戶願意花更多錢委託代辦
                    </li>
                    <li
                        class="text-20 lt-md:text-16"
                        data-aos="flip-left"
                        data-aos-delay="450"
                        data-aos-duration="1500"
                    >
                        建立口碑，讓更多公司成為你的客戶
                    </li>
                </ul>
                <div class="mb-24">
                    <h2 class="text-32 mb-32 font-serif" data-aos="zoom-in">
                        What Will You Learn?
                    </h2>
                    <ul class="flex justify-between items-center gap-8">
                        <li
                            v-for="(business, idx) in businessImgPath"
                            :key="idx"
                            data-aos="flip-right"
                        >
                            <img
                                class="w-48"
                                :src="imageSrc(business.imgPath)"
                                :alt="business.altName"
                            />
                        </li>
                    </ul>
                </div>
            </div>
            <div class="container flex flex-center flex-col">
                <h2 class="text-80 mb-24 font-serif">You Have To Read This Book</h2>
                <p class="text-28 text-[#d2c49d] mb-48 italic" data-aos="fade-up">
                    為什麼一定要選擇有良冊出版書籍呢？
                </p>
                <ul class="flex flex-center flex-wrap relative bottom-[-44px]">
                    <li
                        v-for="(feature, i) in features"
                        :key="feature.title"
                        class="mb-16 ml-[-6px]"
                        data-aos="flip-right"
                        :data-aos-delay="300 * i"
                        data-aos-duration="1500"
                    >
                        <CardDoc :feature="feature"></CardDoc>
                    </li>
                </ul>
            </div>
            <div
                class="absolute top-0 left-0 bg-[url('@/assets/images/home/city.png')] bg-cover bg-top bg-fixed w-full h-full z-[-1]"
            />
            <div class="mask-90" />
        </div>
    </div>
</template>

<script setup>
import Carousel from 'primevue/carousel'

useHead({
    title: '首頁'
})

definePageMeta({
    title: '首頁'
})

const { imageSrc } = getImageSrc()

const banners = ref([
    {
        imgPath: '/banner/home_03_pc.jpg',
        altName: 'home_03',
        linkTo: '/bookstore/AA00004'
    }
])

const businessImgPath = ref([
    {
        imgPath: '/business/01.png',
        altName: 'badge-1'
    },
    {
        imgPath: '/business/02.png',
        altName: 'badge-2'
    },
    {
        imgPath: '/business/03.png',
        altName: 'badge-3'
    },
    {
        imgPath: '/business/04.png',
        altName: 'badge-4'
    },
    {
        imgPath: '/business/05.png',
        altName: 'badge-5'
    },
    {
        imgPath: '/business/06.png',
        altName: 'badge-6'
    }
])

const features = [
    {
        title: '文件完備',
        content: '整理公司登記所需要用到的各項文件範例，不用愁沒有參考範本。'
    },
    {
        title: '用詞精準',
        content:
            '範例精準表達各項公司登記應記載事項及相關說明，不用再煩惱不知道文件內容該怎麼呈現。'
    },
    {
        title: '於法有據',
        content:
            '每份文件、登記案件範例皆有補充相關法令函釋並載明其法源依據，使申請書件符合公司法及相關法令所規定之形式要件，不再擔心文件不符遭登記機關否准。'
    },
    {
        title: '範例詳盡',
        content:
            '完整整理從公司的設立到解散登記，以及公司存續 時可能發生的變更登記範例，遇到變更登記時能有所參考。'
    },
    {
        title: '由簡入繁',
        content:
            '從各項登記之基礎點切入，彙整各項登記可能會遇到的問題並加以說明，讓你熟稔各項公司登記後，即使遇到再複雜的變更登記案件，也能輕鬆掌握要點。'
    }
]

function getBannerInfo() {
    const windowWidth = window.innerWidth
    let suffix = 'pc'

    if (windowWidth <= 450) {
        suffix = 'm'
    } else if (windowWidth <= 768) {
        suffix = 't'
    } else if (windowWidth <= 1200) {
        suffix = 'pad'
    }

    const bannerList = [
        { altName: 'home_03', linkTo: '/bookstore/AA00004', fileName: 'home_03' },
        { altName: 'home_01', linkTo: '/bookstore/AA00002', fileName: 'home_01' },
        { altName: 'home_02', linkTo: '/bookstore/AA00001', fileName: 'home_02' }
    ]

    banners.value = bannerList.map((banner) => ({
        ...banner,
        imgPath: `/banner/${banner.fileName}_${suffix}.jpg`
    }))
}

onMounted(() => {
    getBannerInfo()
    window.addEventListener('resize', getBannerInfo)
})

onUnmounted(() => {
    window.removeEventListener('resize', getBannerInfo)
})
</script>

<style lang="scss" scoped></style>

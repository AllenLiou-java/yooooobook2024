<template>
  <div class="bg-blue_dark text-white pt-60 pb-40">
    <div class="container max-w-800 flex justify-between items-center mx-auto lt-md:flex-wrap">
      <div class="mr-100 lt-md:mr-40">
        <h3 class="mb-16 text-24 font-normal">有良冊股份有限公司</h3>
        <ul class="flex mb-16 gap-12">
          <li v-for="(social, socialIdx) in socialImgPath" :key="socialIdx" class="">
            <a :href="social.href" target="_blank" class="block">
              <img class="w-42" :src="imageSrc(social.imgPath)" alt="socialImg" />
            </a>
          </li>
        </ul>
        <ul>
          <li class="mb-16">
            <p class="mb-8">統一編號：94008568</p>
            <a
              href="https://findbiz.nat.gov.tw/fts/query/QueryBar/queryInit.do"
              target="_blank"
              class="text-brown_light"
              >【商工登記公示資料查詢】</a
            >
          </li>
          <li class="mb-16">
            <p>
              Line ID：<a
                href="https://lin.ee/f8oZLym"
                target="_blank"
                class="text-white visited:text-yellow"
                >@yooooobook</a
              >
            </p>
          </li>
          <li class="flex">
            <p>Email：</p>
            <ul>
              <li class="mb-8">yooooobook@gmail.com</li>
              <li>info@yooooobook.com</li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="self-end max-w-500 mt-24">
        <div class="mb-16">
          <!-- <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fyooooobook&tabs=events&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=1418137311921727"
            width="340"
            height="130"
            style="border: none; overflow: hidden"
            scrolling="no"
            frameborder="0"
            allowfullscreen="true"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe> -->
        </div>
        <div class="lt-md:text-12 text-nowrap lt-sm:text-wrap lt-md:text-center">
          Copyright © 2024 Yooooobook All rights reserved.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { imageSrc } = getImageSrc()

const socialImgPath = ref([
  {
    imgPath: '/social/fb-cc.png',
    href: 'https://www.facebook.com/yooooobook'
  },
  {
    imgPath: '/social/line-cc.png',
    href: 'https://lin.ee/f8oZLym'
  },
  {
    imgPath: '/social/mail-cc.png',
    href: 'mailto:yooooobook@gmail.com'
  }
])
</script>

<style lang="scss" scoped></style>

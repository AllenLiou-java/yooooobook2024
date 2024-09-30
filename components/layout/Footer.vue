<template>
  <div class="bg-blue_dark text-white pt-60 pb-40">
    <div class="container max-w-800 flex justify-between items-center mx-auto lt-md:flex-wrap">
      <div class="mr-100 lt-md:mr-40">
        <h3 class="mb-16 text-24 font-normal">有良冊股份有限公司</h3>
        <ul class="flex mb-16 gap-12">
          <li
            v-for="(social, socialIdx) in socialImgPath"
            :key="socialIdx"
            class="bg-gray rounded-full hover:bg-white duration-300"
          >
            <a :href="social.href" target="_blank" class="block">
              <img class="w-42 p-8" :src="getSocialImageUrl(social.imgPath)" alt="socialImg" />
            </a>
          </li>
        </ul>
        <ul>
          <li class="mb-16">
            <p>統一編號：94008568</p>
          </li>
          <li class="mb-16">
            <p>
              Line ID：<a href="https://lin.ee/f8oZLym" target="_blank" class="visited:text-yellow"
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
const { getSocialImageUrl } = useAssets()

const socialImgPath = ref([
  {
    imgPath: '/fb-b.svg',
    href: 'https://www.facebook.com/yooooobook'
  },
  {
    imgPath: '/line-b.svg',
    href: 'https://lin.ee/f8oZLym'
  },
  {
    imgPath: '/mail-b.svg',
    href: 'mailto:yooooobook@gmail.com'
  }
])
</script>

<style lang="scss" scoped></style>

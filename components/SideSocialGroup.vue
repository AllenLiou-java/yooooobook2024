<template>
  <transition name="slide">
    <div v-if="isShow" class="sideSocialGroup">
      <ul class="list-unstyled">
        <li class="cursor-pointer" @click="moveToTop">
          <span class="material-icons text-42 text-white bg-blue_light rounded-full">
            expand_less
          </span>
        </li>
        <li>
          <a href="https://www.facebook.com/yooooobook" target="_blank"
            ><img src="@/assets/images/social/fb-cc.png" alt="facebook-icon"
          /></a>
        </li>
        <li>
          <a href="https://lin.ee/f8oZLym" target="_blank">
            <img src="@/assets/images/social/line-cc.png" alt="line-icon" />
          </a>
        </li>
        <li>
          <a href="mailto:yooooobook@gmail.com" target="_blank">
            <img src="@/assets/images/social/mail-cc.png" alt="mail-icon" />
          </a>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script setup>
const route = useRoute()

watch(route, (newRoute) => {
  showSocialGroup(newRoute.path)
})

const isShow = ref(false)

const showSocialGroup = (pathname) => {
  if (pathname === '/') {
    if (getScrollTop() > 500) {
      isShow.value = true
    } else {
      isShow.value = false
    }
  } else {
    isShow.value = false
  }
}

const moveToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

function getScrollTop() {
  let bodyTop = 0
  if (typeof window.pageYOffset !== 'undefined') {
    bodyTop = window.pageYOffset
  } else if (typeof document.compatMode !== 'undefined' && document.compatMode !== 'BackCompat') {
    bodyTop = document.documentElement.scrollTop
  } else if (typeof document.body !== 'undefined') {
    bodyTop = document.body.scrollTop
  }
  /* 顯示出捲動後的高度值 */
  return bodyTop
}

onMounted(() => {
  const pathname = location.pathname
  showSocialGroup(pathname)

  window.addEventListener('scroll', () => {
    const pathname = location.pathname
    showSocialGroup(pathname)
  })
})
</script>

<style lang="scss" scoped>
.sideSocialGroup {
  // display: none;
  position: fixed;
  right: 20px;
  bottom: 32px;
  z-index: 100;

  ul {
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 4px;
      background-color: #f1f1f1;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 16px;
      width: 52px;
      height: 52px;
      box-shadow:
        rgba(0, 0, 0, 0.19) 0px 10px 20px,
        rgba(0, 0, 0, 0.23) 0px 6px 6px;
      transition: 0.3s ease-in-out;
      // &:hover {
      //   transform: scale(1.2);
      // }
      a {
        display: block;
        width: 44px;
        height: 44px;
        img {
          position: relative;

          border-radius: 50%;
          overflow: hidden;
        }
      }
    }
  }
}

@media screen and (min-width: 992px) {
  .sideSocialGroup ul > li:hover {
    transform: scale(1.2);
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all ease 1s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10%);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0%);
}
</style>

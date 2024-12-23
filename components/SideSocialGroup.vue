<template>
  <div class="sideSocialGroup">
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
</template>

<script setup>
const route = useRoute()

watch(route, (newRoute) => {
  showSocialGroup(newRoute.path)
})

const showSocialGroup = (pathname) => {
  const sideSocialGroup = document.querySelector('.sideSocialGroup')
  if (pathname === '/') {
    sideSocialGroup.style.display = 'block'
  } else {
    sideSocialGroup.style.display = 'none'
  }
}

const moveToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  const pathname = location.pathname
  showSocialGroup(pathname)
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
      &:hover {
        transform: scale(1.2);
      }
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
</style>

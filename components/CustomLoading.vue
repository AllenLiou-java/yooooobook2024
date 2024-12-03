<template>
  <div class="loader-wrap" :class="isLoading ? 'loader-visible' : 'loader-hidden'">
    <div class="loader"></div>
  </div>
</template>

<script setup>
import { globalMiddleware } from '#build/middleware'

const props = defineProps({
  throttle: {
    type: Number,
    default: 200
  },
  hold: {
    type: Number,
    default: 400
  }
})

const isLoading = ref(false)

let _throttleTimer = null

function clear() {
  clearTimeout(_throttleTimer)
  _throttleTimer = null
}

function show() {
  clear()

  if (import.meta.client) {
    if (props.throttle > 0) {
      _throttleTimer = setTimeout(() => {
        isLoading.value = true
      }, props.throttle)
    } else {
      isLoading.value = true
    }
  }
}

function hide() {
  clear()
  if (import.meta.client) {
    setTimeout(() => {
      isLoading.value = false
    }, props.hold)
  }
}

// 添加一個全域的路由中間件，確保頁面切換時一定會經過這個中間件，並設定顯示載入效果。
globalMiddleware.unshift(show)

// 取消掛載時，也記得要把中間件 show 移除
function unsubRouterBeforeMiddleware() {
  globalMiddleware.splice(globalMiddleware.indexOf(show), 1)
}

const nuxtApp = useNuxtApp()
// const unsubPageStart = nuxtApp.hook('page:start', show)
const unsubPageFinish = nuxtApp.hook('page:finish', hide)
const unsubError = nuxtApp.hook('vue:error', hide)

onBeforeUnmount(() => {
  // unsubPageStart()
  unsubRouterBeforeMiddleware()
  unsubPageFinish()
  unsubError()
})

// 使用 Vue Router 的 hook: onError, afterEach 及 Nuxt 的 hook: vue:error 來添加隱藏的時機。
const router = useRouter()

router.onError(() => {
  hide()
})

// 若是相同的路由路徑或路由頁面元件則隱藏載入效果
router.beforeResolve((to, from) => {
  if (
    to === from ||
    to.matched.every(
      (comp, index) =>
        comp.components && comp.components?.default === from.matched[index]?.components?.default
    )
  )
    hide()
})

router.afterEach((_to, _from, failure) => {
  if (failure) hide()
})
</script>

<style lang="scss" scoped>
.loader {
  width: fit-content;
  font-weight: bold;
  font-family: monospace;
  font-size: 30px;
  background: radial-gradient(circle closest-side, #000 94%, #0000) right/calc(200% - 1em) 100%;
  animation: l24 1s infinite alternate linear;
}

.loader::before {
  content: 'Loading...';
  line-height: 1em;
  color: #0000;
  background: inherit;
  background-image: radial-gradient(circle closest-side, #fff 94%, #000);
  -webkit-background-clip: text;
  background-clip: text;
}

@keyframes l24 {
  100% {
    background-position: left;
  }
}

.loader-wrap {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 999999;
  background-color: rgb(0 0 0 / 0.35);
  backdrop-filter: blur(4px);
  transition-property: background-color, visibility, opacity, scale;
  transition-duration: 0.2s;
}

.loader-wrap.loader-visible {
  visibility: visible;
  opacity: 1;
  scale: 1.5;
}

.loader-wrap.loader-hidden {
  visibility: hidden;
  opacity: 0;
  scale: 1;
}
</style>

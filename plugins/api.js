export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const firebaseApi = $fetch.create({
    baseURL: config.public.firebaseApiUrl,
    onRequest({ request, options }) {
      // 設置request header
      // options.headers = options.headers || {}
      options.params = {
        key: config.firebaseApiKey
      }
      /** 如果接口需求攜帶token请求，则可先自行使用官方的useCookie()方法设置Cookie儲存後，再使用useCookie()方法，取出token使用。如下例子： */
      // const token = useCookie('token')
      // options.headers.Authorization = token.value||null
    },
    onRequestError({ request, options, error }) {
      // 處理请求错误
      console.log('Server連接失敗!')
    },
    onResponse({ request, response, options }) {
      // 處理response數據
      return response._data
    },
    async onResponseError({ request, response, options }) {
      console.log('onResponseError')
      // 處理response錯誤
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/user/login'))
      }
    }
  })

  // const testApi = $fetch.create({
  //   baseURL: 'https://api.github.com',
  //   onRequest({ request, options }) {
  //     // 設置request header
  //     options.headers = options.headers || {}

  //     /** 如果接口需求攜帶token请求，则可先自行使用官方的useCookie()方法设置Cookie儲存後，再使用useCookie()方法，取出token使用。如下例子： */
  //     // const token = useCookie('token')
  //     // options.headers.Authorization = token.value||null
  //   },
  //   onRequestError({ request, options, error }) {
  //     // 處理请求错误
  //     console.log('Server連接失敗!')
  //   },
  //   onResponse({ request, response, options }) {
  //     // 處理response數據
  //     return response._data
  //   },
  //   async onResponseError({ request, response, options }) {
  //     console.log('onResponseError')
  //     // 處理response錯誤
  //     if (response.status === 401) {
  //       await nuxtApp.runWithContext(() => navigateTo('/user/login'))
  //     }
  //   }
  // })

  return {
    provide: {
      firebaseApi
      // testApi
    }
  }
})

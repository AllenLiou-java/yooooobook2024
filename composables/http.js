//  基于useFetch()的網路请求封装

const BASE_URL = ''

// interface HttpParms {
//   baseURL?: string,  //请求的基本URL，即后台服务器地址，（若服务器请求地址只有一个，可不填）
//   url: string,      //请求api接口地址
//   method?: any,   //请求方法
//   query?: any,       //添加查询搜索参数到URL
//   body?: any         //请求体
// }

export const http = (httpParams) => {
  const res = new Promise((resolve, reject) => {
    const url = (httpParams.baseURL ?? BASE_URL) + httpParams.url
    const options = {
      method: httpParams.method ?? 'GET',
      query: httpParams?.query ?? null,
      body: httpParams?.body ?? null,
      onRequest({ request, options }) {
        // 設置request header
        options.headers = options.headers || {}
        /** 如果接口需求攜帶token请求，则可先自行使用官方的useCookie()方法设置Cookie儲存後，再使用useCookie()方法，取出token使用。如下例子： */
        // const token = useCookie('token')
        // options.headers.Authorization = token.value||null
      },
      onRequestError({ request, options, error }) {
        // 處理请求错误
        console.log('Server連接失敗!')
        reject(error)
      },
      onResponse({ request, response, options }) {
        // 處理response數據
        resolve(response._data)
      },
      onResponseError({ request, response, options }) {
        // 處理response錯誤
      }
    }

    useFetch(url, options)
  })

  return res
}

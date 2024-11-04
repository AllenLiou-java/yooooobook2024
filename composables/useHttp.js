/* eslint-disable no-console */
import { hash } from 'ohash'
import errorHandler from '@/api/errorHandler'

const checkRef = (obj) => {
  return Object.keys(obj).some((key) => isRef(obj[key]))
}

const handleError = (status, statusTextCh) => {
  console.log('', status, statusTextCh)
}

const fetchWrapper = (url, opts) => {
  // Check the `key` option
  const { key, params, watch } = opts
  if (!key && ((params && checkRef(params)) || (watch && checkRef(watch)))) {
    console.error(
      '\x1B[31m%s\x1B[0m %s',
      '[useHttp] [error]',
      'The `key` option is required when `params` or `watch` has ref properties, please set a unique key for the current request.'
    )
  }

  const options = opts
  options.lazy = options.lazy ?? true

  const { firebaseApiUrl } = useRuntimeConfig().public
  const nuxtApp = useNuxtApp()
  const toastifyStore = useToastifyStore()

  return useFetch(url, {
    onRequest({ request, options }) {
      // Set the base URL
      options.baseURL = firebaseApiUrl
      // Set the request headers
      options.headers = options.headers || {}
    },
    onResponse({ request, response, options }) {
      return response._data
      // Process the response data
    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
      console.log('Server連接失敗!')
      reject(error)
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
      const { status, statusText } = response

      // 處理response錯誤
      if (status === 400 && statusText === 'Unauthorized') {
        nuxtApp.runWithContext(() => navigateTo('/user/login'))
        return
      }

      const statusTextCh = errorHandler.matchErrorMsg(status, statusText)

      toastifyStore.$patch((state) => {
        state.isToastShow = true
      })

      handleError(status, statusTextCh)
    },
    // Set the cache key
    key: key ?? hash(['api-fetch', url, JSON.stringify(options)]),
    // Merge the options
    ...options
  })
}

export const useHttp = {
  get: (url, params, option) => {
    return fetchWrapper(url, {
      method: 'get',
      params,
      ...option
    })
  },
  post: (url, body, option) => {
    return fetchWrapper(url, {
      method: 'post',
      body,
      ...option
    })
  },
  put: (url, body, option) => {
    return fetchWrapper(url, {
      method: 'put',
      body,
      ...option
    })
  },
  delete: (url, body, option) => {
    return fetchWrapper(url, {
      method: 'delete',
      body,
      ...option
    })
  }
}

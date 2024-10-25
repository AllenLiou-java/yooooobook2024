export const useFirebaseApi = (url, options) => {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$firebaseApi
  })
}

// {method, query, params, body, headers, baseURL, timeout, cache} = options

// export const useTestApi = (url, options) => {
//   return useFetch(url, {
//     ...options,
//     $fetch: useNuxtApp().$testApi
//   })
// }

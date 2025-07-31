export const useAPI = (url, options) => {
    return useFetch(url, {
        ...options,
        $fetch: useNuxtApp().$api
    })
}

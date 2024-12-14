import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', () => {
  const productList = ref({})
  const productDetailList = ref({})

  return { productList, productDetailList }
})

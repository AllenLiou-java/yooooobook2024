import { defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async () => {
  const productIds = await serverApi('/products_simple.json').then((result) => {
    return Object.keys(result)
  })

  return productIds.map((id) => {
    return {
      loc: `/bookstore/${id}`,
      _sitemap: 'bookstore-productId'
    }
  })
})

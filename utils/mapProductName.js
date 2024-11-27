export default function (value) {
  const productList = [
    {
      productId: 'AA00001',
      name: '公司登記實務及案例解析(共三冊)'
    },
    {
      productId: 'AA00002',
      name: '公司登記實務及案例解析(增資·發行新股篇)'
    }
  ]

  return productList.filter((product) => {
    return product.productId === value
  })[0].name
}

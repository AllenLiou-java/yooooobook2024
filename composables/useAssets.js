export default function () {
  // images/banner 圖片
  const bannerImages = computed(() =>
    import.meta.glob('~/assets/images/banner/**/*', { eager: true, import: 'default' })
  )
  const getBannerImageUrl = (filename) => {
    const url = `/assets/images/banner/${String(filename).replace(/^(\.\/+|\/+)/, '')}`
    return bannerImages.value?.[url]
  }

  // images/business 圖片
  const businessImages = computed(() =>
    import.meta.glob('~/assets/images/business/**/*', { eager: true, import: 'default' })
  )
  const getBusinessImageUrl = (filename) => {
    const url = `/assets/images/business/${String(filename).replace(/^(\.\/+|\/+)/, '')}`
    return businessImages.value?.[url]
  }

  // images/home 圖片
  const homeImages = computed(() =>
    import.meta.glob('~/assets/images/home/**/*', { eager: true, import: 'default' })
  )
  const getHomeImageUrl = (filename) => {
    const url = `/assets/images/home/${String(filename).replace(/^(\.\/+|\/+)/, '')}`
    return homeImages.value?.[url]
  }

  // images/social 圖片
  const socialImages = computed(() =>
    import.meta.glob('~/assets/images/social/**/*', { eager: true, import: 'default' })
  )
  const getSocialImageUrl = (filename) => {
    const url = `/assets/images/social/${String(filename).replace(/^(\.\/+|\/+)/, '')}`
    return socialImages.value?.[url]
  }

  // images/files 圖片
  const filesImages = computed(() =>
    import.meta.glob('~/assets/images/files/**/*', { eager: true, import: 'default' })
  )
  const getFilesImageUrl = (filename) => {
    const url = `/assets/images/files/${String(filename).replace(/^(\.\/+|\/+)/, '')}`
    return filesImages.value?.[url]
  }

  // images/contact 圖片
  const contactImages = computed(() =>
    import.meta.glob('~/assets/images/contact/**/*', { eager: true, import: 'default' })
  )
  const getContactImageUrl = (filename) => {
    const url = `/assets/images/contact/${String(filename).replace(/^(\.\/+|\/+)/, '')}`
    return contactImages.value?.[url]
  }

  // const images = computed(() =>
  //   import.meta.glob('~/assets/images/**/*', { eager: true, import: 'default' })
  // )
  // const getImageUrl = (filename) => {
  //   const url = `/assets/images/${String(filename).replace(/^(\.\/+|\/+)/, '')}`
  //   return images.value?.[url]
  // }

  return {
    getBannerImageUrl,
    getBusinessImageUrl,
    getHomeImageUrl,
    getSocialImageUrl,
    getFilesImageUrl,
    getContactImageUrl
    // getImageUrl
  }
}

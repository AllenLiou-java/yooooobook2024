export default function () {
  // images/banner 圖片
  const images = computed(() =>
    import.meta.glob('~/assets/images/**/*', { eager: true, import: 'default' })
  )
  const imageSrc = (filePath) => {
    const url = `/assets/images/${String(filePath).replace(/^(\.\/+|\/+)/, '')}`

    return images.value?.[url]
  }

  return {
    imageSrc
  }
}

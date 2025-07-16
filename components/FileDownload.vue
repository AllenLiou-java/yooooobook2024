<template>
  <div @click="handleClick">
    <slot>下載</slot>
  </div>
</template>

<script setup>
const props = defineProps({
  folder: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  // mode: 'download' | 'preview'
  mode: {
    type: String,
    default: 'download'
  }
})

const handleClick = () => {
  const { filename, folder, mode } = props
  const encodedFilename = encodeURIComponent(filename)

  const url = `/api/file/${folder}/${encodedFilename}` + (mode === 'preview' ? '?mode=preview' : '')

  if (mode === 'preview') {
    // 新分頁預覽
    window.open(url, '_blank')
  } else {
    // 強制下載
    const a = document.createElement('a')
    a.href = url
    a.download = props.filename
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}
</script>

<style lang="scss" scoped></style>

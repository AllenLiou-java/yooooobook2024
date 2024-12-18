<template>
  <div>{{ pages }}</div>
</template>
<script setup>
const pages = ref([
  'https://raw.githubusercontent.com/yooooobook/book1/refs/heads/main/01_Limited_Company/01.jpg',
  'https://raw.githubusercontent.com/yooooobook/book1/refs/heads/main/01_Limited_Company/catalog01.jpg',
  'https://raw.githubusercontent.com/yooooobook/book1/refs/heads/main/01_Limited_Company/catalog02.jpg',
  'https://raw.githubusercontent.com/yooooobook/book1/refs/heads/main/01_Limited_Company/02.jpg',
  'https://raw.githubusercontent.com/yooooobook/book1/refs/heads/main/01_Limited_Company/03.jpg',
  'https://raw.githubusercontent.com/yooooobook/book1/refs/heads/main/01_Limited_Company/04.jpg'
])
</script>

<style scoped>
.flipbook {
  width: auto;
  height: 500px;
}
</style>

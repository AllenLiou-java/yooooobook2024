<template>
  <div class="card flex justify-content-center">
    <Galleria
      v-model:visible="displayBasic"
      :value="images"
      :responsive-options="responsiveOptions"
      :num-visible="6"
      container-class="max-w-[88%]"
      :circular="true"
      :full-screen="true"
      :show-item-navigators="true"
      :thumbnails-position="thubnailsPosition"
      vertical-thumbnail-view-port-height="400px"
    >
      <template #item="slotProps">
        <div class="bg-black max-w-650">
          <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" />
        </div>
      </template>
      <template #thumbnail="slotProps">
        <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" class="w-40" />
      </template>
      <template #previousitemicon>
        <span class="material-icons text-52 lt-sm:text-36 bg-[#191919] rounded-full">
          keyboard_arrow_left
        </span>
      </template>
      <template #nextitemicon>
        <span class="material-icons text-52 lt-sm:text-36 bg-[#191919] rounded-full">
          keyboard_arrow_right
        </span>
      </template>
    </Galleria>

    <Button
      class="bg-blue_light hover:bg-blue border-none"
      :label="tagName"
      @click="displayBasic = true"
    />
  </div>
</template>
<script setup>
const props = defineProps({
  imageUrls: {
    type: Array,
    default() {
      return [
        'https://raw.githubusercontent.com/yooooobook/book1/refs/heads/main/02_b1_2/catalog04.jpg'
      ]
    }
  },
  tagName: {
    type: String,
    required: true
  }
})

const thubnailsPosition = ref('left')

const images = ref()

const responsiveOptions = ref([
  {
    breakpoint: '1200px',
    numVisible: 6
  },
  {
    breakpoint: '560px',
    numVisible: 5
  }
])

const displayBasic = ref(false)

onMounted(() => {
  images.value = props.imageUrls.map((url, idx) => {
    return {
      itemImageSrc: url,
      thumbnailImageSrc: url,
      alt: 'image' + idx + 1,
      title: 'title' + idx + 1
    }
  })

  window.addEventListener('resize', () => {
    const windowWidth = window.innerWidth
    if (windowWidth >= 768) {
      thubnailsPosition.value = 'left'
    } else {
      thubnailsPosition.value = 'bottom'
    }
  })
})
</script>

<style scoped></style>

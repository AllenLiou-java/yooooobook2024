<template>
    <Button
        class="bg-brown_dark cursor-pointer text-14 font-bold px-8 py-4 m-0 border-0 rounded-4"
        aria-haspopup="true"
        aria-controls="overlay_panel"
        @click="togglePanel"
    >
        <span class="material-icons mr-2"> search </span>
        書籍搜尋
    </Button>

    <OverlayPanel ref="panel" append-to="body" @hide="blocked = false">
        <DataTable
            :value="Object.values(productList)"
            selection-mode="single"
            paginator
            :rows="5"
            @row-select="onSelect"
        >
            <Column field="name" header="產品名稱" sortable style="min-width: 12rem"></Column>
            <Column header="產品圖片">
                <template #body="{ data }">
                    <img :src="data.imgSrc" :alt="data.productId" class="w-64" />
                </template>
            </Column>
        </DataTable>
    </OverlayPanel>
</template>

<script setup>
const panel = ref(null)
const blocked = ref(false)

const props = defineProps({ productList: { type: Object, default: () => ({}) } })
const emit = defineEmits(['select'])

const togglePanel = (e) => {
    panel.value.toggle(e)
    blocked.value = true
}
const onSelect = (e) => {
    emit('select', e.data)
    panel.value.hide()
}
</script>

<style lang="scss" scoped></style>

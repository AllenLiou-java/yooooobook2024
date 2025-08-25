<template>
    <div class="bg-blue h-100vh">
        <ConfirmDialog group="headless">
            <template #container="{ message, acceptCallback, rejectCallback }">
                <div class="flex flex-col items-center p-28 rounded-full">
                    <div
                        class="rounded-full inline-flex justify-center items-center bg-white h-84 w-84 -mt-72"
                    >
                        <span class="material-icons text-blue text-104"> help </span>
                    </div>
                    <span class="font-bold text-24 block mb-8 mt-20">{{ message.header }}</span>
                    <p class="mb-0">{{ message.message }}</p>
                    <div class="flex items-center gap-8 mt-20">
                        <Button
                            class="min-w-120"
                            :label="message.acceptLabel"
                            @click="acceptCallback"
                        ></Button>
                        <Button
                            class="min-w-120"
                            :label="message.rejectLabel"
                            outlined
                            @click="rejectCallback"
                        ></Button>
                    </div>
                </div>
            </template>
        </ConfirmDialog>
        <slot />
    </div>
</template>

<script setup>
import ConfirmDialog from 'primevue/confirmdialog'
</script>

<style lang="scss" scoped></style>

<template>
  <div class="card flex justify-center">
    <Stepper orientation="horizontal">
      <StepperPanel header="Header I">
        <template #content="{ nextCallback }">
          <div class="flex flex-column h-12rem">
            <div
              class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium"
            >
              Content I
            </div>
          </div>
          <div class="flex pt-4 justify-content-end">
            <Button label="Next" icon="pi pi-arrow-right" icon-pos="right" @click="nextCallback" />
          </div>
        </template>
      </StepperPanel>
      <StepperPanel header="Header II">
        <template #content="{ prevCallback, nextCallback }">
          <div class="flex flex-column h-12rem">
            <div
              class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium"
            >
              Content II
            </div>
          </div>
          <div class="flex pt-4 justify-content-between">
            <Button
              label="Back"
              severity="secondary"
              icon="pi pi-arrow-left"
              @click="prevCallback"
            />
            <Button label="Next" icon="pi pi-arrow-right" icon-pos="right" @click="nextCallback" />
          </div>
        </template>
      </StepperPanel>
      <StepperPanel header="Header III">
        <template #content="{ prevCallback }">
          <div class="flex flex-column h-12rem">
            <div
              class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium"
            >
              Content III
            </div>
          </div>
          <div class="flex pt-4 justify-content-start">
            <Button
              label="Back"
              severity="secondary"
              icon="pi pi-arrow-left"
              @click="prevCallback"
            />
          </div>
        </template>
      </StepperPanel>
    </Stepper>
  </div>
</template>

<script setup>
import Stepper from 'primevue/stepper'
import StepperPanel from 'primevue/stepperpanel'

onMounted(() => {
  window.addEventListener('resize', () => {
    console.log(window.screen.width)
  })
})
</script>

<style lang="scss" scoped>
.p-stepper {
  flex-basis: 50rem;
}
</style>

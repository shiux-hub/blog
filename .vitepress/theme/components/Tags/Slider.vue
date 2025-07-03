<script lang="ts" setup>
const {
  value = 0.7,
  min = 0,
  max = 1,
  interval = 0.01,
} = defineProps<{
  value?: number
  min?: number
  max?: number
  interval?: number
}>()

defineEmits<{
  update: [value: number]
}>()

const VueSlider = defineAsyncComponent(() => import('vue-slider-component'))

const sliderValue = ref(value)

watch(
  () => value,
  val => (sliderValue.value = val),
)
</script>

<template>
  <ClientOnly>
    <VueSlider
      v-model="sliderValue"
      :min
      :max
      :interval
      tooltip="none"
      class="slider"
      @change="$emit('update', $event)"
    />
  </ClientOnly>
</template>

<style scoped>
.slider {
  inline-size: 100% !important;
  block-size: auto !important;
  padding: 0 4px !important;
  margin: 0 !important;

  :deep(.vue-slider-rail) {
    block-size: 8px;
    background-color: var(--color-theme-op);
    border-radius: 25px;

    .vue-slider-process {
      background-color: var(--color-theme);
      border-radius: 25px;
    }

    .vue-slider-dot {
      inline-size: 16px;
      block-size: 16px;
      cursor: pointer;
      background-color: var(--color-theme);
      border: 1px solid var(--color-theme-op);
      border-radius: 50%;
      box-shadow: 0.5px 0.5px 2px 1px rgb(0 0 0 / 32%);
    }
  }
}
</style>

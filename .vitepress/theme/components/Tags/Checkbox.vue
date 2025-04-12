<script lang="ts" setup>
import { Icon } from '@iconify/vue'

const model = defineModel<boolean>()

// 点击切换
function checkboxClick() {
  model.value = !model.value
}
</script>

<template>
  <div class="flex items-center cursor-pointer space-x-2 group" @click="checkboxClick">
    <div
      class="relative items-center justify-center size-5 rounded-sm border-2 border-card-border transition-[border,background-color] group-hover:border-theme duration-300"
      :class="{ 'bg-theme': model }"
    >
      <Icon
        icon="mingcute:check-fill"
        class="text-card-background absolute size-3 scale-0 opacity-0 transition-[opacity,scale]"
        :class="{
          'opacity-100 scale-100': model,
        }"
      />
    </div>
    <slot />
  </div>
</template>

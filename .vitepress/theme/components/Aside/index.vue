<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { useData } from '@/composables/data'
import { cn } from '@/utils'

defineProps<{
  showToc?: boolean
  class?: HTMLAttributes['class']
}>()

const { theme } = useData()
</script>

<template>
  <aside
    :class="
      cn(
        'animate-fade-up flex-col space-y-4 delay-300 duration-600',
        $props.class,
      )
    "
  >
    <Hello v-if="theme.aside.hello.enable" />
    <div class="sticky top-[calc(60px+1rem)] space-y-4">
      <Toc
        v-if="theme.aside.toc.enable && showToc"
        class="animate-fade-up delay-400 duration-600"
      />
      <Countdown class="animate-fade-up delay-400 duration-600" />
      <Tags
        v-if="theme.aside.tags.enable"
        class="animate-fade-up delay-400 duration-600"
      />
      <SiteData
        v-if="theme.aside.siteData.enable"
        class="animate-fade-up delay-400 duration-600"
      />
    </div>
  </aside>
</template>

<style scoped>
:deep(.title) {
  margin-bottom: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  opacity: 0.75;
  svg {
    opacity: 0.6;
    margin-right: 6px;
  }
  .title-name {
    opacity: 0.8;
  }
}
</style>

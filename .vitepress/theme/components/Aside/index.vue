<script lang="ts" setup>
import { useData } from '@/composables/data'

defineProps<{
  showToc?: boolean
}>()

const { theme } = useData()
</script>

<template>
  <aside class="main-aside space-y-4">
    <Hello v-if="theme.aside.hello.enable" />
    <div class="sticky top-[calc(60px+1rem)] space-y-4">
      <Toc v-if="theme.aside.toc.enable && showToc" class="animate-fade-up duration-600 delay-400" />
      <Countdown class="animate-fade-up duration-600 delay-400" />
      <Tags v-if="theme.aside.tags.enable" class="animate-fade-up duration-600 delay-400" />
      <SiteData v-if="theme.aside.siteData.enable" class="animate-fade-up duration-600 delay-400" />
    </div>
  </aside>
</template>

<style scoped>
.main-aside {
  flex-direction: column;
  animation: fade-up 0.6s 0.3s backwards;
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
}
</style>

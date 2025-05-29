<!-- 链接卡片 -->
<script lang="ts" setup>
import type { SiteInfo } from '@/types/site'
import { Icon } from '@iconify/vue'
import { getSiteInfo } from '@/api'

const { url, title, desc, icon } = defineProps<{
  // 地址
  url?: string
  // 标题
  title?: string
  // 描述
  desc?: string
  // 图标
  icon?: string
}>()

// 站点数据
const siteInfo = ref<SiteInfo | null>(null)

// 是否为站内链接
const isOutLink = computed(() => {
  if (!url)
    return false
  // 是否为站内链接
  return (
    !url.startsWith('/')
    && (url.startsWith('http://') || url.startsWith('https://'))
  )
})

// 获取站点数据
async function getSiteInfoData() {
  if (!url)
    return false
  if (title || desc || icon)
    return false
  // 获取数据
  const result = await getSiteInfo(url)
  siteInfo.value = result
}

onMounted(() => {
  getSiteInfoData()
})
</script>

<template>
  <a
    :href="url"
    :target="isOutLink ? '_blank' : undefined"
    class="bg-card-second-background card hover group hover:text-card-background hover:bg-theme my-4 block w-full p-4"
  >
    <span
      v-if="isOutLink"
      class="border-card-border mb-3 inline-block w-full border-b-2 border-dashed pb-3 text-sm"
    >引用站外地址，请注意甄别链接安全性</span>
    <div class="flex h-full items-center">
      <div class="mr-3 size-15 min-w-15 overflow-hidden rounded-xl">
        <img v-if="icon" class="size-full" :src="icon" alt="link-img">
        <img
          v-else-if="siteInfo?.iconUrl"
          :src="siteInfo.iconUrl"
          class="size-full"
          alt="link-img"
          @error="siteInfo.iconUrl = null"
        >
        <Icon icon="mingcute:link-2-fill" class="bg-card-border size-8" />
      </div>
      <div class="flex w-full flex-col overflow-hidden">
        <!-- 标题 -->
        <span v-if="title" class="mb-1 truncate text-lg">{{ title }}</span>
        <span v-else class="mb-1 truncate text-lg">{{
          siteInfo?.title || '暂无标题'
        }}</span>
        <!-- 描述 -->
        <span
          v-if="desc"
          class="text-font-second-color group-hover:text-card-background line-clamp-2 text-sm text-ellipsis transition-colors duration-300 group-hover:opacity-60"
        >{{ desc }}</span>
        <span
          v-else
          class="text-font-second-color group-hover:text-card-background line-clamp-2 text-sm text-ellipsis transition-colors duration-300 group-hover:opacity-60"
        >{{ siteInfo?.description || '暂无站点描述' }}</span>
      </div>
      <Icon
        icon="mingcute:up-fill"
        class="group-hover:text-card-background ml-3 flex rotate-90 transition-colors duration-300"
      />
    </div>
  </a>
</template>

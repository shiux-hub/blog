<!-- 链接卡片 -->
<script lang="ts" setup>
import type { SiteInfo } from '@/types/site'
import { getSiteInfo } from '@/api'
import { Icon } from '@iconify/vue'

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
    class="block w-full my-4 p-4 bg-card-second-background card hover group hover:text-card-background hover:bg-theme"
  >
    <span v-if="isOutLink" class="inline-block w-full text-sm pb-3 mb-3 border-b-2 border-dashed border-card-border">引用站外地址，请注意甄别链接安全性</span>
    <div class="h-full flex items-center">
      <div class="size-15 min-w-15 mr-3 rounded-xl overflow-hidden">
        <img v-if="icon" class="size-full" :src="icon" alt="link-img">
        <img
          v-else-if="siteInfo?.iconUrl"
          :src="siteInfo.iconUrl"
          class="size-full"
          alt="link-img"
          @error="siteInfo.iconUrl = null"
        >
        <Icon
          icon="mingcute:link-2-fill"
          class="size-8 bg-card-border"
        />
      </div>
      <div class="w-full flex flex-col overflow-hidden">
        <!-- 标题 -->
        <span v-if="title" class="mb-1 text-lg truncate">{{ title }}</span>
        <span v-else class="mb-1 text-lg truncate">{{
          siteInfo?.title || '暂无标题'
        }}</span>
        <!-- 描述 -->
        <span v-if="desc" class="text-font-second-color text-sm line-clamp-2 text-ellipsis transition-colors duration-300 group-hover:text-card-background group-hover:opacity-60">{{ desc }}</span>
        <span v-else class="text-font-second-color text-sm line-clamp-2 text-ellipsis transition-colors duration-300 group-hover:text-card-background group-hover:opacity-60">{{
          siteInfo?.description || '暂无站点描述'
        }}</span>
      </div>
      <Icon
        icon="mingcute:up-fill"
        class="flex ml-3 rotate-90 transition-colors duration-300 group-hover:text-card-background"
      />
    </div>
  </a>
</template>

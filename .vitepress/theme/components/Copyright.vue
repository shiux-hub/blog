<script lang="ts" setup>
import type { PostDataItem } from '@/types/post'
import { useData } from '@/composables/data'
import { formatTimestamp } from '@/utils/helper'
import { Icon } from '@iconify/vue'

defineProps<{
  postData?: PostDataItem
}>()
const { theme } = useData()
const route = useRoute()
</script>

<template>
  <div class="bg-card-second-background space-y-3 p-5 overflow-hidden card relative">
    <Icon
      icon="mingcute:copyright-line"
      class="absolute -top-16 -right-16 m-0 size-64 rotate-[334deg] opacity-10"
    />
    <div class="flex flex-col gap-0.5">
      {{ postData?.title || '未命名文章' }}
      <a
        :href="theme.siteMeta.site + route.path"
        class="text-sm opacity-60 hover:opacity-100"
        target="_blank"
      >
        {{ theme.siteMeta.site + route.path }}
      </a>
    </div>
    <div class="flex items-center gap-8 max-md:hidden">
      <div class="flex flex-col gap-1">
        作者
        <span class="opacity-60 text-sm">{{ theme.siteMeta.author.name }}</span>
      </div>
      <div v-if="postData?.date" class="flex flex-col gap-1">
        发布于
        <span class="opacity-60 text-sm">{{ formatTimestamp(postData.date) }}</span>
      </div>
      <div v-if="postData?.lastModified" class="flex flex-col gap-1">
        更新于
        <span class="opacity-60 text-sm">{{ formatTimestamp(postData.lastModified) }}</span>
      </div>
      <div class="flex flex-col gap-1">
        许可协议
        <a
          class="opacity-60 text-sm transition-[color,opacity] duration-300 cursor-pointer hover:opacity-100 hover:text-theme"
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans"
          target="_blank"
        >
          CC BY-NC-SA 4.0
        </a>
      </div>
    </div>
    <div class="opacity-40 max-md:text-sm">
      署名-非商业性使用-相同方式共享 4.0 国际
    </div>
  </div>
</template>

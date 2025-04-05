<!-- 分类 -->
<script lang="ts" setup>
import { useData } from '@/composables/data'
import { Icon } from '@iconify/vue'

withDefaults(
  defineProps<{
    type?: 'categories' | 'tags' // 页面类型：categories 分类，tags 标签
  }>(),
  {
    type: 'categories',
  },
)
const { theme } = useData()
</script>

<template>
  <div>
    <div class="flex flex-col items-center">
      <h1 class="text-3xl">
        {{ type === 'categories' ? '全部分类' : '全部标签' }}
      </h1>
      <span v-if="type === 'categories'" class="text-lg opacity-60">
        共有 {{ Object.keys(theme.categoriesData)?.length || 0 }} 个分类
      </span>
      <span v-else class="text-lg opacity-60">
        共有 {{ Object.keys(theme.tagsData)?.length || 0 }} 个标签
      </span>
    </div>
    <div
      v-if="type === 'categories'"
      class="flex flex-wrap gap-2 items-center justify-center mt-8 mb-12"
    >
      <a
        v-for="(item, key, index) in theme.categoriesData"
        :key="index"
        :href="`/pages/categories/${key}`"
        class="text-lg flex items-center card gap-2 group hover:scale-105 hover:bg-theme"
      >
        <Icon icon="mingcute:classify-2-fill" class="font-bold transition-[color] duration-300 opacity-60 size-5 group-hover:text-card-background group-hover:opacity-100" />
        <span class="font-bold transition-[color,opacity] duration-300 group-hover:text-card-background">{{ key }}</span>
        <span class="flex items-center justify-center size-7 rounded-lg text-sm bg-card-border">{{ item.count }}</span>
      </a>
    </div>
    <div v-else class="flex flex-wrap gap-2 items-center justify-center mt-8 mb-12">
      <a
        v-for="(item, key, index) in theme.tagsData"
        :key="index"
        :href="`/pages/tags/${key}`"
        class="text-lg flex items-center card gap-2 group hover:scale-105 hover:bg-theme"
      >
        <Icon icon="mingcute:hashtag-fill" class="font-bold transition-[color] duration-300 opacity-60 size-5 group-hover:text-card-background group-hover:opacity-100" />
        <span class="font-bold transition-[color,opacity] duration-300 group-hover:text-card-background">{{ key }}</span>
        <span class="flex items-center justify-center size-7 rounded-lg text-sm bg-card-border">{{ item.count }}</span>
      </a>
    </div>
  </div>
</template>

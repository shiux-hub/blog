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
      class="mt-8 mb-12 flex flex-wrap items-center justify-center gap-2"
    >
      <a
        v-for="(item, key, index) in theme.categoriesData"
        :key="index"
        :href="`/pages/categories/${key}`"
        class="card group hover:bg-theme flex items-center gap-2 text-lg hover:scale-105"
      >
        <Icon
          icon="mingcute:classify-2-fill"
          class="group-hover:text-card-background size-5 font-bold opacity-60 transition-[color] duration-300 group-hover:opacity-100"
        />
        <span
          class="group-hover:text-card-background font-bold transition-[color,opacity] duration-300"
        >{{ key }}</span>
        <span
          class="bg-card-border flex size-7 items-center justify-center rounded-lg text-sm"
        >{{ item.count }}</span>
      </a>
    </div>
    <div
      v-else
      class="mt-8 mb-12 flex flex-wrap items-center justify-center gap-2"
    >
      <a
        v-for="(item, key, index) in theme.tagsData"
        :key="index"
        :href="`/pages/tags/${key}`"
        class="card group hover:bg-theme flex items-center gap-2 text-lg hover:scale-105"
      >
        <Icon
          icon="mingcute:hashtag-fill"
          class="group-hover:text-card-background size-5 font-bold opacity-60 transition-[color] duration-300 group-hover:opacity-100"
        />
        <span
          class="group-hover:text-card-background font-bold transition-[color,opacity] duration-300"
        >{{ key }}</span>
        <span
          class="bg-card-border flex size-7 items-center justify-center rounded-lg text-sm"
        >{{ item.count }}</span>
      </a>
    </div>
  </div>
</template>

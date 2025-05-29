<!-- 分类导航条 -->
<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { useData } from '@/composables/data'

withDefaults(
  defineProps<{
    // 显示类别
    type?: string
  }>(),
  {
    type: 'categories',
  },
)
const { theme, params } = useData()
// 获取当前路由路径
const currentTypeName = computed(() => {
  return params.value?.name || null
})
</script>

<template>
  <div
    v-if="type === 'categories'"
    class="card hover relative flex animate-[fade-up_0.6s_0.3s_backwards] items-center justify-between p-2 font-bold"
  >
    <div class="all-type mr-3 flex w-full items-center overflow-hidden">
      <a
        v-if="currentTypeName"
        :href="`/pages/categories/${currentTypeName}`"
        class="type-item choose"
      >
        {{ currentTypeName }}
      </a>
      <a href="/" class="type-item" :class="[{ choose: !currentTypeName }]">首页</a>
      <a
        v-for="(_, key, index) in theme.categoriesData"
        :key="index"
        :href="`/pages/categories/${key}`"
        class="type-item"
        :class="[{ hidden: currentTypeName === key }]"
      >
        {{ key }}
      </a>
    </div>
    <a
      href="/pages/categories"
      class="hover:text-theme mr-1 ml-2 flex items-center gap-2 whitespace-nowrap"
    >
      <Icon icon="mingcute:arrows-right-line" class="size-5" />
      更多
    </a>
  </div>
  <div v-else-if="type === 'tags'" class="type-bar card hover">
    <div class="all-type mr-3 flex w-full items-center overflow-hidden">
      <a
        v-if="currentTypeName"
        :href="`/pages/tags/${currentTypeName}`"
        class="type-item choose"
      >
        {{ currentTypeName }}
        <span class="num">{{
          theme.tagsData?.[currentTypeName]?.count || 0
        }}</span>
      </a>
      <a
        v-for="(item, key, index) in theme.tagsData"
        :key="index"
        :href="`/pages/tags/${key}`"
        class="type-item"
        :class="[{ hidden: currentTypeName === key }]"
      >
        {{ key }}
        <span class="num">{{ item.count }}</span>
      </a>
    </div>
    <a
      href="/pages/tags"
      class="hover:text-theme mr-1 ml-2 flex items-center gap-2 whitespace-nowrap"
    >
      <Icon icon="mingcute:arrows-right-line" class="size-5" />
      更多
    </a>
  </div>
</template>

<style scoped>
.all-type {
  mask: linear-gradient(90deg, #fff 0, #fff 90%, hsla(0, 0%, 100%, 0.6) 95%, hsla(0, 0%, 100%, 0) 100%);
  .type-item {
    display: flex;
    align-items: center;
    padding: 0.1rem 0.5rem;
    margin-right: 6px;
    font-weight: bold;
    border-radius: 8px;
    white-space: nowrap;
    height: 30px;
    cursor: pointer;
    .num {
      margin-left: 4px;
      font-weight: normal;
      padding: 2px 6px;
      font-size: 0.75rem;
      color: var(--color-font-color);
      background-color: var(--color-card-border);
      border-radius: 8px;
    }
    &.choose {
      color: var(--color-card-background);
      background-color: var(--color-theme);
      .num {
        color: var(--color-theme);
      }
    }
    &.hidden {
      display: none;
    }
    &:hover {
      color: var(--color-card-background);
      background-color: var(--color-theme);
    }
  }
}
</style>

<!-- 普通页面 -->
<script lang="ts" setup>
import { useData } from '@/composables/data'

const { frontmatter } = useData()
</script>

<template>
  <div
    :class="[
      frontmatter.layout || 'flex space-x-4 animate-fade-up delay-100 duration-600',
      {
        'animate-fade-up delay-300 duration-600': frontmatter.aside,
      },
    ]"
  >
    <div
      class="w-full"
      :class="{
        'transition-[width] duration-300 delay-100 lg:w-[calc(100%-336px)]': frontmatter.aside,
      }"
    >
      <!-- 页面内容 -->
      <Content
        id="page-content"
        class="markdown-main-style"
        :class="{ 'px-8 py-4': frontmatter.card }"
      />
      <!-- 评论 -->
      <Comments v-if="frontmatter.comment" />
    </div>
    <Aside v-if="frontmatter.aside" class="w-xs hidden lg:flex" />
  </div>
</template>

<style scoped>
:deep(#main-comment) {
  width: 100%;

  .comment-content {
    .atk-list {
      .atk-list-header {
        margin-bottom: 8px;
      }

      .atk-list-comments-wrap {
        > .atk-comment-wrap {
          padding: 0.8rem;
          margin-bottom: 1rem;
          border-bottom: none;
          border-radius: 16px;
          background-color: var(--main-card-background);
          border: 1px solid var(--main-card-border);
          box-shadow: 0 8px 16px -4px var(--main-border-shadow);
        }
      }
    }
  }
}
</style>

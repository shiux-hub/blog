<!-- 普通页面 -->
<script lang="ts" setup>
import { useData } from '@/composables/data'

const { frontmatter } = useData()
</script>

<template>
  <div
    :class="[
      frontmatter.layout
        || 'animate-fade-up flex space-x-4 delay-100 duration-600',
      {
        'animate-fade-up delay-300 duration-600': frontmatter.aside,
      },
    ]"
  >
    <div
      class="w-full"
      :class="{
        'transition-[width] delay-100 duration-300 lg:w-[calc(100%-336px)]':
          frontmatter.aside,
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
    <Aside v-if="frontmatter.aside" class="hidden w-xs lg:flex" />
  </div>
</template>

<style scoped>
:deep(#main-comment) {
  inline-size: 100%;

  .comment-content {
    .atk-list {
      .atk-list-header {
        margin-block-end: 8px;
      }

      .atk-list-comments-wrap {
        > .atk-comment-wrap {
          padding: 0.8rem;
          margin-block-end: 1rem;
          background-color: var(--color-card-background);
          border: 1px solid var(--color-card-border);
          border-block-end: none;
          border-radius: 16px;
          box-shadow: 0 8px 16px -4px var(--color-border-shadow);
        }
      }
    }
  }
}
</style>

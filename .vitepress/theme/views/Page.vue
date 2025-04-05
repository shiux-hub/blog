<!-- 普通页面 -->
<script lang="ts" setup>
import { useData } from '@/composables/data'

const { frontmatter } = useData()
</script>

<template>
  <div
    :class="[
      frontmatter.layout || 'page',
      {
        'animate-fade-up delay-300 duration-600': frontmatter.aside
      }
    ]"
  >
    <div class="page-content w-full lg:w-[calc(100%-336px)]">
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
@import '../style/post.css';

.page {
  width: 100%;
  display: flex;
  flex-direction: row;
  animation: fade-up 0.6s 0.1s backwards;

  .page-content {
    width: 100%;
    transition: width 0.3s;

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
  }
}
</style>

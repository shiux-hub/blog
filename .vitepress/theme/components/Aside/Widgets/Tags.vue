<!-- 侧边栏 - 标签 -->
<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { useData } from '@/composables/data'

const { theme } = useData()
</script>

<template>
  <div class="tags-cloud card">
    <div class="title">
      <Icon icon="mingcute:hashtag-fill" />
      <span class="title-name">热门标签</span>
    </div>
    <div class="all-tags">
      <a
        v-for="(item, tag, index) in theme.tagsData"
        :key="index"
        :href="`/pages/tags/${tag}`"
        class="tags"
      >
        <span class="name">{{ tag }}</span>
        <sup class="num">{{ item.count }}</sup>
      </a>
    </div>
    <a href="/pages/tags" class="more-tags">查看全部</a>
  </div>
</template>

<style scoped>
.tags-cloud {
  .all-tags {
    position: relative;
    display: flex;
    flex-flow: row wrap;
    max-block-size: 500px;
    overflow: hidden;

    .tags {
      display: inline-block;
      padding: 4px 8px;
      margin: 2px;
      border-radius: 8px;

      .num {
        margin-inline-start: 2px;
        opacity: 60%;
      }

      &:hover {
        color: var(--color-theme);
        background-color: var(--color-theme-op);
      }
    }

    &::after {
      position: absolute;
      inset-block-end: 0;
      inset-inline: 0;
      block-size: 48%;
      max-block-size: 150px;
      pointer-events: none;
      content: '';
      background-image: linear-gradient(to top, var(--color-card-background), transparent);
    }
  }

  .more-tags {
    display: flex;
    align-items: center;
    justify-content: center;
    inline-size: 100%;
    block-size: 40px;
    font-size: 14px;
    background-color: var(--color-card-second-background);
    border: 1px solid var(--color-card-border);
    border-radius: 8px;

    &:hover {
      color: var(--color-theme);
      background-color: var(--color-theme-op);
      border-color: var(--color-theme-op);
    }
  }
}
</style>

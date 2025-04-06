<!-- 侧边栏 - 标签 -->
<script lang="ts" setup>
import { useData } from '@/composables/data'
import { Icon } from '@iconify/vue'

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
    flex-direction: row;
    flex-wrap: wrap;
    max-height: 500px;
    overflow: hidden;
    .tags {
      display: inline-block;
      padding: 4px 8px;
      margin: 2px;
      border-radius: 8px;
      .num {
        margin-left: 2px;
        opacity: 0.6;
      }
      &:hover {
        color: var(--color-theme);
        background-color: var(--color-theme-op);
      }
    }
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 48%;
      max-height: 150px;
      background-image: linear-gradient(to top, var(--color-card-background), transparent);
      pointer-events: none;
    }
  }
  .more-tags {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    border-radius: 8px;
    font-size: 14px;
    border: 1px solid var(--color-card-border);
    background-color: var(--color-card-second-background);
    &:hover {
      color: var(--color-theme);
      border-color: var(--color-theme-op);
      background-color: var(--color-theme-op);
    }
  }
}
</style>

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
  <div class="copyright relative s-card">
    <Icon
      icon="mingcute:copyright-line"
      class="absolute -top-16 -right-16 opacity-10 size-64 rotate-[334deg]"
    />
    <div class="title">
      <span class="post-name">{{ postData?.title || "未命名文章" }}</span>
      <a :href="theme.siteMeta.site + route.path" class="post-link" target="_blank">
        {{ theme.siteMeta.site + route.path }}
      </a>
    </div>
    <div class="post-meta">
      <div class="meta-item">
        <span class="tip">作者</span>
        <span class="name">{{ theme.siteMeta.author.name }}</span>
      </div>
      <div v-if="postData?.date" class="meta-item">
        <span class="tip">发布于</span>
        <span class="name">{{ formatTimestamp(postData.date) }}</span>
      </div>
      <div v-if="postData?.lastModified" class="meta-item">
        <span class="tip">更新于</span>
        <span class="name">{{ formatTimestamp(postData.lastModified) }}</span>
      </div>
      <div class="meta-item cc">
        <span class="tip">许可协议</span>
        <a
          class="name"
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans"
          target="_blank"
        >
          CC BY-NC-SA 4.0
        </a>
      </div>
    </div>
    <span class="meta-tip">署名-非商业性使用-相同方式共享 4.0 国际</span>
  </div>
</template>

<style lang="scss" scoped>
.copyright {
  position: relative;
  background-color: var(--main-card-second-background);
  padding: 18px;
  margin-top: 2rem;
  overflow: hidden;
  .title {
    display: flex;
    flex-direction: column;
    .post-link {
      margin-top: 2px;
      font-size: 14px;
      opacity: 0.6;
      &:hover {
        opacity: 1;
      }
    }
  }
  .post-meta {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 1rem 0;
    .meta-item {
      display: flex;
      flex-direction: column;
      margin-right: 2rem;
      .name {
        margin-top: 4px;
        font-size: 14px;
        opacity: 0.6;
        transition:
          color 0.3s,
          opacity 0.3s;
        cursor: pointer;
      }
      &.cc {
        .name {
          &:hover {
            opacity: 1;
            color: var(--main-color);
          }
        }
      }
    }
  }
  .meta-tip {
    opacity: 0.4;
  }
  @media (max-width: 768px) {
    .post-meta {
      display: none;
    }
    .meta-tip {
      display: inline-block;
      margin-top: 12px;
      font-size: 14px;
    }
  }
}
</style>

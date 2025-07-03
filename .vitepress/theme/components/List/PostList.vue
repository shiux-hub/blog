<!-- 文章列表 -->
<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { sample } from 'es-toolkit/array'
import { useData } from '@/composables/data'
import { mainStore } from '@/store'
import { formatTimestamp } from '@/utils/helper'

withDefaults(
  defineProps<{
    // 列表数据
    listData?: any[]
    // 简洁模式
    simple?: boolean
  }>(),
  {
    simple: false,
  },
)
const store = mainStore()
const router = useRouter()

const { theme: themeConfig } = useData()

// 计算布局类型
const layoutType = computed(() =>
  themeConfig.value?.cover?.twoColumns
    ? 'twoColumns'
    : (themeConfig.value?.cover?.showCover?.coverLayout ?? 'left'),
)

// 计算网格样式
const gridStyle = computed(() =>
  layoutType.value === 'twoColumns'
    ? {
        '--grid-columns': 2,
        '--grid-gap': '1rem',
      }
    : {},
)

// 判断是否显示封面
const showCover = computed(() => themeConfig.value?.cover?.showCover?.enable)

// 获取封面图片 按优先级获取：cover > defaultCover > false
function getCover(postCover: string) {
  const { cover } = themeConfig.value ?? {}

  if (!showCover.value)
    return undefined
  if (postCover)
    return postCover

  return Array.isArray(cover.showCover.defaultCover)
    ? sample(cover.showCover.defaultCover)
    : undefined
}

// 前往文章
function toPost(path: string) {
  // 记录滚动位置
  if (typeof window !== 'undefined') {
    const scrollY = window.scrollY
    store.lastScrollY = scrollY
  }
  // 跳转文章
  router.go(path)
}
</script>

<template>
  <div
    class="post-lists"
    :class="{ 'layout-grid': layoutType === 'twoColumns' }"
    :style="gridStyle"
  >
    <div
      v-for="(item, index) in listData"
      :key="index"
      class="post-item card hover cursor-pointer"
      :class="[
        { simple, cover: showCover, [`cover-${layoutType}`]: showCover },
      ]"
      :style="{ animationDelay: `${0.4 + index / 10}s` }"
      @click="toPost(item.regularPath)"
    >
      <div v-if="!simple && showCover" class="post-cover">
        <ImageWithLoader :src="getCover(item.cover)" :alt="item.title" />
      </div>

      <div class="post-content">
        <div v-if="!simple && item?.categories" class="post-category">
          <span v-for="cat in item?.categories" :key="cat" class="cat-name">
            <Icon icon="mingcute:classify-2-fill" />
            {{ cat }}
          </span>
          <!-- 置顶 -->
          <span v-if="item?.top" class="top">
            <Icon icon="mingcute:align-arrow-up-fill" />
            置顶
          </span>
        </div>
        <span class="post-title">{{ item.title }}</span>
        <span v-if="item?.description" class="post-desc">
          {{ item.description }}
        </span>
        <div v-if="!simple" class="post-meta">
          <div v-if="item?.tags" class="post-tags">
            <span
              v-for="tags in item?.tags"
              :key="tags"
              class="tags-name"
              @click.stop="router.go(`/pages/tags/${tags}`)"
            >
              <Icon icon="mingcute:hashtag-fill" />
              {{ tags }}
            </span>
          </div>
          <span class="post-time">{{ formatTimestamp(item?.date) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-lists {
  .post-item {
    display: flex;
    block-size: 200px;
    padding: 0 !important;
    margin-block-end: 1rem;
    overflow: hidden;
    cursor: pointer;
    animation: fade-up 0.6s 0.4s backwards;

    .post-cover {
      flex: 0 0 35%;
      overflow: hidden;
      transform: translateZ(0);

      img {
        inline-size: 100%;
        block-size: 100%;
        object-fit: cover;
        transition:
          transform 0.5s ease-out,
          filter 0.5s ease-out;
        transform-origin: center center;
        will-change: transform, filter;
        backface-visibility: hidden;
      }
    }

    .post-content {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      padding: 1.6rem 2rem;

      .post-category {
        display: flex;
        flex-wrap: wrap;
        inline-size: 100%;
        font-size: 14px;
        color: var(--color-font-second-color);

        .cat-name {
          display: flex;
          flex-direction: row;
          align-items: center;

          svg {
            margin-inline-end: 6px;
            opacity: 80%;
          }
        }

        .top {
          margin-inline-start: 12px;
          color: var(--color-theme);

          svg {
            opacity: 80%;
          }
        }
      }

      .post-title {
        display: -webkit-box;
        margin: 0.6rem 0;
        overflow: hidden;
        font-size: 20px;
        font-weight: bold;
        line-height: 30px;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        word-break: break-all;
        transition: color 0.3s;
        -webkit-box-orient: block-axis;
      }

      .post-desc {
        display: -webkit-box;
        margin-block: -0.4rem 0.8rem;
        overflow: hidden;
        line-height: 30px;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        word-break: break-all;
        opacity: 80%;
        -webkit-box-orient: block-axis;
      }

      .post-meta {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        color: var(--color-font-second-color);

        .post-tags {
          display: flex;
          flex-wrap: wrap;
          margin-inline-end: 20px;
          overflow: hidden;
          opacity: 80%;
          mask: linear-gradient(90deg, #fff 0, #fff 90%, hsl(0deg 0% 100% / 60%) 95%, hsl(0deg 0% 100% / 0%) 100%);

          .tags-name {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-inline-end: 12px;
            white-space: nowrap;
            transition: color 0.3s;

            svg {
              margin-inline-end: 4px;
              opacity: 60%;
            }

            &:hover {
              color: var(--color-theme);
            }
          }

          @media (max-width: 768px) {
            flex-wrap: nowrap;
          }
        }

        .post-time {
          font-size: 13px;
          white-space: nowrap;
          opacity: 60%;
        }
      }
    }

    &.simple {
      block-size: auto;
      padding: 0.5rem 1.4rem;
      background-color: var(--color-card-second-background);
      animation: none;
    }

    /* 封面靠左 */
    &.cover-left {
      flex-direction: row;
    }

    /* 封面靠右 */
    &.cover-right {
      flex-direction: row-reverse;
    }

    /* 交替布局 */
    &.cover-both {
      &:nth-child(odd) {
        flex-direction: row;
      }

      &:nth-child(even) {
        flex-direction: row-reverse;
      }
    }

    &:last-child {
      margin-block-end: 0;
    }

    &:hover {
      .post-cover img {
        filter: brightness(0.8);
        transform: scale(1.05);
      }

      .post-content {
        .post-title {
          color: var(--color-theme);
        }
      }
    }

    &:active {
      transform: scale(0.98);
    }

    @media (max-width: 768px) {
      flex-direction: column;
      block-size: auto;

      .post-cover {
        flex: none;
        inline-size: 100%;
        block-size: 200px;
      }
    }

    /* 移动端垂直布局 */
    @media (max-width: 768px) {
      &.cover-left,
      &.cover-right,
      &.cover-both {
        flex-direction: column !important;
      }
    }
  }

  /* 网格布局 */
  &.layout-grid {
    display: grid;
    grid-template-columns: repeat(var(--grid-columns, 2), 1fr);
    gap: var(--grid-gap, 1rem);

    .post-item {
      flex-direction: column;
      block-size: auto;
      margin: 0;

      .post-cover {
        flex: none;
        inline-size: 100%;
        block-size: 225px;
      }

      .post-content {
        flex: 1;
      }
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>

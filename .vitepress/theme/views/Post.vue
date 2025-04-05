<!-- 文章页面 -->
<script lang="ts" setup>
import { useData } from '@/composables/data'
import { generateId } from '@/utils/commonTools'
import { formatTimestamp } from '@/utils/helper'
import initFancybox from '@/utils/initFancybox'
import { Icon } from '@iconify/vue'

const { page, theme, frontmatter } = useData()

// 评论元素
const commentRef = useTemplateRef('commentRef')

// 获取对应文章数据
const postMetaData = computed(() => {
  const postId = generateId(page.value.relativePath)
  return theme.value.postData.find(item => item.id === postId)
})

// 日期
const createdDate = computed(() => formatTimestamp(postMetaData.value.date))
const updatedDate = computed(() =>
  formatTimestamp(page.value?.lastUpdated || postMetaData.value.lastModified),
)

onMounted(() => {
  initFancybox(theme.value)
})
</script>

<template>
  <div v-if="postMetaData" class="post">
    <div class="post-meta">
      <div class="meta">
        <a
          v-if="frontmatter.original"
          v-tippy
          href="/posts/cc"
          class="post-meta-original cat-item"
          title="该文章为原创文章，注意版权协议"
        >原创</a>
        <div class="categories">
          <a
            v-for="(item, index) in postMetaData.categories"
            :key="index"
            v-tippy="`查看更多<strong>【${item}】</strong>分类的文章`"
            :href="`/pages/categories/${item}`"
            class="cat-item"
          >
            <Icon icon="mingcute:classify-2-fill" />
            <span class="name">{{ item }}</span>
          </a>
        </div>
        <div class="tags">
          <a
            v-for="(item, index) in postMetaData.tags"
            :key="index"
            v-tippy="`查看更多<strong>【${item}】</strong>标签的文章`"
            :href="`/pages/tags/${item}`"
            class="tag-item"
          >
            <Icon icon="mingcute:hashtag-fill" />
            <span class="name">{{ item }}</span>
          </a>
        </div>
      </div>
      <h1 class="title">
        {{ postMetaData.title || '未命名文章' }}
      </h1>
      <div class="other-meta">
        <span
          v-if="createdDate"
          v-tippy="`这篇文章创建于<strong>${createdDate}</strong>`"
          class="meta-item date"
        >
          <Icon icon="mingcute:calendar-2-line" />
          {{ createdDate }}
        </span>
        <span
          v-if="updatedDate"
          v-tippy="`这篇文章更新于<strong>${updatedDate}</strong>`"
          class="meta-item update"
        >
          <Icon icon="mingcute:time-fill" />
          {{ updatedDate }}
        </span>
        <!-- 热度 -->
        <span v-tippy class="meta-item hot" title="热度">
          <Icon icon="mingcute:fire-fill" />
          <span id="twikoo_visitors" class="artalk-pv-count">0</span>
        </span>
        <!-- 评论数 -->
        <span
          v-if="theme.comment.enable"
          class="chat meta-item hover"
          @click="commentRef?.scrollToComments"
        >
          <Icon icon="mingcute:chat-1-fill" />
          <span id="twikoo_comments" class="artalk-comment-count">0</span>
        </span>
      </div>
    </div>
    <div class="post-content gap-4 min-w-0">
      <article class="post-article w-full lg:w-[calc(100%-336px)] card">
        <!-- 过期提醒 -->
        <div v-if="postMetaData?.expired >= 180" class="expired card">
          本文发表于
          <strong>{{ postMetaData?.expired }}</strong>
          天前，其中的信息可能已经事过境迁
        </div>
        <!-- AI 摘要 -->
        <ArticleGPT />
        <!-- 文章内容 -->
        <Content id="page-content" class="markdown-main-style" />
        <!-- 参考资料 -->
        <References />
        <!-- 版权 -->
        <Copyright
          v-if="frontmatter.copyright !== false"
          :post-data="postMetaData"
        />
        <!-- 其他信息 -->
        <div class="other-meta">
          <div class="all-tags">
            <a
              v-for="(item, index) in postMetaData.tags"
              :key="index"
              :href="`/pages/tags/${item}`"
              class="tag-item"
            >
              <Icon icon="mingcute:hashtag-fill" />
              <span class="name">{{ item }}</span>
            </a>
          </div>
          <a
            href="https://eqnxweimkr5.feishu.cn/share/base/form/shrcnCXCPmxCKKJYI3RKUfefJre"
            class="report"
            target="_blank"
          >
            <Icon icon="mingcute:report-line" />
            反馈与投诉
          </a>
        </div>
        <RewardBtn />
        <!-- 下一篇 -->
        <NextPost />
        <!-- 相关文章 -->
        <RelatedPost class="mt-12" />
        <!-- 评论 -->
        <Comments ref="commentRef" />
      </article>
      <Aside show-toc class="w-xs hidden lg:flex" />
    </div>
  </div>
</template>

<style scoped>
@import '../style/post.css';

.post {
  width: 100%;
  display: flex;
  flex-direction: column;
  animation: fade-up 0.6s 0.1s backwards;

  .post-meta {
    padding: 2rem 0 3rem 18px;
    width: 100%;

    .meta {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 12px;

      .cat-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 6px 12px;
        font-size: 14px;
        font-weight: bold;
        border-radius: 8px;
        background-color: var(--main-mask-Inverse-background);
        opacity: 0.8;

        svg {
          margin-right: 6px;
        }

        &:hover {
          color: var(--main-color);
          background-color: var(--main-color-bg);
        }
      }

      .tags {
        display: flex;
        flex-direction: row;
        align-items: center;

        .tag-item {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 6px 12px;
          font-size: 14px;
          font-weight: bold;
          border-radius: 8px;
          opacity: 0.8;

          svg {
            margin-right: 4px;
            opacity: 0.6;
          }

          &:hover {
            color: var(--main-color);
            background-color: var(--main-color-bg);
          }
        }
      }
    }

    .title {
      font-size: 2.2rem;
      line-height: 1.2;
      color: var(--main-font-color);
      margin: 1.4rem 0;
    }

    .other-meta {
      display: flex;
      flex-direction: row;
      align-items: center;

      .meta-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 6px 12px;
        font-size: 14px;
        border-radius: 8px;
        opacity: 0.8;

        svg {
          margin-right: 6px;
          transition: color 0.3s;
        }

        &.date {
          padding-left: 0;
        }

        &.hot svg {
          width: 18px;
          height: 18px;
        }

        &.hover {
          transition:
            color 0.3s,
            background-color 0.3s;
          cursor: pointer;

          &:hover {
            color: var(--main-color);
            background-color: var(--main-color-bg);
          }
        }
      }
    }
  }

  .post-content {
    display: flex;
    animation: fade-up 0.6s 0.3s backwards;

    .post-article {
      padding: 1rem 2.2rem 2.2rem 2.2rem;

      &:hover {
        border-color: var(--main-card-border);
      }

      .expired {
        margin: 1.2rem 0 2rem 0;
        padding: 0.8rem 1.2rem;
        border-left: 6px solid var(--main-warning-color);
        border-radius: 6px 16px 16px 6px;
        user-select: none;

        strong {
          color: var(--main-warning-color);
        }
      }

      .other-meta {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin: 2rem 0;
        opacity: 0.8;

        .all-tags {
          display: flex;
          flex-direction: row;
          align-items: center;

          .tag-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 6px 12px;
            font-size: 14px;
            font-weight: bold;
            border-radius: 8px;
            background-color: var(--main-card-border);
            margin-right: 12px;

            svg {
              margin-right: 4px;
              opacity: 0.6;
              font-weight: normal;
            }

            &:hover {
              color: var(--main-color);
              background-color: var(--main-color-bg);
            }
          }
        }

        .report {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 6px 12px;
          font-size: 14px;
          font-weight: bold;
          border-radius: 8px;
          background-color: var(--main-card-border);

          svg {
            margin-right: 6px;
          }

          &:hover {
            color: #efefef;
            background-color: var(--main-error-color);
          }
        }
      }
    }
  }

  svg {
    width: 1rem;
    height: 1rem;
  }

  @media (max-width: 768px) {
    .post-meta {
      padding: 4rem 1.5rem;

      .meta {
        justify-content: center;

        .categories {
          margin-right: 0;
        }

        .tags {
          display: none;
        }
      }

      .title {
        font-size: 1.6rem;
        text-align: center;
        line-height: 40px;
      }

      .other-meta {
        justify-content: center;
      }
    }

    .post-content {
      .post-article {
        border: none;
        padding: 20px 30px;

        .other-meta {
          margin: 1rem 0 2rem 0;
          flex-direction: column;

          .all-tags {
            flex-wrap: wrap;

            .tag-item {
              margin-top: 12px;
            }
          }

          .report {
            margin-top: 20px;
          }
        }
      }
    }
  }
}
</style>

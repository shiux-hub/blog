<script lang="ts" setup>
import { useData } from '@/composables/data'
import { jumpRedirect } from '@/utils/commonTools'
import initComments from '@/utils/initComments'

const { fill = false } = defineProps<{
  fill?: string | boolean
}>()
const route = useRoute()
const { theme } = useData()
const { comment } = theme.value

// 评论数据
const artalk = ref(null)
const commentRef = useTemplateRef('commentRef')

// 初始化 Artalk
async function initArtalk() {
  try {
    await nextTick()
    const Artalk = await initComments(theme.value)
    artalk.value = Artalk.init({
      el: commentRef.value || '#comment-dom',
      locale: 'auto',
      pageKey: route.path,
      site: comment.artalk.site,
      server: comment.artalk.server,
    })
    // Event
    artalk.value?.on('created', () => {
      // 若有数据填充
      if (fill)
        fillComments(fill)
    })
    artalk.value?.on('list-loaded', () => {
      console.log('评论已加载完毕')
      jumpRedirect(null, theme.value, true)
    })
    artalk.value?.on('comment-updated', () => {
      console.log('评论已更新完毕')
      jumpRedirect(null, theme.value, true)
    })
    if (typeof $comment === 'undefined' && typeof window !== 'undefined') {
      window.$comment = artalk.value
    }
    return artalk.value
  }
  catch (error) {
    console.error('初始化评论出错：', error)
  }
}

// 填充评论区
function fillComments(data) {
  console.log('填充评论：', data)
  // 获取评论元素
  const commentDom = document.querySelector('#comment-dom.fill')
  if (!commentDom)
    return false
  // 获取输入框
  const commentInput = commentDom.querySelector('textarea')
  // 写入内容
  if (commentInput) {
    commentInput.value = `${data}\n\n`
    commentInput.focus()
  }
}

// 监听页面切换
watch(
  () => route.path,
  (val) => {
    nextTick().then(() => {
      artalk.value?.update({ pageKey: val })
      artalk.value?.reload()
    })
  },
)

onMounted(() => {
  initArtalk()
})

onUnmounted(() => {
  artalk.value?.destroy()
})
</script>

<template>
  <div
    id="comment-dom"
    ref="commentRef"
    class="comment-content artalk"
    :class="{ fill }"
  />
</template>

<style>
#comment-dom,
.atk-layer-wrap,
.comment-content {
  --at-color-font: var(--color-font-color) !important;
  --at-color-deep: var(--color-font-second-color) !important;
  --at-color-grey: var(--color-font-second-color) !important;
  --at-color-meta: var(--color-font-second-color) !important;
  --at-color-border: var(--color-card-border) !important;
  --at-color-main: var(--color-theme) !important;
  --at-color-light: var(--color-theme) !important;
  --at-color-bg: var(--color-card-background) !important;
  --at-color-bg-grey: var(--color-card-border) !important;
  --at-color-bg-grey-transl: var(--color-card-border) !important;
  --at-color-bg-transl: var(--color-card-second-background) !important;
  --at-color-gradient: linear-gradient(180deg, transparent, var(--color-card-background)) !important;
}

.atk-layer-wrap {
  .atk-layer-mask {
    background: var(--color-mask-background-deep) !important;
  }
}
</style>

<style scoped>
#comment-dom {
  :deep(.atk-main-editor) {
    .atk-bottom {
      block-size: 40px;
      padding: 0 0 0 8px;

      .atk-send-btn {
        block-size: 40px;
      }
    }

    .atk-user-btn,
    .atk-plug-btn {
      transition: background 0.3s;
    }

    .atk-plug-panel-wrap {
      .atk-grp {
        &[data-grp-name='小黄脸'] {
          .atk-item {
            font-size: 2rem;
            transition: background 0.3s;
          }
        }
      }

      .atk-grp-switcher {
        span {
          transition: background 0.3s;
        }
      }
    }
  }

  :deep(.atk-list) {
    .atk-list-header {
      .atk-dropdown {
        .atk-dropdown-item {
          padding: 0;
          margin: 0;
          margin-block-start: 8px;
          line-height: normal;
          text-align: center;
          letter-spacing: normal;

          span {
            transition: color 0.3s;
          }

          &:first-child {
            margin-block-start: 0;
          }

          &::before {
            display: none;
          }
        }
      }
    }

    .atk-list-comments-wrap {
      > .atk-comment-wrap {
        border-block-end: 1px dashed var(--color-card-border);

        .atk-header {
          .atk-badge {
            color: var(--at-color-bg);
            background-color: var(--at-color-main) !important;
          }
        }

        .atk-content {
          user-select: text;

          img {
            inline-size: auto;
            max-inline-size: 240px;
          }

          code {
            margin: 4px;
            font-family: 'Fira Code', var(--font-custom), monospace;
            vertical-align: inherit;
            border-radius: 6px;
          }

          pre {
            code {
              border-radius: 8px;
            }
          }

          blockquote {
            background-color: var(--color-card-second-background);
            border-inline-start: 8px solid var(--color-card-border);
            border-radius: 4px 8px 8px 4px;
          }
        }

        &:last-child {
          border-block-end: none;
        }
      }
    }

    .atk-height-limit {
      .atk-height-limit-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        inline-size: calc(100% - 20px);
        block-size: 46px;
        padding: 12px 0;
        border-radius: 16px;
        transition:
          color 0.3s,
          background-color 0.3s;

        &:hover {
          color: var(--color-card-background);
          background-color: var(--color-theme);
        }
      }

      &::after {
        block-size: 100px;
      }
    }
  }

  :deep(.atk-list-body) {
    .atk-pagination {
      .atk-input,
      .atk-btn {
        inline-size: 40px;
        block-size: 40px;
        overflow: hidden;
        cursor: pointer;
        background-color: var(--color-card-background);
        border: 1px solid var(--color-card-border);
        border-radius: 8px;
        box-shadow: 0 8px 16px -4px var(--color-border-shadow);
        transition:
          inline-size 0.3s,
          border-color 0.3s,
          box-shadow 0.3s;

        &:hover {
          border-color: var(--color-theme);
          box-shadow: 0 8px 16px -4px var(--color-theme-op);

          svg {
            color: var(--color-theme);
          }
        }
      }

      .atk-input {
        font-size: 1rem;

        &:hover,
        &:focus {
          inline-size: 200px;
          border-color: var(--color-theme);
          box-shadow: 0 8px 16px -4px var(--color-theme-op);
        }
      }
    }
  }
}
</style>

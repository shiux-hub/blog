<script lang="ts" setup>
import { useData } from '@/composables/data'
import { jumpRedirect } from '@/utils/commonTools'
import initComments from '@/utils/initComments'

const {
  fill = false,
} = defineProps<{
  fill?: boolean | string
}>()

const { theme } = useData()
const { comment } = theme.value

// 评论数据
const twikoo = ref(null)
const commentRef = useTemplateRef('commentRef')

// 初始化 Twikoo
async function initTwikoo() {
  try {
    await nextTick()
    const Twikoo = await initComments(theme.value)
    twikoo.value = Twikoo.init({
      el: commentRef.value || '#comment-dom',
      envId: comment.twikoo.envId,
      onCommentLoaded: () => {
        console.log('评论已加载完毕')
        if (fill)
          fillComments(fill)
        jumpRedirect(null, theme.value, true)
      },
    })
    return twikoo.value
  }
  catch (error) {
    console.error('初始化评论出错：', error)
  }
}

// 填充评论区
function fillComments(data) {
  console.log('填充评论：', data)
  // 获取评论元素
  const commentDom = document.querySelector('.tk-input.el-textarea')
  if (!commentDom)
    return false
  // 获取输入框
  const commentInput = commentDom.querySelector('textarea')
  if (commentInput) {
    // 写入内容
    commentInput.value = `${data}\n\n`
    commentInput.focus()
  }
}

onMounted(() => {
  initTwikoo()
})
</script>

<template>
  <div id="comment-dom" ref="commentRef" class="comment-content twikoo" :class="[{ fill }]" />
</template>

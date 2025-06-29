<!-- AI 摘要（假） -->
<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { randomInt } from 'es-toolkit/math'
import { useData } from '@/composables/data'

const { frontmatter } = useData()
const router = useRouter()

// 摘要数据
const loading = ref(true)
const waitTimeOut = ref<number>()
const abstractData = ref('')
const showIndex = ref(0)
const showType = ref(false)

// 输出摘要
function typeWriter(text?: string) {
  try {
    const data = text || frontmatter.value.articleGPT
    if (!data)
      return false
    if (showIndex.value < data.length) {
      abstractData.value += data.charAt(showIndex.value++)
      // 生成字符延迟
      const delay = randomInt(121) + 30
      setTimeout(() => {
        typeWriter(text)
      }, delay)
    }
    else {
      loading.value = false
    }
  }
  catch (error) {
    loading.value = false
    abstractData.value = '摘要生成失败'
    window.$message.error('摘要生成失败，请重试')
    console.error('摘要生成失败：', error)
  }
}

// 初始化摘要
function initAbstract() {
  waitTimeOut.value = setTimeout(
    () => {
      typeWriter()
    },
    randomInt(1301) + 2500,
  )
}

// 输出摘要介绍
function showOther() {
  if (loading.value)
    return false
  const text
    = '我是無名开发的摘要生成助理 FakeGPT，如你所见，这是一个假的 GPT，所有文本皆源于本地书写的内容。我在这里只负责显示，并仿照 GPT 的形式输出，如果你像我一样囊中羞涩，你也可以像我这样做，当然，你也可以使用 Tianli 开发的 TianliGPT 来更简单地实现真正的 AI 摘要。'
  showIndex.value = 0
  loading.value = true
  abstractData.value = ''
  if (!showType.value) {
    showType.value = true
    typeWriter(text)
  }
  else {
    typeWriter()
    showType.value = false
  }
}

onMounted(() => {
  if (frontmatter.value.articleGPT)
    initAbstract()
})

onBeforeUnmount(() => {
  clearTimeout(waitTimeOut.value)
})
</script>

<template>
  <div class="bg-card-second-background card space-y-3 select-none">
    <div class="flex items-center justify-between px-2">
      <span
        class="text-theme flex cursor-pointer items-center font-bold"
        @click="router.go('/posts/2024/0218')"
      >
        <Icon
          class="text-card-background bg-theme mr-2 size-6.5 rounded-full"
          icon="mingcute:openai-fill"
        />
        文章摘要
        <Icon class="ml-1.5 opacity-60" icon="mingcute:right-fill" />
      </span>
      <span
        class="text-card-background bg-theme cursor-pointer rounded-full px-2.5 py-1 text-xs font-bold"
        :class="{ 'animate-loading cursor-not-allowed duration-1000': loading }"
        @click="showOther"
      >
        FakeGPT
      </span>
    </div>
    <div class="card cursor-pointer">
      <span>{{ abstractData === '' ? '加载中...' : abstractData }}</span>
      <span v-if="loading" class="text-theme animate-loading ml-1 font-bold">|</span>
    </div>
    <div class="flex items-center justify-between px-2 text-xs">
      <span class="opacity-60">此内容根据文章生成，并经过人工审核，仅用于文章内容的解释与总结</span>
      <a
        href="https://eqnxweimkr5.feishu.cn/share/base/form/shrcnCXCPmxCKKJYI3RKUfefJre"
        class="ml-3 whitespace-normal opacity-80"
        target="_blank"
      >
        投诉
      </a>
    </div>
  </div>
</template>

<!-- 分页 -->
<script lang="ts" setup>
import { cn } from '@/utils'
import { Icon } from '@iconify/vue'

// 分页数据
const { page, total, limit, routePath, useParams } = defineProps<{
  total: number
  page: number
  limit: number
  routePath: string
  useParams: boolean
}>()

const router = useRouter()

// 快速跳转数据
const jumpInput = ref<number | null>(null)
const inputFocus = ref(false)

// 页数数据
const currentPage = ref(page)
const totalPages = computed(() => Math.ceil(total / limit))

// 分页指示器数据
const pageNumber = computed(() => {
  const pages = []
  const current = currentPage.value
  const total = totalPages.value
  const wingSize = 2 // 当前页前后要显示的页码数
  let startPage = Math.max(current - wingSize, 2)
  let endPage = Math.min(current + wingSize, total - 1)
  // 总是显示第一页
  pages.push(1)
  // 当 startPage > 2 时，前面需要显示省略号
  if (startPage > 2) {
    pages.push('more')
  }
  else {
    // 如果 startPage 是 2，不需要省略号，直接显示第二页
    startPage = 2
  }
  // 显示中间范围的页码
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  // 当 endPage < totalPages-1 时，后面需要显示省略号
  if (endPage < total - 1) {
    pages.push('more')
  }
  else {
    // 如果 endPage 是 totalPages-1，不需要省略号，直接显示倒数第二页
    if (endPage === total - 1)
      endPage = total - 1
  }
  // 总是显示最后一页，除非只有一页
  if (total > 1)
    pages.push(total)
  return pages
})

// 检查输入
function validateInput() {
  const numericValue = Number(jumpInput.value)
  if (!Number.isInteger(numericValue) || numericValue < 1) {
    jumpInput.value = null
  }
  else if (numericValue > totalPages.value) {
    jumpInput.value = totalPages.value
  }
  else {
    jumpInput.value = numericValue
  }
}

// 跳转页面
function jumpPage(url: string, page: number | string) {
  // 使用参数跳转
  if (useParams) {
    if (page === 1) {
      router.go(`${routePath}`)
    }
    else {
      router.go(`${routePath}?page=${page}`)
    }
  }
  // 正常跳转
  else {
    router.go(url)
  }
}

// 快速跳转
function fastJump() {
  inputFocus.value = false
  if (!jumpInput.value)
    return false
  jumpPage(
    jumpInput.value === 1
      ? `${routePath}`
      : `${routePath}/page/${jumpInput.value}`,
    jumpInput.value,
  )
}

// 检查当前路径参数
function checkCurrentPage() {
  const params = new URLSearchParams(window.location.search)
  const page = params.get('page')
  if (page && useParams) {
    currentPage.value = Number(page)
  }
}

onMounted(() => {
  checkCurrentPage()
})
</script>

<template>
  <div
    v-if="total > 0"
    class="animate-fade-up mt-5 flex w-full items-center justify-center gap-2 delay-100 duration-600"
  >
    <div
      v-if="currentPage > 1"
      class="group bg-card-background border-card-border shadow-border-shadow max-md:hover:bg-theme md:hover:shadow-theme-none md:hover:text-theme md:hover:border-theme shadow-xm flex h-12.5 shrink-0 cursor-pointer items-center justify-center space-x-1 overflow-hidden rounded-lg border transition duration-300 max-md:flex-1 max-md:hover:text-white md:h-10 md:w-20"
      @click="
        jumpPage(
          currentPage === 2
            ? `${routePath}`
            : `${routePath}/page/${currentPage - 1}`,
          currentPage === 2 ? 1 : currentPage - 1,
        )
      "
    >
      <Icon icon="mingcute:left-fill" class="max-md:hidden" />
      <span
        class="mr-0 transition-[opacity,margin] duration-300 md:-mr-8 md:opacity-0 md:group-hover:mr-0 md:group-hover:opacity-100"
      >上页</span>
    </div>
    <div class="hidden w-full items-center justify-center gap-2 md:flex">
      <div
        v-for="(item, index) in pageNumber"
        :key="index"
        :class="
          cn(
            'flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg transition-colors duration-300',
            {
              'border-card-border shadow-border-shadow hover:border-theme bg-card-background hover:shadow-theme-op hover:text-theme shadow-xm cursor-pointer border':
                item !== 'more',
              'text-card-background hover:text-card-background border-theme bg-theme shadow-theme-op shadow-xm':
                item === currentPage,
            },
          )
        "
        @click="
          item !== 'more'
            && jumpPage(item === 1 ? routePath : `${routePath}/page/${item}`, item)
        "
      >
        <Icon
          v-if="item === 'more'"
          class="size-7"
          icon="mingcute:more-1-fill"
        />
        <template v-else>
          {{ item }}
        </template>
      </div>
      <!-- 快速跳转 -->
      <div
        v-tippy
        class="fast-jump relative"
        :class="[{ focus: inputFocus }]"
        title="快速跳转"
      >
        <input
          v-model.number="jumpInput"
          :min="1"
          :max="totalPages"
          class="bg-card-background border-card-border shadow-xm shadow-border-shadow size-10 rounded-lg border px-2 transition-all duration-300 outline-none"
          @focus="inputFocus = true"
          @blur="fastJump"
          @input="validateInput"
          @keydown.enter="fastJump"
        >
        <Icon
          icon="mingcute:arrows-right-line"
          class="hover:text-card-background hover:bg-theme absolute top-1/2 right-1.5 size-7 -translate-y-1/2 cursor-pointer rounded-md transition duration-300"
          :class="{ click: jumpInput }"
          @click.stop="fastJump"
        />
      </div>
    </div>
    <div
      v-if="currentPage * limit < total"
      class="group bg-card-background border-card-border shadow-border-shadow max-md:hover:bg-theme md:hover:shadow-theme-none md:hover:text-theme md:hover:border-theme shadow-xm flex h-12.5 shrink-0 cursor-pointer items-center justify-center space-x-1 overflow-hidden rounded-lg border transition duration-300 max-md:flex-1 max-md:hover:text-white md:h-10 md:w-20"
      @click="jumpPage(`${routePath}/page/${currentPage + 1}`, currentPage + 1)"
    >
      <span
        class="ml-0 transition-[opacity,margin] duration-300 md:-ml-8 md:opacity-0 md:group-hover:ml-0 md:group-hover:opacity-100"
      >下页</span>
      <Icon icon="mingcute:right-fill" class="max-md:hidden" />
    </div>
  </div>
</template>

<style scoped>
.fast-jump {
  &.focus,
  &:hover {
    input {
      --tw-shadow-color: var(--color-theme-op);
      width: 100px;
      border-color: var(--color-theme);
    }

    svg {
      opacity: 0.2;
      pointer-events: none;

      &.click {
        opacity: 1;
        pointer-events: all;
      }
    }
  }
}
</style>

<!-- 分页 -->
<script lang="ts" setup>
import { Icon } from '@iconify/vue'

// 分页数据
const props = defineProps({
  // 总数
  total: {
    type: Number,
    default: 0,
  },
  // 当前页数
  page: {
    type: Number,
    default: 1,
  },
  // 每页显示数量
  limit: {
    type: Number,
    default: 8,
  },
  // 跳转目录
  routePath: {
    type: String,
    default: '',
  },
  // 使用参数
  useParams: {
    type: Boolean,
    default: false,
  },
})

const router = useRouter()

// 快速跳转数据
const jumpInput = ref<number | null>(null)
const inputFocus = ref(false)

// 页数数据
const currentPage = ref(props.page)
const totalPages = computed(() => Math.ceil(props.total / props.limit))

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
  if (props.useParams) {
    if (page === 1) {
      router.go(`${props.routePath}`)
    }
    else {
      router.go(`${props.routePath}?page=${page}`)
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
      ? `${props.routePath}`
      : `${props.routePath}/page/${jumpInput.value}`,
    jumpInput.value,
  )
}

// 检查当前路径参数
function checkCurrentPage() {
  const params = new URLSearchParams(window.location.search)
  const page = params.get('page')
  if (page && props.useParams) {
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
      class="group text-font-color next bg-card-background border-card-border shadow-border-shadow max-md:hover:bg-theme md:hover:shadow-theme-none md:hover:text-theme md:hover:border-theme flex h-12.5 shrink-0 cursor-pointer items-center justify-center space-x-1 overflow-hidden rounded-lg border shadow-md transition duration-300 max-md:flex-1 max-md:hover:text-white md:h-10 md:w-20"
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
    <div
      class="page-number hidden w-full items-center justify-center gap-2 md:flex"
    >
      <div
        v-for="(item, index) in pageNumber"
        :key="index"
        class="flex size-10 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg transition-colors duration-300"
        :class="{
          'border-card-border hover:border-theme hover:shadow-theme-op hover:text-theme border shadow-md':
            item !== 'more',
          'text-card-background border-theme bg-theme shadow-theme-op shadow-md':
            item === currentPage,
        }"
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
        <span v-else>{{ item }}</span>
      </div>
      <!-- 快速跳转 -->
      <div
        v-tippy
        class="fast-jump"
        :class="[{ focus: inputFocus }]"
        title="快速跳转"
      >
        <input
          v-model.number="jumpInput"
          :min="1"
          :max="totalPages"
          @focus="inputFocus = true"
          @blur="fastJump"
          @input="validateInput"
          @keydown.enter="fastJump"
        >
        <Icon
          icon="mingcute:arrows-right-line"
          :class="[{ click: jumpInput }]"
          @click.stop="fastJump"
        />
      </div>
    </div>
    <div
      v-if="currentPage * limit < total"
      class="group text-font-color next bg-card-background border-card-border shadow-border-shadow max-md:hover:bg-theme md:hover:shadow-theme-none md:hover:text-theme md:hover:border-theme flex h-12.5 shrink-0 cursor-pointer items-center justify-center space-x-1 overflow-hidden rounded-lg border shadow-md transition duration-300 max-md:flex-1 max-md:hover:text-white md:h-10 md:w-20"
      @click="jumpPage(`${routePath}/page/${currentPage + 1}`, currentPage + 1)"
    >
      <span
        class="page-text ml-0 transition-[opacity,margin] duration-300 md:-ml-8 md:opacity-0 md:group-hover:ml-0 md:group-hover:opacity-100"
      >下页</span>
      <Icon icon="mingcute:right-fill" class="max-md:hidden" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-number {
  .fast-jump {
    position: relative;
    margin: 0 6px;

    input {
      border: none;
      outline: none;
      background: none;
      width: 40px;
      height: 40px;
      border-radius: 8px;
      padding: 0 8px;
      font-size: 16px;
      color: var(--main-font-color);
      background-color: var(--main-card-background);
      border: 1px solid var(--main-card-border);
      box-shadow: 0 8px 16px -4px var(--main-border-shadow);
      transition: all 0.3s;
    }

    svg {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 5px;
      right: 5px;
      width: 30px;
      height: 30px;
      border-radius: 4px;
      background-color: var(--main-card-background);
      transition:
        color 0.3s,
        opacity 0.3s,
        background-color 0.3s;
      cursor: pointer;

      &:hover {
        color: var(--main-card-background);
        background-color: var(--main-color);
      }
    }

    &.focus,
    &:hover {
      input {
        width: 100px;
        border-color: var(--main-color);
        box-shadow: 0 8px 16px -4px var(--main-color-bg);
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
}
</style>

<script lang="ts" setup>
import { useData } from '@/composables/data'
import { mainStore } from '@/store'
import { copyImage, copyText, downloadImage, shufflePost, smoothScrolling } from '@/utils/helper'
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'

const router = useRouter()
const store = mainStore()
const { theme } = useData()
const { useRightMenu, themeType, playerShow, playerVolume, playState, playerData }
  = storeToRefs(store)

// 右键菜单数据
const rightMenuX = ref(0)
const rightMenuY = ref(0)
const clickedType = ref('normal')
const clickedTypeData = ref('')
const rightMenuRef = useTemplateRef('rightMenuRef')
const rightMenuShow = ref(false)

// 快速评论
const commentCopyShow = ref(false)
const commentCopyData = ref<boolean | null>(null)

// 开启右键菜单
function openRightMenu(e: MouseEvent) {
  // 检测是否可开启
  if (e.ctrlKey || !useRightMenu.value)
    return true
  if (window.innerWidth < 768)
    return true
  e.preventDefault()
  rightMenuShow.value = false
  // 获取点击类型
  checkClickType(e?.target)
  nextTick().then(() => {
    // 处理菜单位置
    const calculateMenuPosition = () => {
      if (!rightMenuRef.value)
        return
      // 获取菜单的宽度和高度
      const menuWidth = rightMenuRef.value?.offsetWidth
      const menuHeight = rightMenuRef.value?.offsetHeight
      // 获取屏幕的宽度和高度
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight
      // 计算正确的坐标值
      let correctX = e.clientX
      let correctY = e.clientY
      // 保留边距
      const marginWidth = 20
      if (correctX + menuWidth > screenWidth - marginWidth) {
        correctX = screenWidth - menuWidth - marginWidth
      }
      if (correctY + menuHeight > screenHeight - marginWidth) {
        correctY = screenHeight - menuHeight - marginWidth
      }
      if (correctX < marginWidth) {
        correctX = marginWidth
      }
      if (correctY < marginWidth) {
        correctY = marginWidth
      }
      rightMenuX.value = correctX
      rightMenuY.value = correctY
    }
    // 显示菜单
    rightMenuShow.value = true
    // DOM 更新
    nextTick().then(() => calculateMenuPosition())
  })
}

// 关闭右键菜单
function closeRightMenu(e: MouseEvent) {
  e?.preventDefault()
  rightMenuShow.value = false
  rightMenuX.value = 0
  rightMenuY.value = 0
  clickedType.value = 'normal'
  clickedTypeData.value = null
  commentCopyData.value = false
}

// 判断点击元素类型
function checkClickType(target) {
  if (!target?.tagName)
    return false
  // 写入内容
  clickedTypeData.value
    = window.getSelection()?.toString().length > 0 ? window.getSelection().toString() : target
  switch (target.tagName) {
    case 'A':
      // 链接类型
      clickedType.value = 'link'
      break
    case 'IMG':
      // 图片类型
      clickedType.value = 'image'
      break
    case 'INPUT':
    case 'TEXTAREA':
      // 输入框类型
      clickedType.value = 'input'
      break
    default:
      if (window.getSelection()?.toString().length > 0) {
        // 已选中的文本
        clickedType.value = 'text'
      }
      else {
        // 普通模式
        clickedType.value = 'normal'
      }
      break
  }
}

// 右键菜单点击事件
async function rightMenuFunc(type) {
  try {
    if (!type)
      return false
    switch (type) {
      case 'back':
        window.history.back()
        break
      case 'forward':
        window.history.forward()
        break
      case 'reload':
        window.location.reload()
        break
      case 'open-link':
        window.open(clickedTypeData.value?.href)
        break
      case 'copy-link':
        const pageLink = theme.value.site + router.route.path
        if (pageLink)
          copyText(pageLink)
        break
      case 'input-paste':
        const text = await navigator.clipboard.readText()
        if (clickedTypeData.value && typeof clickedTypeData.value === 'object') {
          const inputElement = clickedTypeData.value
          const start = inputElement.selectionStart
          const end = inputElement.selectionEnd
          const value = inputElement.value
          // 在光标位置插入文本
          const newValue = value.substring(0, start) + text + value.substring(end)
          inputElement.value = newValue
          // 更新光标位置
          const newCursorPosition = start + text.length
          inputElement.setSelectionRange(newCursorPosition, newCursorPosition)
        }
        break
      default:
        return false
    }
  }
  catch (error) {
    window.$message.error('右键菜单发生错误，请重试')
    console.error('右键菜单出错：', error)
  }
}

// 播放器控制
function playerControl(type) {
  if (typeof $player !== 'object' || !type)
    return false
  switch (type) {
    case 'toggle':
      $player?.toggle()
      break
    case 'next':
      $player?.skipForward()
      $player?.play()
      break
    case 'prev':
      $player?.skipBack()
      $player?.play()
      break
    default:
      return false
  }
}

// 选中内容是否为链接
function isLink(data) {
  if (!data)
    return false
  const hasProtocol = /^(http|https):\/\//i.test(data)
  const urlData = hasProtocol ? data : `http://${data}`
  try {
    new URL(urlData)
    return urlData
  }
  catch (error) {
    return false
  }
}

// 评论选中内容
function commentCopy(data) {
  if (!data)
    return false
  let commentData = `> ${data.trim().replace(/\s+/g, ' ')}`
  if (commentData.length >= 200) {
    commentData = `${commentData.substring(0, 200)}...`
  }
  commentCopyData.value = commentData
  commentCopyShow.value = true
}

// 关闭快速评论
function commentCopyClose() {
  commentCopyShow.value = false
  if (typeof $comment !== 'undefined')
    $comment.reload()
}

defineExpose({ openRightMenu })
</script>

<template>
  <Teleport to="body">
    <!-- 右键菜单 -->
    <Transition name="fade" mode="out-in">
      <div
        v-if="rightMenuShow"
        class="right-menu"
        @click="rightMenuShow = false"
        @contextmenu.stop="closeRightMenu"
      >
        <div
          ref="rightMenuRef"
          :style="{
            left: `${rightMenuX}px`,
            top: `${rightMenuY}px`,
          }"
          class="menu-content s-card hover"
          @contextmenu.stop="closeRightMenu"
        >
          <div class="tools">
            <div class="btn" title="后退" @click="rightMenuFunc('back')">
              <Icon icon="mingcute:arrow-left-fill" />
            </div>
            <div class="btn" title="前进" @click="rightMenuFunc('forward')">
              <Icon icon="mingcute:arrow-right-fill" />
            </div>
            <div class="btn" title="刷新" @click="rightMenuFunc('reload')">
              <Icon icon="mingcute:refresh-1-fill" />
            </div>
            <div class="btn" title="返回顶部" @click="smoothScrolling()">
              <Icon icon="mingcute:arrow-up-fill" />
            </div>
          </div>
          <div class="all-menu">
            <div
              v-if="clickedType === 'normal'"
              class="btn"
              @click="router.go(shufflePost(theme.postData))"
            >
              <Icon icon="mingcute:shuffle-2-fill" />
              <span class="name">随便逛逛</span>
            </div>
            <div
              v-if="clickedType === 'normal'"
              class="btn"
              @click="router.go('/pages/categories')"
            >
              <Icon icon="mingcute:classify-2-fill" />
              <span class="name">全部分类</span>
            </div>
            <div v-if="clickedType === 'normal'" class="btn" @click="router.go('/pages/tags')">
              <Icon icon="mingcute:hashtag-fill" />
              <span class="name">全部标签</span>
            </div>
            <!-- 链接类型 -->
            <div v-if="clickedType === 'link'" class="btn" @click="rightMenuFunc('open-link')">
              <Icon icon="mingcute:external-link-fill" />
              <span class="name">新标签页打开</span>
            </div>
            <div
              v-if="clickedType === 'link'"
              class="btn"
              @click="
                copyText(clickedTypeData?.getAttribute('original-href') || clickedTypeData?.href)
              "
            >
              <Icon icon="mingcute:link-2-fill" />
              <span class="name">复制链接地址</span>
            </div>
            <!-- 图片类型 -->
            <div
              v-if="clickedType === 'image'"
              class="btn"
              @click="copyImage(clickedTypeData?.src)"
            >
              <Icon icon="mingcute:photo-album-fill" />
              <span class="name">复制此图片</span>
            </div>
            <div
              v-if="clickedType === 'image'"
              class="btn"
              @click="downloadImage(clickedTypeData?.src)"
            >
              <Icon icon="mingcute:file-download-fill" />
              <span class="name">下载此图片</span>
            </div>
            <!-- 输入框 -->
            <div
              v-if="clickedType === 'input' && typeof clickedTypeData.value === 'string'"
              class="btn"
              @click="rightMenuFunc('input-paste')"
            >
              <Icon icon="mingcute:paste-fill" />
              <span class="name">粘贴文本</span>
            </div>
            <!-- 选中文本 -->
            <a
              v-if="(clickedType === 'text' || clickedType === 'input') && isLink(clickedTypeData)"
              :href="`${isLink(clickedTypeData)}`"
              class="btn right-menu-link"
              target="_blank"
            >
              <Icon icon="mingcute:external-link-fill" />
              <span class="name">在新标签页打开</span>
            </a>
            <a
              v-if="clickedType === 'text' || clickedType === 'input'"
              :href="`https://www.baidu.com/s?wd=${encodeURIComponent(clickedTypeData)}`"
              class="btn right-menu-link"
              target="_blank"
            >
              <Icon icon="ri:baidu-fill" />
              <span class="name">使用百度搜索</span>
            </a>
            <a
              v-if="clickedType === 'text' || clickedType === 'input'"
              :href="`https://cn.bing.com/search?q=${encodeURIComponent(clickedTypeData)}`"
              class="btn right-menu-link"
              target="_blank"
            >
              <Icon icon="mdi:microsoft-bing" />
              <span class="name">使用必应搜索</span>
            </a>
            <div
              v-if="clickedType === 'text' || clickedType === 'input'"
              class="btn"
              @click="copyText(clickedTypeData)"
            >
              <Icon icon="mingcute:copy-fill" />
              <span class="name">复制选中文本</span>
            </div>
            <div
              v-if="clickedType === 'text' && !commentCopyShow && theme.comment.type === 'artalk'"
              class="btn"
              @click="commentCopy(clickedTypeData)"
            >
              <Icon icon="mingcute:comment-fill" />
              <span class="name">评论选中内容</span>
            </div>
          </div>
          <!-- 通用菜单 -->
          <div class="all-menu general">
            <!-- 版权协议 -->
            <div class="btn" @click="router.go('/pages/cc')">
              <Icon icon="tabler:accessible-filled" />
              <span class="name">版权协议</span>
            </div>
            <!-- 隐私政策 -->
            <div class="btn" @click="router.go('/pages/privacy')">
              <Icon icon="mingcute:safety-certificate-fill" />
              <span class="name">隐私政策</span>
            </div>
          </div>
          <div class="all-menu general">
            <!-- 复制地址 -->
            <div class="btn" @click="rightMenuFunc('copy-link')">
              <Icon icon="mingcute:copy-fill" />
              <span class="name">复制本页地址</span>
            </div>
            <!-- 明暗模式 -->
            <div class="btn" @click.stop="store.changeThemeType">
              <Icon
                :icon="
                  themeType === 'auto'
                    ? 'mingcute:history-anticlockwise-fill'
                    : themeType === 'dark'
                      ? 'mingcute:moon-fill'
                      : 'mingcute:sun-fill'
                "
              />
              <span class="name">
                {{
                  themeType === "auto" ? "跟随系统" : themeType === "dark" ? "深色模式" : "浅色模式"
                }}
              </span>
            </div>
          </div>
          <!-- 播放器控制 -->
          <div v-if="playerShow" class="all-menu general player">
            <div class="data">
              <span class="name">{{ playerData.name }}</span>
              <span class="artist">{{ playerData.artist }}</span>
            </div>
            <div class="volume" @click.stop>
              <Icon
                icon="material-symbols:volume-down-rounded"
                @click="playerVolume = Math.max(0, playerVolume - 0.1)"
              />

              <Slider :value="playerVolume" @update="(val) => (playerVolume = val)" />
              <Icon
                icon="material-symbols:volume-up-rounded"
                @click="playerVolume = Math.min(1, playerVolume + 0.1)"
              />
            </div>
            <div class="control" @click.stop>
              <div class="btn" title="上一曲" @click="playerControl('prev')">
                <Icon icon="material-symbols:skip-previous-rounded" />
              </div>
              <div v-if="playState" class="btn" title="暂停" @click="playerControl('toggle')">
                <Icon icon="material-symbols:pause-rounded" />
              </div>
              <div v-else class="btn" title="播放" @click="playerControl('toggle')">
                <Icon icon="material-symbols:play-arrow-rounded" />
              </div>
              <div class="btn" title="下一曲" @click="playerControl('next')">
                <Icon icon="material-symbols:skip-next-rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <!-- 快速评论 -->
    <Modal
      :show="commentCopyShow"
      title="快速评论"
      title-icon="chat"
      @mask-click="commentCopyClose"
      @modal-close="commentCopyClose"
    >
      <span class="modal-tip"> 您无需删除现有的输入框内容，直接在下方评论即可 </span>
      <Artalk :fill="commentCopyData" />
    </Modal>
  </Teleport>
</template>

<style lang="scss" scoped>
.right-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  transition: opacity 0.2s;
  .menu-content {
    position: absolute;
    width: 180px;
    background-color: var(--main-card-background);
    animation: fade-up 0.2s forwards;
    transition:
      opacity 0.3s,
      border-color 0.3s,
      box-shadow 0.3s,
      background-color 0.3s;
    .tools {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--main-card-border);
      .btn {
        width: 34px;
        height: 34px;
        min-width: 34px;
      }
    }
    .all-menu {
      margin-top: 12px;
      .btn {
        justify-content: flex-start;
        margin-bottom: 6px;
        svg {
          width: 20px;
          height: 20px;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
      &.general {
        padding-top: 12px;
        border-top: 1px solid var(--main-card-border);
      }
    }
    .player {
      .data {
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          width: 100%;
          padding: 0 8px;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .artist {
          font-size: 14px;
          margin-top: 4px;
          color: var(--main-font-second-color);
        }
      }
      .volume {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 6px;
        margin-top: 1rem;
        width: 100%;
        svg {
          color: var(--main-font-second-color);
          width: 20px;
          height: 20px;
          transition: color 0.3s;
          cursor: pointer;
          &:first-child {
            margin-right: 6px;
          }
          &:last-child {
            margin-left: 6px;
          }
          &:hover {
            color: var(--main-color);
          }
        }
      }
      .control {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        margin-top: 8px;
        .btn {
          padding: 6px;
          margin-bottom: 0;
          svg {
            width: 26px;
            height: 26px;
          }
        }
      }
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      padding: 8px;
      transition:
        color 0.3s,
        background-color 0.3s;
      svg {
        width: 20px;
        height: 20px;
        transition: color 0.3s;
      }
      .name {
        margin-left: 12px;
      }
      &:hover {
        color: var(--main-card-background);
        background-color: var(--main-color);
        svg {
          color: var(--main-card-background);
        }
      }
    }
  }
}
.modal-tip {
  font-size: 15px;
  margin-top: -4px;
  margin-bottom: 1rem;
  display: block;
  color: var(--main-font-second-color);
  border-left: 4px solid var(--main-card-border);
  border-radius: 4px;
  padding: 8px 0 8px 12px;
  background-color: var(--main-card-second-background);
}
</style>

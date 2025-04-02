<script lang="ts" setup>
import { useData } from '@/composables/data'
import { mainStore } from '@/store'
import { Icon } from '@iconify/vue'

const store = mainStore()
const router = useRouter()
const { theme } = useData()

// 菜单数据
const { nav, tagsData } = theme.value

// 页面跳转
function pageJump(url: string) {
  if (!url)
    return false
  store.changeShowStatus('mobileMenuShow')
  router.go(url)
}
</script>

<template>
  <Teleport to="body">
    <!-- 移动端菜单 -->
    <Transition name="fade" mode="out-in">
      <div v-show="store.mobileMenuShow" class="mobile-menu">
        <!-- 背景遮罩 -->
        <div
          class="menu-mask"
          @click="store.changeShowStatus('mobileMenuShow')"
        />
        <Transition name="toLeft" mode="out-in">
          <div
            v-show="store.mobileMenuShow"
            class="menu-content s-card bg-mask-background-deep rounded-none"
          >
            <!-- 关闭按钮 -->
            <div
              class="close-control"
              @click="store.changeShowStatus('mobileMenuShow')"
            >
              <Icon icon="mingcute:close-fill" />
            </div>
            <!-- 菜单 -->
            <div class="menu-list">
              <div v-for="(item, index) in nav" :key="index" class="menu-item">
                <span class="link-title"> {{ item.text }}</span>
                <div v-if="item.items" class="grid grid-cols-2 gap-3">
                  <div
                    v-for="{ link, icon, text } in item.items"
                    :key="text"
                    class="link-child-btn"
                    @click="pageJump(link)"
                  >
                    <Icon v-if="icon" :icon />
                    <span class="max-w-20 truncate">{{ text }}</span>
                  </div>
                </div>
              </div>
            </div>
            <hr>
            <!-- 标签 -->
            <div class="menu-item">
              <span class="link-title">标签</span>
              <div class="flex flex-wrap gap-1 text-sm">
                <div
                  v-for="(item, tag) in tagsData"
                  :key="tag"
                  class="border-card-border bg-card-background space-x-1 rounded-lg border px-2 py-0.5 transition-colors duration-300"
                  @click="pageJump(`/pages/tags/${tag}`)"
                >
                  <span class="max-w-20 truncate">{{ tag }}</span>
                  <sup class="opacity-40">{{ item.count }}</sup>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3000;

  .menu-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: var(--color-mask-background-deep);
  }

  .menu-content {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    max-width: 300px;
    padding: 20px;
    overflow: auto;

    .close-control {
      position: absolute;
      top: 10px;
      right: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 35px;
      height: 35px;
      padding: 0;
      transition:
        background-color 0.3s,
        opacity 0.3s;
      border-radius: 50%;
      cursor: pointer;

      svg {
        width: 18px;
        height: 18px;
        line-height: 1;
        color: var(--main-font-second-color);
        transition:
          color 0.3s,
          opacity 0.3s;
      }

      &:hover {
        background-color: var(--main-color);

        svg {
          color: var(--main-card-background);
        }
      }
    }

    .menu-list {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .menu-item {
      margin-bottom: 12px;

      .link-title {
        font-size: 14px;
        margin-bottom: 12px;
        display: inline-block;
        color: var(--main-font-second-color);
      }

      .link-child-btn {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        border-radius: 8px;
        padding: 10px 12px;
        background-color: var(--main-card-background);
        border: 1px solid var(--main-card-border);
        box-shadow: 0 8px 16px -4px var(--main-border-shadow);
        font-size: 15px;

        svg {
          margin-right: 6px;
          opacity: 0.6;
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    hr {
      margin: 1rem 0;
      opacity: 0.4;
      border: 1px dashed var(--main-font-second-color);
    }
  }
}
</style>

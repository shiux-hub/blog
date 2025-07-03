<!-- 全局设置 -->
<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'
import { mainStore } from '@/store'

const store = mainStore()
const {
  themeType,
  fontFamily,
  fontSize,
  infoPosition,
  backgroundType,
  backgroundUrl,
  bannerType,
} = storeToRefs(store)
</script>

<template>
  <div class="settings">
    <div class="set-btn card" @click="store.changeShowStatus('showSettings')">
      <Icon icon="mingcute:palette-2-fill" class="size-5.5 shrink-0" />
      <span class="set-text">个性化配置</span>
    </div>
    <!-- 设置面板 -->
    <Modal
      :show="store.showSettings"
      title-icon="style"
      @mask-click="store.changeShowStatus('showSettings')"
      @modal-close="store.changeShowStatus('showSettings')"
    >
      <div class="set-list">
        <span class="title">字体</span>
        <div class="set-item">
          <span class="set-label">全站字体</span>
          <div class="set-options">
            <span
              class="options"
              :class="[{ choose: fontFamily === 'hmos' }]"
              @click="fontFamily = 'hmos'"
            >
              HarmonyOS Sans
            </span>
            <span
              class="options"
              :class="[{ choose: fontFamily === 'lxgw' }]"
              @click="fontFamily = 'lxgw'"
            >
              霞鹜文楷
            </span>
          </div>
        </div>
        <div class="set-item">
          <span class="set-label">全站字体大小</span>
          <div class="set-options">
            <span class="options" @click="store.changeFontSize(false)">
              -
            </span>
            <span class="num">{{ fontSize }}</span>
            <span class="options" @click="store.changeFontSize(true)"> + </span>
          </div>
        </div>
        <span class="title">壁纸个性化</span>
        <div class="set-item">
          <span class="set-label">全站背景</span>
          <div class="set-options">
            <span
              class="options"
              :class="[{ choose: backgroundType === 'close' }]"
              @click="backgroundType = 'close'"
            >
              关闭
            </span>
            <span
              class="options"
              :class="[{ choose: backgroundType === 'patterns' }]"
              @click="backgroundType = 'patterns'"
            >
              纹理
            </span>
            <span
              class="options"
              :class="[{ choose: backgroundType === 'image' }]"
              @click="((backgroundType = 'image'), (themeType = 'dark'))"
            >
              图片
            </span>
          </div>
        </div>
        <div v-if="backgroundType === 'image'" class="set-item">
          <span class="set-label">背景图片地址</span>
          <div class="set-options">
            <input
              v-model="backgroundUrl"
              v-tippy
              type="url"
              pattern="https?://.+"
              title="请输入有效的网址，例如：http://www.example.com"
              required
            >
          </div>
        </div>
        <span class="title">首页样式</span>
        <div class="set-item">
          <span class="set-label">Banner 高度</span>
          <div class="set-options">
            <span
              class="options"
              :class="{ choose: bannerType === 'half' }"
              @click="bannerType = 'half'"
            >
              半屏
            </span>
            <span
              class="options"
              :class="{ choose: bannerType === 'full' }"
              @click="bannerType = 'full'"
            >
              全屏
            </span>
          </div>
        </div>
        <span class="title">杂项调整</span>
        <div class="set-item">
          <span class="set-label">额外信息显示位置</span>
          <div class="set-options">
            <span
              class="options"
              :class="[{ choose: infoPosition === 'normal' }]"
              @click="infoPosition = 'normal'"
            >
              默认位置
            </span>
            <span
              class="options"
              :class="[{ choose: infoPosition === 'fixed' }]"
              @click="infoPosition = 'fixed'"
            >
              右下角
            </span>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style scoped>
.settings {
  .set-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    inline-size: 42px;
    block-size: 42px;
    padding: 0;
    cursor: pointer;
    border-radius: 25px;
    box-shadow: 0 6px 10px -4px var(--color-dark-shadow);

    svg {
      margin-inline-start: 10px;
      transition: color 0.3s;
    }

    .set-text {
      display: inline-flex;
      margin-inline-start: 10px;
      overflow: hidden;
      font-size: 14px;
      line-height: 1;
      white-space: nowrap;
      opacity: 0%;
      transition: opacity 0.3s;
    }

    &:hover {
      inline-size: 140px;
      color: var(--color-card-background);
      background-color: var(--color-theme);
      border-color: var(--color-theme);

      .set-text {
        opacity: 100%;
      }
    }
  }
}

.set-list {
  .title {
    display: block;
    inline-size: 100%;
    padding: 6px 0 6px 12px;
    margin: 1rem 0;
    font-size: 16px;
    font-weight: bold;
    background-color: var(--color-border-shadow);
    border-inline-start: 4px solid var(--color-theme);
    border-radius: 4px 8px 8px 4px;

    &:first-child {
      margin-block-start: 0;
    }
  }

  .set-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-block-end: 12px;

    .set-options {
      display: flex;
      flex-direction: row;
      align-items: center;
      block-size: 40px;
      border-radius: 8px;

      .options {
        display: flex;
        align-items: center;
        justify-content: center;
        min-inline-size: 30px;
        padding: 6px 8px;
        margin: 4px 8px;
        font-size: 0.9375rem;
        background-color: var(--color-card-border);
        border-radius: 8px;
        transition:
          color 0.3s,
          background-color 0.3s;

        &.choose,
        &:hover {
          color: var(--color-card-background);
          background-color: var(--color-theme);
          box-shadow: 0 8px 16px -4px var(--color-border-shadow);
        }

        &:last-child {
          margin-inline-end: 0;
        }
      }

      .num {
        margin: 0 4px;
      }

      input {
        block-size: 100%;
        padding: 0 1rem;
        font-size: 14px;
        color: var(--color-font-color);
        background-color: var(--color-border-shadow);
        border: none;
        border-radius: 8px;
        outline: none;
      }
    }

    &:last-child {
      margin-block-end: 0;
    }

    @media (max-width: 512px) {
      flex-direction: column;
      align-items: flex-start;

      .set-options {
        margin-block-start: 8px;

        .options {
          &:first-child {
            margin-inline-start: 0;
          }
        }
      }
    }
  }
}
</style>

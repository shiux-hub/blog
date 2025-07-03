<script lang="ts" setup>
import type { TimeDifferenceRecord } from '@/utils/timeTools'
import { useData } from '@/composables/data'
import { getDaysUntil, getTimeRemaining } from '@/utils/timeTools'

const { theme } = useData()

// 倒计时数据
const remainData = ref<TimeDifferenceRecord | null>(null)
const remainInterval = ref<number>()

// 获取倒计时数据
function getRemainData() {
  remainData.value = getTimeRemaining()
  remainInterval.value = setInterval(() => {
    remainData.value = getTimeRemaining()
  }, 1000)
}

onMounted(() => {
  getRemainData()
})

onBeforeUnmount(() => {
  if (remainInterval.value)
    clearInterval(remainInterval.value)
})
</script>

<template>
  <!-- 倒计时 -->
  <div class="count-down card cursor-pointer">
    <div class="count-left">
      <span class="text"> 距离 </span>
      <span class="name">{{ theme.aside.countDown.data.name }}</span>
      <span class="time">
        {{ getDaysUntil(theme.aside.countDown.data.date) }}
      </span>
      <span class="date">{{ theme.aside.countDown.data.date }}</span>
    </div>
    <div v-if="remainData" class="count-right">
      <div
        v-for="(item, tag, index) in remainData"
        :key="index"
        class="count-item"
      >
        <div class="item-name">
          {{ item.name }}
        </div>
        <div class="item-progress">
          <div
            class="progress-bar"
            :style="{
              width: `${item.percentage}%`,
              opacity: item.percentage / 100,
            }"
          />
          <span class="percentage" :class="[{ many: item.percentage >= 46 }]">
            {{ item.percentage }}%
          </span>
          <span class="remaining" :class="[{ many: item.percentage >= 60 }]">
            <span class="tip">还剩</span>
            {{ item.remaining }}
            <span class="tip">{{ tag === 'day' ? '小时' : '天' }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.count-down {
  display: flex;
  flex-direction: row;
  align-items: center;

  .count-left {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin-inline-end: 0.8rem;

    .text {
      font-size: 14px;
      color: var(--color-font-second-color);
    }

    .name {
      margin-block-start: 2px;
      font-size: 18px;
      font-weight: bold;
    }

    .time {
      margin: 4px 0;
      font-size: 30px;
      font-weight: bold;
      color: var(--color-theme);
    }

    .date {
      font-size: 12px;
      opacity: 60%;
    }

    &::after {
      position: absolute;
      inset-inline-end: -0.8rem;
      inline-size: 2px;
      block-size: 80%;
      content: '';
      background-color: var(--color-card-border);
    }
  }

  .count-right {
    flex: 1;
    inline-size: 100%;
    margin-inline-start: 0.8rem;

    .count-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      block-size: 24px;
      margin: 6px 0;

      .item-name {
        margin-inline-end: 0.8rem;
        font-size: 14px;
        color: var(--color-font-second-color);
        white-space: nowrap;
      }

      .item-progress {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        inline-size: 100%;
        block-size: 100%;
        overflow: hidden;
        background-color: var(--color-theme-op);
        border-radius: 8px;

        .progress-bar {
          block-size: 100%;
          background-color: var(--color-theme);
          border-radius: 8px;
        }

        .percentage,
        .remaining {
          position: absolute;
          margin: 0 6px;
          font-size: 12px;
          transition:
            opacity 0.3s,
            transform 0.3s;

          &.many {
            color: #fff;

            .tip {
              opacity: 80%;
            }
          }
        }

        .remaining {
          opacity: 0%;
          transform: translateX(10px);

          .tip {
            opacity: 60%;
          }
        }
      }
    }
  }

  &:hover {
    .count-right {
      .remaining {
        opacity: 100% !important;
        transform: translateX(0) !important;
      }

      .percentage {
        opacity: 0% !important;
        transform: translateX(-10px) !important;
      }
    }
  }
}
</style>

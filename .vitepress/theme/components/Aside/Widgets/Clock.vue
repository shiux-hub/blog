<script lang="ts" setup>
// 指针数据
const hourRotate = ref(315)
const minuteRotate = ref(45)
const secondRotate = ref(180)
const pointerInterval = ref<number>()

// 计算指针旋转角度
function updatePointer() {
  // 计算角度
  const calculateRotation = (time: number, total: number) => {
    return (time / total) * 360
  }
  // 更改样式
  const changeStyle = () => {
    const now = new Date()
    const hour = now.getHours() % 12
    const minute = now.getMinutes()
    const second = now.getSeconds()
    hourRotate.value = calculateRotation(hour, 12)
    minuteRotate.value = calculateRotation(minute, 60)
    secondRotate.value = calculateRotation(second, 60)
  }
  // 每秒更新
  changeStyle()
  pointerInterval.value = setInterval(changeStyle, 1000)
}

onMounted(() => {
  updatePointer()
})

onBeforeUnmount(() => {
  if (pointerInterval.value)
    clearInterval(pointerInterval.value)
})
</script>

<template>
  <div class="clock">
    <div class="clock-content">
      <div
        :style="{ transform: ` rotate(${hourRotate}deg)` }"
        class="pointer hour"
      />
      <div
        :style="{ transform: ` rotate(${minuteRotate}deg)` }"
        class="pointer minute"
      />
      <div
        :style="{ transform: ` rotate(${secondRotate}deg)` }"
        class="pointer second"
      />
    </div>
  </div>
</template>

<style scoped>
.clock {
  inline-size: 160px;
  block-size: 160px;
  overflow: hidden;
  background-image: linear-gradient(to bottom, #505152, #2e2f30);
  border: 6px solid var(--color-card-background);
  border-radius: 50%;
  box-shadow: 0 8px 16px -4px var(--color-border-shadow);

  .clock-content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    inline-size: 100%;
    block-size: 100%;
    border-radius: 50%;
    box-shadow: inset 0 0 16px -6px #191a1b;

    .pointer {
      position: absolute;
      inset-block-end: calc(50% - 5px);
      border-radius: 25px;
      box-shadow: 0 0 10px 0 #191a1b;

      &.hour {
        z-index: 2;
        inline-size: 10px;
        block-size: 40px;
        background-color: #e4e4e4;
        transform-origin: 5px 35px;
      }

      &.minute {
        z-index: 1;
        inline-size: 8px;
        block-size: 55px;
        background-color: #d2d2d2;
        transform-origin: 4px 50px;
      }

      &.second {
        z-index: 3;
        inline-size: 4px;
        block-size: 60px;
        background-color: #a51b1d;
        transform-origin: 2px 55px;

        &::after {
          position: absolute;
          inset-block-end: -6px;
          inline-size: 4px;
          block-size: 10px;
          content: '';
          background-color: #a51b1d;
          border-radius: 25px;
        }
      }
    }

    &::after {
      position: absolute;
      z-index: 4;
      inline-size: 8px;
      block-size: 8px;
      content: '';
      background-color: #a51b1d;
      border-radius: 50%;
    }
  }
}
</style>

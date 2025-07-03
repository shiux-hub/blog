<!-- 打赏按钮 -->
<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { useData } from '@/composables/data'

withDefaults(
  defineProps<{
    showJump?: boolean
  }>(),
  {
    showJump: true,
  },
)
const router = useRouter()
const { theme } = useData()
const { rewardData } = theme.value

// 赞赏显示
const rewardShow = ref(false)

// 跳转至赞赏名单
function toRewardList() {
  rewardShow.value = false
  router.go('/pages/thanks')
}
</script>

<template>
  <div v-if="rewardData.enable" class="reward">
    <div class="reward-btn" @click="rewardShow = true">
      <Icon icon="mingcute:certificate-fill" />
      <span class="text">赞赏博主</span>
    </div>
    <!-- 设置面板 -->
    <Modal
      :show="rewardShow"
      :max-width="430"
      title-icon="reward"
      @mask-click="rewardShow = false"
      @modal-close="rewardShow = false"
    >
      <div class="reward-card">
        <span class="thank">🙏 感谢您赐予我前进的力量</span>
        <div class="qr">
          <a
            v-if="rewardData?.wechat"
            :href="rewardData.wechat"
            class="qr-img"
            target="_blank"
          >
            <img
              v-if="rewardData?.wechat"
              :src="rewardData.wechat"
              alt="微信"
            >
            <span class="tip">
              <Icon icon="mingcute:wechat-pay-fill" />
              微信
            </span>
          </a>
          <a
            v-if="rewardData?.alipay"
            :href="rewardData.alipay"
            class="qr-img"
            target="_blank"
          >
            <img
              v-if="rewardData?.alipay"
              :src="rewardData.alipay"
              alt="支付宝"
            >
            <span class="tip">
              <Icon icon="mingcute:alipay-fill" />
              支付宝
            </span>
          </a>
        </div>
        <div
          v-if="showJump"
          class="all-list card hover cursor-pointer"
          @click="toRewardList"
        >
          <span class="title">全部赞赏者名单</span>
          <span class="tip">
            赞赏金额将全部用于开源项目维护，以及服务器、域名及各类云服务的开销
          </span>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style scoped>
.reward {
  position: relative;
  display: flex;
  justify-content: center;
  inline-size: max-content;
  margin: 1rem auto;
  cursor: pointer;
  user-select: none;

  .reward-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    inline-size: 120px;
    block-size: 40px;
    color: #fff;
    background-color: var(--color-red);
    border-radius: 8px;
    transition: box-shadow 0.5s;

    svg {
      margin-inline-end: 6px;
    }

    &:hover {
      box-shadow: 0 0 40px 6px #ff384270;
    }
  }
}

.reward-card {
  .thank {
    display: inline-flex;
    justify-content: center;
    inline-size: 100%;
    margin-block-end: 1rem;
    font-weight: bold;
    color: var(--color-theme);
  }

  .qr {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    .qr-img {
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        inline-size: 100%;
        block-size: auto;
        overflow: hidden;
        border-radius: 16px;
      }

      .tip {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-block-start: 0.8rem;

        svg {
          inline-size: 18px;
          block-size: 18px;
          margin-inline-end: 6px;
        }
      }

      &:hover {
        svg {
          color: var(--color-theme);
        }
      }
    }
  }

  .all-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-block-start: 20px;
    background-color: var(--color-card-second-background);

    .title {
      margin-block-end: 8px;
      font-size: 18px;
      font-weight: bold;
      transition: color 0.3s;
    }

    .tip {
      font-size: 12px;
      text-align: center;
      opacity: 60%;
    }

    &:hover {
      .title {
        color: var(--color-theme);
      }
    }
  }
}
</style>

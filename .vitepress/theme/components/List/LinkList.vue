<script lang="ts" setup>
withDefaults(
  defineProps<{
    // 列表数据
    listData: {
      type?: string
      typeName: string
      typeDesc: string
      typeList: {
        name: string
        desc: string
        url: string
        avatar?: string
        ico?: string
      }[]
    }[]
    // 显示数量
    showCount?: boolean
    useFriendsLink?: boolean
  }>(),
  {
    showCount: true,
    useFriendsLink: false,
  },
)
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div v-if="listData?.length" class="space-y-8">
      <div
        v-for="(type, index) in listData"
        :key="index"
        class="link-type-list"
      >
        <div class="title">
          <h2 class="name">
            <span class="name-text">{{ type?.typeName || '未知分组' }}</span>
            <span v-if="showCount" class="name-count">（{{ type?.typeList?.length || 0 }}）</span>
          </h2>
          <span class="tip">{{ type?.typeDesc || '分组暂无简介' }}</span>
        </div>
        <div v-if="type?.typeList" class="all-link">
          <a
            v-for="(link, key) in type.typeList"
            :key
            class="link-card card"
            :class="[
              {
                'loss': type?.type === 'loss',
                'cf-friends-link': type?.type !== 'loss' && useFriendsLink,
              },
            ]"
            :href="type?.type !== 'loss' ? link.url : undefined"
            target="_blank"
          >
            <div class="cover">
              <LazyLoader :use-friends-link="link.avatar || link.ico">
                <img
                  :src="link.avatar || link.ico"
                  class="cover-img"
                  :class="[{ 'cf-friends-avatar': useFriendsLink }]"
                  :alt="link?.name || 'cover'"
                  @load="
                    (e) =>
                      (e.target as HTMLImageElement)?.classList?.add('loaded')
                  "
                >
              </LazyLoader>
            </div>
            <div class="data">
              <span
                class="name"
                :class="[{ 'cf-friends-name': useFriendsLink }]"
              >{{ link.name }}</span>
              <span class="desc">{{ link.desc }}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div v-else class="no-data">
      暂无友链数据
    </div>
  </Transition>
</template>

<style scoped>
.link-type-list {
  .title {
    margin-block-end: 1.6rem;
    margin-inline-start: 6px;

    .name {
      margin-block-end: 4px;
      border-block-end: none;

      .name-count {
        color: var(--color-font-second-color);
      }
    }

    .tip {
      color: var(--color-font-second-color);
    }
  }

  .all-link {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;

    .link-card {
      display: flex;
      flex-direction: row;
      align-items: center;
      inline-size: 100%;
      block-size: 90px;
      padding: 12px;

      &.loss {
        pointer-events: none;
      }

      .cover {
        display: flex;
        align-items: center;
        justify-content: center;
        inline-size: 60px;
        min-inline-size: 60px;
        block-size: 60px;
        margin-inline-end: 20px;
        overflow: hidden;
        background: linear-gradient(
          90deg,
          var(--color-card-border) 25%,
          var(--color-card-background) 37%,
          var(--color-card-border) 63%
        );
        background-size: 400% 100%;
        border-radius: 50%;
        transition: all 0.6s;
        animation: skeleton-loading 1.4s ease infinite;

        .cover-img {
          inline-size: 100%;
          block-size: 100%;
          background-color: var(--color-card-background);
          filter: blur(10px);
          opacity: 0%;
          transition:
            filter 0.3s,
            opacity 0.3s;

          &.loaded {
            filter: blur(0);
            opacity: 100%;
          }
        }
      }

      .data {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        inline-size: 100%;
        block-size: 100%;

        .name {
          display: -webkit-box;
          overflow: hidden;
          font-size: 18px;
          font-weight: bold;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          white-space: nowrap;
          -webkit-box-orient: block-axis;
        }

        .desc {
          display: -webkit-box;
          margin-block-start: 4px;
          overflow: hidden;
          font-size: 15px;
          line-height: 1.2;
          color: var(--color-font-second-color);
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          transition:
            color 0.3s,
            opacity 0.3s;
          -webkit-box-orient: block-axis;
        }
      }

      &:hover {
        color: var(--color-card-background);
        background-color: var(--color-theme);
        border-color: var(--color-theme);
        box-shadow: 0 0 16px 6px var(--color-theme-op);

        .cover {
          inline-size: 0;
          min-inline-size: 0;
          block-size: 0;
          margin-inline-end: 6px;
          opacity: 0%;
        }

        .data {
          .desc {
            color: var(--color-card-background);
            opacity: 70%;
          }
        }
      }
    }

    @media (max-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 992px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 576px) {
      grid-template-columns: 1fr;
    }
  }
}

.no-data {
  margin-block-start: 40px;
  font-size: 1.4rem;
  font-weight: bold;
  text-align: center;
}
</style>

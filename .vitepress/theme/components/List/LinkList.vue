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
    margin-left: 6px;
    margin-bottom: 1.6rem;
    .name {
      border-bottom: none;
      margin-bottom: 4px;
      .name-count {
        color: var(--main-font-second-color);
      }
    }
    .tip {
      color: var(--main-font-second-color);
    }
  }
  .all-link {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(5, 1fr);
    .link-card {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 90px;
      width: 100%;
      padding: 12px;
      &.loss {
        pointer-events: none;
      }
      .cover {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        min-width: 60px;
        margin-right: 20px;
        border-radius: 50%;
        overflow: hidden;
        background: linear-gradient(
          90deg,
          var(--main-card-border) 25%,
          var(--main-card-background) 37%,
          var(--main-card-border) 63%
        );
        background-size: 400% 100%;
        animation: skeleton-loading 1.4s ease infinite;
        transition: all 0.6s;
        .cover-img {
          width: 100%;
          height: 100%;
          background-color: var(--main-card-background);
          opacity: 0;
          filter: blur(10px);
          transition:
            filter 0.3s,
            opacity 0.3s;
          &.loaded {
            opacity: 1;
            filter: blur(0);
          }
        }
      }
      .data {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .name {
          font-weight: bold;
          font-size: 18px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          line-clamp: 1;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          white-space: nowrap;
        }
        .desc {
          font-size: 15px;
          margin-top: 4px;
          line-height: 1.2;
          color: var(--main-font-second-color);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          line-clamp: 2;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          transition:
            color 0.3s,
            opacity 0.3s;
        }
      }
      &:hover {
        color: var(--main-card-background);
        background-color: var(--main-color);
        border-color: var(--main-color);
        box-shadow: 0 0 16px 6px var(--main-color-bg);
        .cover {
          margin-right: 6px;
          min-width: 0;
          opacity: 0;
          width: 0;
          height: 0;
        }
        .data {
          .desc {
            opacity: 0.7;
            color: var(--main-card-background);
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
  text-align: center;
  margin-top: 40px;
  font-size: 1.4rem;
  font-weight: bold;
}
</style>

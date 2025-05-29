<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { useData } from '@/composables/data'

const { theme } = useData()
const router = useRouter()
</script>

<template>
  <div class="archives card flex flex-col gap-2 p-8">
    <div class="flex gap-2 font-bold">
      <div class="border-none text-3xl leading-[2em]">
        文章
        <sup
          v-if="theme.postData?.length"
          class="-top-[1em] text-base opacity-60"
        >{{ theme.postData.length }}</sup>
      </div>
    </div>
    <div class="archives-list">
      <div
        v-for="(year, index) in theme.archivesData.year"
        :key="index"
        class="year-list"
      >
        <span class="year">{{ year }}</span>
        <div class="posts">
          <div
            v-for="(post, postIndex) in theme.archivesData.data[year].articles"
            :key="postIndex"
            class="posts-item card hover:border-theme hover:shadow-xm hover:shadow-theme-op cursor-pointer hover:border"
            @click="router.go(post.regularPath)"
          >
            <span class="title">{{ post.title }}</span>
            <div class="tags">
              <a
                v-for="(tags, tagsIndex) in post.tags"
                :key="tagsIndex"
                :href="`/pages/tags/${tags}`"
                class="type-item"
              >
                <Icon icon="mingcute:hashtag-fill" />
                <span class="name">{{ tags }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.archives {
  padding: 2rem;

  .archives-list {
    .year-list {
      margin-bottom: 2rem;

      .year {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 6px;
        padding-left: 12px;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 1rem;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          width: 4px;
          height: 70%;
          background-color: var(--color-theme);
          border-radius: 8px;
        }
      }

      .posts {
        .posts-item {
          padding: 20px;
          margin-bottom: 1rem;

          .title {
            margin-bottom: 16px;
            font-size: 18px;
            font-weight: bold;
            transition: color 0.3s;
          }

          .tags {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            align-items: center;
            opacity: 0.6;

            .type-item {
              font-size: 14px;
              display: flex;
              flex-direction: row;
              align-items: center;
              margin-right: 8px;

              .name {
                transition: color 0.3s;
              }

              svg {
                margin-right: 2px;
                transition: color 0.3s;
              }

              &:hover {
                .name,
                svg {
                  color: var(--color-theme);
                }
              }
            }
          }

          &:last-child {
            margin-bottom: 0;
          }

          &:hover {
            .title {
              color: var(--color-theme);
            }
          }
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>

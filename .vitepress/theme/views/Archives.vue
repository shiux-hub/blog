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
      margin-block-end: 2rem;

      .year {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-inline-start: 12px;
        margin-block-end: 1rem;
        margin-inline-start: 6px;
        font-size: 20px;
        font-weight: bold;

        &::before {
          position: absolute;
          inset-inline-start: 0;
          inline-size: 4px;
          block-size: 70%;
          content: '';
          background-color: var(--color-theme);
          border-radius: 8px;
        }
      }

      .posts {
        .posts-item {
          padding: 20px;
          margin-block-end: 1rem;

          .title {
            margin-block-end: 16px;
            font-size: 18px;
            font-weight: bold;
            transition: color 0.3s;
          }

          .tags {
            display: flex;
            flex-flow: row wrap;
            align-items: center;
            opacity: 60%;

            .type-item {
              display: flex;
              flex-direction: row;
              align-items: center;
              margin-inline-end: 8px;
              font-size: 14px;

              .name {
                transition: color 0.3s;
              }

              svg {
                margin-inline-end: 2px;
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
            margin-block-end: 0;
          }

          &:hover {
            .title {
              color: var(--color-theme);
            }
          }
        }
      }

      &:last-child {
        margin-block-end: 0;
      }
    }
  }
}
</style>

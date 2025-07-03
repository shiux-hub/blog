<!-- 全局搜索 -->
<script lang="ts" setup>
import { liteClient } from 'algoliasearch/lite'
import { mainStore } from '@/store'

const store = mainStore()
const router = useRouter()

const searchClient = liteClient(appId, apiKey)

// 是否具有搜索词
const hasSearchValue = ref(false)

// 搜索变化
function searchChange({ uiState, setUiState }) {
  const searchData = Object.values(uiState)
  hasSearchValue.value
    = searchData.length > 0 && searchData[0].query?.length > 0
  setUiState(uiState)
}

// 处理搜索结果
function formatSearchData(data) {
  const results = []
  // 遍历搜索结果
  for (let i = 0; i < data.length; i++) {
    const search = data[i]
    // 若无 anchor
    // if (search.anchor === "" || search.anchor === "app") continue;
    // 获取数据
    const url = search?.url
    const type = search.type === 'lvl1' ? 'post' : 'content'
    const title = search._highlightResult?.hierarchy?.lvl1?.value
    const anchor = search._highlightResult?.hierarchy?.[search.type]?.value
    const content = search._highlightResult?.content?.value
    // 生成搜索数据
    const searchData = { url, type, title, anchor, content }
    results.push(searchData)
  }
  console.log(results)
  return results
}

// 跳转搜索结果
function jumpSearch(url: string) {
  store.changeShowStatus('searchShow')
  router.go(url)
}

onBeforeUnmount(() => {
  hasSearchValue.value = false
})
</script>

<template>
  <Modal
    v-tippy
    :show="store.searchShow"
    title="全局搜索"
    title-icon="search"
    @mask-click="store.changeShowStatus('searchShow')"
    @modal-close="store.changeShowStatus('searchShow')"
  >
    <ais-instant-search
      :search-client="searchClient"
      :future="{
        preserveSharedStateOnUnmount: true,
      }"
      index-name="imsyy"
      @state-change="searchChange"
    >
      <ais-configure :hits-per-page.camel="8" />
      <ais-search-box placeholder="想要搜点什么" autofocus />
      <ais-hits v-if="hasSearchValue">
        <template #default="{ items }">
          <Transition name="fade" mode="out-in">
            <div v-if="formatSearchData(items)?.length" class="search-list">
              <div
                v-for="(item, index) in formatSearchData(items)"
                :key="index"
                class="search-item card hover cursor-pointer"
                @click="jumpSearch(item.url)"
              >
                <p class="title" v-html="item.title" />
                <p v-if="item?.anchor" class="anchor" v-html="item.anchor" />
                <p
                  v-if="item?.content"
                  class="content card cursor-pointer"
                  v-html="item.content"
                />
              </div>
            </div>
            <div v-else class="no-result">
              <Icon icon="material-symbols:search-off" />
              <span class="text">搜索结果为空</span>
            </div>
          </Transition>
        </template>
      </ais-hits>
      <ais-pagination v-if="hasSearchValue" />
      <ais-stats>
        <template #default="{ processingTimeMS }">
          <div class="information">
            <span v-if="hasSearchValue" class="text">
              本次用时 {{ processingTimeMS }} 毫秒
            </span>
          </div>
          <a class="power" href="https://www.algolia.com/" target="_blank">
            <Icon icon="tabler:brand-algolia" />
            <span class="name">Algolia</span>
          </a>
        </template>
      </ais-stats>
    </ais-instant-search>
  </Modal>
</template>

<style scoped>
.ais-InstantSearch {
  block-size: 100%;

  .ais-SearchBox {
    inline-size: 100%;
    block-size: 40px;

    .ais-SearchBox-input {
      inline-size: 100%;
      padding: 0.6rem 1rem;
      font-size: 16px;
      color: var(--color-font-color);
      background-color: var(--color-card-second-background);
      border: 1px solid var(--color-card-border);
      border-radius: 8px;
      outline: none;
      transition:
        border-color 0.3s,
        box-shadow 0.3s;

      &:focus {
        border-color: var(--color-theme);
        box-shadow: 0 8px 16px -4px var(--color-theme-op);
      }

      &::-webkit-search-cancel-button {
        display: none;
      }
    }

    .ais-SearchBox-loadingIndicator,
    .ais-SearchBox-submit,
    .ais-SearchBox-reset {
      display: none;
    }
  }

  .ais-Hits {
    block-size: 100%;
    min-block-size: 300px;
    margin-block-start: 20px;

    .no-result {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      block-size: 300px;

      svg {
        inline-size: 40px;
        block-size: 40px;
        margin-block-end: 12px;
      }

      .text {
        font-size: 18px;
        opacity: 60%;
      }
    }

    .search-list {
      .search-item {
        margin-block-end: 12px;

        .title {
          display: inline;
          margin-block-end: 6px;
          font-size: 16px;
        }

        .anchor {
          margin-block-start: 6px;
          font-size: 14px;
          color: var(--color-font-second-color);

          &::before {
            content: '# ';
          }
        }

        .content {
          padding: 8px;
          margin-block-start: 0.8rem;
          font-size: 12px;
          color: var(--color-font-second-color);
          border-radius: 8px;
        }

        p {
          margin: 0;

          mark {
            color: var(--color-theme);
            background-color: transparent;
          }
        }

        &:last-child {
          margin-block-end: 0;
        }
      }
    }
  }

  .ais-Pagination {
    margin-block-start: 20px;

    .ais-Pagination-list {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin: 0;
      list-style: none;

      .ais-Pagination-item {
        inline-size: 30px;
        block-size: 30px;
        margin: 0 4px;
        cursor: pointer;
        border-radius: 8px;
        transition: background-color 0.3s;

        .ais-Pagination-link {
          display: flex;
          align-items: center;
          justify-content: center;
          inline-size: 100%;
          block-size: 100%;

          &:hover {
            color: var(--color-font-color);
          }
        }

        &.ais-Pagination-item--selected {
          font-weight: bold;
          background-color: var(--color-theme);

          .ais-Pagination-link {
            color: var(--color-card-border);
          }
        }

        &.ais-Pagination-item--disabled,
        &.ais-Pagination-item--nextPage,
        &.ais-Pagination-item--lastPage {
          opacity: 80%;
        }

        &:hover {
          color: var(--color-font-color);
          background-color: var(--color-theme);

          .ais-Pagination-link {
            color: var(--color-card-border);
          }
        }
      }
    }
  }

  .ais-Stats {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-block-start: 20px;
    font-size: 14px;
    opacity: 80%;

    .power {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 16px;
      opacity: 60%;
      transition:
        color 0.3s,
        opacity 0.3s;

      svg {
        inline-size: 20px;
        block-size: 20px;
        margin-inline-end: 4px;
        transition: color 0.3s;
      }

      .name {
        font-weight: bold;
      }

      &:hover {
        color: var(--color-theme);
        opacity: 100%;
      }
    }

    @media (max-width: 512px) {
      justify-content: center;

      .information {
        display: none;
      }
    }
  }
}
</style>

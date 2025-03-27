import type { Router } from 'vitepress'
import type { App } from 'vue'
// 根组件
import RootApp from '@/App.vue'
import LazyLoader from '@/components/LazyLoader.vue'
import { routeChange } from '@/utils/initTools'
import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import { h } from 'vue'

// InstantSearch
import InstantSearch from 'vue-instantsearch/vue3/es'
// 全局样式
import '@/style/main.scss'

// pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// Theme
const Theme = {
  // extends: Theme,
  Layout: () => {
    return h(RootApp)
  },
  enhanceApp({ app, router }: {
    app: App
    router: Router
  }) {
    // 挂载
    app.use(pinia)
    app.use(InstantSearch)
    app.component('LazyLoader', LazyLoader)
    // 插件
    enhanceAppWithTabs(app)
    // 路由守卫
    router.onBeforeRouteChange = (to: string) => {
      routeChange('before', to)
    }
    router.onAfterRouteChange = (to: string) => {
      routeChange('after', to)
    }
  },
}

export default Theme

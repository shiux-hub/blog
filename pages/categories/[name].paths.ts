import type { VitePressData } from 'vitepress'
import type { ThemeConfig } from '../../.vitepress/theme/types/theme'
import {
  getAllCategories,
  getAllPosts,
} from '../../.vitepress/theme/utils/getPostData'

// eslint-disable-next-line antfu/no-top-level-await
const postData = await getAllPosts()
const categoriesData = getAllCategories(postData)

// 分类动态路由
export default {
  paths() {
    const pages: VitePressData<ThemeConfig>[] = []
    // 生成每一页的路由参数
    Object.keys(categoriesData).forEach((key) => {
      pages.push({ params: { name: key.toString() } })
    })
    console.info('分类动态路由：', pages)
    return pages
  },
}

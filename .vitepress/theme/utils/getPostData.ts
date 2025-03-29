import type { Frontmatter, PostDataItem } from '@/types/post'
import fs from 'fs-extra'
import { globby } from 'globby'
import matter from 'gray-matter'
import { generateId } from './commonTools'

/**
 * 获取 posts 目录下所有 Markdown 文件的路径
 * @returns 文件路径数组
 */
async function getPostMDFilePaths() {
  try {
    // 获取所有 md 文件路径
    const paths = await globby(['**.md'], {
      ignore: ['node_modules', 'pages', '.vitepress', 'README.md'],
    })
    // 过滤路径，只包括 'posts' 目录下的文件
    return paths.filter(item => item.includes('posts/'))
  }
  catch (error) {
    console.error('获取文章路径时出错:', error)
    throw error
  }
}

/**
 * 基于 frontMatter 日期降序排序文章
 * @param a - 第一篇文章对象
 * @param b - 第二篇文章对象
 * @returns - 比较结果
 */
function compareDate(a: Frontmatter, b: Frontmatter) {
  return a.date < b.date ? 1 : -1
}

/**
 * 比较文章的优先级
 * @param a - 第一篇文章对象
 * @param b - 第二篇文章对象
 * @returns 比较结果
 */
function comparePostPriority(a: Frontmatter, b: Frontmatter) {
  if (a.top && !b.top) {
    return -1
  }
  if (!a.top && b.top) {
    return 1
  }
  return compareDate(a, b)
}

/**
 * 获取所有文章，读取其内容并解析 front matter
 * @returns 文章对象数组
 */
export async function getAllPosts(): Promise<PostDataItem[]> {
  try {
    // 获取所有 Markdown 文件的路径
    const paths = await getPostMDFilePaths()
    // 读取和处理每个 Markdown 文件的内容
    const posts = await Promise.all(
      paths.map(async (item): Promise<PostDataItem> => {
        try {
          // 读取文件内容
          const content = await fs.readFile(item, 'utf-8')
          // 文件的元数据
          const stat = await fs.stat(item)
          // 获取文件创建时间和最后修改时间
          const { birthtimeMs, mtimeMs } = stat
          // 解析 front matter
          const { data } = matter(content)
          const { title, date, categories, description, tags, top, cover } = data as Frontmatter
          // 计算文章的过期天数
          const expired = Math.floor(
            (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24),
          )
          // 返回文章对象
          return {
            id: generateId(item),
            title: title || '未命名文章',
            date: date ? new Date(date).getTime() : birthtimeMs,
            lastModified: mtimeMs,
            expired,
            tags,
            categories,
            description,
            regularPath: `/${item.replace('.md', '.html')}`,
            top,
            cover,
          }
        }
        catch (error) {
          console.error(`处理文章文件 '${item}' 时出错:`, error)
          throw error
        }
      }),
    )
    // 根据日期排序文章
    posts.sort(comparePostPriority)
    return posts
  }
  catch (error) {
    console.error('获取所有文章时出错:', error)
    throw error
  }
}

/**
 * 获取所有标签及其相关文章的统计信息
 * @param {object[]} postData - 包含文章信息的数组
 * @returns {object} - 包含标签统计信息的对象
 */
export function getAllType(postData: PostDataItem[]) {
  const tagData = {}
  // 遍历数据
  postData.map((item) => {
    // 检查是否有 tags 属性
    if (!item.tags || item.tags.length === 0)
      return null
    // 处理标签
    if (typeof item.tags === 'string') {
      // 以逗号分隔
      item.tags = item.tags.split(',')
    }
    // 遍历文章的每个标签
    item.tags.forEach((tag) => {
      // 初始化标签的统计信息，如果不存在
      if (!tagData[tag]) {
        tagData[tag] = {
          count: 1,
          articles: [item],
        }
      }
      else {
        // 如果标签已存在，则增加计数和记录所属文章
        tagData[tag].count++
        tagData[tag].articles.push(item)
      }
    })
  })
  return tagData
}

/**
 * 获取所有分类及其相关文章的统计信息
 * @param postData - 包含文章信息的数组
 * @returns 包含标签统计信息的对象
 */
export function getAllCategories(postData: PostDataItem[]) {
  const catData = {}
  // 遍历数据
  postData.map((item) => {
    if (!item.categories || item.categories.length === 0)
      return
    // 处理标签
    if (typeof item.categories === 'string') {
      // 以逗号分隔
      item.categories = item.categories.split(',')
    }
    // 遍历文章的每个标签
    item.categories.forEach((tag) => {
      // 初始化标签的统计信息，如果不存在
      if (!catData[tag]) {
        catData[tag] = {
          count: 1,
          articles: [item],
        }
      }
      else {
        // 如果标签已存在，则增加计数和记录所属文章
        catData[tag].count++
        catData[tag].articles.push(item)
      }
    })
  })
  return catData
}

/**
 * 获取所有年份及其相关文章的统计信息
 * @param postData - 包含文章信息的数组
 * @returns 包含归档统计信息的对象
 */
export function getAllArchives(postData: PostDataItem[]) {
  const archiveData = {}
  // 遍历数据
  postData.forEach((item) => {
    // 检查是否有 date 属性
    if (item.date) {
      // 将时间戳转换为日期对象
      const date = new Date(item.date)
      // 获取年份
      const year = date.getFullYear().toString()
      // 初始化该年份的统计信息，如果不存在
      if (!archiveData[year]) {
        archiveData[year] = {
          count: 1,
          articles: [item],
        }
      }
      else {
        // 如果年份已存在，则增加计数和记录所属文章
        archiveData[year].count++
        archiveData[year].articles.push(item)
      }
    }
  })
  // 提取年份并按降序排序
  const sortedYears = Object.keys(archiveData).sort((a, b) => Number.parseInt(b) - Number.parseInt(a))
  return { data: archiveData, year: sortedYears }
}

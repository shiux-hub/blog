import type { PostDataItem } from '@/types/post'
import dayjs from 'dayjs'
import { sample, without } from 'es-toolkit/array'
import { isNumber } from 'es-toolkit/compat'
import { throttle } from 'es-toolkit/function'
import { isString, isUndefined } from 'es-toolkit/predicate'
import { mainStore } from '@/store'

/**
 * 计算并存储滚动数据（高度、百分比、方向）
 * 使用节流优化性能，默认300ms间隔
 */
export const calculateScroll = throttle(
  () => {
    if (isUndefined(window) || isUndefined(document))
      return false

    try {
      const store = mainStore()
      const scrollY = window.scrollY
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight

      // 仅在页面有足够高度时计算百分比
      const scrollPercentage = totalHeight > 0
        ? Math.round((scrollY / totalHeight) * 100)
        : 0

      store.scrollData = {
        height: Math.round(scrollY),
        percentage: scrollPercentage,
        isScrollDown: scrollY > store.scrollData.height,
      }
    }
    catch (error) {
      console.error('计算滚动时出现错误：', error)
      return false
    }
  },
  300,
  { edges: ['trailing', 'leading'] },
)

/**
 * 平滑滚动至目标高度或元素
 * @param target - 目标高度或元素
 */
export function smoothScrolling(target: HTMLElement | string | number = 0) {
  if (isUndefined(window))
    return false

  try {
    let scrollTop = 0

    if (isNumber(target)) {
      scrollTop = target
    }
    else if (target instanceof HTMLElement) {
      scrollTop = target.getBoundingClientRect().top + window.scrollY - 80
    }
    else if (isString(target) && target.startsWith('#')) {
      const element = document.querySelector(target)
      if (element) {
        scrollTop = element.getBoundingClientRect().top + window.scrollY - 80
      }
    }

    window.scrollTo({
      top: scrollTop,
      behavior: 'smooth',
    })
  }
  catch (error) {
    console.error('平滑滚动出错：', error)
    return false
  }

  return true
}

/**
 * 格式化时间戳为相应的日期格式
 * 如果时间戳表示的时间为7天内，则返回 'n天内'
 * 如果时间戳表示的时间为7天之后但在当年，则返回 '月/日'
 * 如果时间戳表示的时间在当年之前，则返回 '年/月/日'
 * @param timestamp - 时间戳（以毫秒为单位）
 * @return 返回日期格式的字符串
 */
export function formatTimestamp(timestamp: number) {
  const now = dayjs()
  const targetDate = dayjs(timestamp)
  const diffDays = now.startOf('day').diff(targetDate, 'day')

  if (diffDays === 1)
    return '1天前'
  if (diffDays <= 0)
    return '今日内'
  if (diffDays < 7)
    return `${diffDays}天前`

  return targetDate.year() === now.year()
    ? targetDate.format('M/D')
    : targetDate.format('YYYY/M/D')
}

/**
 * 随机前往一篇文章
 * @param postData - 文章数据
 */
let lastPost: PostDataItem | null = null
export function shufflePost(postData: PostDataItem[]) {
  // 如果只有一篇文章，直接返回
  if (postData.length === 1)
    return postData[0].regularPath

  // 使用lodash的sample方法从剩余文章中随机选择一篇
  const availablePosts = lastPost ? without(postData, lastPost) : postData
  const randomPost = sample(availablePosts)

  // 记录上次选择的文章
  lastPost = randomPost

  // 返回随机文章的路径
  return randomPost.regularPath
}

/**
 * 图片 URL 复制到剪贴板
 * @param imageURL 要复制到剪贴板的图片的URL
 */
export async function copyImage(imageURL: string) {
  if (!navigator.clipboard) {
    console.error('浏览器不支持 Clipboard API')
    return
  }
  try {
    const response = await fetch(imageURL)
    const blob = await response.blob()
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ])
    window.$message.success('图片已复制到剪贴板')
  }
  catch (error) {
    console.error('复制图片出错：', error)
    window.$message.error('复制图片错误，请重试')
  }
}

/**
 * 下载图片
 * @param imageUrl 要下载的图片的URL地址
 */
export function downloadImage(imageUrl: string) {
  try {
    // 获取当前日期并转换为字符串形式，作为文件名
    const date = new Date()
    const timestamp = date.toISOString().replace(/[:.]/g, '-')
    const imageName = `image-${timestamp}.jpg`
    const anchor = document.createElement('a')
    anchor.download = imageName
    anchor.href = imageUrl
    anchor.target = '_blank'
    anchor.style.display = 'none'
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
  }
  catch (error) {
    console.error('下载图片出错：', error)
    window.$message.error('下载图片错误，请重试')
  }
}

/**
 * 获取根据当前时间的问候语
 * @returns 当前时间对应的问候语
 */
export function getGreetings() {
  const hour = new Date().getHours()
  let hello
  if (hour < 6) {
    hello = '凌晨好，昨晚睡得怎么样？'
  }
  else if (hour < 9) {
    hello = '早上好，今天也要开心哦！'
  }
  else if (hour < 12) {
    hello = '上午好，今天也要加油哦！'
  }
  else if (hour < 14) {
    hello = '中午好，吃饱了精神好！'
  }
  else if (hour < 17) {
    hello = '下午好，继续加油！'
  }
  else if (hour < 19) {
    hello = '傍晚好，是时候放松一下了！'
  }
  else if (hour < 22) {
    hello = '晚上好，是时候休息了！'
  }
  else {
    hello = '夜深了，明天继续加油！'
  }
  return hello
}

// 特殊纪念日置灰
export function specialDayGray() {
  const specialDays = [
    { date: '4-4', name: '清明节' },
    { date: '5-12', name: '汶川大地震纪念日' },
    { date: '7-7', name: '中国人民抗日战争纪念日' },
    { date: '9-18', name: '九·一八事变纪念日' },
    { date: '12-13', name: '南京大屠杀死难者国家公祭日' },
  ]
  // 获取当天日期
  const today = new Date()
  const month = today.getMonth() + 1
  const day = today.getDate()
  const currentDate = `${month}-${day}`
  // 查找纪念日
  const specialDay = specialDays.find(day => day.date === currentDate)
  if (specialDay) {
    document.documentElement.classList.add('gray')
    if (typeof window.$message !== 'undefined') {
      window.$message.info(`今天是${specialDay.name}，特此默哀`, {
        duration: 8000,
        close: true,
      })
    }
  }
}

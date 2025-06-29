import type { Hitokoto } from '@/types/hitokoto'
import type { SiteInfo } from '@/types/site'

/**
 * 获取一言
 */
export async function getHitokoto() {
  const result = await fetch('https://v1.hitokoto.cn')
  const hitokoto: Hitokoto = await result.json()
  return hitokoto
}

/**
 * 获取给定网址的站点图标和描述
 * @param url - 站点 URL
 */
export async function getSiteInfo(url: string) {
  const details: SiteInfo = {
    iconUrl: null,
    title: null,
    description: null,
  }
  try {
    // 站点数据
    const response = await fetch(url)
    const text = await response.text()
    const parser = new DOMParser()
    const doc = parser.parseFromString(text, 'text/html')
    // 获取页面标题
    const titleElement = doc.querySelector('title')
    details.title = titleElement ? titleElement.textContent : '暂无标题'
    // 获取 icon
    const iconLink
      = doc.querySelector('link[rel=\'shortcut icon\']')
        || doc.querySelector('link[rel=\'icon\']')
    const iconLinkHref = iconLink?.getAttribute('href')
    if (iconLinkHref) {
      details.iconUrl = new URL(iconLinkHref, url).href
    }
    else {
      details.iconUrl = new URL('/favicon.ico', url).href
    }
    // 获取描述
    const metaDescription = doc.querySelector('meta[name=\'description\']')
    details.description = metaDescription
      ? metaDescription.textContent
      : '暂无站点描述'
  }
  catch (error) {
    console.error('获取站点信息失败：', error)
  }
  return details
}

/**
 * Meting
 * @param url - 音乐地址
 * @param id - 歌曲ID
 * @param server - 服务器
 * @param type - 类型
 * @returns 音乐详情
 */
export async function getMusicList(
  url: string,
  id: number,
  server: string = 'netease',
  type = 'playlist',
) {
  const result = await fetch(`${url}?server=${server}&type=${type}&id=${id}`)
  const list = await result.json()
  return list.map((song) => {
    const { pic, ...data } = song
    return {
      ...data,
      cover: pic,
    }
  })
}

/**
 * 站点统计数据
 */
export async function getStatistics(key: string) {
  const result = await fetch(`https://v6-widget.51.la/v6/${key}/quote.js`)
  const title = [
    '最近活跃',
    '今日人数',
    '今日访问',
    '昨日人数',
    '昨日访问',
    '本月访问',
    '总访问量',
  ]
  const data = await result.text()
  const num = data.match(/(<\/span><span>).*?(\/span><\/p>)/g)?.map((el) => {
    const val = el.replace(/(<\/span><span>)/g, '')
    return val.replace(/(<\/span><\/p>)/g, '')
  })
  const statistics: Record<string, string> = {}
  num?.forEach((el, index) => {
    if (index === num.length - 1)
      return
    statistics[title[index]] = el
  })
  return statistics
}

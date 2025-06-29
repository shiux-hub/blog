import type { ThemeConfig } from '@/types/theme'

/**
 * 从文件名生成数字 ID
 * @param fileName - 文件名
 */
export function generateId(fileName: string) {
  // 将文件名转换为哈希值
  let hash = 0
  for (let i = 0; i < fileName.length; i++) {
    hash = (hash << 5) - hash + fileName.charCodeAt(i)
  }
  // 将哈希值转换为正整数
  const numericId = Math.abs(hash % 10000000000)
  return numericId
}

/**
 * 动态加载脚本
 * @param src - 脚本 URL
 */
export function loadScript(
  src: string,
  option: {
    async?: boolean
    reload?: boolean
    callback?: (
      error: Event | string | null,
      script?: HTMLScriptElement | Element | null,
    ) => void
  } = {},
) {
  if (typeof document === 'undefined' || !src)
    return false
  // 获取配置
  const { async = false, reload = false, callback } = option
  // 检查是否已经加载过此脚本
  const existingScript = document.querySelector(`script[src="${src}"]`)
  if (existingScript) {
    console.warn('已有重复脚本')
    if (!reload) {
      callback && callback(null, existingScript)
      return false
    }
    existingScript.remove()
  }
  // 创建一个新的script标签并加载
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    if (async)
      script.async = true
    script.onload = () => {
      resolve(script)
      callback && callback(null, script)
    }
    script.onerror = (error) => {
      reject(error)
      callback && callback(error)
    }
    document.head.appendChild(script)
  })
}

/**
 * 动态加载样式表
 * @param href - 样式表 URL
 */
export function loadCSS(
  href: string,
  option: {
    reload?: boolean
    callback?: (
      error: Event | string | null,
      link?: HTMLLinkElement | Element | null,
    ) => void
  } = {},
) {
  if (typeof document === 'undefined' || !href)
    return false
  // 获取配置
  const { reload = false, callback } = option
  // 检查是否已经加载过此样式表
  const existingLink = document.querySelector(`link[href="${href}"]`)
  if (existingLink) {
    console.warn('已有重复样式')
    if (!reload) {
      callback && callback(null, existingLink)
      return false
    }
    existingLink.remove()
  }
  // 创建新的link标签并设置属性
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.href = href
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.onload = () => {
      resolve(link)
      callback && callback(null, link)
    }
    link.onerror = (error) => {
      reject(error)
      callback && callback(error)
    }
    document.head.appendChild(link)
  })
}

/**
 * 跳转中转页
 * @param html - 页面内容
 * @param themeConfig - 主题配置
 * @param isDom - 是否为 DOM 对象
 */
export function jumpRedirect(
  html: string | null,
  themeConfig: ThemeConfig,
  isDom = false,
) {
  try {
    // 是否为开发环境
    if (process.env.NODE_ENV === 'development')
      return
    // 是否启用
    if (!themeConfig.jumpRedirect?.enable)
      return html
    // 中转页地址
    const redirectPage = '/redirect'
    // 排除的 className
    const excludeClass = themeConfig.jumpRedirect.exclude
    if (isDom) {
      if (typeof window === 'undefined' || typeof document === 'undefined')
        return
      // 所有链接
      const allLinks = [...document.getElementsByTagName('a')]
      if (allLinks?.length === 0)
        return
      allLinks.forEach((link) => {
        // 检查链接是否包含 target="_blank" 属性
        if (link.getAttribute('target') === '_blank') {
          // 检查链接是否包含排除的类
          if (
            excludeClass.some(className => link.classList.contains(className))
          ) {
            return
          }
          const linkHref = link.getAttribute('href')
          // 存在链接且非中转页
          if (linkHref && !linkHref.includes(redirectPage)) {
            // Base64
            const encodedHref = btoa(linkHref)
            const redirectLink = `${redirectPage}?url=${encodedHref}`
            // 保存原始链接
            link.setAttribute('original-href', linkHref)
            // 覆盖 href
            link.setAttribute('href', redirectLink)
          }
        }
      })
    }
    else {
      if (!html)
        return

      // 使用正则表达式处理HTML
      const processedHtml = html.replace(
        /<a\s([^>]*)target=["']_blank["']([^>]*)href=["']([^"']*)["']([^>]*)>/g,
        (match, p1, p2, href) => {
          // 检查是否包含排除的类
          const classMatch = match.match(/class=["']([^"']*)["']/)
          if (
            classMatch
            && excludeClass.some(className =>
              classMatch[1].split(' ').includes(className),
            )
          ) {
            return match
          }

          // 存在链接且非中转页
          if (href && !href.includes(redirectPage)) {
            const encodedHref = btoa(encodeURIComponent(href))
            return match
              .replace(href, `${redirectPage}?url=${encodedHref}`)
              .replace(/<a/, `<a original-href="${href}"`)
          }
          return match
        },
      )

      return processedHtml
    }
  }
  catch (error) {
    console.error('处理链接时出错：', error)
  }
}

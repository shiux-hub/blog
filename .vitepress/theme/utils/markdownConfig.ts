import type { ThemeConfig } from '@/types/theme'
import type { MarkdownRenderer } from 'vitepress'
import markdownItAttrs from 'markdown-it-attrs'
import container from 'markdown-it-container'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

// markdown-it
function markdownConfig(md: MarkdownRenderer, themeConfig: ThemeConfig) {
  // 插件
  md.use(markdownItAttrs)
  md.use(tabsMarkdownPlugin)
  // timeline
  md.use(container, 'timeline', {
    validate: params => /^timeline\s+\S.*$/.test(params.trim()),
    render: (tokens, idx) => {
      const m = tokens[idx].info.trim().match(/^timeline\s+\S.*$/)
      if (tokens[idx].nesting === 1 && m) {
        return `<div class="timeline">
                    <span class="timeline-title">${md.utils.escapeHtml(m[1])}</span>
                    <div class="timeline-content">`
      }
      else {
        return '</div></div>\n'
      }
    },
  } as container.ContainerOpts)
  // radio
  md.use(container, 'radio', {
    render: (tokens, idx, _options, env) => {
      const token = tokens[idx]
      const check = token.info.trim().slice('radio'.length).trim()
      if (token.nesting === 1) {
        const isChecked = md.renderInline(check, {
          references: env.references,
        })
        return `<div class="radio">
          <div class="radio-point ${isChecked}" />`
      }
      else {
        return '</div>'
      }
    },
  } as container.ContainerOpts)
  // button
  md.use(container, 'button', {
    render: (tokens, idx) => {
      const token = tokens[idx]
      const check = token.info.trim().slice('button'.length).trim()
      if (token.nesting === 1) {
        return `<button class="button ${check}">`
      }
      else {
        return '</button>'
      }
    },
  } as container.ContainerOpts)
  // card
  md.use(container, 'card', {
    render: (tokens, idx) => {
      const token = tokens[idx]
      if (token.nesting === 1) {
        return `<div class="card">`
      }
      else {
        return '</div>'
      }
    },
  } as container.ContainerOpts)
  // 表格
  md.renderer.rules.table_open = () => {
    return '<div class="table-container"><table>'
  }
  md.renderer.rules.table_close = () => {
    return '</table></div>'
  }
  // 图片
  md.renderer.rules.image = (tokens, idx) => {
    const token = tokens[idx]
    // 获取图片的src和alt属性
    const src = token.attrs?.[token.attrIndex('src')][1]
    const alt = token.content
    if (!themeConfig.fancybox.enable) {
      return `<img src="${src}" alt="${alt}" loading="lazy">`
    }
    return `<a class="img-fancybox" href="${src}" data-fancybox="gallery" data-caption="${alt}">
                <img class="post-img" src="${src}" alt="${alt}" loading="lazy" />
                <span class="post-img-tip">${alt}</span>
              </a>`
  }

  // obsidian admonition
  const fence = md.renderer.rules.fence
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]
    const lang = token.info.trim()

    // 处理 Obsidian admonition
    if (lang.startsWith('ad-')) {
      const type = lang.substring(3) // 取ad-之后的内容，获取类型
      const content = token.content

      const admonitionTypes = {
        note: 'info',
        question: 'info',
        warning: 'warning',
        tip: 'tip',
        summary: 'info',
        hint: 'tip',
        important: 'warning',
        caution: 'warning',
        error: 'danger',
        danger: 'danger',
      }

      const className = admonitionTypes[type as keyof typeof admonitionTypes] || 'info'
      const title = type.toUpperCase()

      return `<div class="${className} custom-block">
            <p class="custom-block-title">${title}</p>
            <div class="custom-block-content">
              ${md.render(content)}
            </div>
    </div>`
    }
    // TODO: 获取不到点击事件
    // 添加复制按钮
    const rawCode = fence!(...args)
    // 在原始HTML中添加图标到已有的copy按钮
    return rawCode.replace(
      '<button title="Copy Code" class="copy"></button>',
      `<button title="Copy Code" class="copy">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M19 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2V4a2 2 0 0 1 2-2zm-9 13H8a1 1 0 0 0-.117 1.993L8 17h2a1 1 0 0 0 .117-1.993zm9-11H9v2h6a2 2 0 0 1 2 2v8h2zm-7 7H8a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2"/></g></svg>
      </button>`,
    )
  }
}

export default markdownConfig

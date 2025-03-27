export interface ThemeConfig {
  siteMeta: {
    title: string
    description: string
    logo: string
    site: string
    lang: string
    author: {
      name: string
      cover: string
      email: string
      link: string
    }
  }
  icp: string
  since: string
  postSize: number
  inject: {
    header: Array<[string, Record<string, string>]>
  }
  nav: Array<{
    text: string
    items: Array<{
      text: string
      link: string
      icon: string
    }>
  }>
  navMore: Array<{
    name: string
    list: Array<{
      icon: string
      name: string
      url: string
    }>
  }>
  cover: {
    twoColumns: boolean
    showCover: {
      enable: boolean
      coverLayout: string
      defaultCover: string[]
    }
  }
  footer: {
    social: Array<{
      icon: string
      link: string
    }>
    sitemap: Array<{
      text: string
      items: Array<{
        text: string
        link: string
        newTab?: boolean
      }>
    }>
  }
  comment: {
    enable: boolean
    type: string
    artalk: {
      site: string
      server: string
    }
    twikoo: {
      js: string
      envId: string
      region: string
      lang: string
    }
  }
  aside: {
    hello: {
      enable: boolean
      text: string
    }
    toc: {
      enable: boolean
    }
    tags: {
      enable: boolean
    }
    countDown: {
      enable: boolean
      data: {
        name: string
        date: string
      }
    }
    siteData: {
      enable: boolean
    }
  }
  friends: {
    circleOfFriends: string
    dynamicLink: {
      server: string
      app_token: string
      table_id: string
    }
  }
  music: {
    enable: boolean
    url: string
    id: number
    server: string
    type: string
  }
  search: {
    enable: boolean
    appId: string
    apiKey: string
  }
  rewardData: {
    enable: boolean
    wechat: string
    alipay: string
  }
  fancybox: {
    enable: boolean
    js: string
    css: string
  }
  jumpRedirect: {
    enable: boolean
    exclude: string[]
  }
  tongji: {
    '51la': string
  }
}

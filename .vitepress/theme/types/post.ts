export interface PostDataItem extends Frontmatter {
  id: number
  title: string
  regularPath: string
}

export interface Frontmatter {
  title: string
  date: number
  categories: string | string[]
  description: string
  lastModified: number
  expired: number
  tags: string | string[]
  top: number
  cover: string
}

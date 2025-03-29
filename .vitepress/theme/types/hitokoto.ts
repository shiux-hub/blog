export interface Hitokoto {
  /** 一言标识 */
  id: number
  /** 一言正文(unicode编码) */
  hitokoto: string
  /**
   * 类型
   * a 动画
   * b 漫画
   * c 游戏
   * d 文学
   * e 原创
   * f 来自网络
   * g 其他
   * h 影视
   * i 诗词
   * j 网易云
   * k 哲学
   * l 抖机灵
   */
  type: string
  /** 一言的出处 */
  from?: string
  /** 一言的作者 */
  from_who?: string | null
  /** 添加者 */
  creator?: string
  /** 添加者用户标识 */
  creator_uid?: number
  /** 审核员标识 */
  reviewer?: number
  /** 一言唯一标识 */
  uuid?: string
  /** 提交方式 */
  commit_from?: string
  /** 添加时间 */
  created_at?: string
  /** 句子长度 */
  length?: number
}

interface TopicParams {
  page: number
  // Number 页数
  tab: 'ask' | 'share' | 'job' | 'good' | 'all'
  // String 主题分类。目前有 ask share job good
  limit: number
  // Number 每一页的主题数量
  mdrender?: boolean
  //  String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
}
interface TopicsResponse {
  id?: string
  author_id?: string
  tab?: string
  content?: string
  title?: string
  last_reply_at?: string
  good?: false
  top?: true
  reply_count?: number
  visit_count?: number
  create_at?: string
  author?: {
    loginname?: string
    avatar_url?: string
  }
}

interface TopicDetailParams {
  id: string
  mdrender?: boolean
  accesstoken?: string
}
interface TopicDetailResponse {
  id?: string
  author_id?: string
  tab?: string
  content?: string
  title?: string
  last_reply_at?: string
  good?: boolean
  top?: boolean
  reply_count?: number
  visit_count?: number
  create_at: string
  author?: {
    loginname?: string
    avatar_url?: string
  }
  replies?: {
    id?: string
    author?: {
      loginname?: string
      avatar_url?: string
    }
    content?: string
    ups?: string[]
    create_at?: string
    reply_id?: string
    is_uped?: boolean
  }[]
  is_collect?: boolean
}

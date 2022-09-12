import { get } from '~utils/request-axios'

export const fetchTopics = (params: TopicParams) => {
  return get<TopicsResponse[]>('/topics', params, { headers: { name: 'testing' } })
}

export const topicDetail = ({ id, ...params }: TopicDetailParams) => {
  return get<TopicDetailResponse>(`/topic/${id}`, params)
}

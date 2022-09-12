import axios, { AxiosRequestConfig } from 'axios'
import { Except } from 'type-fest'

interface ICustomeRequestConfig extends AxiosRequestConfig {
  // add your config
  // 请求失败重试次数
  retryTimes?: number
  // 重试延迟毫秒数
  retryInterval?: number
}

interface IApiResponse<T> {
  success: boolean
  message?: string
  data: T
}

axios.interceptors.request.use(config => {
  config.timeout = 5000
  config.headers ||= {}
  config.headers.test = 'I am only a header!'
  config.baseURL = process.env.REACT_APP_BASE_URL
  return config
})

axios.interceptors.response.use(undefined, error => {
  const config = error.config as ICustomeRequestConfig
  const { retryInterval = 3000, retryTimes = 3 } = config

  if (retryTimes > 0) {
    return new Promise(resolve => {
      setTimeout(() => {
        request({ ...config, retryTimes: retryTimes - 1 }).then(resolve)
      }, retryInterval)
    })
  }
  return Promise.reject(error)
})

const request = <T>(options: ICustomeRequestConfig) => {
  return axios.request<IApiResponse<T>>(options).then(rs => {
    if (rs.status === 200 && rs.data.success) {
      return rs.data.data
    }
    throw new Error(rs.data.message ?? rs.statusText ?? '请求出错了~')
  })
}

export const get = <T>(
  url: string,
  params: unknown = {},
  config: Except<ICustomeRequestConfig, 'url' | 'params' | 'method'> = {}
) => {
  return request<T>({ ...config, url, params, method: 'GET' })
}

export const post = <T>(
  url: string,
  data: unknown = {},
  config: Except<ICustomeRequestConfig, 'url' | 'data' | 'method'>
) => {
  return request<T>({
    ...config,
    url,
    data,
    method: 'POST',
  })
}

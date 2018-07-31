import axios from 'axios'
import router from './router'

axios.defaults.timeout = 5000

const Http = axios.create({
  baseURL: process.env.API_URL || 'https://zaixianxiche.xyz/api/v1/',
  headers: {
    // 'Content-Type': 'application/json'
    // 'Content-Type': 'multipart/form-data'
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// axios 请求拦截器
Http.interceptors.request.use(config => {
  const token = localStorage.getItem('didadi-store-token')
  if (token) {
    config.headers.common['Authorization'] = 'Bearer ' + token
  }
  return config
}, err => {
  return Promise.reject(err)
})

// axios 响应拦截器
Http.interceptors.response.use(response => {
  if (response.data.code === 401) { // 说明 `access token` 过期或者权限不足，需要登录
    // 删除本地缓存中的 token
    localStorage.removeItem('didadi-store-token')
    localStorage.removeItem('didadi-store-token-expire-at')
    router.replace({
      path: '/login',
      query: {
        redirect: router.currentRoute.fullPath
      }
    })
  } else {
    console.dir(response.data)
  }
  return response
}, err => {
  return Promise.reject(err)
})

export default Http

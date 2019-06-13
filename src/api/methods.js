import axios from 'axios'
import QS from 'qs'
import config from './config'

// axios默认配置
axios.defaults.baseURL = config.BASE
// axios.defaults.headers.post["Content-Type"] = "application/json"
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.timeout = config.TIMEOUT
axios.withCredentials = config.WITHCREDENTIALS

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

/**
 * 执行请求
 * @param options 请求参数设置
 */
const request = (options) => {
  return axios(options).catch(error => {
    if (error.response && error.response.data) {
      console.log(error.response.data.message)
    } else {
      console.log(error.message)
    }
  })
}

// 方法聚合
const methods = {

  // GET请求
  get (opts) {
    const params = opts.params || {}
    const options = {
      url: opts.url,
      method: 'get',
      responseType: opts.responseType || 'json',
      params: params
    }
    return request(options)
  },

  // POST请求
  post (opts) {
    const params = opts.params || {}
    const options = {
      url: opts.url,
      method: 'post',
      data: QS.stringify(params)
    }
    return request(options)
  },

  // 上传
  upload (opts) {
    const params = opts.params || {}
    let formData = new FormData()
    for (let k in params) {
      formData.append(k, params[k])
    }
    const options = {
      url: opts.url,
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    return request(options)
  },

  // PUT请求
  put (opts) {
    const params = opts.params || {}
    const options = {
      url: opts.url,
      method: 'put',
      data: QS.stringify(params)
    }
    return request(options)
  },

  // DELETE请求
  delete (opts) {
    const params = opts.params || {}
    const options = {
      url: opts.url,
      method: 'delete',
      data: QS.stringify(params)
    }
    return request(options)
  }

}

/**
 * 执行请求
 * @param options 请求参数对象
 */
const excute = (options) => {
  // 方法验证
  if (methods[options.method] === undefined) {
    console.error('请求' + options.title + '的方法不正确！')
    return
  }
  const method = methods[options.method]
  // 返回可以cancel的axios实例
  return method(options)
}

/**
 * 根据模块创建api
 * @param {object} modules 模块
 */
const createApi = (modules) => {
  let apiModules = {}
  for (let module in modules) {
    let apiModule = {}
    modules[module].forEach((item) => {
      apiModule[item.name] = (params) => {
        item.params = params
        return excute(item)
      }
    })
    apiModules[module] = apiModule
  }
  return apiModules
}

export default createApi

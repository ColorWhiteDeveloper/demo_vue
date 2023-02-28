// URL 记录器
import Vue from 'vue'
import urlRecorder from './url-recorder'
import {
  tryHideFullScreenLoading
} from '../utils/loading'
/**
 * 对成功返回的请求回包进行数据预处理
 * @param response
 * @returns {Promise}
 */
export function handleResponseSuccess(response) {
  tryHideFullScreenLoading()
  urlRecorder.remove(response.config)
  let result = response.data

  if (response.headers['content-disposition']) {
    result = {
      contentDisposition: response.headers['content-disposition'],
      data: response.data
    }
  }

  if (result.code === 200) {
    return result.data || result.content
  } else if (result.code && result.code !== 0) {
    return handleError(response.config, result)
  } else if (result === '') {
    Vue.prototype.$message({
      type: 'error',
      message: '服务内部错误'
    })
    return result
  } else {
    // 来自其它服务器的请求
    return result
  }
}

/**
 * 对发送失败的请求进行数据预处理，将error对象封装为统一的形式
 * @param error
 * @returns {Promise}
 */
export function handleResponseFail(error) {
  tryHideFullScreenLoading()
  urlRecorder.remove(error.config)
  let result
  if (error.response) {
    // 请求已发送，响应中返回了非2xx的错误码，包括304等
    result = {
      data: error.response.data,
      msg: error.response.statusText
    }
  } else if (error.request) {
    // 请求没有发送成功时的错误
    result = {
      data: error.request,
      msg: error.message
    }
  } else {
    // 设置请求时出错
    result = {
      msg: error.message
    }
  }

  return handleError(error.config, result)
}

/**
 * 统一的异常对象封装逻辑，在这里抛出异常
 * @param {object} requestConfig 发请求时传入axios的配置信息对象
 * @param {object|Error} result 请求回包对象，或异常信息
 * @param {object} result.content
 * @param {number} result.code
 * @param {string} result.msg
 * @returns {Promise}
 */
export function handleError(requestConfig, result) {
  // 必须是Error对象，否则throw时vuex要报warning
  if (requestConfig && requestConfig.errorHandler) {
    result.url = requestConfig.url
    requestConfig.errorHandler(result)
    result.processed = true
  }
  return Promise.reject(result)
}

/**
 * 请求拦截器，添加用户token
 */
export function handleRequest(config) {

  const token = sessionStorage.getItem('token');
  const tokenHead = sessionStorage.getItem('tokenHead');
  if (token && tokenHead) {
    // 这里经常搭配token使用，将token值配置到tokenkey中，将tokenkey放在请求头中
    config.headers['Authorization'] = tokenHead + token
  }
  return config
}
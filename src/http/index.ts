import axios from 'axios'
import {handleRequest, handleResponseFail, handleResponseSuccess} from './interceptor-handler'
import {showFullScreenLoading} from '@/utils/loading.ts'

// URL 记录器
import urlRecorder from './url-recorder'

const axiosInstance = axios.create({
  timeout: 1000 * 60 * 5
})

axiosInstance.interceptors.request.use(handleRequest)
axiosInstance.interceptors.response.use(handleResponseSuccess, handleResponseFail)
/**
 * 在 get 请求的 url 后面加个随机参数，以防浏览器缓存请求
 * @param {string} url
 * @return {string}
 */
function addVersion(url) {
  return url.includes('?') ? `${url}&v=${Date.now()}` : url;
}

export default {
  // 默认的异常处理方法，会传入完整的data对象，可以在这里弹提示框
  defaultErrorHandler: null,
  /**
   * 通过get发送并接收json格式的数据（get发的本来就是json格式）。
   * 并统一处理常见的错误
   * @param {string} url
   * @param {object?} params={}
   * @param {boolean?} throwError 是否不使用默认的异常处理方法，而把异常抛出来
   * @param {int?} timeout 超时时间，默认10秒
   * @return {Promise} 返回一个promise对象。其中then方法传递回包中的data数据；catch事件则传递整个回包，其参数为{data:{},status{code:123,message:'xxx'}}
   */
  get(url, params = {}, throwError, timeout) {
    const config = {
      method: 'GET',
      url: addVersion(url),
      params,
      errorHandler: (!throwError && this.defaultErrorHandler) || null,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: this.withCredentials,
      timeout: timeout
    }
    if (params.showLoading === undefined) {
      showFullScreenLoading()
    }
    return axiosInstance(config)
  },

  /**
   * 通过post发送数据，使后端直接收到json格式的数据。并统一处理常见的错误
   * @param {string} url
   * @param {object?} data={}
   * @param {object} params={}
   * @param {boolean?} throwError 是否不使用默认的异常处理方法，而把异常抛出来
   * @return {Promise} 返回一个promise对象。其中then方法传递回包中的data数据；catch事件则传递整个回包，其参数为{data:{},status{code:123,message:'xxx'}}
   */
  post(url, data = {}, params= {}, throwError) {
    const config = {
      method: 'POST',
      url,
      params,
      data: JSON.stringify(data),
      errorHandler: (!throwError && this.defaultErrorHandler) || null,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: this.withCredentials
    }
    urlRecorder.add(config)
    if (data.showLoading === undefined) {
      showFullScreenLoading()
    }
    return axiosInstance(config)
  },
  // PUT更新数据
  put(url, data = {}, throwError) {
    const config = {
      method: 'PUT',
      url,
      data: JSON.stringify(data),
      errorHandler: (!throwError && this.defaultErrorHandler) || null,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: this.withCredentials
    }
    urlRecorder.add(config)
    if (data.showLoading === undefined) {
      showFullScreenLoading()
    }
    return axiosInstance(config)
  },
  // DELETE更新数据
  delete(url, params = {}, data = {}, throwError) {
    const config = {
      method: 'delete',
      params,
      url,
      data: JSON.stringify(data),
      errorHandler: (!throwError && this.defaultErrorHandler) || null,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: this.withCredentials
    }
    urlRecorder.add(config)
    if (data.showLoading === undefined) {
      showFullScreenLoading()
    }
    return axiosInstance(config)
  },
  /**
   * 通过表单下载文件。并统一处理常见的错误
   * @param {string} url
   * @param params 传参
   * @param {Object?} data 上传进度回调，参数为event
   * @param {Function?} throwError 是否不使用默认的异常处理方法，而把异常抛出来
   * @return {Promise} 返回一个promise对象
   */
  downloadFile(url, params= {}, data = {}, throwError) {
    const config = {
      method: 'POST',
      url,
      params,
      data: JSON.stringify(data),
      responseType: 'arraybuffer',
      errorHandler: (!throwError && this.defaultErrorHandler) || null,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: this.withCredentials
    }
    urlRecorder.add(config)
    if (data.showLoading === undefined) {
      showFullScreenLoading()
    }
    return axiosInstance(config)
  },
  /**
   * 通过表单post上传文件并接收json格式的数据。并统一处理常见的错误
   * @param {string} url
   * @param {FormData|object} formElem FormData对象，或form Dom元素，其中需要含有一个name为files的选择文件的input元素
   * @param {Function?} onUploadProgress 上传进度回调，参数为event
   * @param {boolean?} throwError 是否不使用默认的异常处理方法，而把异常抛出来
   * @param {int?} timeout 超时时间，默认50秒
   * @return {Promise} 返回一个promise对象。其中then方法传递回包中的data数据；catch事件则传递整个回包，其参数为{data:{},status{code:123,message:'xxx'}}
   */
  uploadFile(url, formElem, onUploadProgress, throwError) {
    return axiosInstance({
      method: 'POST',
      url,
      data: formElem instanceof FormData ? formElem : new FormData(formElem),
      onUploadProgress,
      errorHandler: (!throwError && this.defaultErrorHandler) || null,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    })
  }
}
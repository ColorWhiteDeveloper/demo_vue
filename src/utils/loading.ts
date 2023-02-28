import { Loading } from 'element-ui'

/** 定义loading变量 */
let loading

/** 使用Element loading-start 方法 */
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

/** 使用Element loading-close 方法 */
function endLoading() {
  loading.close()
}

/**
 * 那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
 * 声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
 * 调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
 */
let needLoadingRequestCount = 0

/** 显示Loading */
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

/** 隐藏Loading */
export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

export default {
  showFullScreenLoading,
  tryHideFullScreenLoading
}

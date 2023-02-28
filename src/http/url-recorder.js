// 记录正在发送中的请求，以判断是否重复发包
export default {
  // 正在进行中的请求列表
  urlList: [],

  /**
     * 添加一个新的请求记录，如果已经存在进行中的请求了，就抛出异常
     * @param {string} config
     * @param {string} config.url 请求地址
     * @param {string} config.enableRepeat 允许同时发送多个相同请求
     * @return {Promise}
     */
  add(config) {
    // 允许同时发送多个相同请求
    // 比如批量上传图片的时候
    if (config.enableRepeat) return Promise.resolve()

    const url = config.url

    // 如果请求还在队列里，说明还在处理，没有回包
    if (this.urlList.includes(url)) {
      const errorMessage = `请求 ${url} 正在处理，请稍后再试！`
      const error = {
        status: {
          code: 1007, // 临时写的
          debugMessage: url,
          // eslint-disable-next-line no-use-before-define
          message: error.message
        }
      }
      return Promise.reject(error)
    }

    // 这里没有前缀，但是remove中有
    this.urlList.push(`${process.env.VUE_APP_API_BASE_URL}${url}`)

    return Promise.resolve()
  },
  /**
     * 删除一个正在进行的请求记录
     * @param {string} config
     * @param {string} config.url 请求地址
     */
  remove(config) {
    // 允许同时发送多个相同请求
    if (config.enableRepeat) return

    const index = this.urlList.indexOf(config.url)
    if (index >= 0) {
      this.urlList.splice(index, 1)
    }
  }
}

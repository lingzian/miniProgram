import {
  baseURL,
  timeout
} from './config.js'

const request = (options) => {
  wx.showLoading({
    title: '数据加载中...'
  })
  return new Promise((resolve,reject)=> {
    wx.request({
      url: baseURL + options.url,
      timeout,
      data: options.data,
      success(res){
        resolve(res.data)
      },
      fail: reject,
      complete: res=> {
        wx.hideLoading()
      }
    })
  })
}

export default request
// 1001 没有token
// 1002 错误token
// 1003 token过期
const TOKEN = 'token'
App({
  globalData: {
    token: '',
    cartList: []
  },
  onLaunch: function () {
    // 先判断是否有token
    // const token = wx.getStorageSync(TOKEN)
    // if (token && token.length !== 0) { // 已经有token就判断是否过期
    //   this.check_toekn(token)
    // } else {
    //   this.login()
    // }
  },
  login() {
    wx.login({
      success: (res) => {
        const code = res.code
        wx.request({
          url: 'http://123.207.32.32:3000/login',
          method: 'post',
          data: {
            code
          },
          success: (res) => {
            console.log(res)
            const token = res.data.token
            this.globalData.token = token
            wx.setStorageSync(TOKEN, token)
          }
        })
      }
    })
  },
  check_toekn(token) {
    wx.request({
      url: 'http://123.207.32.32:3000/auth',
      method: 'post',
      header: {
        token
      },
      success: (res)=> {
        console.log(res)
        if(!res.data.errCode) {
          this.globalData.token = token
        } else {
          this.login()
        }
      },
      fail: (err)=> {
        console.log(err)
      }
    })
  },
  addToCart(obj) {
    // 1.判断是否已经添加进来
    const oldInfo = this.globalData.cartList.find((item) => item.iid === obj.iid)
    if (oldInfo) {
      oldInfo.count += 1
    } else {
      obj.count = 1
      obj.checked = true
      this.globalData.cartList.push(obj)
    }

    // 2.购物车回调
    if (this.addCartCallback) {
      this.addCartCallback()
    }
  }
})

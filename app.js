App({
  globalData: {
    token: ''
  },
  onLaunch: function () {
    wx.login({
      success: (res) => {
        console.log(res)
        const code = res.code
        wx.request({
          url: 'http://123.207.32.32:3000/login',
          method: 'post',
          data: {
            code
          },
          success: (res)=> {
            console.log(res)
            const token = res.data.token
            this.globalData.token = token
            wx.setStorageSync('token', token)
          }
        })
      }
    })
  }
})

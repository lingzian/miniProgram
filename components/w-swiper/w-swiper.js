// components/w-swiper/w-swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    images: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    previewImage(e) {
      const current = 'http:' + e.target.dataset.src
      console.log(current)
      console.log(this.data.images)
      let images = this.data.images.map((ele)=>{return 'http:' + ele})
      console.log(images)
      wx.previewImage({
        current,
        urls: images
      })
    }
  }
})

/**
 * 图片预加载组件
 */
Component({
  properties: {
    //默认图片
    defaultImage: {
      type: String,
      value: '../../assets/images/common/error.gif'
    },
    //原始图片
    src: {
      type: String,
      value: ''
    },
    width: String,
    height: String,
    //图片剪裁mode，同Image组件的mode
    mode: {
      type: String,
      value: 'scaleToFill'
    }
  },
  data: {
    finishLoadFlag: false
  },
  methods: {
    finishLoad: function (e) {
      this.setData({
        finishLoadFlag:true
      })
      this.triggerEvent('imageLoad',{
        e
      })
    }
  }
})

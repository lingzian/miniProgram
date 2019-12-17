// components/w-goods/w-goods.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodslist: {
      type: Array,
      value: [],
      observer: function(newVal){
        // console.log(newVal)
      }
    },
    left: {
      type: Array,
      value: []
    },
    right: {
      type: Array,
      value: []
    },
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
    async getReat() {
      return await new Promise((resolve,reject) => {
        let query = wx.createSelectorQuery().in(this);
        query.select('.pull-left').boundingClientRect();
        query.select('.pull-right').boundingClientRect();
        query.exec((res) => {
          console.log(res)
          let leftHeight = res[0].height; //获取左边列表的高度
          let rightHeight = res[1].height; //获取右边列表的高度
          resolve({leftHeight,rightHeight}) 
        });
      })
    }
  }
})

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
  observers: {
    'goodslist': (val)=> {
      console.log(val)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
  }
})

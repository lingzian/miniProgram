// pages/home/home.js
let leftHeight = 0, rightHeight = 0; //分别定义左右两边的高度
import {
  getMultiData,
  getProduct
} from '../../service/home.js'

import {
  POP,
  SELL,
  NEW,
  BACK_TOP_POSITION
} from '../../common/const.js'

Page({
  data: {
    banners: [],
    recommends:[],
    titles: ["流行", "新款", "精选"],
    goods: {
      [POP]: { page: 1, list: [],left:[],right:[] },
      [NEW]: { page: 1, list: [],left:[],right:[] },
      [SELL]: { page: 1, list: [],left:[],right:[] },
    },
    currentType: 'pop',
    topPosition: 0,
    tabControlTop: 0, // tab所在的上边界坐标
    showBackTop: false,
    showTabControl: false,
    loading: false
  },
  onLoad: function (options) {
    this._getData()
  },
  // 获取全部的数据
  _getData() {
    this._getMultiData(); // 分页上面的数据
    this._getProductData(POP);
    // this._getProductData(NEW);
    // this._getProductData(SELL);
  },
  // 获取滚动参数
  scrollPosition(e) {
    // 1.获取滚动的顶部
    const position = e.detail.scrollTop;
    const showTab = position>this.data.tabControlTop
    // 2.设置是否显示回到顶部
    this.setData({
      showBackTop: position > BACK_TOP_POSITION,
    })
    // 3. controlTab 是否浮起来
    this.setData({
      showTabControl: showTab
    })
    // wx.createSelectorQuery().select('.tab-control').boundingClientRect((rect) => {
    //   const show = rect.top > 0
    //   console.log(!show +'_'+rect.top)
    //   console.log(rect)
    //   this.setData({
    //     showTabControl: !show
    //   })
    // }).exec()
  },
  // 获取tab所在的上边界坐标
  onImageLoad() {
    wx.createSelectorQuery().select('.tab-control').boundingClientRect((rect) => {
      this.setData({
        tabControlTop: rect.top
      })
    }).exec()
  },
  // 切换栏
  tabClick(e) {
    // 1.根据当前的点击赋值最新的currentType
    let currentType = ''
    switch(e.detail.index) {
      case 0:
        currentType = POP
        break
      case 1:
        currentType = NEW
        break
      case 2:
        currentType = SELL
        break
    }
    this.setData({
      currentType: currentType
    })
    this.selectComponent('.tab-control').setCurrentIndex(e.detail.index)
    this.selectComponent('.tab-control-temp').setCurrentIndex(e.detail.index)
  },
  // 分页上面的数据
  _getMultiData() {
    getMultiData().then(res=> {
      const banners = res.data.banner.list.map(item=>{
        return item.image
      })
      this.setData({
        banners: banners,
        recommends: res.data.recommend.list
      })
    })
  },
  // 分页数据
  _getProductData(type) {
    // 1.获取数据对应的页码
    const page = this.data.goods[type].page;
    this.data.loading = true
    // 2.请求数据
    getProduct(type, page).then(async res => {
      // 1.取出数据
      const list = res.data.list;
      const leftList = list.slice(0,Math.ceil(list.length/2))
      const rightList = list.slice(Math.ceil(list.length/2))
      // const leftList = []
      // const rightList = []
      // const goods = this.data.goods;
      // console.log('1')
      // for (const item of list) {
      //   console.log('sss')
      //   leftHeight <= rightHeight ? goods[type].left.push(item) : goods[type].right.push(item); //判断两边高度，来觉得添加到那边
      //   await this.getBoxHeight(goods);
      //  }

      // 2.将数据临时获取
      const goods = this.data.goods;
      goods[type].list.push(...list)


      goods[type].left.push(...leftList)
      goods[type].right.push(...rightList)
      goods[type].page += 1;

      // 3.最新的goods设置到goods中
      this.setData({
        goods: goods
      })
      this.data.loading = false
    })
  },
  // 加载更多数据 page
  onReachBottom: function() {
    // this._getProductData(this.data.currentType)
  },
  // 加载更多数据 scroll-view
  loadMore() {
    if(this.data.loading) return false
    this._getProductData(this.data.currentType);
  },
  // 回到顶部
  onBackTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    // this.setData({
    //   showBackTop: false,
    //   topPosition: 0,
    //   tabControlTop: 0
    // })
  },
  getBoxHeight(goods) { //获取左右两边高度
    let query = wx.createSelectorQuery();
    return new Promise((resolve, reject) => {
     this.setData({ goods }, () => {
      query.select('.pull-left').boundingClientRect();
      query.select('.pull-right').boundingClientRect();
      query.exec((res) => {
        console.log(res)
       leftHeight = res[0].height; //获取左边列表的高度
       rightHeight = res[1].height; //获取右边列表的高度
       resolve();
      });
     });
    })
   }
})
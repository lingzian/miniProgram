import request from './network.js'

export const getMultiData = ()=> {
  return request({
    url: '/home/multidata'
  })
}

export const getProduct = (type, page) => {
  return request({
    url: '/home/data',
    data: {
      type,
      page
    }
  })
}
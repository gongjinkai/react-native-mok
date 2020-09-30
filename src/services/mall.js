import request from '../utils/request'

export function getMallHome() {
  return request({
    method: 'GET',
    url: '/mall/home/index'
  })
}

export function getShopInfo({ id }) {
  return request({
    method: 'POST',
    url: '/product/detail',
    data: {
      id,
    },
  })
}

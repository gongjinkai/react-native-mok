import request from '../utils/request';

export async function fetchOrder(params) {
  return request({
    url: '/order/orderPage',
    method: 'POST',
    data: params,
  })
}

export async function fetchOrderDetail(params) {
  return request({
    url: '/order/orderDetail',
    method: 'POST',
    data: params,
  })
}

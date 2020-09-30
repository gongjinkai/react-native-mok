import request from '../utils/request'

export function query(params) {
  return request({
    url: '/cartitem/list',
    method: 'POST',
    data: params,
  })
}

export function removeItem(params) {
  return request({
    url: '/cartitem/del',
    method: 'POST',
    data: params,
  })
}

export function listCartItem(params) {
  return request({
    url: '/cartitem/listCartItem',
    method: 'POST',
    data: params,
  })
}

export function onCartItem(params) {
  return request({
    url: '/cartitem/oneCartItem',
    method: 'POST',
    data: params,
  })
}

export function saveCart(params) {
  return request({
    url: '/cartitem/save',
    method: 'POST',
    data: params,
  })
}

export function updateCart(params) {
  return request({
    url: '/cartitem/update',
    method: 'POST',
    data: params,
  })
}

export function removeFailure() {
  return request({
    url: '/cartitem/clearFailure',
    method: 'POST',
  })
}

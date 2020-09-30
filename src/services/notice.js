import request from '../utils/request'

export function remove(params) {
  return request({
    url: '/remind/deleteRemind',
    method: 'POST',
    data: params,
  })
}

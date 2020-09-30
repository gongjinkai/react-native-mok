import request from '../utils/request'

export function getPlanList(params) {
  return request({
    url: '/plan/listPlan',
    method: 'POST',
    data: params,
  })
}

export function getPlanDetail(params) {
  return request({
    url: '/plan/getPlanDetail',
    method: 'POST',
    data: params,
  })
}

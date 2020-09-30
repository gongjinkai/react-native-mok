import request from '../utils/request'

export function submitFeedback(params) {
  return request({
    url: '/feedback/saveFeedback',
    method: 'POST',
    data: params,
  })
}

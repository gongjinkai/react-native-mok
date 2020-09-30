import request from '../utils/request'

export function getData(params) {
    return new Promise((resolve, reject) => {
        fetch('https://reactnative.dev/movies.json').then(response => {
            return response.json()
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export function query(params) {
    return request({
      url: '/api/activity',
      method: 'GET',
      data: params,
    })
}

export function getArticle(params) {
  return request({
    url: '/home/listArticle',
    method: 'POST',
    data: params,
  })
}

export function getArticleDetail(params) {
  return request({
    url: '/home/getArticleDetail',
    method: 'POST',
    data: params,
  })
}

export function getHomeData() {
  return request({
    url: '/home/index',
    method: 'GET',
  })
}

export function userLogin(params) {
  return request({
    url: '/sso/login',
    method: 'POST',
    data: params,
  })
}


export function uploadFile(params) {
  return request({
    url: '/minio/upload',
    method: 'POST',
    data: params,
    header: {
      "Content-Type": "multipart/form-data"
    }
  })
}


export function getRanking(params) {
  return request({
    url: '/sso/ranking',
    method: 'POST',
    data: params,
  })
}

export function getMyData() {
  return request({
    url: '/sso/my',
    method: 'GET',
  })
}

export function getNotice(params) {
  return request({
    url: '/remind/listRemind',
    method: 'POST',
    data: params,
  })
}

export function getNoticeDetail({ id }) {
  return request({
    url: '/remind/getRemind',
    method: 'POST',
    data: {
      id,
    },
  })
}

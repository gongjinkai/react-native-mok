import request from '../utils/request'

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

export function uploadFiles(params) {
  return request({
    url: '/minio/uploads',
    method: 'POST',
    data: params,
    header: {
      "Content-Type": "multipart/form-data"
    }
  })
}


export async function deleteFile(params) {
  return request({
    url: '/minio/delete',
    method: 'post',
    params,
  })
}

export async function getCityList() {
  return request({
    url: '/city/list',
    method: 'GET'
  })
}

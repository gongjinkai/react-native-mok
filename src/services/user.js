import request from '../utils/request'

/**
 * 查看用户隐私状态
 */
export function getPrivacy() {
  return request({
    url: '/sso/getPrivacy',
    method: 'GET',
  })
}

/**
 * 修改用户隐私状态
 */

export function setPrivacy(params) {
  return request({
    url: '/sso/setPrivacy',
    method: 'POST',
    data: params,
  })
}


export function getFocus(params) {
  return request({
    url: '/memberFocus/listFocus',
    method: 'POST',
    data: params,
  })
}

export function editUserPassword(params) {
  return request({
    url: '/sso/updatePassword',
    method: 'POST',
    data: params,
  })
}

export function getInfo() {
  return request({
    url: '/sso/info',
    method: 'get'
  })
}

export function updateUserInfo(params) {
  return request({
    url: '/sso/updateMember',
    method: 'POST',
    data: params,
  })
}

/** 用户收货地址 **/
export function memberAddressList() {
  return request({
    method: 'POST',
    url: '/member/address/list'
  })
}

export function saveAddress(params) {
  return request({
    method: 'POST',
    url: '/member/address/add',
    data: params
  })
}

export function removeAddress({ id }) {
  return request({
    method: 'POST',
    url: '/member/address/delete',
    data: {
      id,
    },
  })
}

export function findAddress({ id }) {
  return request({
    method: 'POST',
    url: '/member/address/get',
    data: {
      id,
    }
  })
}

export function updateAddress(params) {
  return request({
    method: 'POST',
    url: '/member/address/update',
    data: params,
  })
}

/** 获取会员动态 **/
export function ssoDynamic(params) {
  return request({
    method: 'POST',
    url: '/sso/dynamic',
    data: params,
  })
}

/** 会员关注相关 **/
export function updateMemberFocus(params) {     //关注 取消
  return request({
    method: 'POST',
    url: '/memberFocus/focus',
    data: params,
  })
}

export function memberFocusList(params) {
  return request({
    method: 'POST',
    url: '/memberFocus/listFocus',
    data: params,
  })
}

export function memberAddressBook(params) {
  return request({
    method: 'POST',
    url: '/memberFocus/listAddressBook',
    data: params,
  })
}

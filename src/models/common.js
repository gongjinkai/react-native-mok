import ToastUtil from '../utils/ToastUtil'
import DeviceStorage from '../utils/DeviceStorage'
import { getData, query, userLogin, uploadFile } from '../services/api'
import {
  setPrivacy,
  getPrivacy,
  getFocus,
  editUserPassword,
  getInfo,
  updateUserInfo,
  memberAddressList,
  saveAddress,
  findAddress,
  removeAddress,
  updateAddress,
  ssoDynamic,
  updateMemberFocus,
  memberFocusList,
  memberAddressBook
} from "../services/user";
import { getCityList } from '../services/common'

export default {
    namespace: 'common',
    state: {
      status: 200,
      list: [],
      cityData: [],
      memberAddress: [],
      total: 0,
      videoIsOpen: 0,      //用户隐私状态,
    },
    effects: {
      * getState({ payload }, { call }) {
          const _result = yield call(getData);
      },
      * query(_, { call, put }) {
          const { success, data } = yield call(query);
          if(success) {
              yield put({
                type: 'updateState',
                payload: {
                    list: data,
                }
              })
          }
      },
      * loadMore(_, { call, put, select }) {
        const { success, data } = yield call(query);
        const { list } = yield select(_ => _.common);
        if(success) {
          yield put({
            type: 'updateState',
            payload: {
              list: [...list, ...data],
            }
          })
        }
      },
      * login({ payload, callback }, { call }) {
        const { success, data } = yield call(userLogin, payload);
        if(success) {
          DeviceStorage.save('token', data.tokenHead + data.token);
          if(typeof callback === 'function') {
            callback(1)
          }
        } else {
          ToastUtil.show(data.message, 'SHORT')
        }
      },
      * logout({ payload, callback }) {
        if(typeof callback === 'function') {
          callback(1)
        }
      },
      * uploadAvatarFile({ payload }, { call, put }) {
        const formData = new FormData();
        formData.append('file',{ uri: payload.uri, type: 'multipart/form-data', name: payload.fileName });
        const { success, data } = yield call(uploadFile, formData);
        if(success) {
          return yield put({
            type: 'updateAvatar',
            payload: {
              icon: data.url
            }
          })
        } else {
          return {
            code: 0,
            message: '头像上传失败'
          }
        }
      },
      * updateAvatar({ payload }, { call }) {
        const { success } = yield call(updateUserInfo, payload);
        if(success) {
          return {
            code: 1,
            message: '头像上传成功'
          }
        } else {
          return {
            code: 0,
            message: '头像上传失败'
          }
        }
      },
      * updateUser({ payload }, { call }) {
        const { success } = yield call(updateUserInfo, payload);
        if(success) {
          return {
            code: 1,
            message: '用户信息修改成功'
          }
        } else {
          return {
            code: 0,
            message: '用户信息修改失败'
          }
        }
      },
      * getPrivacyState(_, { call, put }) {
        const { success, data } = yield call(getPrivacy);
        if(success) {
          yield put({
            type: 'updateState',
            payload: {
              videoIsOpen: data.videoIsOpen
            }
          })
        }
      },
      * setPrivacyState({ payload }, { call, put }) {
        const { success } = yield call(setPrivacy, payload);
        if(success) {
          yield put({
            type: 'updateState',
            payload: {
              videoIsOpen: payload.videoIsOpen,
            }
          })
        }
      },
      * editPassword({ payload },{ call }) {
        const { success, data } = yield call(editUserPassword, payload);
        if(success) {
          return {
            code: 1,
            message: '密码修改成功'
          }
        } else {
          return {
            code: 0,
            message: data.message,
          }
        }
      },
      * getUserinfo(_, { call }) {
        const { success, data } = yield call(getInfo);
        if(success) {
          return {
            code: 1,
            data,
          }
        }
      },
      * fetchCityData(_, { call, put }) {
        const { success, data } = yield call(getCityList);
        if(success) {
          yield put({
            type: 'updateState',
            payload: {
              cityData: data
            }
          })
        }
      },
      * queryAddress(_, { call, put }) {
        const { success, data } = yield call(memberAddressList);
        if(success) {
          yield put({
            type: 'updateState',
            payload: {
              memberAddress: data,
            }
          })
        }
      },
      * addAddress({ payload }, { call }) {
        const { success, data } = yield call(saveAddress, payload);
        if(success) {
          return {
            code: 1,
            message: '新增地址成功'
          }
        } else {
          return {
            code: 0,
            message: data.message,
          }
        }
      },
      * removeAddress({ payload }, { call, put, select }) {
        const { success, data } = yield call(removeAddress, payload);
        if(success) {
          const { memberAddress } = yield select(_ => _.common);
          yield put({
            type: 'updateState',
            payload: {
              memberAddress: memberAddress.filter(item => item.id !== payload.id)
            }
          });
          return {
            code: 1,
            message: '删除地址成功'
          }
        } else {
          return {
            code: 0,
            message: data.message,
          }
        }
      },
      * findAddress({ payload }, { call }) {
        const { success, data } = yield call(findAddress, payload);
        if(success) {
          return {
            code: 1,
            data,
          }
        } else {
          return {
            code: 0,
            message: data.message,
          }
        }
      },
      * updateAddress({ payload }, { call }) {
        const { success, data } = yield call(updateAddress, payload);
        if(success) {
          return {
            code: 1,
            message: '修改地址成功'
          }
        } else {
          return {
            code: 0,
            message: data.message,
          }
        }
      },
      * fetchSsoDynamic({ payload }, { call }) {
        const { success, data } = yield call(ssoDynamic, payload);
        if(success) {
          return {
            code: 1,
            data: data,
          }
        } else {
          return {
            code: 0,
            message: data.message,
          }
        }
      },
      * memberFocus({ payload }, { call }) {
        const { success, data } = yield call(updateMemberFocus, payload);
        if (success) {
          return {
            code: 1,
            message: '关注成功',
          }
        } else {
          return {
            code: 0,
            message: data.message,
          }
        }
      },
      * fetchFocus({ payload }, { call }) {
        const { success, data } = yield call(memberFocusList, payload);
        if(success) {
          return {
            code: 1,
            data,
          }
        } else {
          return {
            code: 0,
            message: data.message,
          }
        }
      },
      * fetchMemberAddressBook({ payload }, { call }) {
        const { success, data } = yield call(memberAddressBook, payload);
        if(success) {
          return {
            code: 1,
            data,
          }
        } else {
          return {
            code: 0,
            message: data.message,
          }
        }
      }
    },
    reducers: {
      updateState(state, { payload }) {
          return { ...state, ...payload }
      }
    },
}

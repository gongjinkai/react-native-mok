import { getNotice, getNoticeDetail } from "../services/api";
import { remove } from "../services/notice";

export default {
  namespace: 'notice',
  state: {
    noticeList: [],
    noticeDetail: {},
  },
  effects: {
    * query ({ payload }, { call, put }) {
      const { success, data } = yield call(getNotice, payload);
      if(success) {
        yield put({
          type: 'updateState',
          payload: {
            noticeList: data.list.map(item => {
              return {
                ...item,
                key: item.id,
              }
            }),
          }
        })
      } else {
        console.log('获取消息失败')
      }
    },
    * refresh({ payload }, { call, put }) {
      const { success, data } = yield call(getNotice, payload);
      if(success) {
        yield put({
          type: 'updateState',
          payload: {
            noticeList: data.list.map(item => {
              return {
                ...item,
                key: item.id,
              }
            }),
          }
        })
      } else {
        console.log('获取消息失败')
      }
    },
    * queryDetail({ payload }, { call, put }) {
      const { success, data } = yield call(getNoticeDetail, payload);
      if(success) {
        yield put({
          type: 'updateState',
          payload: {
            noticeDetail: data,
          }
        })
      } else {
        console.log('获取消息失败')
      }
    },
    * removeItem({ payload }, { call, put, select }) {
      const { success, data } = yield call(remove, payload);
      const { noticeList } = yield select(_ => _.notice);
      if(success) {     //调用删除成功后删除
        yield put({
          type: 'updateState',
          payload: {
            noticeList: noticeList.filter(item => item.id !== payload.id)
          }
        })
      }
    }
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    }
  }
}

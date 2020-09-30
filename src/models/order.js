import modelExtend from 'dva-model-extend'
import { pageModel } from "./modelCommon";
import { fetchOrder, fetchOrderDetail } from "../services/order";

export default modelExtend(pageModel, {
  namespace: 'order',
  state: {
    orderData: {},
    total: 0,
    orderInfo: {},
  },
  effects: {
    * query({ payload }, { call, put }) {
      const { success, data } = yield call(fetchOrder, payload);
      if(success) {
        yield put({
          type: 'updateState',
          payload: {
            orderData: data,
          }
        })
      }
    },
    * loadMore({ payload }, { call, put, select }) {
      const { success, data } = yield call(fetchOrder, payload);
      const { orderData } = yield select(_ => _.order);
      if(success) {
        yield put({
          type: 'updateState',
          payload: {
            orderData: {
              archiveList: [...orderData.archiveList, ...data.archiveList],
              ...data,
            }
          }
        })
      } else {
        yield put({
          type: 'updateState',
          payload: {
            orderData: {
              archiveList: [],
            }
          }
        })
      }
    },
    * refresh({ payload }, { call, put }) {
      const { success, data } = yield call(fetchOrder, payload);
      if(success) {
        console.log('刷新成功');
        yield put({
          type: 'updateState',
          payload: {
            orderData: data,
          }
        })
      }
    },
    * getInfo({ payload }, { call, put }) {
      const { success, data } = yield call(fetchOrderDetail, payload);
      if(success) {
        yield put({
          type: 'updateState',
          payload: {
            orderInfo: data,
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
  },
})



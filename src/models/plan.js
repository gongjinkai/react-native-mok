import { getPlanList, getPlanDetail } from "../services/plan";

export default {
  namespace: 'plan',
  state: {
    list: [],
    detail: {},
  },
  effects: {
    * query({ payload }, { call, put }) {
      const { success, data } = yield call(getPlanList, payload);
      if(success) {
        yield put({
          type: 'updateState',
          payload: {
            list: data.busPlans
          }
        })
      }
    },
    * queryDetail({ payload }, { call, put }) {
      const { success, data } = yield call(getPlanDetail, payload);
      if(success) {
        yield put({
          type: 'updateState',
          payload: {
            detail: data,
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
}

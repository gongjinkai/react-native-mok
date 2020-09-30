import { getHomeData } from "../services/api";

export default {
  namespace: 'home',
  state: {
    eventSeasonList: []
  },
  effects: {
    * query(_, { call, put }) {
      const { success, data } = yield call(getHomeData);
      if(success) {
        yield put({
          type: 'updateState',
          payload: {
            eventSeasonList: data.eventSeasonList,
          }
        })
      }
    }
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  }
}

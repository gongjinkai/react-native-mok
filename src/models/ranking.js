import { getRanking } from '../services/api'

export default {
  namespace: 'ranking',
  state: {
    list: [],
  },
  effects: {
    * query({ payload }, { call }) {
      const { success, data } = yield call(getRanking, { pageNum: 1, pageSize: 10, ...payload });
      if(success) {
        return data
      } else {
        return []
      }
    }
  },
  reducers: {}
}

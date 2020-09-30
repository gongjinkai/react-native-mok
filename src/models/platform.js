import { getMyData } from '../services/api'
export default {
  namespace: 'platform',
  state: {

  },
  effects: {
    * fetchMyData(_, { call }) {
      const { success, data } = yield call(getMyData);
      if(success) {
        return data
      } else {
        return {}
      }
    }
  },
  reducers: {},
}

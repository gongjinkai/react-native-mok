import { getArticle, getArticleDetail } from "../services/api";

export default {
  namespace: 'article',
  state: {
    list: [],
    total: 0,
    pageNo: 1,
    pageSize: 5,
    content: '',
  },
  effects: {
    * query(_, { call, put, select }) {
      const { pageNo, pageSize } = yield select(_ => _.article);
      const { success, data } = yield call(getArticle, { pageNo, pageSize });
      if(success) {
        yield put({
          type: 'updateState',
          payload: {
            list: data.articleList,
          }
        })
      }
    },
    * queryDetail({ payload }, { call, put }) {
      const { success, data } = yield call(getArticleDetail, payload);
      if(success) {
        yield put({
          type: 'updateState',
          payload: {
            content: data.content,
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

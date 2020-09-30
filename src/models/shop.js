import modelExtend from 'dva-model-extend'
import { model } from "./modelCommon";
import { getMallHome, getShopInfo } from "../services/mall";
import { saveCart } from '../services/shopCart'

export default modelExtend(model, {
  namespace: 'shop',
  state: {
    homeData: {       //商城首页
      cartItemCount: 0,
      productBannerList: [],
      productList: [],
      productCategoryList: [],
    },
    shopDetail: {},
  },
  effects: {
    * getMallHome(_, { call, put }) {
      const { success, data } = yield call(getMallHome);
      if(success) {
        yield put({
          type: 'updateState',
          payload: {
            homeData: data,
          }
        })
      }
    },
    * refreshMallHome(_, { call, put }) {
      const { success, data } = yield call(getMallHome);
      if(success) {
        yield put({
          type: 'updateState',
          payload: {
            homeData: data,
          }
        })
      }
    },
    * getShopDetail({ payload }, { call, put }) {
      const { success, data } = yield call(getShopInfo, payload);
      if(success) {
        yield put({
          type: 'updateState',
          payload: {
            shopDetail: data
          }
        })
      }
    },
    * addCart({ payload }, { call }) {
      const { success, data } = yield call(saveCart, payload);
      if(success) {
        return {
          code: 1,
          message: '添加购物车成功'
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
      return {
        ...state,
        ...payload,
      }
    }
  }
})
// export default {
//   namespace: 'shop',
//   state: {
//     homeData: {}
//   },
//   effects: {
//     * getMallHome(_, { call, put }) {
//       const { success, data } = yield call(getMallHome);
//       if(success) {
//         yield put({
//           type: 'updateState',
//           payload: {
//             homeData: data,
//           }
//         })
//       }
//     }
//   },
//   reducers: {
//     upd
//   }
// }

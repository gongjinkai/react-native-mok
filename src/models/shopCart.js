import modelExtend from 'dva-model-extend'
import { model } from "./modelCommon";
import { query, removeItem, updateCart, listCartItem, removeFailure } from '../services/shopCart'

export default modelExtend(model, {
  namespace: 'shopCart',
  state: {
    cartData: {
      failureList: [],
      shelvesList: [],
    },
    total: 0,
    selectedAll: false,   // 是否已全选
  },
  effects: {
    * query({ payload }, { call, put }) {
      const { success, data } = yield call(query, payload);
      if(success) {
        yield put({
          type: 'updateState',
          payload: {
            cartData: {
              failureList: data.failureList ? data.failureList.map(item => ({
                ...item,
                checked: false,
              })) : [],
              shelvesList: data.shelvesList ? data.shelvesList.map(item => ({
                ...item,
                checked: false,
              })): [],
            },
            selectedAll: false,
            total: 0,
          }
        })
      }
    },
    * clearFailure(_, { call, put, select }) {
      const { success, data } = yield call(removeFailure);
      const { shelvesList } = yield select(_ => _.shopCart);
      if(success) {
        yield put({
          type: 'updateState',
          payload: {
            cartData: {
              shelvesList,
              failureList: []
            }
          }
        });
        return {
          code: 1,
          message: '清除失效商品成功'
        }
      } else {
        return {
          code: 0,
          message: data.message,
        }
      }
    },
    * fetchListCart({ payload }, { call, put }) {
      const { success, data } = yield call(listCartItem, payload);
      if(success) {
        return {
          code: 1,
          data: data.list,
        }
      } else {
        return {
          code: 0,
          message: data.message,
        }
      }
    },
    * removeCart({ payload }, { call, put, select }) {
      const { cartData } = yield select(_ => _.shopCart);
      const { success, data } = yield call(removeItem, payload);
      if(success) {
        yield put({
          type: 'updateState',
          payload: {
            cartData: {
              failureList: cartData.failureList,
              shelvesList: cartData.shelvesList.filter(item => !item.checked)
            }
          }
        });
        return {
          code: 1,
          message: '删除购物车成功'
        }
      } else {
        return {
          code: 0,
          message: data.message
        }
      }
    }
  },
  reducers: {
    /**
     * 购物车单选
     * @param state
     * @param payload
     * @returns {{ cartData: {shelvesList: any[], failureList: (Array|{checked: boolean}[])}, selectedAll: boolean, total: number }}
     */
    selectRadio(state, { payload }) {
      const filterItem = state.cartData.shelvesList.filter(item => item.id === payload.id)[0];
      const _newList = state.cartData.shelvesList.map(item => item.id === payload.id ? {...filterItem, checked: !filterItem.checked }: {...item });
      return {
        ...state,
        cartData: {
          shelvesList: _newList,
          failureList: state.cartData.failureList,
        },
        selectedAll: _newList.filter(item => item.checked).length === state.cartData.shelvesList.length,
        total: _newList.filter(item => item.checked).reduce(function(pre, next) { return pre + next.quantity * next.price }, 0),
      }
    },
    /**
     * 购物车全选
     * @param state
     * @returns {{total: number, selectedAll: boolean, cartData: {shelvesList: {checked: boolean}[], failureList: (Array|{checked: boolean}[])}}}
     */
    selectAll(state) {
      const _newList = state.cartData.shelvesList.map(item => ({
        ...item,
        checked: !state.selectedAll
      }));
      const total = state.cartData.shelvesList.reduce(function(pre, next) { return pre + next.quantity * next.price }, 0);
      return {
        total: !state.selectedAll ? total : 0,
        selectedAll: !state.selectedAll,
        cartData: {
          shelvesList: _newList,
          failureList: state.cartData.failureList,
        }
      }
    },
    /** updateState **/
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    }
  }
})

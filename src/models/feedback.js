import { submitFeedback } from "../services/feedback";
import { uploadFiles } from "../services/common";

export default {
  namespace: 'feedback',
  state: {},
  effects: {
    * submit({ payload }, { call, put }) {
      const { success, data } = yield call(submitFeedback, payload);
      if(success) {
        return {
          code: 1,
          message: '您的意见反馈已提交'
        }
      } else {
        return {
          code: 0,
          message: data.message,
        }
      }
    },
    * havePicSubmit({ payload }, { call, put }) {
      let picsParam = new FormData();
      console.log(payload.pics);
      payload.pics.forEach(item => {
        picsParam.append('file',{ uri: item.uri, type: 'multipart/form-data', name: item.fileName });
      });
      const {success, data} = yield call(uploadFiles, picsParam);
      if(success) {
        const _postData = {
          type: payload.type,
          phone: payload.phone,
          content: payload.content,
          photo: JSON.stringify(data.map(item => {
            return item.url
          }))
        };
        return yield put({
          type: 'submit',
          payload: _postData
        })
      } else {
        console.log(data);
      }
    }
  },
  reducers: {

  }
}

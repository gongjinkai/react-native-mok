import axios from 'axios'
import { baseUrl } from "./config";
import NavigationUtil from '../navigator/NavigationUtil'
import DeviceStorage from '../utils/DeviceStorage'

const instance = axios.create();

instance.defaults.baseURL = baseUrl;

instance.interceptors.request.use(function (config) {
  return DeviceStorage.get('token').then(token => {
    if(token) {
      config['headers'] = {
        'Authorization': token
      }
    }
    return config;
  });
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  const { status, data } = response;
  if(status === 200 && data.code=== 200) {
    return {
      success: true,
      data: data.data,
      message: data.message,
    }
  } else {
    if(data.code === 401 || data.code === 403) {
      NavigationUtil.resetToAuthPage();
    }
    return {
      success: false,
      data: data,
      message: data.message,
    }
  }
}, function (error) {
  const { data } = error;
  return Promise.reject({
    success: false,
    message: '网络开小差了'
  });
});


export default instance

/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-10-18 16:20:07
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-28 11:53:45
 * @* : 博虹出品，抄袭必究😄
 */
import axios from 'axios';
import {BASE_URI} from './pathMap';
import {Toast} from '@ant-design/react-native';
import store from '~/mobx';

var toastKey = null;
var looding = true;
const service = axios.create({
  baseURL: BASE_URI,
});

service.interceptors.request.use(
  config => {
    if (store.token) {
      config.headers['Authorization'] = `Bearer ${store.token}`;
    }
    if (config.looding === false) {
      looding = config.looding;
    }
    if (looding) {
      toastKey = Toast.loading('加载中...', 0);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
// 添加响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    Toast.removeAll();
    if (res.code == 10000) {
      return res;
    } else {
      Toast.fail(res.msg, 2);
      return Promise.reject(res);
    }
  },
  error => {
    return Promise.reject(error);
  },
);
export default service;

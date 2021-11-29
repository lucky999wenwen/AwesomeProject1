/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-10-18 16:20:07
 * @LastEditors: wanglong
 * @LastEditTime: 2021-10-20 16:08:16
 * @* : 博虹出品，抄袭必究😄
 */
import axios from 'axios';
import {BASE_URI} from './pathMap';
import {Toast} from '@ant-design/react-native';
var toastKey = '';

const service = axios.create({
  baseURL: BASE_URI,
});

service.interceptors.request.use(
  config => {
    toastKey = Toast.loading('加载中...', 0);
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
    Toast.remove(toastKey);
    if (res.code == 10000) {
      return res;
    }
  },
  error => {
    return Promise.reject(error);
  },
);
export default service;

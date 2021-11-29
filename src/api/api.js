/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-10-20 11:21:47
 * @LastEditors: wanglong
 * @LastEditTime: 2021-11-25 14:18:58
 * @* : 博虹出品，抄袭必究😄
 */
import request from '../utils/request';

/**
 * 登录
 * @param {*}
 * @returns
 */
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  });
}

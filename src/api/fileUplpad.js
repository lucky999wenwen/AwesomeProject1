/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-12-01 14:10:20
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-01 14:13:18
 * @* : 博虹出品，抄袭必究😄
 */
import request from '~/utils/request';

/**
 * 登录
 * @param {*}
 * @returns
 */
export function loginReginfoHead(data) {
  return request({
    url: '/user/loginReginfo/head',
    method: 'post',
    data,
  });
}

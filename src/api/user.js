/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-10-21 14:09:40
 * @LastEditors: wanglong
 * @LastEditTime: 2021-11-25 14:19:14
 * @* : 博虹出品，抄袭必究😄
 */
import request from '~/utils/request';

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

/**
 * 验证码校验
 * @param {*}
 * @returns
 */
export function loginVerification(data) {
  return request({
    url: '/user/loginVerification',
    method: 'post',
    data,
  });
}

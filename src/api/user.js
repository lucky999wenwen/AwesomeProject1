/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-10-21 14:09:40
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-01 14:53:19
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

/**
 * 新用户---填写资料
 * @param {*}
 * @returns
 */
export function loginReginfo(data) {
  return request({
    url: '/user/loginReginfo',
    method: 'post',
    data,
  });
}

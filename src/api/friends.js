/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-12-09 16:58:45
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-28 11:51:47
 * @* : 博虹出品，抄袭必究😄
 */
import request from '~/utils/request';

/**
 * 最近来访
 * @param {*}
 * @returns
 */
export function getVisitors() {
  return request({
    url: '/friends/visitors',
    method: 'get',
  });
}

/**
 * 今日佳人
 * @param {*}
 * @returns
 */
export function getTodayBest() {
  return request({
    url: '/friends/todayBest',
    method: 'get',
  });
}

/**
 * 今日佳人
 * @param {*}
 * @returns
 */
export function getRecommendation(params) {
  return request({
    url: '/friends/recommendation',
    method: 'get',
    params,
  });
}

/**
 * 探花-左滑右滑-数据
 * @param {*}
 * @returns
 */
export function getFriendsCards(params) {
  return request({
    url: '/friends/cards',
    method: 'get',
    params,
  });
}

/**
 * 探花-喜欢和不喜欢
 * @param {*}
 * @returns
 */
export function friendsLike(id, type) {
  return request({
    url: '/friends/like/' + id + '/' + type,
    method: 'get',
    looding: false,
  });
}

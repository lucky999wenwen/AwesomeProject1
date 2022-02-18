/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-12-09 16:58:45
 * @LastEditors: wanglong
 * @LastEditTime: 2022-02-18 15:51:10
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
/**
 * 探花-搜附近
 * @param {*}
 * @returns
 */
export function friendsSearch(params) {
  return request({
    url: '/friends/search',
    method: 'get',
    params,
  });
}

/**
 * 测灵魂-问卷列表
 * @param {*}
 * @returns
 */
export function friendsQuestions() {
  return request({
    url: '/friends/questions',
    method: 'get',
  });
}

/**
 * 测灵魂 测试题
 * @param {*}
 * @returns
 */
export function friendsQuestionSection(id) {
  return request({
    url: '/friends/questionSection/' + id,
    method: 'get',
  });
}

/**
 * 测灵魂 测试题提交
 * @param {*}
 * @returns
 */
export function friendsQuestionAns(id, data) {
  return request({
    url: '/friends/questionsAns/' + id,
    method: 'post',
    data,
  });
}

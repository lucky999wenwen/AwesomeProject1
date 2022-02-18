/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-12-01 10:34:12
 * @LastEditors: wanglong
 * @LastEditTime: 2022-02-18 15:08:19
 * @* : 博虹出品，抄袭必究😄
 */
import {observable, action} from 'mobx';

class RootStore {
  // observable 表示数据可监控 表示是全局数据
  @observable phone = '';
  @observable token = '';
  @observable userId = '';
  @observable userInfo = {};

  // action行为 表示 changeName是个可以修改全局共享数据的方法
  @action
  setUserInfo(phone, token, userId) {
    this.phone = phone;
    this.token = token;
    this.userId = userId;
  }
  setUser(userInfo) {
    this.userInfo = userInfo;
  }
}

export default new RootStore();

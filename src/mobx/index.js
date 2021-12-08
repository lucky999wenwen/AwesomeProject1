/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-12-01 10:34:12
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-08 15:12:56
 * @* : 博虹出品，抄袭必究😄
 */
import {observable, action} from 'mobx';

class RootStore {
  // observable 表示数据可监控 表示是全局数据
  @observable phone = '';
  @observable token = '';
  @observable userId = '';
  // action行为 表示 changeName是个可以修改全局共享数据的方法
  @action setUserInfo(phone, token, userId) {
    this.phone = phone;
    this.token = token;
    this.userId = userId;
  }
}

export default new RootStore();

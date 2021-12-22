/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-12-01 10:34:12
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-22 11:45:24
 * @* : 博虹出品，抄袭必究😄
 */
import {observable, action} from 'mobx';

class RootStore {
  // observable 表示数据可监控 表示是全局数据
  // @observable phone = '';
  // @observable token = '';
  // @observable userId = '';
  // @observable phone = '15585398636';
  // @observable token =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTA0LCJuYW1lIjoiMTU1ODUzOTg2MzYiLCJpYXQiOjE2NDAxNDQzNjMsImV4cCI6MTY2NjA2NDM2M30.cPz5AdxqztHiAs2ASQWBb_tytpBh9tz-Gzr8iQwyqdY';
  // @observable userId = '155853986361640144358877';
  // action行为 表示 changeName是个可以修改全局共享数据的方法
  @action setUserInfo(phone, token, userId) {
    this.phone = phone;
    this.token = token;
    this.userId = userId;
  }
}

export default new RootStore();

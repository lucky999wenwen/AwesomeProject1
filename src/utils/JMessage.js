/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-12-06 09:41:13
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-07 11:56:36
 * @* : 博虹出品，抄袭必究😄
 */
import JMessage from 'jmessage-react-plugin';
export default {
  init() {
    JMessage.init({
      appkey: 'ecbbbf33e07a5ed21559f49a',
      isOpenMessageRoaming: true,
      isProduction: false,
      channel: '',
    });
  },
  //注册
  register(username, password) {
    return new Promise((resolve, reject) => {
      JMessage.register(
        {
          username,
          password,
        },
        resolve,
        reject,
      );
    });
  },

  //d登录
  login(username, password) {
    return new Promise((resolve, reject) => {
      JMessage.login(
        {
          username,
          password,
        },
        resolve,
        reject,
      );
    });
  },
};

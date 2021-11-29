/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-10-19 16:50:27
 * @LastEditors: wanglong
 * @LastEditTime: 2021-10-20 10:09:13
 * @* : 博虹出品，抄袭必究😄
 */
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],

  plugins: [
    ['import', {libraryName: '@ant-design/react-native'}], // 与 Web 平台的区别是不需要设置 style
  ],
};

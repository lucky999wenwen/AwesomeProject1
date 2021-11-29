/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-10-19 16:50:27
 * @LastEditors: wanglong
 * @LastEditTime: 2021-10-20 15:21:08
 * @* : 博虹出品，抄袭必究😄
 */
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
console.ignoredYellowBox = [
  'Warning: BackAndroid is deprecated. Please use BackHandler instead.',
  'source.uri should not be an empty string',
  'Invalid props.style key',
];

console.disableYellowBox = true; // 关闭全部黄色警告
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

AppRegistry.registerComponent(appName, () => App);

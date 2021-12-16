/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-12-15 17:25:29
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-15 17:26:44
 * @* : 博虹出品，抄袭必究😄
 */
import React from 'react';
import {Text} from 'react-native';
import IconMap from '~/res/fonts/icon';
const Index = props => (
  <Text
    onPress={props.onPress}
    style={{fontFamily: 'iconfont', ...props.style}}>
    {IconMap[props.name]}
  </Text>
);
export default Index;

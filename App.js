/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-10-14 17:26:47
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-08 15:15:32
 * @* : 博虹出品，抄袭必究😄
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'mobx-react';

import store from '~/mobx';
import Nav from './src/nav';
import Geo from '~/utils/Geo';
import JMessage from '~/utils/JMessage';

export default class App extends Component {
  state = {
    isInit: false,
  };

  async componentDidMount() {
    const res = await Geo.initGeo();
    // 从本地缓存当中获取当前登录的用户信息
    const userInfos = await AsyncStorage.getItem('userInfo');
    const userInfo = userInfos ? JSON.parse(userInfos) : {};
    if (userInfo.token) {
      store.setUserInfo(userInfo.phone, userInfo.token, userInfo.userId);
    }
    JMessage.init();
    this.setState({isInit: true});
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Provider store={store}>
          {this.state.isInit ? <Nav></Nav> : <></>}
        </Provider>
      </View>
    );
  }
}

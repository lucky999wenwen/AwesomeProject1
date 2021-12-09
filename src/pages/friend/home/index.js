/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-12-08 11:50:46
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-09 17:02:10
 * @* : 博虹出品，抄袭必究😄
 */
import React, {Component} from 'react';
import {View, Text, StatusBar} from 'react-native';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import {Provider, Toast} from '@ant-design/react-native';

import {pxToDp} from '~/utils/stylesKits';
import FriendHead from './components/FriendHead';
import Visitors from './components/Visitors';

export default class Index extends Component {
  render() {
    return (
      <Provider>
        <HeaderImageScrollView
          maxHeight={pxToDp(160)}
          minHeight={pxToDp(40)}
          headerImage={require('~/res/headfriend.png')}
          renderForeground={() => (
            <View
              style={{
                height: pxToDp(160),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <StatusBar backgroundColor={'transparent'} translucent={true} />
              <FriendHead />
            </View>
          )}>
          <View style={{height: 1000}}>
            <Visitors />
          </View>
        </HeaderImageScrollView>
      </Provider>
    );
  }
}

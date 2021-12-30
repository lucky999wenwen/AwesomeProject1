/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-12-27 15:27:37
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-30 14:40:39
 * @* : 博虹出品，抄袭必究😄
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {NavigationContext} from '@react-navigation/native';
import {pxToDp} from '~/utils/stylesKits';
import IconFont from '~/components/IconFont';
export default class Index extends Component {
  static defaultProps = {
    title: '标题',
  };
  static contextType = NavigationContext;
  render() {
    return (
      <View>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <ImageBackground
          source={require('../../res/headbg.png')}
          style={{
            height: pxToDp(60),
            paddingTop: pxToDp(12),
            flexDirection: 'row',
            paddingLeft: pxToDp(10),
            paddingRight: pxToDp(10),
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={this.context.goBack}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: pxToDp(80),
            }}>
            <IconFont style={{color: '#fff'}} name="iconfanhui" />
            <Text style={{color: '#fff'}}>返回</Text>
          </TouchableOpacity>
          <Text
            style={{color: '#fff', fontSize: pxToDp(18), fontWeight: 'bold'}}>
            {this.props.title}
          </Text>

          <Text
            onPress={this.props.onRightPress || function () {}}
            style={{width: pxToDp(80), color: '#fff', textAlign: 'right'}}>
            {this.props.rightText}
          </Text>
        </ImageBackground>
      </View>
    );
  }
}

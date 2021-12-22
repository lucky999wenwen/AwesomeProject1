/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-12-22 14:39:32
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-22 15:31:26
 * @* : 博虹出品，抄袭必究😄
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import IconFont from '~/components/IconFont';
import {pxToDp} from '~/utils/stylesKits';
export default class Index extends Component {
  constructor(props) {
    super(props);
    console.log(props, 'props', this);
  }
  render() {
    return (
      <View style={{height: '40%', backgroundColor: '#fff', width: '100%'}}>
        <View
          style={{
            position: 'relative',
            paddingTop: pxToDp(5),
            paddingBottom: pxToDp(5),
          }}>
          <Text
            style={{color: '#000', fontSize: pxToDp(20), textAlign: 'center'}}>
            标题
          </Text>
          <IconFont
            name="iconshibai"
            onPress={this.props.onClose}
            style={{
              position: 'absolute',
              right: pxToDp(10),
              top: pxToDp(10),
              fontSize: pxToDp(25),
              color: '#999',
            }}
          />
        </View>
        <View>
          {/* 性别 start */}
          <View></View>
          {/* 性别 end */}
        </View>
      </View>
    );
  }
}

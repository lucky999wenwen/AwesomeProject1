/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2022-02-18 15:54:25
 * @LastEditors: wanglong
 * @LastEditTime: 2022-03-02 15:58:58
 * @* : 博虹出品，抄袭必究😄
 */
import React, {Component} from 'react';
import {View, Text, ImageBackground, ScrollView} from 'react-native';

import {pxToDp} from '~/utils/stylesKits';
import HeadNav from '~/components/HeadNav';
import GButton from '~/components/GButton';
export default class Index extends Component {
  render() {
    const {params} = this.props.route;
    return (
      <ImageBackground
        style={{flex: 1, width: '100%'}}
        source={require('../../../../res/qabg.png')}>
        <HeadNav title="测试结果" />
        <ImageBackground
          style={{
            flex: 1,
            width: '100%',
            position: 'relative',
            transform: [{rotateZ: '-0deg'}],
          }}
          resizeMode="stretch"
          source={require('../../../../res/result.png')}>
          <Text
            style={{
              position: 'absolute',
              top: '1%',
              left: '6%',
              color: '#ffffff9a',
              letterSpacing: pxToDp(7),
            }}>
            灵魂基因鉴定单
          </Text>

          {/* 用户的名称 */}
          <View
            style={{
              position: 'absolute',
              right: '5%',
              top: '6%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '47%',
            }}>
            <Text style={{color: '#fff', fontSize: pxToDp(16)}}>[</Text>
            <Text style={{color: '#fff', fontSize: pxToDp(16)}}>
              {params.currentUser.nick_name}
            </Text>
            <Text style={{color: '#fff', fontSize: pxToDp(16)}}>]</Text>
          </View>

          {/* 测试结果 */}
          <ScrollView
            style={{
              width: '47%',
              position: 'absolute',
              right: '5%',
              top: '12%',
              height: '26%',
            }}>
            <Text style={{color: '#fff'}}>{params.content}</Text>
          </ScrollView>

          {/* 测试结果详细分析 */}
          <View style={{position: 'absolute', left: '5%', top: '46%'}}>
            <Text style={{color: '#ffffff9a'}}>
              外向({params.extroversion}%)
            </Text>
          </View>
          <View style={{position: 'absolute', left: '5%', top: '52%'}}>
            <Text style={{color: '#ffffff9a'}}>判断({params.judgment}%)</Text>
          </View>
          <View style={{position: 'absolute', left: '5%', top: '58.5%'}}>
            <Text style={{color: '#ffffff9a'}}>抽象({params.abstract}%)</Text>
          </View>
          <View style={{position: 'absolute', right: '5%', top: '46.5%'}}>
            <Text style={{color: '#ffffff9a'}}>理性({params.rational}%)</Text>
          </View>

          <GButton
            onPress={() => this.props.navigation.navigate('TestSoul')}
            style={{
              width: '96%',
              height: pxToDp(40),
              position: 'absolute',
              bottom: '5%',
              alignSelf: 'center',
            }}>
            继续测试
          </GButton>
        </ImageBackground>
      </ImageBackground>
    );
  }
}

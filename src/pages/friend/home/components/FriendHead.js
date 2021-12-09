/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-12-09 16:22:07
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-09 17:02:24
 * @* : 博虹出品，抄袭必究😄
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {pxToDp} from '~/utils/stylesKits';
import Svg from 'react-native-svg-uri';
import {tanhua, near, testSoul} from '~/res/fonts/iconSvg';
export default class Index extends Component {
  state = {
    btnArr: [
      {
        id: 1,
        backgroundColor: '#FC5012',
        svgXmlData: tanhua,
        text: '探花',
      },
      {
        id: 2,
        backgroundColor: '#2BB4F8',
        svgXmlData: near,
        text: '搜附近',
      },
      {
        id: 3,
        backgroundColor: '#ECC768',
        svgXmlData: testSoul,
        text: '测灵魂',
      },
    ],
  };
  toItem = v => {
    // console.log(v.id);
  };
  render() {
    const {btnArr} = this.state;
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '80%',
          justifyContent: 'space-around',
        }}>
        {btnArr.map((v, i) => (
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => this.toItem(v)}>
            <View
              style={{
                width: pxToDp(60),
                height: pxToDp(60),
                borderRadius: pxToDp(35),
                backgroundColor: v.backgroundColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Svg
                width={pxToDp(30)}
                height={pxToDp(30)}
                fill="#fff"
                svgXmlData={v.svgXmlData}
              />
            </View>
            <Text
              style={{
                color: '#ffffff9a',
                marginTop: pxToDp(3),
                fontSize: pxToDp(14),
              }}>
              {v.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

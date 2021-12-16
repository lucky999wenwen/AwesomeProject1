/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-12-15 17:27:27
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-16 17:13:00
 * @* : 博虹出品，抄袭必究😄
 */
import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {StyleSheet} from 'react-native';
import {getTodayBest} from '~/api/friends';
import {BASE_URI} from '~/utils/pathMap';

import {pxToDp} from '~/utils/stylesKits';
import IconFont from '~/components/IconFont';

export default class componentName extends Component {
  state = {
    perfectGirlData: {},
  };
  getData = () => {
    getTodayBest().then(res => {
      console.log(res, 'res++++');
      this.setState({perfectGirlData: res.data[0]});
    });
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    const {perfectGirlData} = this.state;
    return (
      <View style={{...styles.perfectGirl}}>
        {/* 左边人员信息 start*/}
        <View style={{...styles.perfectGirl.leftBox}}>
          <Image
            style={{...styles.perfectGirl.leftBox.header}}
            source={{uri: BASE_URI + perfectGirlData.header}}
          />
          <Text style={{...styles.perfectGirl.leftBox.todayText}}>
            今日佳人
          </Text>
        </View>
        {/* 左边人员信息 end*/}

        {/* 右边人员信息 start*/}
        <View style={{...styles.perfectGirl.rightBox}}>
          <View style={{...styles.perfectGirl.rightBox.info}}>
            <View style={{...styles.perfectGirl.rightBox.info.box}}>
              <Text style={{...styles.perfectGirl.rightBox.text}}>
                {perfectGirlData.nick_name}
              </Text>
              <IconFont
                style={{
                  fontSize: pxToDp(18),
                  color:
                    perfectGirlData.gender === '女' ? '#b564bf' : '#E14B39',
                  marginLeft: pxToDp(5),
                  marginRight: pxToDp(5),
                }}
                name={
                  perfectGirlData.gender === '女'
                    ? 'icontanhuanv'
                    : 'icontanhuanan'
                }
              />
              <Text style={{...styles.perfectGirl.rightBox.text}}>
                {perfectGirlData.age}岁
              </Text>
            </View>
            <View
              style={{
                ...styles.perfectGirl.rightBox.info.box,
                marginTop: pxToDp(8),
              }}>
              <Text
                style={{
                  ...styles.perfectGirl.rightBox.text,
                }}>
                {perfectGirlData.marry}|
              </Text>

              <Text style={{...styles.perfectGirl.rightBox.text}}>
                {perfectGirlData.xueli}|
              </Text>
              <Text style={{...styles.perfectGirl.rightBox.text}}>
                {perfectGirlData.agediff < 10 ? '年龄相仿' : '有点代沟'}
              </Text>
            </View>
          </View>
          <View style={{...styles.perfectGirl.rightBox.dist}}>
            <View
              style={{
                position: 'relative',
                alignContent: 'center',
                width: pxToDp(40),
                height: pxToDp(40),
              }}>
              <IconFont
                name="iconxihuan"
                style={{color: '#E14B39', fontSize: pxToDp(40)}}
              />
              <Text
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  textAlign: 'center',
                  lineHeight: pxToDp(40),
                  fontSize: pxToDp(12),
                }}>
                {perfectGirlData.fateValue}
              </Text>
            </View>
            <Text style={{color: '#E14B39'}}>缘分值</Text>
          </View>
        </View>
        {/* 右边人员信息 end*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  perfectGirl: {
    flexDirection: 'row',
    color: '#000',
    backgroundColor: '#eee',
    paddingLeft: pxToDp(10),
    paddingRight: pxToDp(10),
    leftBox: {
      position: 'relative',
      header: {
        width: pxToDp(120),
        height: pxToDp(120),
      },
      todayText: {
        backgroundColor: '#B565C0',
        position: 'absolute',
        left: pxToDp(5),
        bottom: '5%',
        fontSize: pxToDp(12),
        paddingLeft: pxToDp(5),
        paddingRight: pxToDp(5),
        borderRadius: pxToDp(3),
      },
    },
    rightBox: {
      flex: 1,
      flexDirection: 'row',
      paddingTop: pxToDp(10),
      paddingBottom: pxToDp(10),
      text: {
        color: '#999',
      },
      info: {
        paddingLeft: pxToDp(5),
        flex: 0.7,
        backgroundColor: '#fff',
        justifyContent: 'center',
        box: {
          flexDirection: 'row',
        },
      },
      dist: {
        backgroundColor: '#fff',
        flex: 0.3,
        // alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
});

/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2022-01-05 11:02:59
 * @LastEditors: wanglong
 * @LastEditTime: 2022-01-28 15:43:41
 * @* : 博虹出品，抄袭必究😄
 */
import React, {Component} from 'react';
import {View, Text, ImageBackground, Image} from 'react-native';

import {friendsQuestionSection as getQuestionsSection} from '~/api/friends';
import {pxToDp} from '~/utils/stylesKits';

import HeadNav from '~/components/HeadNav';
const titles = {
  1: require('../../../../res/leve1.png'),
  2: require('../../../../res/leve2.png'),
  3: require('../../../../res/leve3.png'),
};
export default class Index extends Component {
  state = {
    list: [],
    title: '问卷调查',
    type: 1,
    current: 0,
  };

  getData = () => {
    getQuestionsSection(this.props.route.params.qid).then(res => {
      console.log(JSON.stringify(res.data));
      this.setState({
        list: res.data,
      });
    });
  };
  componentDidMount() {
    this.getData();
    this.setState({
      title: this.props.route.params.title,
    });
    if (this.props.route.params.type === '初级') {
      this.setState({
        type: 1,
      });
    } else if (this.props.route.params.type === '中级') {
      this.setState({
        type: 2,
      });
    } else {
      this.setState({
        type: 3,
      });
    }
  }

  render() {
    const {list, title, type, current} = this.state;

    return (
      <View
        style={{
          flex: 1,
        }}>
        <HeadNav title={title} />
        <ImageBackground
          source={require('../../../../res/qabg.png')}
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode="cover"
          imageStyle={{height: '100%'}}>
          {/*两侧图标 statr*/}
          <View
            style={{
              marginTop: pxToDp(50),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <ImageBackground
              style={{
                height: pxToDp(52),
                width: pxToDp(66),
              }}
              source={require('../../../../res/qatext.png')}></ImageBackground>
            <View style={{justifyContent: 'space-around'}}>
              <Text style={{fontSize: pxToDp(22), color: '#fff'}}>第一题</Text>
              <Text
                style={{
                  fontSize: pxToDp(12),
                  color: '#f5f5f5',
                  textAlign: 'center',
                }}>
                （1/3）
              </Text>
            </View>
            <ImageBackground
              style={{
                height: pxToDp(52),
                width: pxToDp(66),
              }}
              source={titles[type]}></ImageBackground>
          </View>
          <View style={{}}>
            <Text style={{fontSize: pxToDp(22), color: '#fff'}}>
              {JSON.stringify(list[0])}
            </Text>
          </View>
          {/*两侧图标 end*/}
        </ImageBackground>
      </View>
    );
  }
}

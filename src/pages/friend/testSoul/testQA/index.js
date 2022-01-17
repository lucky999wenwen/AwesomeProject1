/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2022-01-05 11:02:59
 * @LastEditors: wanglong
 * @LastEditTime: 2022-01-05 11:28:27
 * @* : 博虹出品，抄袭必究😄
 */
import React, {Component} from 'react';
import {View, Text, ImageBackground} from 'react-native';

import {friendsQuestionSection as getQuestionsSection} from '~/api/friends';
import {pxToDp} from '~/utils/stylesKits';

import HeadNav from '~/components/HeadNav';
export default class Index extends Component {
  titles = [
    require('../../../../res/level1.png'),
    require('../../../../res/level2.png'),
    require('../../../../res/level3.png'),
  ];

  state = {
    list: [],
    title: '问卷调查',
    type: 0,
  };

  getData = () => {
    getQuestionsSection(this.props.route.params.qid).then(res => {
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
        type: 0,
      });
    } else if (this.props.route.params.type === '中级') {
      this.setState({
        type: 1,
      });
    } else {
      this.setState({
        type: 2,
      });
    }
  }

  render() {
    const {title, type} = this.state;
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
            <ImageBackground
              style={{
                height: pxToDp(52),
                width: pxToDp(66),
              }}
              source={require(`../../../../res/level${type}.png`)}></ImageBackground>
          </View>
          {/*两侧图标 end*/}
        </ImageBackground>
      </View>
    );
  }
}

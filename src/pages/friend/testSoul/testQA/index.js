/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2022-01-05 11:02:59
 * @LastEditors: wanglong
 * @LastEditTime: 2022-03-02 15:00:09
 * @* : 博虹出品，抄袭必究😄
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {inject, observer} from 'mobx-react';

import {
  friendsQuestionSection as getQuestionsSection,
  friendsQuestionAns,
} from '~/api/friends';
import {pxToDp} from '~/utils/stylesKits';
import {BASE_URI} from '~/utils/pathMap';
import LinearGradient from 'react-native-linear-gradient';

import HeadNav from '~/components/HeadNav';
const titles = {
  1: require('../../../../res/leve1.png'),
  2: require('../../../../res/leve2.png'),
  3: require('../../../../res/leve3.png'),
};
@inject('store') // 注入 用来获取 全局数据的
@observer //  当全局发生改变了  组件的重新渲染 从而显示最新的数据
export default class Index extends Component {
  state = {
    list: [],
    title: '问卷调查',
    type: 1,
    currentIndex: 0,
  };
  ansList = [];
  arrCapital = ['一', '二', '三', '四', '五', '六'];

  getData = () => {
    getQuestionsSection(this.props.route.params.qid).then(res => {
      this.setState({
        list: res.data,
      });
    });
  };

  chooeseAns = v => {
    const {currentIndex} = this.state;
    this.ansList.push(v.ans_No);
    if (currentIndex >= this.state.list.length - 1) {
      // 最后一个题目选择完成
      const answers = this.ansList.join(',');
      friendsQuestionAns(this.props.route.params.qid, {answers}).then(res => {
        this.props.navigation.replace('TestResult', res.data);
      });
    } else {
      this.setState({currentIndex: currentIndex + 1});
    }
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
    const {list, title, type, currentIndex} = this.state;
    const {header} = this.props.store.userInfo;
    if (!list[currentIndex]) return <></>;
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
                justifyContent: 'center',
                alignItems: 'center',
              }}
              source={require('../../../../res/qatext.png')}>
              <Image
                source={{uri: BASE_URI + header}}
                style={{
                  width: pxToDp(46),
                  height: pxToDp(46),
                  borderRadius: pxToDp(23),
                  backgroundColor: '#fff',
                }}
              />
            </ImageBackground>
            <View style={{justifyContent: 'space-around'}}>
              <Text style={{fontSize: pxToDp(22), color: '#fff'}}>
                第{this.arrCapital[currentIndex]}题
              </Text>
              <Text
                style={{
                  fontSize: pxToDp(12),
                  color: '#f5f5f5',
                  textAlign: 'center',
                }}>
                （{currentIndex + 1}/{list.length}）
              </Text>
            </View>
            <ImageBackground
              style={{
                height: pxToDp(52),
                width: pxToDp(66),
              }}
              source={titles[type]}></ImageBackground>
          </View>
          <View style={{paddingLeft: pxToDp(30), paddingRight: pxToDp(30)}}>
            <Text
              style={{
                fontSize: pxToDp(18),
                color: '#fff',
                paddingTop: pxToDp(30),
              }}>
              {list[currentIndex].question_title}
            </Text>
            {list[currentIndex].answers.map((v, i) => (
              <TouchableOpacity
                key={i}
                style={{marginTop: pxToDp(10)}}
                onPress={() => this.chooeseAns(v)}>
                <LinearGradient
                  style={{
                    height: pxToDp(40),
                    borderRadius: pxToDp(6),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  colors={['#6f45f3', '#6f45f31a']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}>
                  <Text style={{color: '#fff'}}>{v.ans_title}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
          {/*两侧图标 end*/}
        </ImageBackground>
      </View>
    );
  }
}

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
import {View, Text} from 'react-native';

import {friendsQuestionSection as getQuestionsSection} from '~/api/friends';

import HeadNav from '~/components/HeadNav';
export default class Index extends Component {
  state = {
    list: [],
    title: '问卷调查',
  };

  getData = () => {
    getQuestionsSection(this.props.route.params.qid).then(res => {
      this.setState({list: res.data});
      //   console.log('____________________________________');
      //   console.log(res, '^_^');
      //   console.log('____________________________________');
    });
  };
  componentDidMount() {
    this.getData();
    this.setState({title: this.props.route.params.title});
  }

  render() {
    const {title} = this.state;
    return (
      <View style={{flex: 1}}>
        <HeadNav title={title} />
      </View>
    );
  }
}

/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-10-14 17:26:47
 * @LastEditors: wanglong
 * @LastEditTime: 2021-11-25 14:23:12
 * @* : 博虹出品，抄袭必究😄
 */
import React, {Component} from 'react';
import {View} from 'react-native';

import Nav from './src/nav';
import Geo from '~/utils/Geo';

export default class App extends Component {
  state = {
    isInit: false,
  };

  async componentDidMount() {
    const res = await Geo.initGeo();
    console.log(1111);
    this.setState({isInit: true});
  }
  render() {
    return (
      <View style={{flex: 1}}>{this.state.isInit ? <Nav></Nav> : <></>}</View>
    );
  }
}

/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-12-09 16:57:33
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-09 17:26:41
 * @* : 博虹出品，抄袭必究😄
 */
import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {getVisitors} from '~/api/friends';
import {BASE_URI} from '~/utils/pathMap';
import {pxToDp} from '~/utils/stylesKits';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class Index extends Component {
  state = {
    visitorsList: [],
  };
  getData = () => {
    getVisitors().then(res => {
      this.setState({visitorsList: res.data});
    });
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    const {visitorsList} = this.state;
    return (
      <View
        style={{
          paddingLeft: pxToDp(10),
          paddingRight: pxToDp(10),
          flexDirection: 'row',
          marginTop: pxToDp(20),
          alignItems: 'center',
        }}>
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            color: '#999',
            fontSize: pxToDp(15),
          }}>
          最近有{visitorsList.length}人来访，快去查看
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
            marginLeft: pxToDp(10),
          }}>
          {visitorsList.map((v, i) => (
            <Image
              source={{uri: BASE_URI + v.header}}
              style={{
                width: pxToDp(40),
                height: pxToDp(40),
                borderRadius: pxToDp(20),
                marginRight: pxToDp(10),
              }}
            />
          ))}
          <Icon
            name="angle-right"
            size={24}
            color="#999"
            style={{marginLeft: pxToDp(10)}}
          />
        </View>
      </View>
    );
  }
}

/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-12-08 11:28:15
 * @LastEditors: wanglong
 * @LastEditTime: 2022-02-18 15:12:58
 * @* : 博虹出品，抄袭必究😄
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Svg from 'react-native-svg-uri';
import {pxToDp} from '~/utils/stylesKits';
import {
  friend,
  selectedFriend,
  group,
  selectedGroup,
  message,
  selectedMessage,
  my,
  selectedMy,
} from '~/res/fonts/iconSvg';
import Friend from '~/pages/friend/home';
import Group from '~/pages/group/home';
import Message from '~/pages/message/home';
import My from '~/pages/my/home';
import {userInfo} from '~/api/user';
import {inject, observer} from 'mobx-react';

@inject('store') // 注入 用来获取 全局数据的
@observer //  当全局发生改变了  组件的重新渲染 从而显示最新的数据
export default class Index extends Component {
  componentDidMount() {
    userInfo().then(res => {
      this.props.store.setUser(res.data);
    });
  }
  state = {
    selectedTab: 'friend',
    pagesTab: [
      {
        selected: 'friend',
        title: '交友',
        renderIcon: () => (
          <Svg width={pxToDp(20)} height={pxToDp(20)} svgXmlData={friend} />
        ),
        renderSelectedIcon: () => (
          <Svg
            width={pxToDp(22)}
            height={pxToDp(22)}
            svgXmlData={selectedFriend}
          />
        ),
        onPress: () => this.setState({selectedTab: 'friend'}),
        component: <Friend />,
      },
      {
        selected: 'group',
        title: '圈子',
        renderIcon: () => (
          <Svg width={pxToDp(20)} height={pxToDp(20)} svgXmlData={group} />
        ),
        renderSelectedIcon: () => (
          <Svg
            width={pxToDp(22)}
            height={pxToDp(22)}
            svgXmlData={selectedGroup}
          />
        ),
        onPress: () => this.setState({selectedTab: 'group'}),
        component: <Group />,
      },
      {
        selected: 'message',
        title: '消息',
        renderIcon: () => (
          <Svg width={pxToDp(20)} height={pxToDp(20)} svgXmlData={message} />
        ),
        renderSelectedIcon: () => (
          <Svg
            width={pxToDp(22)}
            height={pxToDp(22)}
            svgXmlData={selectedMessage}
          />
        ),
        onPress: () => this.setState({selectedTab: 'message'}),
        component: <Message />,
      },
      {
        selected: 'my',
        title: '我的',
        renderIcon: () => (
          <Svg width={pxToDp(20)} height={pxToDp(20)} svgXmlData={my} />
        ),
        renderSelectedIcon: () => (
          <Svg width={pxToDp(22)} height={pxToDp(22)} svgXmlData={selectedMy} />
        ),
        onPress: () => this.setState({selectedTab: 'my'}),
        component: <My />,
      },
    ],
  };
  render() {
    const {pagesTab, selectedTab} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <TabNavigator
          tabBarStyle={{
            justifyContent: 'center',
            backgroundColor: '#eee',
            alignItems: 'center',
            height: pxToDp(50),
          }}>
          {pagesTab.map((v, i) => (
            <TabNavigator.Item
              selected={v.selected === selectedTab}
              title={v.title}
              renderIcon={v.renderIcon}
              renderSelectedIcon={v.renderSelectedIcon}
              onPress={v.onPress}
              selectedTitleStyle={{
                color: '#c863b5',
              }}>
              {v.component}
            </TabNavigator.Item>
          ))}
        </TabNavigator>
      </View>
    );
  }
}

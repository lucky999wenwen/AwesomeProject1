/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-10-14 17:26:47
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-22 11:46:38
 * @* : 博虹出品，抄袭必究😄
 */
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {inject, observer} from 'mobx-react';

import Login from './pages/account/login';
import UserInfo from './pages/account/userInfo';
import TestPage from './pages/testPage';
import tabBar from './tabBar';
const Stack = createStackNavigator();
@inject('store') // 注入 用来获取 全局数据的
@observer //  当全局发生改变了  组件的重新渲染 从而显示最新的数据
export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //判断是否是已经登录过了
      initialRouteName: this.props.store.token ? 'tabBar' : 'Login',
      // initialRouteName: 'Login',
    };
  }
  render() {
    const {initialRouteName} = this.state;
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false, //隐藏标题
            //用来定制头部信息、根据自己需要更改
            title: '测试标题',
            headerStyle: {
              backgroundColor: '#ee7530',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}
          initialRouteName={initialRouteName}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="TestPage" component={TestPage} />
          <Stack.Screen name="tabBar" component={tabBar} />
          {/*用户信息完善 */}
          <Stack.Screen name="UserInfo" component={UserInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-10-21 10:36:50
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-08 10:42:29
 * @* : 博虹出品，抄袭必究😄
 */
import React from 'react';
import {View, Text} from 'react-native';
import JMessage from 'jmessage-react-plugin';
class App extends React.Component {
  componentDidMount() {
    JMessage.init({
      appkey: 'ecbbbf33e07a5ed21559f49a',
      isOpenMessageRoaming: true,
      isProduction: true,
      channel: '',
    });
    JMessage.setDebugMode({enable: true});
    console.log(JMessage);

    JMessage.register(
      {
        username: '18665711956',
        password: '18665711956',
      },
      res => {
        console.log('注册成功');
        console.log(res);
      },
      err => {
        console.log('注册失败');
        console.log(err);
      },
    );
    // JMessage.login(
    //   {
    //     username: '18665711956',
    //     password: '18665711956',
    //   },
    //   res => {
    //     console.log('登录成功');
    //     console.log(res);
    //   },
    //   err => {
    //     console.log('登录失败');
    //     console.log(err);
    //   },
    // );
  }
  render() {
    return (
      <View>
        <Text>goods</Text>
      </View>
    );
  }
}
export default App;

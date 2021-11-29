/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-10-14 17:26:47
 * @LastEditors: wanglong
 * @LastEditTime: 2021-11-29 14:49:41
 * @* : 博虹出品，抄袭必究😄
 */
import React from 'react';
import {Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './pages/account/login';
import UserInfo from './pages/account/userInfo';
import TestPage from './pages/testPage';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function Nav() {
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
        initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TestPage" component={TestPage} />
        {/*用户信息完善 */}
        <Stack.Screen name="UserInfo" component={UserInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Nav;

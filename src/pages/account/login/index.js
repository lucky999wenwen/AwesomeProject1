/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-10-15 09:52:19
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-08 15:14:01
 * @* : 博虹出品，抄袭必究😄
 */
import React, {Component} from 'react';
import {View, Text, Image, StatusBar, StyleSheet} from 'react-native';
import {Provider} from '@ant-design/react-native';
import {Toast} from '@ant-design/react-native';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import {Input} from 'react-native-elements';
import {inject, observer} from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {pxToDp} from '~/utils/stylesKits';
import validator from '~/utils/validator';
import GButton from '~/components/GButton/index';
import {login, loginVerification} from '~/api/user';

const styles = StyleSheet.create({
  root: {flex: 1, padding: pxToDp(20)},
  title: {textAlign: 'center', fontSize: pxToDp(30)},
  codeFieldRoot: {marginTop: pxToDp(5)},
  cell: {
    width: pxToDp(40),
    height: pxToDp(40),
    lineHeight: pxToDp(38),
    fontSize: pxToDp(24),
    borderBottomWidth: pxToDp(2),
    borderColor: '#7d53ea',
    textAlign: 'center',
    color: '#7d53ea',
  },
  focusCell: {
    borderColor: '#7d53ea',
  },
});
@inject('store') // 注入 用来获取 全局数据的
@observer //  当全局发生改变了  组件的重新渲染 从而显示最新的数据
export default class Index extends Component {
  state = {
    phoneNumber: '15585398636',
    // 手机号码校验
    phoneValid: true,
    //是否显示输入验证码
    isShowInputVcode: false,
    //输入的验证码
    vCodeText: '',
    //倒计时
    timer: 60,
    isStartCountDown: false,
  };
  changPhone = phoneNumber => {
    this.setState({phoneNumber});
  };
  countDown = () => {
    const {isStartCountDown} = this.state;
    if (isStartCountDown) return;
    this.setState({isStartCountDown: true});
    let interval = setInterval(() => {
      const {timer} = this.state;
      if (timer > 0) {
        this.setState({timer: timer - 1});
      } else {
        clearInterval(interval);
        this.setState({isStartCountDown: false});
        this.setState({timer: 60});
      }
    }, 1000);
  };

  phoneSubmitEditing = async () => {
    const {phoneNumber} = this.state;
    let phoneValid = validator.validatePhone(phoneNumber);
    this.setState({phoneValid});
    if (!phoneValid) {
      return;
    }

    login({phone: phoneNumber})
      .then(res => {
        this.setState({isShowInputVcode: true});
        this.countDown();
      })
      .catch(err => {
        console.log(err);
      });
  };

  //输入验证码
  onChangeVcode = vCodeText => {
    this.setState({vCodeText});
  };

  //验证验证码和手机号
  verificationVcodePhone = () => {
    const {phoneNumber, vCodeText} = this.state;
    if (vCodeText.length < 6) Toast.info('验证码错误', 1, undefined, false);
    else {
      loginVerification({
        phone: phoneNumber,
        vcode: vCodeText,
      }).then(res => {
        this.props.store.setUserInfo(phoneNumber, res.data.token, res.data.id);
        AsyncStorage.setItem(
          'userInfo',
          JSON.stringify({
            phone: phoneNumber,
            token: res.data.token,
            userId: res.data.id,
          }),
        );
        if (res.data.isNew) {
          //新用户
          this.props.navigation.navigate('UserInfo');
        } else {
          //老用户
          this.props.navigation.navigate('tabBar');
        }
        // console.log(this.props.navigation.navigate());
      });
    }
  };

  //渲染手机号输入
  renderInputPhone = () => {
    const {phoneNumber, phoneValid} = this.state;
    return (
      <View style={{padding: pxToDp(20)}}>
        <View>
          <Text
            style={{
              fontSize: pxToDp(20),
              color: '#888',
              fontWeight: 'bold',
            }}>
            手机号登录注册
          </Text>
        </View>
        <View style={{marginTop: pxToDp(20)}}>
          <Input
            placeholder="请输入手机号"
            maxLength={11}
            keyboardType="phone-pad"
            inputStyle={{color: '#333'}}
            onChangeText={this.changPhone}
            value={phoneNumber}
            errorMessage={phoneValid ? '' : '手机号码格式不正确'}
            onSubmitEditing={this.phoneSubmitEditing}
            leftIcon={{
              type: 'font-awesome',
              name: 'phone',
              size: pxToDp(20),
              color: '#ccc',
            }}
          />
        </View>

        <View>
          <GButton
            onPress={this.phoneSubmitEditing}
            style={{
              width: '85%',
              alignSelf: 'center',
              height: pxToDp(40),
              borderRadius: pxToDp(20),
            }}>
            获取验证码
          </GButton>
        </View>
      </View>
    );
  };

  ///渲染验证码输入
  renderInputVcode = () => {
    const {phoneNumber, vCodeText, timer, isStartCountDown} = this.state;
    return (
      <View style={{padding: pxToDp(20)}}>
        <View>
          <Text
            style={{fontSize: pxToDp(25), color: '#666', fontWeight: 'bold'}}>
            输入6位验证码
          </Text>
        </View>
        <View style={{marginTop: pxToDp(10)}}>
          <Text style={{fontSize: pxToDp(14), color: '#666'}}>
            已经发送到:+86 {phoneNumber}
          </Text>
        </View>
        <View>
          <CodeField
            value={vCodeText}
            onSubmitEditing={this.verificationVcodePhone}
            onChangeText={this.onChangeVcode}
            cellCount={6}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>

        <View style={{marginTop: pxToDp(20)}}>
          <GButton
            disabled={isStartCountDown}
            onPress={this.phoneSubmitEditing}
            style={{
              width: '85%',
              alignSelf: 'center',
              height: pxToDp(40),
              borderRadius: pxToDp(20),
            }}>
            重新获取{isStartCountDown ? `( ${timer}s )` : ''}
          </GButton>
        </View>
      </View>
    );
  };

  render() {
    const {isShowInputVcode} = this.state;
    return (
      <Provider>
        <View>
          {/* 状态栏 start*/}
          <StatusBar backgroundColor="transparent" translucent={true} />
          {/* 状态栏 end*/}
          {/* 200 单位 dp  单位px -> dp单位 */}
          <Image
            style={{width: '100%', height: pxToDp(200)}}
            source={require('../../../res/profileBackground.jpg')}
          />
          {isShowInputVcode ? this.renderInputVcode() : this.renderInputPhone()}
        </View>
      </Provider>
    );
  }
}

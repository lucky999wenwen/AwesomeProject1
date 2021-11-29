/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-10-21 14:20:10
 * @LastEditors: wanglong
 * @LastEditTime: 2021-11-25 17:00:57
 * @* : 博虹出品，抄袭必究😄
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TouchableHighlight} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import {Provider} from '@ant-design/react-native';
import {Input} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import {pxToDp} from '~/utils/stylesKits';
import {timeFormat} from '~/utils/time';
import Geo from '~/utils/Geo';
import {man, main} from '~/svg/fonts';
import styles from './styles';
import GButton from '~/components/GButton/index';

export default class Index extends Component {
  state = {
    // 昵称
    nickname: '',
    // 性别
    gender: '男',
    // 生日
    birthday: '',
    // 城市
    city: '',
    // 头像
    header: '',
    // 经度
    lng: '',
    // 纬度
    lat: '',
    // 详细的地址
    address: '',
    showBirthday: false,
  };

  //切换性别
  changGender = gender => {
    return () => {
      this.setState({gender});
    };
  };
  onChange = birthday => {
    this.setState({birthday});
  };
  okBirthday = data => {
    console.log(timeFormat(data));
    this.showDatePicker(false);
    this.setState({birthday: timeFormat(data)});
  };

  showDatePicker = showBirthday => {
    this.setState({showBirthday});
  };

  async componentDidMount() {
    const data = await Geo.getCityByLocation();
    this.setState({address: data.regeocode.addressComponent.city});
  }

  render() {
    const {gender, address, showBirthday} = this.state;
    return (
      <Provider>
        <View style={{...styles.userBox}}>
          <Text style={{...styles.userBox.text}}>填写资料</Text>
          <Text style={{...styles.userBox.text}}>提升我的魅力值</Text>
          <View style={{...styles.userBox.genderSelect}}>
            <View style={{...styles.userBox.genderSelect.headerBox}}>
              <TouchableOpacity
                onPress={this.changGender('男')}
                style={{
                  ...styles.userBox.genderSelect.headerBox.touchaBox,
                  backgroundColor: gender == '男' ? '#999' : '#eee',
                }}>
                <SvgUri
                  svgXmlData={man}
                  width={pxToDp(40)}
                  height={pxToDp(40)}></SvgUri>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.changGender('女')}
                style={{
                  ...styles.userBox.genderSelect.headerBox.touchaBox,
                  backgroundColor: gender == '女' ? '#999' : '#eee',
                }}>
                <SvgUri
                  svgXmlData={main}
                  width={pxToDp(40)}
                  height={pxToDp(40)}></SvgUri>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {/* 昵称 start*/}
            <View style={{height: pxToDp(50)}}>
              <Input
                placeholder="输入昵称"
                value={this.state.nickname}
                maxLength={10}
                onChange={value => {
                  this.setState({
                    nickname: value,
                  });
                }}
                style={{
                  ...styles.userBox.userInfo.nickname,
                }}
              />
            </View>
            {/* 昵称 end */}
            {/* 生日 start*/}
            <View
              style={{
                height: pxToDp(50),
              }}>
              <TouchableOpacity onPress={() => this.showDatePicker(true)}>
                <Input
                  placeholder="选择生日"
                  value={this.state.birthday}
                  disabled
                  disabledInputStyle={{
                    color: '#030004',
                  }}
                  rightIcon={<Icon name="angle-down" size={24} color="#999" />}
                  style={{
                    ...styles.userBox.userInfo.birthday,
                  }}
                />
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={showBirthday}
                mode="date"
                onConfirm={this.okBirthday}
                onCancel={() => this.showDatePicker(false)}
              />
            </View>
            {/* 生日 end*/}

            {/* 选择城市 start*/}
            <View style={{height: pxToDp(50)}}>
              <Input
                placeholder="选择城市"
                value={address}
                disabled
                disabledInputStyle={{
                  color: '#030004',
                }}
                rightIcon={<Icon name="angle-down" size={24} color="#999" />}
                style={{
                  ...styles.userBox.userInfo.address,
                }}
              />
            </View>
            {/* 选择城市 end*/}
          </View>
          <View>
            <GButton
              style={{
                width: '85%',
                alignSelf: 'center',
                height: pxToDp(40),
                borderRadius: pxToDp(20),
                marginTop: pxToDp(70),
              }}>
              提交
            </GButton>
          </View>
        </View>
      </Provider>
    );
  }
}

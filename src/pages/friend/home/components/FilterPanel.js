/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-12-22 14:39:32
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-27 11:47:44
 * @* : 博虹出品，抄袭必究😄
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import {Slider, Icon} from 'react-native-elements';
import Picker from 'react-native-picker';
import IconFont from '~/components/IconFont';
import CityJson from '~/res/citys.json';
import {pxToDp} from '~/utils/stylesKits';
import GButton from '~/components/GButton/index';

import {man, main} from '~/svg/fonts';
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.params,
    };
  }
  changLastLogin = v => {
    return event => {
      this.setState({lastLogin: v});
    };
  };

  genderTemplate = () => {
    const {gender} = this.state;
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: pxToDp(15),
          paddingTop: pxToDp(10),
        }}>
        <Text style={{fontSize: pxToDp(15), color: '#777'}}>性别:</Text>
        <View
          style={{
            flexDirection: 'row',
            width: '50%',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginLeft: '9%',
          }}>
          <TouchableOpacity
            onPress={() => this.setState({gender: '男'})}
            style={{
              width: pxToDp(40),
              height: pxToDp(40),
              borderRadius: pxToDp(20),
              backgroundColor: '#eee',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: gender == '男' ? '#999' : '#eee',
            }}>
            <SvgUri
              svgXmlData={man}
              width={pxToDp(20)}
              height={pxToDp(20)}></SvgUri>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({gender: '女'})}
            style={{
              width: pxToDp(40),
              height: pxToDp(40),
              borderRadius: pxToDp(20),
              backgroundColor: '#eee',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: gender == '女' ? '#999' : '#eee',
            }}>
            <SvgUri
              svgXmlData={main}
              width={pxToDp(20)}
              height={pxToDp(20)}></SvgUri>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  lastLoginTemplate = () => {
    const {lastLogin} = this.state;
    const data = ['15分钟', '1天', '1小时', '不限制'];
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: pxToDp(15),
          paddingTop: pxToDp(10),
        }}>
        <Text style={{fontSize: pxToDp(15), color: '#777'}}>近期登录时间:</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          {data.map((v, index) => {
            return (
              <Text
                key={index}
                onPress={this.changLastLogin(v)}
                style={{
                  backgroundColor: lastLogin == v ? '#B565C0' : '#eee',
                  color: lastLogin == v ? '#fff' : '#B565C0',
                  minWidth: pxToDp(50),
                  textAlign: 'center',
                  marginLeft: pxToDp(5),
                  borderRadius: pxToDp(4),
                  padding: pxToDp(7),
                  paddingTop: pxToDp(2),
                  paddingBottom: pxToDp(2),
                }}>
                {v}
              </Text>
            );
          })}
        </View>
      </View>
    );
  };
  distanceTemplate = () => {
    const {distance} = this.state;
    const interpolate = (start, end) => {
      let k = (distance - 0) / 10; // 0 =>min  && 10 => MAX
      return Math.ceil((1 - k) * start + k * end) % 256;
    };
    const color = () => {
      let r = interpolate(255, 0);
      let g = interpolate(0, 255);
      let b = interpolate(0, 0);
      return `rgb(${r},${g},${b})`;
    };

    return (
      <View
        style={{
          flexDirection: 'column',
          paddingLeft: pxToDp(15),
          paddingTop: pxToDp(10),
          paddingRight: pxToDp(15),
        }}>
        <Text style={{fontSize: pxToDp(15), color: '#777'}}>
          距离: {distance}km
        </Text>
        <View style={{}}>
          <Slider
            onValueChange={distance => this.setState({distance})}
            value={distance}
            maximumValue={10}
            minimumValue={0}
            step={0.5}
            allowTouchTrack
            trackStyle={{height: pxToDp(3), backgroundColor: 'transparent'}}
            thumbStyle={{
              height: pxToDp(8),
              width: pxToDp(8),
              backgroundColor: 'transparent',
            }}
            thumbProps={{
              children: (
                <Icon
                  name="heartbeat"
                  type="font-awesome"
                  size={pxToDp(8)}
                  reverse
                  containerStyle={{bottom: pxToDp(14), right: pxToDp(10)}}
                  color={color()}
                />
              ),
            }}
          />
        </View>
      </View>
    );
  };

  cityTemplate = () => {
    const {city} = this.state;
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: pxToDp(15),
          paddingTop: pxToDp(10),
        }}>
        <Text style={{fontSize: pxToDp(15), color: '#777'}}>居住地:</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Text
            style={{paddingLeft: pxToDp(20)}}
            onPress={() => this.showCityPicker()}>
            {city ? city : '点我选择'}
          </Text>
        </View>
      </View>
    );
  };
  educationTemplate = () => {
    const {education} = this.state;
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: pxToDp(15),
          paddingTop: pxToDp(10),
        }}>
        <Text style={{fontSize: pxToDp(15), color: '#777'}}>学历:</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Text
            style={{paddingLeft: pxToDp(20)}}
            onPress={() => this.showEducationPicker()}>
            {education ? education : '点我选择'}
          </Text>
        </View>
      </View>
    );
  };

  showCityPicker = () => {
    Picker.init({
      pickerData: CityJson,
      pickerBg: [255, 255, 255, 1], //背景颜色
      pickerToolBarBg: [232, 232, 232, 1], //头部背景颜色
      pickerConfirmBtnColor: [10, 10, 10, 1],
      pickerCancelBtnColor: [10, 10, 10, 1],
      selectedValue: ['北京', '北京'],
      wheelFlex: [1, 1, 0], // 显示省和市
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择城市',
      onPickerConfirm: data => {
        // data =  [广东，广州，天河]
        this.setState({
          city: data[1],
        });
      },
    });
    Picker.show();
  };
  showEducationPicker = () => {
    Picker.init({
      pickerData: [
        '博士后',
        '博士',
        '硕士',
        '本科',
        '大专',
        '高中',
        '留学',
        '其他',
      ],
      pickerBg: [255, 255, 255, 1], //背景颜色
      pickerToolBarBg: [232, 232, 232, 1], //头部背景颜色
      pickerConfirmBtnColor: [10, 10, 10, 1],
      pickerCancelBtnColor: [10, 10, 10, 1],
      selectedValue: ['其他'],
      wheelFlex: [1, 0, 0], // 显示省和市
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择学历',
      onPickerConfirm: data => {
        this.setState({
          education: data[0],
        });
      },
    });
    Picker.show();
  };

  render() {
    return (
      <View style={{height: '45%', backgroundColor: '#fff', width: '100%'}}>
        <View
          style={{
            position: 'relative',
            paddingTop: pxToDp(5),
            paddingBottom: pxToDp(5),
          }}>
          <Text
            style={{color: '#000', fontSize: pxToDp(20), textAlign: 'center'}}>
            标题
          </Text>
          <IconFont
            name="iconshibai"
            onPress={this.props.onClose}
            style={{
              position: 'absolute',
              right: pxToDp(10),
              top: pxToDp(10),
              fontSize: pxToDp(25),
              color: '#999',
            }}
          />
        </View>

        <View>
          {/* 性别 start */}
          {this.genderTemplate()}
          {/* 性别 end */}
          {/* 近期登录时间 start */}
          {this.lastLoginTemplate()}
          {/* 近期登录时间 start */}
          {/* 距离 start */}
          {this.distanceTemplate()}
          {/* 距离 start */}
          {/* 居住地 start */}
          {this.cityTemplate()}
          {/* 居住地 start */}
          {/* 学历 start */}
          {this.educationTemplate()}
          {/* 学历 start */}
          <View
            style={{
              paddingLeft: pxToDp(30),
              paddingRight: pxToDp(15),
              paddingTop: pxToDp(30),
            }}>
            <GButton
              onPress={() => this.props.searchGet(this.state)}
              style={{
                width: '40%',
                height: pxToDp(35),
                borderRadius: pxToDp(10),
              }}>
              确定
            </GButton>
          </View>
        </View>
      </View>
    );
  }
}

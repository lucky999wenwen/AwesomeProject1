/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-12-22 14:39:32
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-30 17:05:53
 * @* : 博虹出品，抄袭必究😄
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import {Slider, Icon} from 'react-native-elements';
import IconFont from '~/components/IconFont';
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
            maximumValue={50}
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

          {/* 距离 start */}
          {this.distanceTemplate()}
          {/* 距离 start */}

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

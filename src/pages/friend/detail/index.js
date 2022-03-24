/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2022-03-03 09:38:56
 * @LastEditors: wanglong
 * @LastEditTime: 2022-03-09 15:58:26
 * @* : 博虹出品，抄袭必究😄
 */
import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import {Carousel} from '@ant-design/react-native';

import {friendsPersonalInfo} from '~/api/friends';
import {pxToDp} from '~/utils/stylesKits';
import {BASE_URI} from '~/utils/pathMap';
import IconFont from '~/components/IconFont';
import GButton from '~/components/GButton';

export default class Index extends Component {
  state = {
    userDetail: {},
  };
  params = {
    page: 1,
    pagesize: 5,
  };
  getInfo = () => {
    const id = this.props.route.params.id;
    friendsPersonalInfo(id, this.params).then(res => {
      this.setState({userDetail: res.data});
    });
  };
  componentDidMount() {
    this.getInfo();
  }
  onScroll = () => {};
  changeBanner = index => {
    const {userDetail} = this.state;
    // console.log(userDetail.silder);
    // console.log(userDetail.silder[index]);
    // console.log(index, 'index');
  };

  render() {
    const {userDetail} = this.state;
    if (!userDetail.silder) return <></>;
    return (
      <HeaderImageScrollView
        onScroll={this.onScroll}
        maxHeight={pxToDp(240)}
        minHeight={pxToDp(240)}
        renderForeground={() => (
          <Carousel
            style={{height: pxToDp(240)}}
            selectedIndex={0}
            autoplay
            infinite={true}
            dotActiveStyle={{backgroundColor: '#fff'}}
            afterChange={this.changeBanner}>
            {userDetail.silder.map((v, i) => (
              <Image
                key={i}
                source={{uri: BASE_URI + v.thum_img_path}}
                style={{width: '100%', height: pxToDp(240)}}
              />
            ))}
          </Carousel>
        )}>
        <View style={{backgroundColor: '#fff'}}>
          {/* 1.0 用户个人信息 开始 */}
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: pxToDp(15),
              paddingRight: pxToDp(5),
              paddingTop: pxToDp(8),
              paddingBottom: pxToDp(5),
              borderBottomWidth: pxToDp(10),
              borderColor: '#F2F2F2',
            }}>
            <View style={{flex: 2, justifyContent: 'space-around'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: '#555'}}>{userDetail.nick_name}</Text>
                <IconFont
                  style={{
                    marginLeft: pxToDp(5),
                    marginRight: pxToDp(5),
                    fontSize: pxToDp(18),
                    color: userDetail.gender === '女' ? '#b564bf' : 'red',
                  }}
                  name={
                    userDetail.gender === '女'
                      ? 'icontanhuanv'
                      : 'icontanhuanan'
                  }
                />
                <Text style={{color: '#555'}}>{userDetail.age}岁</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#555', marginRight: pxToDp(5)}}>
                  {userDetail.marry}
                </Text>
                <Text style={{color: '#555', marginRight: pxToDp(5)}}>|</Text>
                <Text style={{color: '#555', marginRight: pxToDp(5)}}>
                  {userDetail.xueli}
                </Text>
                <Text style={{color: '#555', marginRight: pxToDp(5)}}>|</Text>
                <Text style={{color: '#555', marginRight: pxToDp(5)}}>
                  {userDetail.agediff < 10 ? '年龄相仿' : '有点代沟'}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  position: 'relative',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <IconFont
                  name="iconxihuan"
                  style={{fontSize: pxToDp(50), color: 'red'}}
                />
                <Text
                  style={{
                    position: 'absolute',
                    color: '#fff',
                    fontSize: pxToDp(13),
                    fontWeight: 'bold',
                  }}>
                  {userDetail.fateValue}
                </Text>
              </View>
              <Text
                style={{
                  color: '#E14B39',
                  fontSize: pxToDp(13),
                }}>
                缘分值
              </Text>
            </View>
          </View>
          {/* 1.0 用户个人信息 结束 */}
          {/* 1.0 动态-聊一下 开始 */}
          <View style={{}}>
            <View>
              <Text>动态</Text>
              <Text>3</Text>
            </View>
            <View>
              <GButton>聊一下</GButton>
            </View>
          </View>
          {/* 1.0 动态-聊一下 结束 */}
        </View>
      </HeaderImageScrollView>
    );
  }
}

/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-12-08 11:50:46
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-22 15:29:27
 * @* : 博虹出品，抄袭必究😄
 */
import React, {Component} from 'react';
import {View, Text, StatusBar, TouchableOpacity, Image} from 'react-native';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import {Provider, Toast} from '@ant-design/react-native';

import {pxToDp} from '~/utils/stylesKits';
import ModalMe from '~/components/ModalMe/index';
import FriendHead from './components/FriendHead';
import Visitors from './components/Visitors';
import PerfectGirl from './components/PerfectGirl';
import FilterPanel from './components/FilterPanel';

import {getRecommendation} from '~/api/friends';
import {BASE_URI} from '~/utils/pathMap';
import IconFont from '~/components/IconFont';

export default class Index extends Component {
  state = {
    // 接口要的数据
    params: {
      page: 1,
      pagesize: 100,
      gender: '男',
      distance: 2,
      lastLogin: '',
      city: '',
      education: '',
    },
    // 推荐朋友 数组
    recommends: [],
    modalVisible: false,
  };

  // 获取推荐朋友
  getRecommends = async (filterParams = {}) => {
    getRecommendation({...this.state.params}).then(res => {
      this.setState({recommends: res.data});
    });
  };

  //
  recommendFilterShow = () => {
    console.log(11);
    this.setState({modalVisible: true});
  };

  componentDidMount() {
    this.getRecommends();
  }
  render() {
    const {recommends, modalVisible, params} = this.state;
    let param = {...params};
    delete param['page'];
    delete param['pagesize'];
    return (
      <Provider>
        <HeaderImageScrollView
          maxHeight={pxToDp(160)}
          minHeight={pxToDp(40)}
          headerImage={require('~/res/headfriend.png')}
          renderForeground={() => (
            <View
              style={{
                height: pxToDp(160),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <StatusBar backgroundColor={'transparent'} translucent={true} />
              <FriendHead />
            </View>
          )}>
          <View>
            <Visitors />
            <PerfectGirl />
            {/* 2.0 推荐朋友 开始 */}
            <View>
              {/* 2.1 标题 开始 */}
              <View
                style={{
                  height: pxToDp(40),
                  backgroundColor: '#eee',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingLeft: pxToDp(10),
                  paddingRight: pxToDp(10),
                  alignItems: 'center',
                }}>
                <Text style={{color: '#666'}}>推荐</Text>
                <IconFont
                  onPress={this.recommendFilterShow}
                  style={{color: '#666'}}
                  name="iconshaixuan"
                />
              </View>
              {/* 2.1 标题 结束 */}
              {/* 2.2 列表内容 开始 */}
              <View>
                {recommends.map((v, i) => (
                  //  onPress={() => this.context.navigate('Detail', {id: v.id})}
                  <TouchableOpacity
                    key={i}
                    style={{
                      flexDirection: 'row',
                      paddingTop: pxToDp(15),
                      paddingBottom: pxToDp(15),
                      borderBottomWidth: pxToDp(1),
                      borderColor: '#eee',
                    }}>
                    {/* 图片 */}
                    <View
                      style={{
                        paddingLeft: pxToDp(15),
                        paddingRight: pxToDp(15),
                      }}>
                      <Image
                        style={{
                          width: pxToDp(46),
                          height: pxToDp(46),
                          borderRadius: pxToDp(23),
                        }}
                        source={{uri: BASE_URI + v.header}}
                      />
                    </View>
                    {/* 名称 */}
                    <View style={{flex: 2, justifyContent: 'space-around'}}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: '#999'}}>{v.nick_name}</Text>
                        <IconFont
                          style={{
                            fontSize: pxToDp(18),
                            color: v.gender === '女' ? '#b564bf' : '#E14B39',
                            marginLeft: pxToDp(5),
                            marginRight: pxToDp(5),
                          }}
                          name={
                            v.gender === '女' ? 'icontanhuanv' : 'icontanhuanan'
                          }
                        />
                        <Text style={{color: '#999'}}>{v.age}岁</Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', marginTop: pxToDp(5)}}>
                        <Text style={{color: '#999'}}>{v.marry}</Text>
                        <Text style={{color: '#999'}}>|</Text>
                        <Text style={{color: '#999'}}>{v.xueli}</Text>
                        <Text style={{color: '#999'}}>|</Text>
                        <Text style={{color: '#999'}}>
                          {v.agediff < 10 ? '年龄相仿' : '有点代沟'}
                        </Text>
                      </View>
                    </View>
                    {/* 缘分值 */}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: pxToDp(100),
                        justifyContent: 'center',
                      }}>
                      <IconFont
                        name="iconxihuan"
                        style={{color: '#E14B39', fontSize: pxToDp(30)}}
                      />
                      <Text style={{color: '#666'}}>{v.fateValue}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              {/* 2.2 列表内容 结束 */}
            </View>
            {/* 2.0 推荐朋友 结束 */}
          </View>
        </HeaderImageScrollView>

        <ModalMe
          visible={modalVisible}
          childrenStyle={{justifyContent: 'flex-end'}}>
          <FilterPanel
            onClose={() => this.setState({modalVisible: false})}
            params={param}
          />
        </ModalMe>
      </Provider>
    );
  }
}

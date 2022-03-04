/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2022-03-03 09:38:56
 * @LastEditors: wanglong
 * @LastEditTime: 2022-03-04 16:57:16
 * @* : 博虹出品，抄袭必究😄
 */
import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import {Carousel} from '@ant-design/react-native';

import {friendsPersonalInfo} from '~/api/friends';
import {pxToDp} from '~/utils/stylesKits';
import {BASE_URI} from '~/utils/pathMap';

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
      // this.userDetail = res.data;
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
      <View style={{flex: 1, width: '100%'}}>
        <HeaderImageScrollView
          onScroll={this.onScroll}
          maxHeight={pxToDp(240)}
          minHeight={pxToDp(40)}
          renderForeground={() => (
            <Carousel
              style={styles.wrapper}
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
          )}></HeaderImageScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'red',
    height: '100%',
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  containerVertical: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  text: {
    color: '#fff',
    fontSize: 36,
  },
});

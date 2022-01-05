/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2022-01-05 10:02:57
 * @LastEditors: wanglong
 * @LastEditTime: 2022-01-05 11:18:19
 * @* : 博虹出品，抄袭必究😄
 */
import React, {Component} from 'react';
import {View, Text, ImageBackground, StyleSheet, Image} from 'react-native';
import Swiper from 'react-native-deck-swiper';

import HeadNav from '~/components/HeadNav';
import GButton from '~/components/GButton';
import {BASE_URI} from '~/utils/pathMap';
import {pxToDp} from '~/utils/stylesKits';
import {friendsQuestions as getQuestions} from '~/api/friends';

export default class Index extends Component {
  state = {
    list: [],
    currentIndex: 0,
  };
  getData = () => {
    getQuestions().then(res => {
      this.setState({list: res.data});
    });
  };
  onSwiped = cardIndex => {
    this.setState({currentIndex: cardIndex + 1}, () => {
      if (this.state.currentIndex == this.state.list.length)
        this.setState({currentIndex: 0});
    });
  };
  goTestQA = () => {
    const {list, currentIndex} = this.state;
    this.props.navigation.navigate('TestQA', list[currentIndex]);
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    const {list, currentIndex} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <HeadNav title="测灵魂"></HeadNav>
        <ImageBackground
          resizeMode="cover"
          source={require('../../../res/testsoul_bg.png')}
          style={{height: '50%'}}
          imageStyle={{height: '100%'}}>
          {list[currentIndex] ? (
            <Swiper
              key={new Date().getTime()}
              cards={list}
              renderCard={card => {
                return (
                  <View style={styles.card}>
                    <Image
                      style={{width: '100%', height: '100%'}}
                      source={{uri: BASE_URI + card.imgpath}}
                    />
                  </View>
                );
              }}
              onSwiped={cardIndex => this.onSwiped(cardIndex)}
              onSwipedAll={() => {}}
              infinite={true}
              cardIndex={currentIndex}
              cardVerticalMargin={pxToDp(20)}
              backgroundColor={'transparent'}
              stackSize={3}
              stackSeparation={1}></Swiper>
          ) : (
            <></>
          )}
        </ImageBackground>
        <GButton
          onPress={this.goTestQA}
          style={{
            width: '80%',
            height: pxToDp(40),
            position: 'absolute',
            bottom: pxToDp(50),
            alignSelf: 'center',
          }}>
          开始测试
        </GButton>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  card: {
    height: '70%',
    // borderWidth: 1,
    backgroundColor: '#fff',
  },
});

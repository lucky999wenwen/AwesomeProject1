/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-12-27 14:25:23
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-27 17:22:37
 * @* : 博虹出品，抄袭必究😄
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import HeadNav from '~/components/HeadNav';
import Swiper from 'react-native-deck-swiper';
import {getFriendsCards} from '~/api/friends';
import {BASE_URI} from '~/utils/pathMap';
import {pxToDp} from '~/utils/stylesKits';
import IconFont from '~/components/IconFont';

export default class Index extends Component {
  params = {
    page: 1,
    pagesize: 5,
  };
  state = {
    cards: [],
  };
  getData = () => {
    getFriendsCards(this.params).then(res => {
      console.log(res, '-------');
      this.setState({cards: res.data});
    });
  };
  componentDidMount() {
    this.getData();
  }

  render() {
    const {cards} = this.state;
    if (!cards.length) {
      return <></>;
    }
    return (
      <View style={{flex: 1}}>
        <HeadNav />
        <ImageBackground
          source={require('../../../res/testsoul_bg.png')}
          style={{height: '50%'}}
          imageStyle={{height: '100%'}}>
          <Swiper
            cards={cards}
            renderCard={card => {
              return (
                <View style={styles.card}>
                  <Image
                    style={{width: '100%', height: '75%'}}
                    source={{uri: BASE_URI + card.header}}
                  />
                  {/* 网友信息 开始 */}
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      paddingTop: pxToDp(15),
                      paddingBottom: pxToDp(15),
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{color: '#555'}}>{card.nick_name}</Text>
                      <IconFont
                        style={{
                          fontSize: pxToDp(18),
                          color: card.gender === '女' ? '#b564bf' : 'red',
                        }}
                        name={
                          card.gender === '女'
                            ? 'icontanhuanv'
                            : 'icontanhuanan'
                        }
                      />
                      <Text style={{color: '#555'}}>{card.age}岁</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: '#555'}}>{card.marry}</Text>
                      <Text style={{color: '#555'}}>|</Text>
                      <Text style={{color: '#555'}}>{card.xueli}</Text>
                      <Text style={{color: '#555'}}>|</Text>
                      <Text style={{color: '#555'}}>
                        {card.agediff < 10 ? '年龄相仿' : '有点代沟'}
                      </Text>
                    </View>
                  </View>
                  {/* 网友信息 结束 */}
                </View>
              );
            }}
            onSwiped={cardIndex => {
              console.log(cardIndex);
            }}
            onSwipedAll={() => {
              console.log('onSwipedAll');
            }}
            cardIndex={0}
            cardVerticalMargin={0}
            backgroundColor={'transparent'}
            stackSize={3}></Swiper>
        </ImageBackground>
        {/* 两个小图标 */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '60%',
            alignSelf: 'center',
            marginTop: '45%',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#ebc869',
              width: pxToDp(60),
              height: pxToDp(60),
              borderRadius: pxToDp(30),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <IconFont
              style={{fontSize: pxToDp(30), color: '#fff'}}
              name="iconbuxihuan"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#fd5213',
              width: pxToDp(60),
              height: pxToDp(60),
              borderRadius: pxToDp(30),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <IconFont
              style={{fontSize: pxToDp(30), color: '#fff'}}
              name="iconxihuan"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: '65%',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
});

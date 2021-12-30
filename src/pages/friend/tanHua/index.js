/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-12-27 14:25:23
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-30 09:50:32
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
import {Provider, Toast} from '@ant-design/react-native';
import {getFriendsCards, friendsLike} from '~/api/friends';
import {BASE_URI} from '~/utils/pathMap';
import {pxToDp} from '~/utils/stylesKits';
import IconFont from '~/components/IconFont';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.swiperRef = React.createRef();
  }
  // 总页数
  totalPages = 1;

  params = {
    page: 1,
    pagesize: 5,
  };
  state = {
    currentIndex: 0,
    cards: [],
  };
  getData = () => {
    getFriendsCards(this.params).then(res => {
      if (res.data.length) {
        this.setState({cards: [...this.state.cards, ...res.data]});
        this.totalPages = this.params.page;
        if (res.data.length < this.params.pagesize) {
          this.totalPages = this.totalPages + 1;
        }
      } else {
        this.totalPages = this.totalPages + 1;
      }
    });
  };

  onSwipedAll = () => {};
  onSwiped = cardIndex => {
    this.setState({currentIndex: cardIndex + 1}, () => {
      if (this.state.currentIndex == this.state.cards.length)
        this.setState({currentIndex: 0});
    });
    if (
      cardIndex == this.state.cards.length - 2 &&
      this.params.page == this.totalPages
    ) {
      this.params.page = this.params.page + 1;
      this.getData();
    }
  };

  //设置喜欢不喜欢
  setLike = (type, showTost = true, direction = null) => {
    const {currentIndex, cards} = this.state;
    const id = cards[currentIndex].id;
    friendsLike(id, type).then(res => {
      if (showTost) {
        Toast.success({
          content: res.data,
          duration: 0.5,
          stackable: false,
        });
      }
      if (!direction) {
        if (type === 'dislike') {
          this.swiperRef.swipeLeft();
        } else {
          this.swiperRef.swipeRight();
        }
      }
    });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const {cards, currentIndex} = this.state;

    return (
      <Provider>
        <View style={{flex: 1}}>
          <HeadNav />
          <ImageBackground
            source={require('../../../res/testsoul_bg.png')}
            style={{height: '50%'}}
            imageStyle={{height: '100%'}}>
            {cards[currentIndex] ? (
              <Swiper
                key={new Date().getTime()}
                ref={ref => (this.swiperRef = ref)}
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
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
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
                onSwiped={cardIndex => this.onSwiped(cardIndex)}
                onSwipedAll={() => this.onSwipedAll()}
                onSwipedLeft={() => this.setLike('dislike', false, 'left')}
                onSwipedRight={() => this.setLike('like', false, 'right')}
                infinite={true}
                cardIndex={currentIndex}
                cardVerticalMargin={30}
                backgroundColor={'transparent'}
                stackSize={3}
                stackSeparation={-20}></Swiper>
            ) : (
              <></>
            )}
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
              onPress={() => this.setLike('dislike')}
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
              onPress={() => this.setLike('like')}
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
      </Provider>
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

import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {pxToDp} from '~/utils/stylesKits';
import {friendsSearch} from '~/api/friends';
import {BASE_URI} from '~/utils/pathMap';
import {ScreenWidth} from 'react-native-elements/dist/helpers';
import IconFont from '~/components/IconFont';
import ModalMe from '~/components/ModalMe/index';
import FilterPanel from './components/FilterPanel';

export default class componentName extends Component {
  params = {
    gender: '女',
    distance: 0.5,
  };
  state = {
    list: [],
    modalVisible: false,
  };
  getData = () => {
    let data = {
      gender: this.params.gender,
      distance: this.params.distance * 1000,
    };
    friendsSearch(data).then(res => {
      this.setState({list: res.data});
    });
  };
  searchGet = params => {
    this.params = params;
    this.getData();
    this.setState({modalVisible: false});
  };
  getWidthHeight = dist => {
    const width = 50;
    const height = 65;
    if (dist < 200) {
      return {
        width: pxToDp(width),
        height: pxToDp(height),
      };
    }
    if (dist < 400) {
      return {
        width: pxToDp(width * 0.9),
        height: pxToDp(height * 0.9),
      };
    }
    if (dist < 600) {
      return {
        width: pxToDp(width * 0.8),
        height: pxToDp(height * 0.8),
      };
    }
    if (dist < 800) {
      return {
        width: pxToDp(width * 0.7),
        height: pxToDp(height * 0.7),
      };
    }
    if (dist > 1000) {
      return {
        width: pxToDp(width * 0.6),
        height: pxToDp(height * 0.6),
      };
    }
    return {
      width: pxToDp(width * 0.5),
      height: pxToDp(height * 0.5),
    };
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    const {list, modalVisible} = this.state;

    return (
      <View style={{flex: 1, position: 'relative'}}>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <ImageBackground
          resizeMode="cover"
          source={require('../../../res/search.gif')}
          style={{width: '100%', height: '100%', position: 'relative'}}>
          {list.map((item, index) => {
            const WH = this.getWidthHeight(item.dist);
            const tx = Math.random() * (ScreenWidth - WH.width);
            const ty = Math.random() * (ScreenWidth - WH.height);
            return (
              <TouchableOpacity key={index}>
                <ImageBackground
                  source={require('../../../res/showfirend.png')}
                  resizeMode="stretch"
                  style={{
                    ...WH,
                    alignItems: 'center',
                    position: 'absolute',
                    left: tx,
                    top: ty,
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: '#ffffff9a',
                      position: 'absolute',
                      top: -pxToDp(15),
                      fontSize: pxToDp(10),
                    }}>
                    {item.nick_name}
                  </Text>
                  <Image
                    source={{uri: BASE_URI + item.header}}
                    style={{
                      width: WH.width * 0.8,
                      height: WH.width * 0.8,
                      borderRadius: WH.width * 0.8,
                      marginTop: pxToDp(WH.width * 0.8 * 0.15),
                    }}
                  />
                </ImageBackground>
              </TouchableOpacity>
            );
          })}
          <View
            style={{
              position: 'absolute',
              bottom: pxToDp(30),
              width: '100%',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff'}}>
              您附近有
              <Text style={{color: 'red', fontSize: pxToDp(20)}}>
                {list.length}
              </Text>
              个好友
            </Text>
            <Text style={{color: '#fff'}}>选择聊聊吧</Text>
          </View>
        </ImageBackground>
        <View
          style={{
            position: 'absolute',
            right: pxToDp(25),
            bottom: pxToDp(30),
            backgroundColor: '#eee',
            width: pxToDp(40),
            height: pxToDp(40),
            borderRadius: pxToDp(20),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <IconFont
            onPress={() => this.setState({modalVisible: true})}
            style={{
              color: '#FF5F0F',
              fontSize: pxToDp(20),
            }}
            name="iconshaixuan"
          />
        </View>
        <ModalMe
          visible={modalVisible}
          childrenStyle={{justifyContent: 'flex-end'}}>
          <FilterPanel
            title={'搜索'}
            onClose={() => this.setState({modalVisible: false})}
            searchGet={data => this.searchGet(data)}
            params={this.params}
          />
        </ModalMe>
      </View>
    );
  }
}

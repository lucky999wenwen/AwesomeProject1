/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-10-21 14:20:10
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-22 11:36:40
 * @* : 博虹出品，抄袭必究😄
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import {Provider, Toast} from '@ant-design/react-native';
import {Input, Overlay} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Picker from 'react-native-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {inject, observer} from 'mobx-react';

import {pxToDp} from '~/utils/stylesKits';
import {timeFormat} from '~/utils/time';
import {man, main} from '~/svg/fonts';
import CityJson from '~/res/citys.json';
import {loginReginfoHead} from '~/api/fileUplpad';
import {loginReginfo} from '~/api/user';
import JMessage from '~/utils/JMessage';

import styles from './styles';
import Geo from '~/utils/Geo';
import GButton from '~/components/GButton/index';
import ModalMe from '~/components/ModalMe/index';

@inject('store') // 注入 用来获取 全局数据的
@observer //  当全局发生改变了  组件的重新渲染 从而显示最新的数据
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
    modalVisible: false,
    path: null,
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
    this.showDatePicker(false);
    this.setState({birthday: timeFormat(data)});
  };

  showDatePicker = showBirthday => {
    this.setState({showBirthday});
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
          address: data[1],
        });
      },
    });
    Picker.show();
  };

  //提交注册
  submit = async () => {
    const {nickname, birthday, address} = this.state;
    if (!nickname) {
      Toast.offline('请输入昵称');
      return;
    }
    if (!birthday) {
      Toast.offline('请选择生日');
      return;
    }
    if (!address) {
      Toast.offline('请选择或者开启定位');
      return;
    }
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    });
    // console.log(image);
    this.setState({path: image.path});
    this.setState({modalVisible: true});
    let formData = new FormData();
    formData.append('headPhoto', {
      //本地图片的地址
      uri: image.path,
      type: image.mime,
      name: image.path.split('/').pop(),
    });
    loginReginfoHead(formData)
      .then(res => {
        console.log(res, '头像');
        this.setState(
          {
            header: res.data.headImgPath,
          },
          () => {
            this.userRegister();
          },
        );
      })
      .catch(err => {
        this.setState({modalVisible: false});
      });
  };

  userRegister = () => {
    let data = {
      nickname: this.state.nickname,
      gender: this.state.gender,
      birthday: this.state.birthday,
      city: this.state.city,
      header: this.state.header,
      lng: this.state.lng,
      lat: this.state.lat,
      address: this.state.address,
    };
    loginReginfo(data).then(res => {
      this.JMessageRegister(this.props.store.userId, this.props.store.phone);
    });
  };
  //极光注册
  JMessageRegister = (username, password) => {
    JMessage.register(username, password)
      .then(res => {
        Toast.success('注册成功');
        setTimeout(() => {}, 3000);
      })
      .catch(err => {
        Toast.offline('注册失败');
      });
  };

  async componentDidMount() {
    const data = await Geo.getCityByLocation();

    this.setState({
      city: data.regeocode.addressComponent.city.replace('市', ''),
    });
    this.setState({
      address: data.regeocode.formatted_address,
    });
    let locationArr =
      data.regeocode.addressComponent.streetNumber.location.split(',');
    this.setState({lng: locationArr[0]});
    this.setState({lat: locationArr[1]});
  }

  render() {
    const {gender, address, showBirthday, modalVisible, path, city} =
      this.state;
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
              <TouchableOpacity onPress={this.showCityPicker}>
                <Input
                  placeholder="选择城市"
                  value={'自动定位:' + city}
                  disabled
                  disabledInputStyle={{
                    color: '#666',
                  }}
                  rightIcon={<Icon name="angle-down" size={24} color="#999" />}
                  style={{
                    ...styles.userBox.userInfo.city,
                  }}
                />
              </TouchableOpacity>
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
              }}
              onPress={this.submit}>
              设置头像
            </GButton>
          </View>
        </View>
        <ModalMe visible={modalVisible}>
          <View
            style={{
              position: 'relative',
              width: pxToDp(224),
              height: pxToDp(224),
              backgroundColor: '#000',
            }}>
            <Image
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                zIndex: 2,
              }}
              source={require('~/res/scan.gif')}
            />
            <Image
              style={{
                position: 'absolute',
                left: '20%',
                top: '23%',
                width: '60%',
                height: '60%',
                zIndex: 1,
              }}
              source={{uri: path}}
            />
          </View>
        </ModalMe>
      </Provider>
    );
  }
}

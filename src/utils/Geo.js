/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-10-22 14:58:34
 * @LastEditors: wanglong
 * @LastEditTime: 2021-11-24 15:31:27
 * @* : 博虹出品，抄袭必究😄
 */
import {PermissionsAndroid, Platform} from 'react-native';
import {init, Geolocation} from 'react-native-amap-geolocation';
import axios from 'axios';
class Geo {
  async initGeo() {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );
    }
    await init({
      ios: '2116188662d995afb0a12d053dfc7dbf',
      android: '2116188662d995afb0a12d053dfc7dbf',
    });
    return Promise.resolve();
  }
  async getCurrentPosition() {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(({coords}) => {
        resolve(coords);
      }, reject);
    });
  }
  async getCityByLocation() {
    // await init({
    //   ios: '2116188662d995afb0a12d053dfc7dbf',
    //   android: '2116188662d995afb0a12d053dfc7dbf',
    // });
    const {longitude, latitude} = await this.getCurrentPosition();
    const res = await axios.get('https://restapi.amap.com/v3/geocode/regeo', {
      params: {
        location: `${longitude},${latitude}`,
        key: '5ae26e56ada8cdcef416c854e4ba01b9',
      },
    });
    return Promise.resolve(res.data);
  }
}

export default new Geo();

/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-10-21 15:57:51
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-01 14:50:40
 * @* : 博虹出品，抄袭必究😄
 */
import {StyleSheet} from 'react-native';
import {pxToDp} from '~/utils/stylesKits';
const styles = StyleSheet.create({
  userBox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: pxToDp(20),
    paddingTop: pxToDp(70),
    overflow: 'hidden',
    text: {
      color: '#666',
      fontSize: pxToDp(20),
      fontWeight: 'bold',
    },
    genderSelect: {
      alignItems: 'center',
      marginTop: pxToDp(20),
      marginBottom: pxToDp(20),
      headerBox: {
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-around',
        alignItems: 'center',
        touchaBox: {
          width: pxToDp(60),
          height: pxToDp(60),
          borderRadius: pxToDp(30),
          backgroundColor: '#eee',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    },
    userInfo: {
      nickname: {
        borderBottomWidth: pxToDp(0.1),
        color: '#666',
      },
      birthday: {
        borderBottomWidth: pxToDp(0.1),
      },
      city: {
        height: pxToDp(50),
        borderBottomWidth: pxToDp(0.1),
      },
    },
  },
});
export default styles;

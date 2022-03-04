/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2022-03-03 09:38:56
 * @LastEditors: wanglong
 * @LastEditTime: 2022-03-03 17:25:04
 * @* : 博虹出品，抄袭必究😄
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Carousel} from '@ant-design/react-native';
export default class Index extends Component {
  render() {
    return (
      <View style={{backgroundColor: 'lightblue', flex: 1}}>
        <Text style={{color: 'red'}}>测试</Text>
        <View style={{height: 200, width: '100%', backgroundColor: 'red'}}>
          <Carousel
            style={styles.wrapper}
            selectedIndex={0}
            autoplay
            infinite={true}>
            <View
              style={[styles.containerHorizontal, {backgroundColor: 'red'}]}>
              <Text>Carousel 1</Text>
            </View>
            <View
              style={[styles.containerHorizontal, {backgroundColor: 'green'}]}>
              <Text>Carousel 2</Text>
            </View>
            <View
              style={[styles.containerHorizontal, {backgroundColor: 'blue'}]}>
              <Text>Carousel 3</Text>
            </View>
          </Carousel>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
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

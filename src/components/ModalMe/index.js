/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-11-30 16:53:58
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-22 15:19:01
 * @* : 博虹出品，抄袭必究😄
 */
import React, {Component} from 'react';
import {View, Modal, Text} from 'react-native';
export default class Index extends Component {
  static defaultProps = {
    style: {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    animationType: 'fade',
    transparent: true,
    visible: false,
    zIndex: 9999999999,
    childrenStyle: {},
  };

  //安卓的返回按钮点击触发
  onRequestClose = () => {
    if (this.props.onRequestClose) {
      this.props.onRequestClose(false);
    }
    // this.setState({visible: false});
  };
  //回调会在 modal 被关闭时调用。
  onDismiss = () => {
    // if (this.props.onDismiss) {
    //   this.props.onDismiss(false);
    // }
  };

  render() {
    const {animationType, transparent, zIndex, style, visible, childrenStyle} =
      this.props;
    return (
      <>
        {visible ? (
          <View
            style={{
              position: 'absolute',
              zIndex: zIndex,
              width: '100%',
              height: '100%',
              left: 0,
              top: 0,
              ...style,
            }}>
            <Modal
              hardwareAccelerated={true}
              animationType={animationType}
              transparent={transparent}
              onRequestClose={this.onRequestClose}
              onDismiss={this.onDismiss}
              visible={visible}>
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  ...childrenStyle,
                }}>
                {this.props.children}
              </View>
            </Modal>
          </View>
        ) : (
          <></>
        )}
      </>
    );
  }
}

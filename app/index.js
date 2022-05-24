/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, Platform } from 'react-native';

import Router from './router';
import { Provider } from 'react-redux';
import configureStore from '@lib/configureStore';
import SplashScreen from 'react-native-splash-screen'
import NotificationController from './NotificationController'
let store = configureStore();

export default class Index extends Component {

  componentDidMount() {
    if (Platform.OS == 'android')
      SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <NotificationController />
        <View style={{ flex: 1 }}>
          <Router />
        </View>
      </Provider>
    );
  }
}

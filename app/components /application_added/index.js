import React, {Component, useState, useRef} from 'react';

import PhoneInput from 'react-native-phone-number-input';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {ApplicationAddedIcon, NotifcationIcon, HomeIcon} from '@utils/icons';
import {BackHandler} from 'react-native';
import Home from '../home';
import {SafeAreaView} from 'react-native-safe-area-context';

class ApplicationAdded extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    this.props.navigation.setOptions({headerShown: false});
  }

  handleHomeButtonClick() {
    this.props.navigation.popToTop(null);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{padding: 14}}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              this.handleHomeButtonClick();
            }}>
            <HomeIcon width="40" height="40" />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <ApplicationAddedIcon
            style={{marginBottom: 20}}
            width="85"
            height="85"
          />
          <Text style={styles.sectionTitle}>
            Your application is submitted.
          </Text>
          <Text style={styles.sectionTitle}>Case Number #100</Text>
          <Text style={styles.sectionTitle}>
            Our support team will get back to you shortly.
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.submit}
            onPress={() => {}}>
            <Text style={{fontSize: 20, alignSelf: 'center', color: '#fff'}}>
              {' '}
              CHAT NOW
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default ApplicationAdded;
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    flex: 1,
    width: '95%',
    textAlign: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  submit: {
    marginTop: 20,
    borderRadius: 40,
    width: 300,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#016CAB',
  },
  sectionTitle: {
    width: '80%',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 20,
    textAlign: 'center',
    marginVertical: 10,
    color: '#000',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '400',
    alignSelf: 'center',
    color: '#000',
  },
});

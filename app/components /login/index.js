import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { alertActions, msgActions } from '@actions';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import OTPView from './otp'
import InputPhone from './phone'


class Login extends Component {

  state = {
    phone: undefined,
    otp: undefined
  }

  render() {
    let { phone, otp } = this.state
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          bounces={false}
          contentContainerStyle={{ justifyContent: 'center', height: '100%' }}
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            {!phone && <InputPhone onPress={(phone) => this.setState({ phone })} />}
            {phone && !otp &&
              <OTPView
                onPress={(phone) => this.setState({ phone })}
                onResendOTP={(phone) => this.setState({ phone })} />
            }
          </View>

        </ScrollView>
      </SafeAreaView>

    );
  }
}




const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',

    justifyContent: 'flex-start',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  submit: {
    marginTop: 40,
    borderRadius: 10,
    // marginHorizontal: 50,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#8992A9',
  },
  sectionTitle: {
    width: '80%',
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 20,
    textAlign: 'center',
    marginVertical: 10,
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '400',
    alignSelf: 'center',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },



});

function mapState(state) {
  const { message } = state;
  return { message: message.message };
}
const actionCreators = {
  success: alertActions.success,
  error: alertActions.error,
  clear: alertActions.clear,
  sendMessage: msgActions.sendMessage,
};
export default connect(
  mapState,
  actionCreators,
)(Login);
//export default Home;

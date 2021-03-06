import React, { Component } from 'react';
import { connect } from 'react-redux';
import { alertActions, msgActions } from '@actions';
import {
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import OTPView from './otp';
import InputPhone from './phone';
import UserInfo from './userInfo';
import { createContact } from '@services/home';
import { saveData } from '@utils/utility';
import { CurrentRenderContext } from '@react-navigation/native';

class Login extends Component {
  state = {
    state: 0,
    phone: undefined,
    code: undefined,
    confirm: undefined,
    otp: undefined,
    user: undefined,
    loading: true,
  };

  signInWithPhoneNumber = async phone => {
    try {
      this.setState({ loading: true });
      const confirm = await auth().signInWithPhoneNumber(phone);
      console.log('confirm', confirm);
      this.setState({ phone, confirm, loading: false });
    } catch (error) {
      this.setState({ loading: false });
      alert(error);
    }
  };

  confirmCode = async code => {
    let { confirm } = this.state;

    if (confirm != undefined) {
      try {
        console.log('confirmCode', code);
        let data = await confirm.confirm(String(code));
        let { displayName, email } = data.user;
        let array = displayName.split(' ');
        if (array.length > 2) {
          console.log('contactId', array[array.length - 1]);
          await saveData({ contactId: array[array.length - 1] }, 'contactId');
        }
        console.log('IsUserInfoValid', data, displayName, email);
        if (displayName && email) this.props.navigation.goBack();
        else this.setState({ user: data.user });
        // console.log(data)
      } catch (error) {
        console.log('Invalid code.', error);
      }
    }
  };

  _updateUserData = async data => {
    console.log(data);
    let { fname, lastName, email } = data;
    try {
      await auth().currentUser.updateEmail(String(email));
      let user = await auth().currentUser;
      data.mobile = user._user.phoneNumber;
      console.log('response - ', user);
      try {
        let response = await createContact(data);
        console.log('create contact response - ', response);
        let contactId = response.data.contact.id;
        await auth().currentUser.updateProfile({
          displayName: fname + ' ' + lastName + ' ' + contactId,
        });
        await saveData({ contactId }, 'contactId');
      } catch (error) {
        console.log('response - ', 'user already exist', error);
      }
      this.props.navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let { phone, user, confirm, loading } = this.state;
    if (loading)
      return (
        <View
          style={{
            flex: 1,
            height: '100%',
            alignItems: 'center',
            alignContent: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <ActivityIndicator
            style={{ alignSelf: 'center' }}
            size="large"
            color="#0000ff"
          />
        </View>
      );
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          bounces={false}
          contentContainerStyle={{ justifyContent: 'center', height: '100%' }}
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            {phone == undefined && (
              <InputPhone
                onSubmit={data => this.setState({ ...data, state: 1 })}
                defaultValue={''}
                onPress={this.signInWithPhoneNumber}
              />
            )}

            {phone != undefined &&
              user == undefined &&
              confirm != undefined && (
                <OTPView
                  onPress={this.confirmCode}
                  onResendOTP={_ => this.signInWithPhoneNumber({ phone })}
                />
              )}
            {user != undefined &&
              user.displayName == undefined &&
              user.email == undefined && (
                <UserInfo onPress={user => this._updateUserData({ ...user })} />
              )}
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
export default connect(mapState, actionCreators)(Login);
//export default Home;

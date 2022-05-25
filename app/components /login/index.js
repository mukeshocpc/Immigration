import React, { Component } from 'react';
import { connect } from 'react-redux';
import { alertActions, msgActions } from '@actions';
import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import OTPView from './otp';
import InputPhone from './phone';
import UserInfo from './userInfo';


class Login extends Component {
  state = {
    state: 0,
    phone: undefined,
    code: undefined,
    confirm: undefined,
    otp: undefined,
    user: undefined,
  };

  signInWithPhoneNumber = async (phone) => {
    try {
      const confirm = await auth().signInWithPhoneNumber(phone);
      console.log("confirm", confirm)
      this.setState({ phone, confirm });
    } catch (error) {
      alert(error)
    }

  }


  confirmCode = async (code) => {

    let { confirm } = this.state

    if (confirm != undefined) {
      try {
        console.log('confirmCode')
        let data = await confirm.confirm(code);
        alert('User Authenticated');
        this.setState({ user: data.additionalUserInfo })
        // console.log(data)

      } catch (error) {
        console.log('Invalid code.');
      }
    }
  }


  render() {
    let { phone, user, confirm } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          bounces={false}
          contentContainerStyle={{ justifyContent: 'center', height: '100%' }}
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            {phone == undefined &&
              <InputPhone
                onSubmit={(data) => this.setState({ ...data, state: 1 })}
                defaultValue={'8961422158'}
                onPress={this.signInWithPhoneNumber} />}



            {(phone != undefined && user == undefined && confirm != undefined) && (
              <OTPView
                onPress={this.confirmCode}
                onResendOTP={_ => this.signInWithPhoneNumber({ phone })}
              />
            )}
            {user != undefined && (
              <UserInfo onPress={user => this.setState({ user })} />
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

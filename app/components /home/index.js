import React, { Component } from 'react';
import { connect } from 'react-redux';
import { alertActions, msgActions } from '@actions';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import CardView from './card'
import { UserIcon, UpdateIcon, LogoutIcon, AppLogo } from '@utils/icons'


class Home extends Component {
  state = { text: 'h' };

  buttonClick = () => {
    this.props.sendMessage('sucess');
  };



  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentContainerStyle={{ justifyContent: 'center', height: '100%' }}
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>

            <View style={styles.body}>

              <CardView
                title="New Application"
                subTitle="Fill Out Details here"
                color={"#206A88"}
                onPress={() => alert("New Application")}
                icon={<UserIcon style={{ marginLeft: 0 }} width="85" height="85" />}
                backgroundColor={"#206A88"} />
              <CardView
                title="Latest Updates"
                subTitle="Checkout here"
                color={"#FF5A30"}
                onPress={() => alert("Latest Updates")}
                icon={<UpdateIcon style={{ marginLeft: 0 }} width="85" height="85" />}
                backgroundColor={"#f57d3c"} />

              <CardView
                title="Member Section"
                onPress={() => alert("Member Section")}
                subTitle="Signin/Join here"
                color={"#BC59AE"}
                icon={<LogoutIcon style={{ marginLeft: 0 }} width="85" height="85" />}
                backgroundColor={"#bdcfe2"} />

            </View>
          </ScrollView>
        </SafeAreaView>
      </>
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
    justifyContent: 'flex-start',
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  submit: {
    fontSize: 24,
    color: Colors.red,
    backgroundColor: Colors.black,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 20,
    textAlign: 'center',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
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
)(Home);
//export default Home;
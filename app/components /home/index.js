import React, {Component} from 'react';
import {connect} from 'react-redux';
import {alertActions, msgActions} from '@actions';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  StatusBar,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import CardView from './card';
import {
  UserIcon,
  UpdateIcon,
  LogoutIcon,
  AppLogo,
  NotifcationIcon,
} from '@utils/icons';
import auth from '@react-native-firebase/auth';

class Home extends Component {
  state = {text: 'h', user: undefined};

  componentWillMount() {
    // Add listener here
    this.unsubscribe = auth().onAuthStateChanged(user => {
      if (!user) {
        this.setState({user: undefined});
        console.log('not login');
      } else {
        this.setState({user});
        console.log('Logged in', user);
      }
    });
  }

  componentWillUnmount() {
    // Don't forget to unsubscribe when the component unmounts
    this.unsubscribe();
  }

  _logoutAlert = () => {
    Alert.alert(
      'Alert',
      'Are you sure you want to logout?',
      [
        {text: 'Yes', onPress: () => auth().signOut()},
        {
          text: 'No',
          onPress: () => console.log('No button clicked'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  buttonClick = () => {
    this.props.sendMessage('sucess');
  };

  render() {
    let {user} = this.state;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
          <ScrollView
            contentContainerStyle={{justifyContent: 'center'}}
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <CardView
                title="New Application"
                subTitle="Fill out details here"
                color={'#206A88'}
                onPress={() =>
                  this.props.navigation.navigate(
                    user ? 'NewApplication' : 'Login',
                  )
                }
                icon={
                  <UserIcon style={{marginLeft: 0}} width="85" height="85" />
                }
                backgroundColor={['#1e6886', '#6dbebe']}
              />

              <CardView
                title="Latest Updates"
                subTitle="Checkout here"
                color={'#FF5A30'}
                onPress={() =>
                  this.props.navigation.navigate(user ? 'Updates' : 'Login')
                }
                icon={
                  <UpdateIcon style={{marginLeft: 0}} width="85" height="85" />
                }
                backgroundColor={['#ff5830', '#ffac98']}
              />

              <CardView
                notification={10}
                title="Recent Notification"
                onPress={() =>
                  this.props.navigation.navigate(
                    user ? 'Notification' : 'Login',
                  )
                }
                subTitle="Click here"
                color={'#1f5e95'}
                icon={
                  <NotifcationIcon
                    style={{marginLeft: 0}}
                    width="85"
                    height="85"
                  />
                }
                backgroundColor={['#005f97', '#99bfd5']}
              />

              <CardView
                title="Member Section"
                onPress={() => {
                  if (user) {
                    this._logoutAlert();
                  } else this.props.navigation.navigate('Login');
                }}
                subTitle={!user ? 'Signin/Join here' : 'Signout'}
                color={'#BC59AE'}
                icon={
                  <LogoutIcon style={{marginLeft: 0}} width="85" height="85" />
                }
                backgroundColor={['#8992A9', '#c4c9d4']}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white,
  },

  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: Colors.white,
    marginBottom: 50,
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
  const {message} = state;
  return {message: message.message};
}
const actionCreators = {
  success: alertActions.success,
  error: alertActions.error,
  clear: alertActions.clear,
  sendMessage: msgActions.sendMessage,
};
export default connect(mapState, actionCreators)(Home);
//export default Home;

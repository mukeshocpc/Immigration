import React, { Component } from "react";
import messaging from '@react-native-firebase/messaging';
import PushNotification, { Importance } from 'react-native-push-notification';
import { Platform } from "react-native";

import { saveData } from "@utils/utility";

class NotificationController extends Component {
  constructor(props) {
    super(props);
  }


  checkToken = async () => {
    console.log('checkToken')
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      await saveData({ fcmToken }, 'fcmToken')
      console.log("fcmToken => ", fcmToken);
    }
  }

  registerForRemoteMessages = () => {
    messaging()
      .registerDeviceForRemoteMessages()
      .then(() => {
        console.log('Registered');
        this.requestPermissions();
      })
      .catch(e => console.log(e));
  }


  requestPermissions = () => {
    messaging()
      .requestPermission()
      .then((status) => {
        if (status === 1) {
          console.log('Authorized');
          this.onMessage();
        } else {
          console.log('Not authorized');
        }
      })
      .catch(e => console.log(e));
  }



  showNotification = (notification) => {
    console.log('Showing notification');
    console.log(JSON.stringify(notification));

    // if (Platform.OS == 'ios') {
    //   PushNotificationIOS.addNotificationRequest({
    //     alertBody
    //     title: notification.title,
    //     body: notification.body,
    //     badge: 1,

    //   })
    // }
    // else
    //   PushNotification.localNotification({
    //     title: notification.title, message: notification.body,
    //   });
  };


  componentDidMount = async () => {
    await this.requestUserPermission()
    this.checkToken()
    this.onMessage()


    if (Platform.OS == 'android') {

      PushNotification.createChannel(
        {
          channelId: "1212344", // (required)
          channelName: "Immigartion", // (required)
          channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
          playSound: false, // (optional) default: true
          soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
          importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
      );
    }

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Your message was handled in background');
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state:');
      console.log(remoteMessage);

    })

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }

      });

    if (Platform.OS == 'ios') {
      messaging()
        .getIsHeadless()
        .then(isHeadless => {
          // do sth with isHeadless
          console.log("Headless =>", isHeadless)
        });
    }


  }

  onMessage = async () => {
    messaging().onMessage(response => {
      console.log("showNotification", response)
      let { body, title } = response.notification
      // PushNotificationIOS.addNotificationRequest(response);
      PushNotification.localNotification({
        //... You can use all the options from localNotifications
        channelId: "1212344",
        message: body, // (required)
        title: title,
        smallIcon: "ic_stat_name",
        largeIcon: "",
        color: "#5BCD6D",
        date: new Date(Date.now() + 2 * 1000), // in 60 secs
        allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
        /* Android Only Properties */
        repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
      });
    });
  };

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe()
  }


  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  render() {
    return null;
  }
}

// function mapState(state) {
//   const { CurrentUser, Orders } = state;
//   return { orders: Orders, user: CurrentUser.user };
// }

// const actionCreators = {
//   getOrders: OrderActions.getOrders,
// };
export default NotificationController;
//export default connect(mapState, actionCreators)(NotificationController);

//export default PushNotificationController;

// const mapStateToProps = (state) => {
//   return { auth_token: state.login };
// };

// export default connect(mapStateToProps, { set_app_notification_token })(
//   PushNotificationController
// );

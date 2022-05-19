import React from "react";
import {
  Dimensions,
  PixelRatio,
  PermissionsAndroid,
  Linking,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";

import moment from "moment";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

import NetInfo from "@react-native-community/netinfo";



import analytics from '@react-native-firebase/analytics';
// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;
import qs from 'qs';

import DeviceInfo from "react-native-device-info";

const callNumber = (phone) => {
  let phoneNumber = phone;
  if (Platform.OS !== "android") {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }

  console.log("callNumber ----> ", phone);

  Linking.canOpenURL(phoneNumber)
    .then((supported) => {
      if (!supported) {
        console.log("Phone number is not available");
        return Linking.openURL(phoneNumber);
      } else {
        console.log("callNumber ----> ", phone);
        return Linking.openURL(phoneNumber);
      }
    })
    .catch((err) => console.log(err));
};
const sendEmail = async (to, subject = "THE HUB", body = "") => {
  //const { cc, bcc } = options;

  let url = `mailto:${to}`;

  // Create email link query
  const query = qs.stringify({
    subject: subject,
    body: body,

  });

  if (query.length) url += `?${query}`;

  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        console.log("Email is not available");
        return Linking.openURL(url);
      } else {
        console.log("Email ----> ", url);
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.log(err));
}

String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const canCancelOrder = (timestamp, date, slot) => {
  if (!slot || !timestamp || !slot) return false;
  let reservationDate = moment(date + " " + slot);
  let currentDate = moment.unix(timestamp);
  // let duration = moment.duration(reservationDate.diff(currentDate));
  // let hours = duration.asHours();
  // console.log("hours", hours);
  return reservationDate > currentDate;
};

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Mynu App",
        message: "Mynu App access to your location ",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location");
      alert("You can use the location");
    } else {
      console.log("location permission denied");
      alert("Location permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

const normalize = (size) => {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

const navigate = (destinationScene, props) => {
  // console.log('push', destinationScene, Actions.currentScene, props);
  if (Actions.currentScene === destinationScene) {
    return;
  }
  return Actions[destinationScene](props);
};

const saveData = async (data, key) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    console.log("SaveDb", data, key);
    //Alert.alert('Saved', 'Successful');
    return data;
  } catch (error) {
    console.log("SaveDb Failed", error);
    // Alert.alert('Error', 'There was an error.')
    return error;
  }
};
const getData = async (key) => {
  try {
    let conncetions = await AsyncStorage.getItem(key);
    let parsed = JSON.parse(conncetions);
    return parsed;
  } catch (error) {
    return undefined;
  }
};
const saveDataString = async (data, key) => {
  try {
    await AsyncStorage.setItem(key, data);
    console.log("SaveDb", data, key);
    //Alert.alert('Saved', 'Successful');
    return data;
  } catch (error) {
    console.log("SaveDb Failed", error);
    // Alert.alert('Error', 'There was an error.')
    return error;
  }
};
const getDataString = async (key) => {
  try {
    let conncetions = await AsyncStorage.getItem(key);
    //let parsed = JSON.parse(conncetions);
    return conncetions;
  } catch (error) {
    return undefined;
  }
};

const onDeleteKey = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
};


const widthPercentageToDP = (widthPercent) => {
  const screenWidth = Dimensions.get("window").width;
  // Convert string input to decimal number
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};
const heightPercentageToDP = (heightPercent) => {
  const screenHeight = Dimensions.get("window").height;
  // Convert string input to decimal number
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};
const text_truncate = (str, length, ending) => {
  if (str == undefined) return "";
  if (length == null) {
    length = 100;
  }
  if (ending == null) {
    ending = "...";
  }
  if (str && str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
};

const getDropDownOffset = (length) => {
  if (length == 1) return -2.8;
  if (length == 2) return -3.8;
  if (length == 3) return -4.8;
  if (length == 4 || length >= 5) return -5.8;
};


const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};



const toTitleCase = (str) => {
  return str.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}



const checkNetWork = async () => {
  let netInfo = await NetInfo.fetch()
  if (!netInfo.isConnected)
    throw new Error('No Internet Connection')
}





//LOCATION PERMISSON BLOCK START

class LocationPermission {
  constructor(state, setState) {
    this.state = state;
    this.setState = setState;
  }

  requestPermission = () => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      })
    )
      .then((result) => {
        this.handleResult(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  checkLocationPermission = () => {
    let { ready } = this.state;
    if (ready) return;

    if (Platform.OS == "android")
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then((result) => {
        console.log('checkLocationPermission')

        console.log("PermissionsAndroid", result);
        if (result) this.getPermission();
        this.setState({ locPermisson: result });
      });
    else
      check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) =>
        this.handleResult(result)
      );
  }
  handleResult = (result) => {
    console.log("handleResult Permisson", result);
    switch (result) {
      case RESULTS.UNAVAILABLE:
        this.setState({ locPermisson: false });
        // this.getPermission();
        console.log(
          "This feature is not available (on this device / in this context)"
        );
        break;
      case RESULTS.DENIED:
        this.setState({ locPermisson: false });
        console.log(
          "The permission has not been requested / is denied but requestable"
        );

        break;
      case RESULTS.GRANTED:
        this.setState({ locPermisson: true });
        this.getPermission();
        console.log("The permission is granted");
        break;
      case RESULTS.BLOCKED:
        this.setState({ locPermisson: true });
        console.log("The permission is denied and not requestable anymore");
        break;
    }
  };

  geoSuccess = (position) => {
    console.log("LAT_LONG", position.coords.latitude, this.setState);
    let data = {
      ready: true,
      location: true,
      locPermisson: true,
      where: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
    }
    this.setState(data);
  };

  geoFailure = (err) => {
    console.log("LAT_LONG_Failure", err.message);
    //this.setState({ error: err.message });
    checkLocationPermission();
  };


  getPermission = () => {
    console.log("getPermission Called");
    try {
      let geoOptions = {
        enableHighAccuracy: false,
        timeOut: 20000,
        // maximumAge: 3600000,
      };
      Geolocation.getCurrentPosition(
        this.geoSuccess,
        (error) => {
          // See error code charts below.
          console.log("getPermission", error.code, error.message);
          Geolocation.getCurrentPosition(this.geoSuccess, this.geoFailure, {
            enableHighAccuracy: true,
            timeOut: 20000,
          });
        },
        geoOptions
      );
    } catch (error) { }
  };
}




const logEvent = async (key, data) => {
  await analytics().logEvent(key.replaceAll(/\s/g, '_'), data)
  // await analytics().logEvent(key, data)
}

const logSelection = async (data) => {
  await analytics().logSelectContent(data)

}





//LOCATION PERMISSON BLOCK END

export {
  widthPercentageToDP,
  heightPercentageToDP,
  normalize,
  saveData,
  getData,
  navigate,
  text_truncate,
  onDeleteKey,
  saveDataString,
  getDataString,
  callNumber,
  sendEmail,
  getDropDownOffset,
  validateEmail,
  logEvent,
  logSelection,
  checkNetWork,
  toTitleCase,
  LocationPermission

};

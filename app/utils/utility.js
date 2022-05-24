import {
  Dimensions,
  PixelRatio,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");


import analytics from '@react-native-firebase/analytics';
// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;



String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
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
  getDropDownOffset,
  validateEmail,
  logEvent,
  logSelection,
  toTitleCase,

};

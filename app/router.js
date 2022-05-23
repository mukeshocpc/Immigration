import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '@screen/home';
import Login from '@screen/login';
import Notification from '@screen/notification';
import Updates from '@screen/updates';


const Stack = createNativeStackNavigator();


export default class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="Updates" component={Updates} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '@screen/home';
import Login from '@screen/login';
import Sample from '@screen/sample';


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
          <Stack.Screen name="Sample" component={Sample} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

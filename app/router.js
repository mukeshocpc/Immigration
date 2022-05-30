import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '@screen/home';
import Login from '@screen/login';
import NewApplication from '@screen/new_app';
import Notification from '@screen/notification';
import Updates from '@screen/updates';
import ApplicationAdded from '@screen/application_added';
import MyApplications from '@screen/get_apps';

const Stack = createNativeStackNavigator();

export default class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="NewApplication" component={NewApplication} />
          <Stack.Screen name="MyApplications" component={MyApplications} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="Updates" component={Updates} />
          <Stack.Screen name="ApplicationAdded" component={ApplicationAdded} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

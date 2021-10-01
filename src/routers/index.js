import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {AddContact, ContactDetail, ContactList, EditContact} from '../pages';
import {
  IconAddContactOff,
  IconAddContactOn,
  IconContactListOff,
  IconContactListOn,
} from '../assets/Icons';

const BottomTab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          switch (route.name) {
            case 'Contact List':
              return focused ? <IconContactListOn /> : <IconContactListOff />;
            case 'Add Contact':
              return focused ? <IconAddContactOn /> : <IconAddContactOff />;
            default:
              break;
          }
        },
        // tabBarShowLabel: false,
      })}>
      <BottomTab.Screen
        name="Contact List"
        component={ContactList}
        options={{headerShown: false}}
      />
      <BottomTab.Screen
        name="Add Contact"
        component={AddContact}
        options={{headerShown: false}}
      />
    </BottomTab.Navigator>
  );
};

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ContactDetail"
        component={ContactDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;

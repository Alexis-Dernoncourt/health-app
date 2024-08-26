/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen, TestScreen} from '../screens';
import {HomeTabParamList} from './types';
import {useCurrentUser} from '../hooks';
import {HomePublic} from '../screens';
import HomeIcon from '../navigation/icons/HomeIcon';
import {Text} from 'react-native-paper';
import SignIcon from './icons/SignIcon';
import RegisterIcon from './icons/RegisterIcon';

const Tab = createBottomTabNavigator<HomeTabParamList>();

export default function TabNavigator() {
  const {user} = useCurrentUser();
  const setFocusedColor = ({focused}: {focused: boolean}) => {
    return focused ? '#156EFF' : '#1E1E1E';
  };

  return (
    <Tab.Navigator
      screenOptions={{headerShown: false, tabBarStyle: {height: 60}}}
      initialRouteName="Home">
      {user ? (
        <Tab.Group>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({focused}) => (
                <HomeIcon focused={focused} size={30} />
              ),
              tabBarLabel(props) {
                return (
                  <Text
                    style={{
                      fontSize: 10,
                      color: setFocusedColor(props),
                    }}>
                    {props.children}
                  </Text>
                );
              },
            }}
          />
          <Tab.Screen name="Details" component={TestScreen} />
        </Tab.Group>
      ) : (
        <Tab.Group>
          <Tab.Screen
            name="Register"
            component={TestScreen}
            options={{
              tabBarIcon: ({focused}) => (
                <RegisterIcon focused={focused} size={30} />
              ),
              tabBarLabel(props) {
                return (
                  <Text
                    style={{
                      fontSize: 10,
                      color: setFocusedColor(props),
                    }}>
                    Register
                  </Text>
                );
              },
            }}
          />
          <Tab.Screen
            name="HomePublic"
            component={HomePublic}
            options={{
              tabBarIcon: ({focused}) => (
                <HomeIcon focused={focused} size={30} />
              ),
              tabBarLabel(props) {
                return (
                  <Text
                    style={{
                      fontSize: 10,
                      color: setFocusedColor(props),
                    }}>
                    Home
                  </Text>
                );
              },
            }}
          />
          <Tab.Screen
            name="SignIn"
            component={TestScreen}
            options={{
              tabBarIcon: ({focused}) => (
                <SignIcon focused={focused} size={30} />
              ),
              tabBarLabel(props) {
                return (
                  <Text
                    style={{
                      fontSize: 10,
                      color: setFocusedColor(props),
                    }}>
                    Sign-In
                  </Text>
                );
              },
            }}
          />
        </Tab.Group>
      )}
    </Tab.Navigator>
  );
}

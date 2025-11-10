import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { RootStackParamList } from './types';
// import {TestScreen} from '../screens';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator<RootStackParamList>();
// const StackUnlogged = createStackNavigator<RootStackParamListUnlogged>();

export function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Tab" component={TabNavigator} /> */}
      <Stack.Screen name="Tab" component={TabNavigator} />
      {/* <Stack.Screen name="AddRecipe" component={TestScreen} /> */}
    </Stack.Navigator>
  );
}

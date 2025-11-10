/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeScreen,
  TestScreen,
  SigninScreen,
  RegisterScreen,
  RecipesScreen,
  AddRecipeScreen,
} from '../screens';
import { HomeTabParamList } from './types';
import { HomePublic } from '../screens';
import HomeIcon from '../navigation/icons/HomeIcon';
import { Text } from 'react-native-paper';
import SignIcon from './icons/SignIcon';
import RegisterIcon from './icons/RegisterIcon';
import ProfileIcon from './icons/ProfileIcon';
import MenusIcon from './icons/MenusIcon';
import RecipesIcon from './icons/RecipesIcon';
import { COLORS } from '../lib/constants';
import Profile from '../screens/auth/Profile/ProfileScreen';
import RecipeDetailsScreen from '../screens/auth/Recipes/RecipeDetailsScreen';
import { useCurrentUser } from '../hooks';

const Tab = createBottomTabNavigator<HomeTabParamList>();

export default function TabNavigator() {
  const currentClient = useCurrentUser();
  console.log('🚀 ~ TabNavigator ~ currentClient:', currentClient);
  const setFocusedColor = ({ focused }: { focused: boolean }) => {
    return focused ? COLORS.primary_accent : COLORS.black;
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 60 },
        tabBarHideOnKeyboard: true,
      }}
      initialRouteName="Home"
    >
      {currentClient && currentClient.user ? (
        <Tab.Group>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <HomeIcon focused={focused} size={30} />
              ),
              tabBarLabel(props) {
                return (
                  <Text
                    style={{
                      fontSize: 10,
                      color: setFocusedColor(props),
                    }}
                  >
                    {props.children}
                  </Text>
                );
              },
            }}
          />
          <Tab.Screen
            name="Recipes"
            component={RecipesScreen}
            options={{
              tabBarIcon: ({ focused }) => <RecipesIcon focused={focused} />,
              tabBarLabel(props) {
                return (
                  <Text
                    style={{
                      fontSize: 10,
                      color: setFocusedColor(props),
                    }}
                  >
                    Les Recettes
                  </Text>
                );
              },
            }}
          />
          <Tab.Screen
            name="RecipeDetails"
            component={RecipeDetailsScreen}
            options={{ tabBarItemStyle: { display: 'none' } }}
          />
          <Tab.Screen
            name="Menus"
            component={TestScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <MenusIcon focused={focused} size={30} />
              ),
              tabBarLabel(props) {
                return (
                  <Text
                    style={{
                      fontSize: 10,
                      color: setFocusedColor(props),
                    }}
                  >
                    Mes Menus
                  </Text>
                );
              },
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarIcon: ({ focused }) => <ProfileIcon focused={focused} />,
              tabBarLabel(props) {
                return (
                  <Text
                    style={{
                      fontSize: 10,
                      color: setFocusedColor(props),
                    }}
                  >
                    Mon Compte
                  </Text>
                );
              },
            }}
          />
          <Tab.Screen
            name="AddRecipe"
            component={AddRecipeScreen}
            options={{ tabBarItemStyle: { display: 'none' } }}
          />
          <Tab.Screen
            name="EditProfile"
            component={TestScreen}
            options={{ tabBarItemStyle: { display: 'none' } }}
          />
        </Tab.Group>
      ) : (
        <Tab.Group>
          <Tab.Screen
            name="Home"
            component={HomePublic}
            options={{
              tabBarIcon: ({ focused }) => (
                <HomeIcon focused={focused} size={30} />
              ),
              tabBarLabel(props) {
                return (
                  <Text
                    style={{
                      fontSize: 10,
                      color: setFocusedColor(props),
                    }}
                  >
                    Home
                  </Text>
                );
              },
            }}
          />
          <Tab.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <RegisterIcon focused={focused} size={30} />
              ),
              tabBarLabel(props) {
                return (
                  <Text
                    style={{
                      fontSize: 10,
                      color: setFocusedColor(props),
                    }}
                  >
                    Register
                  </Text>
                );
              },
            }}
          />
          <Tab.Screen
            name="SignIn"
            component={SigninScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <SignIcon focused={focused} size={30} />
              ),
              tabBarLabel(props) {
                return (
                  <Text
                    style={{
                      fontSize: 10,
                      color: setFocusedColor(props),
                    }}
                  >
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

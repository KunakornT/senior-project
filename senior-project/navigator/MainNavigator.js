import React from 'react';
import {Text} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

import LoginScreen from '../screens/authentication/LoginScreen';
import HomeScreen from '../screens/user/home/HomeScreen';
import NotificationScreen from '../screens/user/notification/NotificationScreen';
import ProfileScreen from '../screens/user/profile/ProfileScreen';
import EventScreen from '../screens/user/event/EventScreen';
import RegisterScreen from '../screens/authentication/RegisterScreen';
import VerificationConfirm from '../screens/authentication/VerificationConfirm';
import ChooseSports from '../screens/user/choose/ChooseSports';
import Colors from '../constants/Colors';

const AuthStackNavigation = createStackNavigator({
  Login: LoginScreen,
  Register:  RegisterScreen,
  Verification: VerificationConfirm
});


const defaultStackNavOption = {
  headerStyle: {
    backgroundColor: Colors.primaryColor,
  },
  headerTitleStyle: {
    fontWeight: 'bold'
  },
  headerTintColor: 'white',
};

const HomeStackNavigation = createStackNavigator({
  Home: HomeScreen,
  Choose: ChooseSports
},
{
  defaultNavigationOptions: defaultStackNavOption
});

const NotificationStackNavigation = createStackNavigator({
  Notification: NotificationScreen,
},
{
  defaultNavigationOptions: defaultStackNavOption
});

const ProfileStackNavigation = createStackNavigator({
  Profile: ProfileScreen,
},
{
  defaultNavigationOptions: defaultStackNavOption
});

const EventStackNavigation = createStackNavigator({
  Event: EventScreen,
},
{
  defaultNavigationOptions: defaultStackNavOption
});

const MainTabNavigation = createBottomTabNavigator({
  Home: {
    screen: HomeStackNavigation,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-home' size={25} color={tabInfo.tintColor} />
      },
    }
  },
  Event: {
    screen: EventStackNavigation,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <MaterialIcons name='event-note' size={25} color={tabInfo.tintColor} />
      },
    }
  },
  Notification: {
    screen: NotificationStackNavigation,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='md-notifications' size={25} color={tabInfo.tintColor} />
      },
    }
  },
  Profile: {
    screen: ProfileStackNavigation,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <MaterialCommunityIcons name='account' size={25} color={tabInfo.tintColor} />
      },
    }
  },
},
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 14,
        fontWeight: 'bold',
      },
      activeTintColor: 'white',
      style: {
        backgroundColor: Colors.primaryColor
      }
    },
  });

const AppNavigator = createSwitchNavigator({
  Auth: AuthStackNavigation,
  Home: MainTabNavigation,
});

export default createAppContainer(AppNavigator);

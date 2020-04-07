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
import EventInfoScreen from '../screens/user/event/EventInfoScreen';
import RegisterScreen from '../screens/authentication/RegisterScreen';
import VerificationConfirm from '../screens/authentication/VerificationConfirm';
import ChooseSports from '../screens/user/choose/ChooseSports';
import Colors from '../constants/Colors';
import SportsField from '../screens/user/choose/screens/SportsField';
import SubField from '../screens/user/choose/screens/SubField';
import BookingForm from '../screens/user/choose/screens/BookingForm';
import Schedule from '../screens/user/choose/screens/Schedule';
import AllEvents from '../screens/user/choose/screens/AllEvents';
import AllFields from '../screens/user/choose/screens/AllFields';
import Event from '../screens/user/event/EventScreen';
import Request from '../screens/user/choose/Request';
import {Provider as LocationProvider} from '../context/LocationContext';

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
  Football: ChooseSports,
  Field: SportsField,
  Sub: SubField,
  Form: BookingForm,
  Schedule: Schedule,
  Event: Event,
  Request: Request,
  EventInfo: EventInfoScreen,
  AllEvents: AllEvents,
  AllFields: AllFields
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
  Information: EventInfoScreen
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

const App = createAppContainer(AppNavigator);
export default() => {
  return(
    <LocationProvider>
    <App />
    </LocationProvider>
  );
};

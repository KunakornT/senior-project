import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity, FlatList} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {withNavigation} from 'react-navigation';
import {AntDesign} from '@expo/vector-icons';

const SelectSports = ({navigation}) => {
  return (
  <View >
  <TouchableOpacity onPress = {() => navigation.navigate('Football')}>
  <Ionicons name = "ios-football" style= {styles.iconstyle}/>
  </TouchableOpacity>
  </View>
)
};

const styles = StyleSheet.create({
  iconstyle:{
    marginLeft: 20,
    fontSize: 100
  },
  iconstyle2:{
    marginLeft: 20,
    fontSize: 80
  }
});

export default withNavigation(SelectSports);

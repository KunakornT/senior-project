import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

const EventScreen = () => {
  return <View style = {styles.backgroundStyle}>
  </View>
};

const styles = StyleSheet.create({
  backgroundStyle:{
    height: 40,
    borderColor: 'black',
    marginTop: 5,
    borderWidth: 1,
    marginTop: 10
  },
  textStyle:{
    fontSize: 20,
    borderColor: 'black',
    margin: 5,
    marginLeft: 20
  }
});

export default EventScreen;

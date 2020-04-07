import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import Card from './Card';
import Color from '../constants/Colors'

const HistorySports = (props) => {
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  const date = new Date(props.item.start_time).getUTCDate();
  const month = new Date(props.item.start_time).getUTCMonth() + 1;
  const year = new Date(props.item.start_time).getUTCFullYear();
  const startHour = addZero(new Date(props.item.start_time).getUTCHours());
  const startMinute = addZero(new Date(props.item.start_time).getUTCMinutes());
  const endHour = addZero(new Date(props.item.end_time).getUTCHours());
  const endMinute = addZero(new Date(props.item.end_time).getUTCMinutes());
  const [startDate, setStartDate] = useState(date + '/' + month + '/' + year);
  const [startTime, setStartTime] = useState(startHour + ':' + startMinute);
  const [endTime, setEndTime] = useState(endHour + ':' + endMinute);
  if (!props.imageSource) {
    return null;
  }
  return (
    <Card style={styles.card}>
      <View style={styles.imageContainer}>
        <ImageBackground source={props.imageSource} style={styles.Image} imageStyle={{ borderRadius: 10 }}>
          <Text style={styles.textHeader}>  Sport Field: {props.item.sport_field_name} </Text>
          <Text style={styles.textStyle}> Date: {startDate}</Text>
          <Text style={styles.textStyle}> Time: {startTime} - {endTime}</Text>
          <Text style={styles.textStyle}> Player: {props.item.number_player}/{props.item.max_player}</Text>
          <View style={styles.bottom}>
            <TouchableOpacity style={styles.button} onPress={props.onViewInfo}>
              <Text style={styles.textButton}> Information </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </Card>);
};

const styles = StyleSheet.create({
  card: {
    padding: 0,
    minHeight: Platform.OS == 'ios' ? 220 : 230,
    height: Platform.OS == 'ios' ? Dimensions.get('window').height / 4 : Dimensions.get('window').height / 3,
    width: '90%'
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    padding: 10,
  },
  textStyle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    padding: 5,
  },
  bottom: {
    flex: 1,
    width: '100%',
    margin: 10,
    height: '20%',
    justifyContent: 'flex-end'
  },
  button: {
    width: '50%',
    borderRadius: 50,
    // borderWidth: 2,
    // margin: 10,
    backgroundColor: '#1ec71e',
    // borderColor: Color.primaryColor
  },
  textButton: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    padding: 10
  },
  Image: {
    height: '100%',
    width: '100%',
    // resizeMode: 'stretch',
    // borderRadius: 50,
    // marginLeft: 20,
    // marginRight: 20,
    // alignSelf: 'center',
    // borderRadius: 20,
    // marginTop: 15,
    // marginBottom: 15
  }
});

export default HistorySports;

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';

import Card from './Card';
import Color from '../constants/Colors'

const ComingSports = ({ imageSource, title, start, end, maxPlayer, numberPlayer }) => {
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  const date = new Date(start).getUTCDate();
  const month = new Date(start).getUTCMonth() + 1;
  const year = new Date(start).getUTCFullYear();
  const startHour = addZero(new Date(start).getUTCHours());
  const startMinute = addZero(new Date(start).getUTCMinutes());
  const endHour = addZero(new Date(end).getUTCHours());
  const endMinute = addZero(new Date(end).getUTCMinutes());
  const [startDate, setStartDate] = useState(date + '/' + month + '/' + year);
  const [startTime, setStartTime] = useState(startHour + ':' + startMinute);
  const [endTime, setEndTime] = useState(endHour + ':' + endMinute);
  if (!imageSource) {
    return null;
  }
  return (
    <Card style={styles.card}>
      <View style={styles.imageContainer}>
        <ImageBackground source={imageSource} style={styles.Image} imageStyle={{ borderRadius: 10 }}>
          <Text style={styles.textHeader}>  Sport Field: {title} </Text>
          <Text style={styles.textStyle}> Date: {startDate}</Text>
          <Text style={styles.textStyle}> Time: {startTime} - {endTime}</Text>
          <Text style={styles.textStyle}> Player: {numberPlayer}/{maxPlayer}</Text>
          <View style={styles.bottom}>
            <TouchableOpacity style={styles.button}>
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
    height: Dimensions.get('window').height / 4,
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

export default ComingSports;

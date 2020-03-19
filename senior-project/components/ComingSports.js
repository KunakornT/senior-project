import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Dimensions } from 'react-native';

import Card from './Card';

const ComingSports = ({ imageSource, title, start, maxPlayer, numberPlayer }) => {
  const startTime = new Date(start).toDateString();
  const [startDate, setStartDate] = useState(startTime);
  if (!imageSource) {
    return null;
  }
  return (
    <Card style={styles.card}>
      <View>
        <ImageBackground source={imageSource} style={styles.Image}>
          <View style={styles.imageContainer}>
            <Text style={styles.textHeader}>  Sport Field: {title} </Text>
            <Text style={styles.textStyle}> Date:{startDate}</Text>
            <Text style={styles.textStyle}> max:{maxPlayer} player:{numberPlayer}</Text>
          </View>
        </ImageBackground>
      </View>
    </Card>);
};

const styles = StyleSheet.create({
  card: {
    height: Dimensions.get('window').height / 5,
    width: '90%'
  },
  imageContainer: {
    width: '100%',
    height: '100%'
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

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';

const ComingSports = ({ imageSource, title, start, maxPlayer, numberPlayer }) => {
  const startTime = new Date(start).toDateString();
  const [startDate, setStartDate] = useState(startTime);
  if (!imageSource) {
    return null;
  }
  return (
    <View>
      <Text style={styles.textStyle}>  Sport Field: {title} </Text>
      <ImageBackground source={imageSource} style={styles.Image}>
        <Text style={{color: "white", fontSize: 20}}>Date:{startDate}</Text>
        <Text style={{color: "white", fontSize: 20}}>max:{maxPlayer} player:{numberPlayer}</Text>
      </ImageBackground>
    </View>);
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    alignSelf: 'center'
  },
  Image: {
    height: 225,
    width: 380,
    resizeMode: 'stretch',
    borderRadius: 50,
    marginLeft: 20,
    marginRight: 20,
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 15,
    marginBottom: 15
  }
});

export default ComingSports;

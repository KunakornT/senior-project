import React from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';

const ComingSports = ({imageSource,title}) => {
  if(!imageSource){
    return null;
  }
  return <View>
  <Text style = {styles.textStyle}>  Sport Field: {title} </Text>
  <Image source={imageSource} style={styles.Image}/>
  </View>
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize:18,
    alignSelf: 'center'
  },
  Image: {
    height: 225,
    width:380,
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

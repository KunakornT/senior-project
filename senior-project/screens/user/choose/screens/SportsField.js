import React, {useState, useEffect} from 'react';
import {View,Image,Text,StyleSheet,FlatList,Button} from 'react-native';
import url from '../../../../constants/url-constant';

const SportsField = ({navigation}) => {
  const {state} = navigation;
  const [data, setData] = useState('');
  const [subField, setSubField] = useState(null);
  var id = state.params ? state.params.id : "<undefined>";
  var name = state.params ? state.params.name : "<undefined>";
  var description = state.params ? state.params.description : "<undefined>";
  var type = state.params ? state.params.type : "<undefined>";
  var openTime = state.params ? state.params.openTime : "<undefined>";
  var closeTime = state.params ? state.params.closeTime : "<undefined>";

  return <View style = {styles.container}>
  <Text style = {styles.headText}> {name} </Text>
  <Image style={styles.Image} source={require('../../../../assets/football.jpg')} />
  <Text style = {styles.normalText}>Information</Text>
  <Text style = {styles.textStyle}> {description} </Text>
  <Text style = {styles.textStyle}>Sport type: {type} </Text>
  <Text style = {styles.textStyle}>Open time: {openTime} </Text>
  <Text style = {styles.textStyle}>Close time: {closeTime} </Text>
  <Button title = "Select the field"
    onPress = {()=> navigation.navigate('Sub',{
      id
    })}
    />
  </View>
};

const styles = StyleSheet.create({
  normalText:{
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10
  },
  headText: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 10
  },
  textStyle: {
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
    marginTop: 10,
    marginBottom: 15
  }
});

export default SportsField;

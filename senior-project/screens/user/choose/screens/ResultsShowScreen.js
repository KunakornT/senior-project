import React, {useState, useEffect} from 'react';
import {View,Text,StyleSheet,FlatList,Image} from 'react-native';
import yelp from '../api/yelp';

const ResultsShowScreen =({navigation}) => {
  const [result,setResult] = useState(null);
  const id = navigation.getParam('id');

  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };
  useEffect (() => {
    getResult(id);
  }, []);

  if(!result){
    return null;
  }

  return (
  <View>
    <Text style = {styles.textStyle}> Restaurant Name:  {result.name} </Text>
    <Text style = {styles.textStyle2}> Country: {result.location.country}</Text>
    <Text style = {styles.textStyle2}> Address: {result.location.address1}</Text>
    <FlatList
    data = {result.photos}
    keyExtractor = {(photo) => photo}
    renderItem= {({item}) => {
      return < Image style= {styles.Image} source = {{uri: item}} />
    }}
    />
  </View>
);
};

const styles = StyleSheet.create({
  Image:{
    height: 200,
    width: 300,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 20
  },
  textStyle:{
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  textStyle2:{
    fontSize: 15,
    alignSelf: 'center'
  }
});

export default ResultsShowScreen;

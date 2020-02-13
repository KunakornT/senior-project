import React,  { useState, useEffect } from 'react';
import {View,Text,Image,StyleSheet,ScrollView,Button,TouchableOpacity,AsyncStorage} from 'react-native';
import SelectSports from '../../../components/SelectSports';
import EventsNearby from '../../../components/EventsNearby';
import {Ionicons} from '@expo/vector-icons';
import url from '../../../constants/url-constant';

const HomeScreen = (props) => {
  const [username, setUsername] = useState(null)

  useEffect(() => {
    async function fetchUserData() {
      let data  = await AsyncStorage.getItem('userInfo');
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import SelectSports from '../../../components/SelectSports';
import EventsNearby from '../../../components/EventsNearby';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {

  const [username, setUsername] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      let data = await AsyncStorage.getItem('userInfo');
      let user = await JSON.parse(data);
      setUsername(user.username);
    }
    fetchUserData();
  },[username])

  return (
    <View>
  <ScrollView>
  <Text style= {styles.headText}>  Good morning, {username}!  </Text>
  <Text style= {styles.textStyle}> Select the sport that you want to play </Text>
  <View style = {styles.row}>
  <SelectSports />
  </View>
  <Text style= {styles.headText}>  Events nearby you  </Text>
  <View>
  <TouchableOpacity onPress = {() => props.navigation.navigate('Choose')}>
  <EventsNearby
   title = "Futsal Park RAMA II"
   imageSource={require('../../../assets/football.jpg')}/>
   </TouchableOpacity>
   </View>
  <EventsNearby
  title = "Unun badminton"
  imageSource={require('../../../assets/badminton.jpg')}/>
  <EventsNearby
  title = "Chris basketball"
  imageSource={require('../../../assets/basketball.jpg')}/>
  </ScrollView>
  </View>
)
  }, [username])

  return (
    <View>
      <ScrollView>
        <Text style={styles.headText}>  Good morning, {username}!  </Text>
        <Text style={styles.textStyle}> Select the sport that you want to play </Text>
        <View style={styles.row}>
          <SelectSports />
        </View>
        <Text style={styles.headText}>  Events nearby you  </Text>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Choose')}>
            <EventsNearby
              title="Futsal Park RAMA II"
              imageSource={require('../../../assets/football.jpg')} />
          </TouchableOpacity>
        </View>
        <EventsNearby
          title="Unun badminton"
          imageSource={require('../../../assets/badminton.jpg')} />
        <EventsNearby
          title="Chris basketball"
          imageSource={require('../../../assets/basketball.jpg')} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
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
  row: {
    height: 200,
    backgroundColor: '#FFFCF7',
    borderColor: 'black',
    borderRadius: 15,
    margin: 10,
    borderWidth: 1,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'


  }
});

export default HomeScreen;

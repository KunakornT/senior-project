import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, AsyncStorage } from 'react-native';
import SelectSports from '../../../components/SelectSports';
import EventsNearby from '../../../components/EventsNearby';

const HomeScreen = ({ navigation }) => {

  const [username, setUsername] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      let data = await AsyncStorage.getItem('userInfo');
      let user = await JSON.parse(data);
      setUsername(user.username);
    }
    fetchUserData();
  }, [username])

  return <View>
    <ScrollView>
      <Text style={styles.headText}>  Good morning, {username}  </Text>
      <Text style={styles.textStyle}> Select the sport that you want to play </Text>
      <SelectSports />
      <Text style={styles.headText}>  Events nearby you  </Text>
      <EventsNearby
        title="Futsal Park RAMA II"
        imageSource={require('../../../assets/football.jpg')} />
      <EventsNearby
        title="Unun badminton"
        imageSource={require('../../../assets/badminton.jpg')} />
      <EventsNearby
        title="Chris basketball"
        imageSource={require('../../../assets/basketball.jpg')} />
    </ScrollView>
  </View>
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
});

export default HomeScreen;

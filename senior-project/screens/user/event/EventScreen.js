import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, AsyncStorage, FlatList } from 'react-native';
import SportsFilter from '../../../components/SportsFilter';
import ComingSports from '../../../components/ComingSports';
import HistorySports from '../../../components/HistorySports';

import url from '../../../constants/url-constant';


const EventScreen = (props) => {

  const [userId, setUserId] = useState();
  const [event, setEvent] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let data = await AsyncStorage.getItem('userInfo');
        let user = await JSON.parse(data);
        setUserId(user.user_id);
      } catch (e) {
      }
    }
    fetchUser();
  }, [])

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(url.url_user_event + '/' + userId);
        const responseJson = await response.json();
        setEvent(responseJson);
        console.log(responseJson);
      } catch (e) {
      }
    }
    fetchEvent();
  }, [userId])

  return <View>
    <ScrollView>
      <Text style={styles.textStyle}> Your Events </Text>
      <SportsFilter />
      <Text style={styles.textStyle2}> Coming Events </Text>
      {event && event.map((item, index) => {
         if(new Date(item.end_time) > new Date()){
          return <ComingSports 
          key={item.match_id} 
          item = {item}
          navigation = {navigator}
          imageSource={require('../../../assets/football.jpg')}
          onViewInfo={() => {
            props.navigation.navigate('Information', {
              information: item
            })
          }}/>
        }
      })}
      {/* <ComingSports title="Futsal Park RAMA II"
        imageSource={require('../../../assets/football.jpg')} /> */}
      <Text style={styles.textStyle2}> History </Text>
      {event && event.map((item, index) => {
         if(new Date(item.end_time) < new Date()){
          return <ComingSports 
          key={item.match_id} 
          item = {item}
          navigation = {navigator}
          imageSource={require('../../../assets/football.jpg')}
          onViewInfo={() => {
            props.navigation.navigate('Information', {
              information: item
            })
          }}/>
        }
      })}
      {/* <HistorySports title="Futsal Park RAMA II"
        imageSource={require('../../../assets/football.jpg')} />
      <HistorySports title="Unun badminton"
        imageSource={require('../../../assets/badminton.jpg')} />
      <HistorySports title="Chris basketball"
        imageSource={require('../../../assets/basketball.jpg')} />
      <HistorySports title="Unun badminton"
        imageSource={require('../../../assets/badminton.jpg')} /> */}
    </ScrollView>
  </View>
};

const styles = StyleSheet.create({
  noEventText: {
    textAlign: 'center'
  },
  textStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 15,
  },
  textStyle2: {
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold'
  }
});

export default EventScreen;

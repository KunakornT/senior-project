import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, AsyncStorage, FlatList } from 'react-native';
import EventsFilter from '../../../components/EventsFilter';
import ComingSports from '../../../components/ComingSports';
import HistorySports from '../../../components/HistorySports';

import url from '../../../constants/url-constant';


const Request = ({props,navigation}) => {
  const {state} = navigation;
  const [userId, setUserId] = useState();
  const [event, setEvent] = useState();

  var id = state.params ? state.params.id : "<undefined>";
  var name = state.params ? state.params.name : "<undefined>";

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

    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://senior-project-server.herokuapp.com/sport-field-event/${id}`);
        const responseJson = await response.json();
        setEvent(responseJson);
        console.log(responseJson);
      } catch (e) {
      }
    };

  useEffect(() => {
    fetchEvent();
  });

  const handleUnjoin = (itemId) => {
    const events = event.filter(item => item.match_id !== itemId);
    setEvent(events);
    fetchEvent();
  }

  return <View>
  <ScrollView>
    <Text style={styles.headText}> {name} </Text>
    {(event === undefined || event.length == 0) && <Text style={styles.text}>No Coming Event</Text>}
    {event && event.map((item, index) => {
      if (new Date(item.end_time) > new Date()) {
        return <EventsFilter
          key={item.match_id}
          item={item}
          navigation={navigator}
          imageSource={require('../../../assets/football.jpg')}
          onViewInfo={() => {
            navigation.navigate('EventInfo', {
              information: item
            })
          }}
         onDelete={handleUnjoin} />
      }
    })}
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
    fontWeight: 'bold',
    alignSelf: 'center'
  },  headText: {
      fontSize: 25,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginTop: 15,
      marginBottom: 10
    },
});

export default Request;

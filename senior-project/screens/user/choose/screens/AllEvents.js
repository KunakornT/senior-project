import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, AsyncStorage, FlatList } from 'react-native';
import SportsFilter from '../../../../components/SportsFilter';
import ComingSports from '../../../../components/ComingSports';

import url from '../../../../constants/url-constant';


const AllEvents = ({props,navigation}) => {
  const {state} = navigation;
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
        const response = await fetch(`http://senior-project-server.herokuapp.com/match`);
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
    <Text style={styles.headText}> All Events </Text>
    {(event === undefined || event.length == 0) && <Text style={styles.text}>No Coming Event</Text>}
    {event && event.map((item, index) => {
      if (new Date(item.end_time) > new Date()) {
        return <ComingSports
          key={item.match_id}
          item={item}
          navigation={navigator}
          imageSource={require('../../../../assets/football.jpg')}
          onViewInfo={() => {
            navigation.navigate('EventInfo', {
              information: item
            })
          }}
          onDelete={() => {
            fetchEvent()
          }} />
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

export default AllEvents;

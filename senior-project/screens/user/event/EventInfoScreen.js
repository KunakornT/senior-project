import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'

import url from '../../../constants/url-constant'

const EventInfoScreen = (props) => {

  const [sportFieldName, setSportFieldName] = useState('sport field name');
  const [matchId, setMatchId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [numberPlayer, setNumberPlayer] = useState('');
  const [maxPlayer, setMaxPlayer] = useState('');
  const [player, setPlayer] = useState()

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  useEffect(() => {
    const fetchSportField = async (matchId) => {
      try {
        const response = await fetch(url.url_match_user + '/' + matchId, {
          method: 'GET'
        });
        const data = await response.json();
        setPlayer(data);
      } catch (e) {
        console.log(e)
      }
    }
    const info = props.navigation.getParam('information');
    fetchSportField(info.match_id);
  }, [matchId])

  useEffect(() => {
    const info = props.navigation.getParam('information');
    const date = new Date(info.start_time).getUTCDate();
    const month = new Date(info.start_time).getUTCMonth() + 1;
    const year = new Date(info.start_time).getUTCFullYear();
    const startHour = addZero(new Date(info.start_time).getUTCHours());
    const startMinute = addZero(new Date(info.start_time).getUTCMinutes());
    const endHour = addZero(new Date(info.end_time).getUTCHours());
    const endMinute = addZero(new Date(info.end_time).getUTCMinutes());
    setMatchId(info.match_id);
    setSportFieldName(info.sport_field_name);
    setStartDate(date + '/' + month + '/' + year);
    setStartTime(startHour + ':' + startMinute);
    setEndTime(endHour + ':' + endMinute);
    setNumberPlayer(info.number_player);
    setMaxPlayer(info.max_player);
  }, [])

  return (
    <View style={styles.screen}>
      <Text style={styles.textHeader}>{sportFieldName}</Text>
      <Text style={styles.textDetail}>Date: {startDate}</Text>
      <Text style={styles.textDetail}>Time of booking: {startTime} - {endTime}</Text>
      <Text style={styles.textDetail}>People joining: {numberPlayer}/{maxPlayer}</Text>
      {player &&
        <ScrollView>
          <View style={styles.memberContainer}>
            {player.map((item, index) => {
              return (
                <View key={item.user_id}>
                  <View style={styles.pictureWrapper}>
                    <TouchableOpacity>
                      <Image style={styles.image}
                        source={{ uri: 'data:image/png;base64,' + item.profile_picture }}
                        defaultSource={require('../../../assets/profile.jpeg')}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.usernameText}>{item.username}</Text>
                </View>
              )
            })}
          </View>
        </ScrollView>}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center'
  },
  textDetail: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 20
  },
  memberContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pictureWrapper: {
    justifyContent: 'space-around',
    margin: 10,
    width: 100,
    height: 100,
    borderRadius: 75,
    borderWidth: 1,
    overflow: 'hidden',
  },
  usernameText: {
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
  },
})

export default EventInfoScreen;
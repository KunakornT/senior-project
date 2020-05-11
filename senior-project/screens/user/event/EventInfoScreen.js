import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, AsyncStorage, Alert } from 'react-native'

import url from '../../../constants/url-constant'

const EventInfoScreen = (props) => {

  const [username, setUsername] = useState();
  const [userId, setUserId] = useState();
  const [sportFieldName, setSportFieldName] = useState('sport field name');
  const [matchId, setMatchId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [numberPlayer, setNumberPlayer] = useState('');
  const [maxPlayer, setMaxPlayer] = useState('');
  const [player, setPlayer] = useState();
  const [description, setDescription] = useState('');
  const [reserveUser, setReserveUser] = useState('');
  const [count, setCount] = useState(0);
  const [event, setEvent] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let data = await AsyncStorage.getItem('userInfo');
        let user = await JSON.parse(data);
        setUsername(user.username);
        setUserId(user.user_id);
      } catch (e) {
      }
    }
    fetchUser();
  }, [])

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
        console.log(data)
        setPlayer(data);
      } catch (e) {
        console.log(e)
      }
    }
    const info = props.navigation.getParam('information');
    console.log(info)
    fetchSportField(info.match_id);
  }, [matchId])

  function confirmAlert() {
    Alert.alert(
      'Join Match',
      'Do you want to join the match',
      [
        { text: 'Yes', onPress: () => joinMatch() },
        { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      ],
      { cancelable: false }
    )
    // setCount(count+1);
    // console.log(count);
    // else{
    //   Alert.alert(
    //     'You have already joined',
    //     'You have joined this event, please check the information of the match',
    //     { cancelable: false }
    //   )
    // }
  }

  async function joinMatch() {
    const info = props.navigation.getParam('information');
    setMatchId(info.match_id);
    console.log(matchId);
    console.log(userId);
    const data = JSON.stringify({
      "matchId": matchId,
      "userId": userId
    });
    try {
      const res = await fetch(url.url_match_user, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: data,
      });
      const resData = await res.json()
      if (!res.ok) {
        Alert.alert(
          'Error',
          resData.message,
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        )
      }
      else {
        props.navigation.navigate('Home',
          Alert.alert(
            'Success',
            'You are now joined the event, check information on Event page',
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          ));
      }
    } catch (e) {
      console.log(e)
    }
  }


  function confirmAlert2() {
    Alert.alert(
      'Cancel Event',
      'Do you want to cancel this event',
      [
        { text: 'Yes', onPress: () => deleteMatch() },
        { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      ],
      { cancelable: false }
    )
  }

  function deleteMatch() {
    const info = props.navigation.getParam('information');
    setMatchId(info.match_id);
    const data = JSON.stringify({
      "matchId": matchId,
      "username": username
    });
    try {
      fetch('https://senior-project-server.herokuapp.com/match', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: data,
      });
      props.navigation.navigate('Home',
        Alert.alert(
          'Canceled the match',
          'You have canceled the match',
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        ));
    } catch (e) {
      console.log(e)
    }
  }

  function confirmAlert3() {
    Alert.alert(
      'Unjoin event',
      'Do you want to unjoin an event',
      [
        { text: 'Confirm', onPress: () => unJoinMatch() },
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      ],
      { cancelable: false }
    )
  }

  function unJoinMatch() {
    const data = JSON.stringify({
      "matchId": matchId,
      "userId": userId
    });
    try {
      fetch(url.url_unjoin, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: data,
      });
      props.navigation.navigate('Home',
        Alert.alert(
          'Unjoined',
          'You have unjoined the event',
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        ));
    } catch (e) {
      console.log(e)
    }
  }

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
    setDescription(info.description);
    setReserveUser(info.reserve_user);
  }, [])

  return (
    <View style={styles.screen}>
      <Text style={styles.textHeader}>{sportFieldName}</Text>
      <Text style={styles.textDetail}>Date: {startDate}</Text>
      <Text style={styles.textDetail}>Time of booking: {startTime} - {endTime}</Text>
      <Text style={styles.textDetail}>People joining: {numberPlayer}/{maxPlayer}</Text>
      <Text style={styles.textDetail}>Note: {description}</Text>
      {player &&
        <ScrollView>
          <View style={styles.memberContainer}>
            {player.map((item, index) => {
              if (item.facebook_signin === null && item.google_signin === null) {
                console.log('general'+item.username)
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
              }
              else {
                console.log('face or goo'+item.username)
                return (
                  <View key={item.user_id}>
                    <View style={styles.pictureWrapper}>
                      <TouchableOpacity>
                        <Image style={styles.image}
                          source={{ uri: item.profile_picture }}
                          defaultSource={require('../../../assets/profile.jpeg')}
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.usernameText}>{item.username}</Text>
                  </View>
                )
              }
            })}
          </View>
          {(username === reserveUser) &&
            <TouchableOpacity style={styles.button} onPress={confirmAlert2}>
              <Text style={styles.textButton}> Cancel </Text>
            </TouchableOpacity>}
          {(player.some(user => user.username === username) && username !== reserveUser) &&
            <TouchableOpacity style={styles.button} onPress={confirmAlert3}>
              <Text style={styles.textButton}> Unjoin </Text>
            </TouchableOpacity>}
          {(!player.some(user => user.username === username)) &&
            <TouchableOpacity style={styles.button} onPress={confirmAlert}>
              <Text style={styles.textButton}> Join </Text>
            </TouchableOpacity>}
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
  }, textButton: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
    padding: 10
  },
  button: {
    borderRadius: 50,
    borderWidth: 2,
    alignSelf: 'center',
    margin: 10,
    backgroundColor: '#FFA64B',
    borderColor: 'white'
  },
})

export default EventInfoScreen;

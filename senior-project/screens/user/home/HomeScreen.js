import React,{ useState, useEffect } from 'react';
import {View,Text,Image,StyleSheet,ScrollView,Button,TouchableOpacity,AsyncStorage,FlatList} from 'react-native';
import SelectSports from '../../../components/SelectSports';
import EventsNearby from '../../../components/EventsNearby';
import {Ionicons} from '@expo/vector-icons';
import url from '../../../constants/url-constant';
import Spinner from 'react-native-loading-spinner-overlay';
import EventsFilter from '../../../components/EventsFilter';



const HomeScreen = ({ navigation }) => {

  const [username, setUsername] = useState(null);
  const [spinner, setSpinner] = useState(true);
  const [event, setEvent] = useState();

  async function fetchProfilePic(id) {
    try {
      const response = await fetch(url.url_user_pic+'/'+id, {
        method: 'GET'
      });
      const data = await response.json();
      if(!response.ok) {
      }
      else {
        await AsyncStorage.setItem('profile_picture', JSON.stringify(data[0]));
        setSpinner(false);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function fetchUserData() {
      let data = await AsyncStorage.getItem('userInfo');
      let user = await JSON.parse(data);
      fetchProfilePic(user.user_id)
      setUsername(user.username);
    }
    fetchUserData();
  }, [username])

  const fetchEvent = async () => {
    try {
      const response = await fetch(url.url_coming_match);
      const responseJson = await response.json();
      setEvent(responseJson);
      // console.log(responseJson);
    } catch (e) {
    }
  }
  useEffect(() => {
    fetchEvent();
  })
  const handleUnjoin = (itemId) => {
    const events = event.filter(item => item.match_id !== itemId);
    setEvent(events);
    fetchEvent();
  }


  return (
    <View>
      <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
      />
      <ScrollView>
        <Text style={styles.headText}>  Good morning, {username}!  </Text>
        <Text style={styles.textStyle}> Select the sport that you want to play </Text>
        <View style={styles.row}>
          <SelectSports />
        </View>
        <Text style={styles.headText}>  Events  </Text>
          {(event === undefined || event.length == 0) && <Text style={styles.text}>No Coming Event</Text>}
          {event && event.map((item, index) => {
            // if (new Date(item.end_time) > new Date()) {
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
            // }
          })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
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
  },
  text: {
    fontSize: 18,
    textAlign: 'center'
  }
});

export default HomeScreen;

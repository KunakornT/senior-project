import React,{ useState, useEffect } from 'react';
import {View,Text,Image,StyleSheet,ScrollView,Button,TouchableOpacity,AsyncStorage,FlatList} from 'react-native';
import SelectSports from '../../../components/SelectSports';
import EventsNearby from '../../../components/EventsNearby';
import {Ionicons} from '@expo/vector-icons';
import url from '../../../constants/url-constant';
import Spinner from 'react-native-loading-spinner-overlay';


const HomeScreen = ({ navigation }) => {

  const [username, setUsername] = useState(null);
  const [spinner, setSpinner] = useState(true);

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
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Field')}>
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


  }
});

export default HomeScreen;

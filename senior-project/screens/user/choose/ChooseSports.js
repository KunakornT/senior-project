import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Dimensions, Button, ActivityIndicator, Image, TextInput, Alert, AsyncStorage, FlatList, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Permission, Callout } from 'react-native-maps';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
//import '../../_mockLocation';
import { Context as LocationContext } from '../../../context/LocationContext';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../../components/Card';
import url from '../../../constants/url-constant';
import SportsField from '../../../screens/user/choose/screens/SportsField';

const ChooseSports = ({ navigation }) => {
  const [data, setData] = useState('');
  const [field, setField] = useState('');
  const [longtitude, setLongtitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const { addLocation, getField } = useContext(LocationContext);
  const [err, setErr] = useState(null);
  const [sportField, setSportField] = useState(null);
  const [username, setUsername] = useState(null);

  const startWatching = async () => {
    try {
      await requestPermissionsAsync();
      await watchPositionAsync({
        accuracy: Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 10
      }, (location) => {
        addLocation(location);
        //  console.log(location);
      });
    } catch (e) {
      setErr(e);
    }
  };

  useEffect(() => {
    const fetchUsername = async () => {
      let data = await AsyncStorage.getItem('userInfo');
      let user = await JSON.parse(data);
      setUsername(user.username);
    }
    const fetchSportField = async () => {
      const response = await fetch(url.url_sportsfield, {
        method: 'GET'
      });
      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        Alert.alert(
          'Error',
          data.message,
          [{ text: 'OK', style: 'destructive' }]
        )
        return;
      }
      setSportField(data);
    }
    startWatching();
    fetchSportField();
    fetchUsername();
    // const listener = navigation.addListener('didFocus', () => {
    //   fetchSportField();
    // });
    // return () => {
    //   listener.remove();
    // };
  }, []);

  const { state: { currentLocation } } = useContext(LocationContext);
  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }
  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.titleContainer}>
          <Ionicons name='ios-search' size={25} />
          <TextInput style={styles.text} />
        </View>
      </Card>
      <MapView style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        showUserLocation={true}
        initialRegion={{
          ...currentLocation.coords,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }}
        /*region={{
          ...currentLocation.coords,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }}*/
      >
        {(sportField !== null) && sportField.map(field => (
          <Marker
            key={field.sport_field_id}
            title={field.sport_field_name}
            description={field.description}
            onPress= {() => navigation.navigate('Field',{
              id: field.sport_field_id,
              description: field.description,
              name: field.sport_field_name,
              type: field.sport_type,
              openTime: field.open_time,
              closeTime: field.close_time
            })}
            coordinate={{
              latitude: field.latitude,
              longitude: field.longtitude
            }}>
              <Image style={styles.imageContainer} source={require('../../../assets/football.png')} />
          </Marker>
        ))}
        <Marker
          coordinate={currentLocation.coords}>
          <Image
            style={styles.imageContainer}
            defaultSource={require('../../../assets/profile.jpeg')}
            source={{ uri: url.url_users_fetch_picture + '/' + username + '.jpeg'}}
          />
        </Marker>
      </MapView>
    </View>);
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    height: Dimensions.get('window').height / 10,
  },
  text: {
    fontSize: 20,
    marginLeft: 5,
    width: '100%'
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  headText: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  imageContainer: {
    marginVertical: 20,
    width: 40,
    height: 40,
    borderRadius: 75,
    borderWidth: 1,
    overflow: 'hidden',
    marginVertical: 20,
    borderColor: 'orange'
  }
});

export default ChooseSports;

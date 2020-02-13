import React,{useState,useEffect,useContext} from 'react';
import { Text, View, StyleSheet, Dimensions, Button, ActivityIndicator,Image, TextInput, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker,Permission,Circle } from 'react-native-maps';
import {requestPermissionsAsync,watchPositionAsync,Accuracy} from 'expo-location';
//import '../../_mockLocation';
import {Context as LocationContext} from '../../../context/LocationContext';
import { Ionicons } from '@expo/vector-icons';

import Card from '../../../components/Card';
import url from '../../../constants/url-constant';

const ChooseSports = ({navigation}) => {

  const {addLocation} = useContext(LocationContext);
  const [err,setErr] = useState(null);

  const startWatching = async () => {
    try{
      await requestPermissionsAsync();
      await watchPositionAsync({
        accuracy: Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 10
      }, (location) => {
        addLocation(location);
        console.log(location);
      });
    }catch (e){
      setErr(e);
    }
  };
  const fetchSportField = async () => {
    const response = await fetch(url.url_sportsfield);
    const data = await response.json();
    if(response.status !== 200){
      Alert.alert(
        'Error',
        data.message,
        [{ text: 'OK', style: 'destructive'}]
      )
    }
    else {
      console.log(data);  //All sport field information
      return;
    }
  }

  useEffect(() => {
    fetchSportField();
    startWatching();
  },[]);

  const {state: {currentLocation}} = useContext(LocationContext);
  if(!currentLocation){
    return <ActivityIndicator size = "large" style={{marginTop:200}}/>;
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        showUserLocation={true}
        initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }}
      region = {{
        ...currentLocation.coords,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }}
      >
        <Marker
          title = {'Futsal Park Rama II'}
            coordinate={{
                latitude: 37.33019225,
                longitude: -122.02580206,
            }}
          description={"Football Field"}>
       <Image source={require('../../../assets/football.png')} style={{height: 35, width:35 }} />
       </Marker>

    <Marker
          coordinate={currentLocation.coords}>
          <Image style = {styles.imageContainer} source={require('../../../assets/profile.jpeg')}/>
      </Marker>
    </MapView>
      <Button title="Book the sports field"
      onPress ={() => navigation.navigate('Field')}/>
      <Card>
        <View style={styles.titleContainer}>
          <Ionicons name='ios-search' size={25} />
          <TextInput style={styles.text}/>
        </View>
      </Card>
      <MapView style={styles.mapStyle} />
    </View>);
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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
  headText:{
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

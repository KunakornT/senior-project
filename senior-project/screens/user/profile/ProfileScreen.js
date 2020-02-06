import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, AsyncStorage } from 'react-native';

import url from '../../../constants/url-constant';

const ProfileScreen = props => {

  const [username, setUsername] = useState(null)

  useEffect(() => {
    async function fetchUserData() {
      let data  = await AsyncStorage.getItem('userInfo');
      let user = await JSON.parse(data);
      setUsername(user.username);
    }
    fetchUserData();
  },[username])

  const logoutHandler = () => {
    AsyncStorage.clear();
    props.navigation.navigate('Auth');
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.name}>{username}</Text>
      <View style={styles.imageContainer}>
        <TouchableOpacity >
          <Image style={styles.image} source={require('../../../assets/profile.jpeg')} />
        </TouchableOpacity>
      </View>
      <Button title='Logout' onPress={logoutHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  name: {
    marginVertical: 20,
    fontSize: 22,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginVertical: 20,
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    overflow: 'hidden',
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ProfileScreen;
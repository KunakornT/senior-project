import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';


async function fetchData() {
  let response = await fetch('http://192.168.1.36:3000/users'+'/kunakorn@gmail.com');
  let body = await response.json();
  console.log(body)
  return body;
}

const ProfileScreen = props => {


  const data = fetchData();

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <TouchableOpacity >
          <Image style={styles.image} source={require('../../../assets/profile.jpeg')} />
        </TouchableOpacity>
      </View>
      <Text></Text>
      <Button title='Logout' onPress={() => props.navigation.navigate('Auth')} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
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
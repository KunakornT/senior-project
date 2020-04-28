import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Button, AsyncStorage, Alert, TouchableOpacity } from 'react-native';

import Card from '../../components/Card';
import url from '../../constants/url-constant'

const ThirdPartyUsername = props => {

  const [username, setUsername] = useState('')
  const [user, setUser] = useState()
  const [isGoogle, setIsGoogle] = useState()
  useEffect(() => {
    const user = props.navigation.getParam('user');
    const google = props.navigation.getParam('google');
    setUser(user);
    setIsGoogle(google)
  }, [])

  const confirmUsernameHandler = async () => {
    if (username.trim() === '') {
      Alert.alert(
        'Invalid Input',
        'must specify all fields',
        [{ text: 'OK', style: 'destructive'}]
      );
      return;
    }
    else if (isGoogle) {
      console.log('Google!!!')
      try {
        const response = await fetch(url.url_google_signin, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "email": user.email,
            "username": username,
            "firstname": user.givenName,
            "lastname": user.familyName,
            "profilePicture": user.photoUrl
          })
        });
        const data = await response.json();
        console.log(data.user)
        if (!response.ok) {
          Alert.alert(
            'Error',
            data.message,
            [{ text: 'OK', style: 'destructive' }]
          );
        }
        else {
          console.log(data)
          AsyncStorage.setItem('userInfo', JSON.stringify(data.user[0]));
          AsyncStorage.setItem('profile_picture', JSON.stringify({ "profile_picture": null }));
          AsyncStorage.setItem('isLoggedIn', 'true');
          props.navigation.navigate('Home');
        }
      } catch (e) {
        console.log(e)
      }
    }
    else if (!isGoogle) {
      try {
        console.log('Facebook!!!')
        const response = await fetch(url.url_facebook_signin, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "email": user.email,
            "username": username,
            "firstname": user.givenName,
            "lastname": user.familyName,
            "profilePicture": user.photoUrl
          })
        });
        const data = await response.json();
        console.log(data.user)
        if (!response.ok) {
          Alert.alert(
            'Error',
            data.message,
            [{ text: 'OK', style: 'destructive' }]
          );
        }
        else {
          console.log(data)
          AsyncStorage.setItem('userInfo', JSON.stringify(data.user[0]));
          AsyncStorage.setItem('profile_picture', JSON.stringify({ "profile_picture": null }));
          AsyncStorage.setItem('isLoggedIn', 'true');
          props.navigation.navigate('Home');
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  const usernameHandler = (textInput) => {
    setUsername(textInput);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.screen} behavior='padding' enabled>
        <View style={styles.screen}>
          <Card style={styles.card}>
            <Text style={styles.textHeader}>Username</Text>
            <TextInput keyboardType='default' style={styles.textInput} onChangeText={usernameHandler} value={username} />
          </Card>
          <View>
            <Button title='Confirm' onPress={confirmUsernameHandler} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center'
  },
  card: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 25,
  },
  textInput: {
    marginVertical: 20,
    width: '50%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    textAlign: 'center'
  },
  buttonInfo: {
    borderRadius: 50,
    // borderWidth: 2,
    // margin: 10,
    backgroundColor: '#CCCC00',
    // borderColor: Color.primaryColor
  },
  textButton: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    padding: 10
  },
});

export default ThirdPartyUsername;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Alert, AsyncStorage, AppRegistry } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import url from '../../constants/url-constant';
import Card from '../../components/Card';

const LoginScreen = props => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  async function retrieveData() {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        console.log(isLoggedIn)
        props.navigation.navigate('Home');
      } else {
        await AsyncStorage.clear();
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    retrieveData();
  })

  const resetInputHandler = () => {
    setUsername('');
    setPassword('');
  }

  const usernameHandler = (textInput) => {
    setUsername(textInput);
  };

  const passwordHandler = (textInput) => {
    setPassword(textInput);
  };

  const onPressLoginHandler = async () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert(
        'Invalid Input',
        'Must specific all fields',
        [{ text: 'OK', style: 'destructive', onPress: resetInputHandler }]
      );
      return;
    }
    else {
      fetch(url.url_login, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "username": username,
          "password": password
        })
      })
        .then(response => {
          const statusCode = response.status;
          const data = response.json();
          return Promise.all([statusCode, data]);
        })
        .then(([res, data]) => {
          // console.log(res, data);
          if (res !== 200) {
            Alert.alert(
              'Invalid Input',
              data.message,
              [{ text: 'OK', style: 'destructive', onPress: resetInputHandler }]
            );
          }
          else {
            if (data.authentication === false) {
              AsyncStorage.setItem('userInfo', JSON.stringify(data));
              AsyncStorage.setItem('profile_picture', JSON.stringify({ "profile_picture": null }));
              props.navigation.navigate('Verification');
            }
            else {
              AsyncStorage.setItem('userInfo', JSON.stringify(data));
              AsyncStorage.setItem('profile_picture', JSON.stringify({ "profile_picture": null }));
              AsyncStorage.setItem('isLoggedIn', 'true');
              props.navigation.navigate('Home');
            }
          }
        })
        .catch(error => {
          console.error(error);
        })
    }
  };

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: '183581867664-cbisp9llbkr18ipnfvi87mjit4nt60kp.apps.googleusercontent.com',
        iosClientId: '183581867664-mnsfeghc89vt9t8k7fhrui14iuik012b.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        try {
          const response = await fetch(url.url_check_google_signin, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "email": result.user.email
            })
          });
          const data = await response.json()
          if (!response.ok) {
            Alert.alert(
              'Error',
              data.message,
              [{ text: 'OK', style: 'destructive' }]
            );
            return
          }
          else {
            if (data.hasOwnProperty('user')) {
              if (data.user.google_signin === true) {
                console.log(result)
                const res = await fetch(url.url_update_google_signin, {
                  method: 'PATCH',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    "firstname": result.user.givenName,
                    "lastname": result.user.familyName,
                    "profilePicture": result.user.photoUrl,
                    "email": result.user.email,
                    "username": data.user.username
                  })
                });
                const messageData = await res.json();
                if (!res.ok) {
                  Alert.alert(
                    'Error',
                    messageData.message,
                    [{ text: 'OK', style: 'destructive' }]
                  );
                  return
                }
                else {
                  AsyncStorage.setItem('userInfo', JSON.stringify(messageData));
                  AsyncStorage.setItem('profile_picture', JSON.stringify({ "profile_picture": null }));
                  AsyncStorage.setItem('isLoggedIn', 'true');
                  props.navigation.navigate('Home');
                }
              }
            }
            else {
              props.navigation.navigate('Thirdparty', {
                user: result.user
              });
            }
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }


  async function signInWithFacebook() {

    try {
      await Facebook.initializeAsync('1865783786890133');
      const { type, token, expires, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync('1865783786890133', {
          permissions: ['public_profile', 'email'],
        });
      if (type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        console.log(response.json())
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        Alert.alert('Something is wrong !');
      }
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.screen} behavior='padding' enabled>
        <View>
          <Card>
            <View style={styles.inputWrapper}>
              <View style={styles.titleContainer}>
                <MaterialCommunityIcons name='account-box-outline' size={25} />
                <Text style={styles.text}>Username: </Text>
              </View>
              <TextInput style={styles.text} onChangeText={usernameHandler} value={username} />
            </View>
            <View style={styles.inputWrapper}>
              <View style={styles.titleContainer}>
                <Ionicons name='md-key' size={25} />
                <Text style={styles.text}>Password: </Text>
              </View>
              <TextInput style={styles.text} onChangeText={passwordHandler} value={password} />
            </View>
          </Card>
          <View style={styles.buttonContainer}>
            <Button title='Login' onPress={onPressLoginHandler} />
          </View>
          <View style={styles.detail}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
              <Text style={{ color: 'red' }}>Create a new account</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button title='Sign in with Google' onPress={signInWithGoogleAsync} color='#BF180A'></Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button title='Sign in with Facebook' onPress={signInWithFacebook} color='#3B5998'></Button>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

LoginScreen.navigationOptions = {
  title: 'Login'
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  inputWrapper: {
    marginBottom: 10
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginBottom: 10
  },
  detail: {
    marginVertical: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginLeft: 5
  }
});

export default LoginScreen;

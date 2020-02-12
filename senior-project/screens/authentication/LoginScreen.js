import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Alert, AsyncStorage } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import url from '../../constants/url-constant';
import Card from '../../components/Card';

const LoginScreen = props => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function retrieveData() {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    if(isLoggedIn === 'true'){
      console.log(isLoggedIn)
      props.navigation.navigate('Home');
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

  const onPressLoginHandler = () => {
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
          console.log(res, data);
          if (res !== 200) {
            Alert.alert(
              'Invalid Input',
              data.message,
              [{ text: 'OK', style: 'destructive', onPress: resetInputHandler }]
            );
          }
          else {
            AsyncStorage.setItem('userInfo', JSON.stringify(data));
            AsyncStorage.setItem('isLoggedIn', 'true');
            props.navigation.navigate('Home');
          }
        })
        .catch(error => {
          console.error(error);
        })
    }
  };

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
    marginHorizontal: 20
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
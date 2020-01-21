import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import Card from '../../components/Card';
import url from '../../constants/url-constant';

const RegisterScreen = props => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const resetInputHandler = () => {
    setUsername('');
    setEmail('');
    setPassword('');
  }

  const usernameHandler = (textInput) => {
    setUsername(textInput);
  };

  const emailHandler = (textInput) => {
    setEmail(textInput);
  };

  const passwordHandler = (textInput) => {
    setPassword(textInput);
  };

  const registerHandler = () => {
    if( username.trim() === '' || password.trim() === '' || email.trim === '' ){
      Alert.alert(
        'Invalid Input', 
        'Must specific all fields', 
        [{ text: 'OK', style: 'destructive', onPress: resetInputHandler}]
      );
      return;
    }
    fetch(url.url_users, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "username": username,
        "password": password,
        "email": email
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch(error => {
      return error;
    })
  };

  return (
    <View style={styles.screen}>
      <Card>
        <View style={styles.inputWrapper}>
          <View style={styles.titleContainer}>
            <MaterialCommunityIcons name='account-box-outline' size={25} />
            <Text style={styles.text}>Username: </Text>
          </View>
          <TextInput
            style={styles.text}
            onChangeText={usernameHandler}
            value={username} />
        </View>
        <View style={styles.inputWrapper}>
          <View style={styles.titleContainer}>
            <Ionicons name='md-key' size={25} />
            <Text style={styles.text}>Password: </Text>
          </View>
          <TextInput
            style={styles.text}
            onChangeText={passwordHandler}
            value={password} />
        </View>
        <View style={styles.inputWrapper}>
          <View style={styles.titleContainer}>
            <MaterialCommunityIcons name='email-outline' size={25} />
            <Text style={styles.text}>Email: </Text>
          </View>
          <TextInput
            style={styles.text}
            onChangeText={emailHandler}
            value={email} />
        </View>
      </Card>
      <View style={styles.buttonContainer}>
        <Button title='Register' onPress={registerHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center'
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

export default RegisterScreen;
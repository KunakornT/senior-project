import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Button, AsyncStorage, Alert } from 'react-native';

import Card from '../../components/Card';
import url from '../../constants/url-constant'

const VerificationConfirm = props => {

  const [passcode, setPasscode] = useState('');

  const passcodeHandler = (textInput) => {
    setPasscode(textInput);
  };

  const updateInfo = async (id) => {
    let settings = {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "id": id,
        "authentication": true
      })
    };
    try {
      const fetchResponse = await fetch(url.url_users, settings);
      return fetchResponse;
    }
    catch (err) {
      console.log(err);
    }

  }

  const confirmPasscodeHandler = async () => {
    let data = await AsyncStorage.getItem('userInfo');
    let user = await JSON.parse(data);
    let code = await user.passcode;
    let id = await user.user_id;
    console.log('passcode' + passcode + 'userCode:' + code)
    if (passcode == code) {
      const res = await updateInfo(id);
      const data = await res.json()
      if (res.status !== 200 && res.status !== 201) {
        Alert.alert(
          'Error',
          data.message,
          [{ text: 'OK', style: 'destructive' }]
        );
      }
      else {
        Alert.alert(
          'Success',
          data.message,
          [{ text: 'OK', style: 'destructive' }]
        );
        console.log('check code')
        AsyncStorage.setItem('isLoggedIn', 'true');
        props.navigation.navigate('Home');
      }
    }
    else {
      Alert.alert(
        'Verify fail',
        'verification code is incorrect',
        [{ text: 'OK', style: 'destructive' }]
      );
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.screen} behavior='padding' enabled>
        <View style={styles.screen}>
          <Card style={styles.card}>
            <Text style={styles.textHeader}>Verification Code</Text>
            <TextInput keyboardType='number-pad' style={styles.textInput} onChangeText={passcodeHandler} value={passcode} />
          </Card>
          <Button title='Confirm' onPress={confirmPasscodeHandler} />
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
  }
});

export default VerificationConfirm;

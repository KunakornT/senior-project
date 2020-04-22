import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Button, AsyncStorage, Alert, TouchableOpacity } from 'react-native';

import Card from '../../components/Card';
import url from '../../constants/url-constant'

const VerificationConfirm = props => {

  const [passcode, setPasscode] = useState('');

  const passcodeHandler = (textInput) => {
    setPasscode(textInput);
  };

  const updateInfo = async (id, passcode) => {
    let settings = {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "id": id,
        "authentication": true,
        "passcode": passcode
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
    let userData = await AsyncStorage.getItem('userInfo');
    let user = await JSON.parse(userData);
    let id = await user.user_id;
    console.log('passcode' + passcode)
    const res = await updateInfo(id, passcode);
    const data = await res.json()
    if (!res.ok) {
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

  const resendHandler = async () => {
    console.log('resend handler')
    let data = await AsyncStorage.getItem('userInfo');
    let user = await JSON.parse(data);
    const header = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": user.email,
      })
    }
    try {
      const response = await fetch(url.url_users_passcode, header)
      if (!response.ok) {
        Alert.alert(
          'Error',
          'cannot resend verification code',
          [{ text: 'OK', style: 'destructive' }]
        );
      }
      else {
        const dataReturn = await response.json();
        // AsyncStorage.getItem('userInfo')
        //   .then(data => {
        //     // the string value read from AsyncStorage has been assigned to data
        //     // console.log(data);
        //     // transform it back to an object
        //     data = JSON.parse(data);
        //     data.passcode = dataReturn.data[0].passcode;
        //     //save the value to AsyncStorage again
        //     AsyncStorage.setItem('userInfo', JSON.stringify(data));
        //   }).done();
        Alert.alert(
          'Success',
          'new verification code already sent to your email',
          [{ text: 'OK', style: 'destructive' }]
        );
      }
    } catch (e) {
      console.log(e)
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
          <View>
            <Button title='Confirm' onPress={confirmPasscodeHandler} />
            <Button title='Resend' onPress={resendHandler} />
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

export default VerificationConfirm;

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Foundation, MaterialIcons } from '@expo/vector-icons';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Card from '../../components/Card';
import url from '../../constants/url-constant';

const RegisterScreen = props => {

  let radio_props = [
    { label: 'male', value: 'male' },
    { label: 'female', value: 'female' }
  ];
  const [gender, setGender] = useState('male');
  const [birthDate, setbirthDate] = useState('');
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [show, setShow] = useState(false);

  const resetInputHandler = () => {
    setUsername('');
    setPassword('');
    setFirstname('');
    setLastname('');
    setbirthDate('');
    setEmail('');
    setGender('');
  }

  const usernameHandler = (textInput) => {
    setUsername(textInput);
  };

  const passwordHandler = (textInput) => {
    setPassword(textInput);
  };

  const firstnameHandler = (textInput) => {
    setFirstname(textInput)
  }

  const lastnameHandler = (textInput) => {
    setLastname(textInput)
  }


  const clickBirthDateHandler = () => {
    setShow(true)
  }

  const hideDateHandler = () => {
    setShow(false);
  };

  const dateConfirmHandler = date => {
    console.log('selected date' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())
    setbirthDate(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
    hideDateHandler();
  };

  const emailHandler = (textInput) => {
    setEmail(textInput);
  };

  const genderHandler = (value) => {
    setGender(value)
  };

  const inputValidation = () => {
    if (username.trim() === '' || password.trim() === '' || email.trim() === '' || firstname.trim() === '' || lastname.trim() === '' || birthDate.trim() === '' || gender.trim() === '') {
      return false;
    }
    else{
      return true;
    }
  };

  const registerHandler = () => {
    if (inputValidation() === false) {
      Alert.alert(
        'Invalid Input',
        'Must specific all fields',
        [{ text: 'OK', style: 'destructive'}]
      );
      return;
    }
    else {
      const input = JSON.stringify({
          "username": username,
          "password": password,
          "firstname": firstname,
          "lastname": lastname,
          "email": email,
          "dob": birthDate,
          "gender": gender
      });
      fetch(url.url_users, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: input,
      })
      .then(response => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([res, data]) => {
        console.log(res, data);
        if (res !== 200 && res !== 201) {
          Alert.alert(
            'Invalid Input',
            data.message,
            [{ text: 'OK', style: 'destructive', onPress: resetInputHandler }]
          );
        }
        else {
          Alert.alert(
            'Success',
            'Verification code have been sent to your email address, please verify your account after login',
            [{ text: 'OK', style: 'destructive' }]
          );
          props.navigation.navigate('Login');
        }
      })
      .catch(error => {
        console.error(error);
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.screen} behavior='padding' enabled>
        <View onStartShouldSetResponder={() => true}>
          <ScrollView>
            <Card style={styles.card}>
              {/* username */}
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
              {/* password */}
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
              {/* firstname */}
              <View style={styles.inputWrapper}>
                <View style={styles.titleContainer}>
                  <MaterialCommunityIcons name='rename-box' size={25} />
                  <Text style={styles.text}>Firstname: </Text>
                </View>
                <TextInput
                  style={styles.text}
                  onChangeText={firstnameHandler}
                  value={firstname} />
              </View>
              {/* lastname */}
              <View style={styles.inputWrapper}>
                <View style={styles.titleContainer}>
                  <MaterialCommunityIcons name='rename-box' size={25} />
                  <Text style={styles.text}>Lastname: </Text>
                </View>
                <TextInput
                  style={styles.text}
                  onChangeText={lastnameHandler}
                  value={lastname} />
              </View>
              {/* dob */}
              <View style={styles.inputWrapper} >
                <TouchableOpacity onPress={clickBirthDateHandler}>
                  <View style={styles.titleContainer} >
                    <MaterialIcons name='date-range' size={25} />
                    <Text style={styles.text}>Date of Birth: </Text>
                  </View>
                  <DateTimePickerModal
                    isVisible={show}
                    mode='date'
                    onConfirm={dateConfirmHandler}
                    onCancel={hideDateHandler}
                    maximumDate={new Date()}
                  />
                  <TextInput value={birthDate} editable={false} style={styles.text} />
                </TouchableOpacity>
              </View>
              {/* email */}
              <View style={styles.inputWrapper}>
                <View style={styles.titleContainer}>
                  <MaterialCommunityIcons name='email-outline' size={25} />
                  <Text style={styles.text}>Email: </Text>
                </View>
                <TextInput
                  keyboardType='email-address'
                  style={styles.text}
                  onChangeText={emailHandler}
                  value={email}
                />
              </View>
              {/* gender */}
              <View style={styles.inputWrapper}>
                <View style={styles.titleContainer}>
                  <Foundation name='male-female' size={25} />
                  <Text style={styles.text}>Gender: </Text>
                </View>
                <RadioForm
                  radio_props={radio_props}
                  initial={'male'}
                  onPress={(value) => genderHandler(value)}
                  formHorizontal={true}
                  buttonColor={'black'}
                  style={styles.radio}
                />
              </View>
            </Card>
            <View style={styles.buttonContainer}>
              <Button title='Register' onPress={registerHandler} />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
  radio: {
    justifyContent: 'space-around'
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginVertical: 10
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
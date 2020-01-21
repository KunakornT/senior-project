import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import Card from '../../components/Card';

const LoginScreen = props => {

  const onPressLoginHandler = () => {
    props.navigation.navigate('Home')
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <Card>
          <View style={styles.inputWrapper}>
            <View style={styles.titleContainer}>
              <MaterialCommunityIcons name='account-box-outline' size={25} />
              <Text style={styles.text}>Username: </Text>
            </View>
            <TextInput style={styles.text} />
          </View>
          <View style={styles.inputWrapper}>
            <View style={styles.titleContainer}>
              <Ionicons name='md-key' size={25} />
              <Text style={styles.text}>Password: </Text>
            </View>
            <TextInput style={styles.text} />
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
  // inputContainer: {
  //   shadowColor: 'black',
  //   shadowOpacity: 0.3,
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowRadius: 8,
  //   elevation: 5,
  //   borderRadius: 10,
  //   backgroundColor: 'white',
  //   margin: 20,
  //   padding: 10,
  // },
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
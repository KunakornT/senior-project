import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button, TouchableOpacity, AsyncStorage, ScrollView, Platform, Alert, RefreshControl } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import url from '../../../constants/url-constant';
import Color from '../../../constants/Colors';
import { AntDesign } from '@expo/vector-icons';

const ProfileScreen = props => {
  const [id, setId] = useState(0);
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [isEdit, setIsEdit] = useState(false);


  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString()
  }

  async function fetchUserData() {
    let data = await AsyncStorage.getItem('userInfo');
    let user = await JSON.parse(data);
    const calAge = getAge(user.dob);
    setUsername(user.username);
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setAge(calAge);
    setGender(user.gender);
    setEmail(user.email);
    setId(user.user_id)
  }

  useEffect(() => {
    // console.log(url.url_users_fetch_picture)
    getPermissionAsync();
  }, [])

  useEffect(() => {
    props.navigation.setParams({ isOnEdit: undefined })
    fetchUserData();
  }, [username])

  useEffect(() => {
    props.navigation.setParams({ onEdit });
    if (isEdit === false && props.navigation.getParam('isOnEdit') !== undefined) {
      console.log('update profile')
      updateProfile();
    }
  }, [isEdit])

  const onEdit = () => {
    props.navigation.setParams({ isOnEdit: !isEdit })
    setIsEdit(prev => !prev);
  }

  const firstnameHandler = (textInput) => {
    setFirstname(textInput);
  }

  const lastnameHandler = (textInput) => {
    setLastname(textInput)
  }

  const updateProfile = async () => {
    let settings = {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "id": id,
        "firstname": firstname,
        "lastname": lastname
      })
    };
    try {
      const response = await fetch(url.url_users_profile, settings);
      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
      }
      else {
        AsyncStorage.getItem('userInfo')
          .then(data => {
            // the string value read from AsyncStorage has been assigned to data
            console.log(data);
            // transform it back to an object
            data = JSON.parse(data);
            data.firstname = firstname;
            data.lastname = lastname;
            //save the value to AsyncStorage again
            AsyncStorage.setItem('userInfo', JSON.stringify(data));

          }).done();
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (result.cancelled) {
      return;
    }
    else {
      let localUri = result.uri;
      let filename = localUri.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? 'image/' + match[1] : 'image';
      let formData = new FormData();
      formData.append("profilePicture", { uri: localUri, name: filename, type });
      formData.append("username", username)
      const response = await fetch(url.url_users_profile_picture, {
        method: 'POST',
        body: formData,
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      const data = await response.json()
      if(!response.ok){
        Alert.alert(
          'Error',
          data.message,
          [{ text: 'OK', style: 'destructive'}]
        );
      }
      else{
        Alert.alert(
          'Success',
          data.message,
          [{ text: 'OK', style: 'destructive'}]
        );
      }
    }
  };

  const logoutHandler = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  }

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={styles.name}>{username}</Text>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage}>
            <Image style={styles.image}
              source={{ uri: url.url_users_fetch_picture + '/' + username + '.jpeg'}}
              // source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ6qDTLzvOiUh4B1kqaNpaV1cTPvaF3RJ-TnmPP3qkDYwH032mm'}}
              defaultSource={require('../../../assets/profile.jpeg')} 
            />
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.textHeader}>Firstname:</Text>
          <TextInput
            style={isEdit === false ? styles.input : styles.editInput}
            value={firstname}
            onChangeText={firstnameHandler}
            editable={isEdit} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.textHeader}>Lastname:</Text>
          <TextInput
            style={isEdit === false ? styles.input : styles.editInput}
            value={lastname}
            onChangeText={lastnameHandler}
            editable={isEdit} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.textHeader}>Age:</Text>
          <TextInput style={styles.input} value={age} editable={false} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.textHeader}>Email:</Text>
          <TextInput style={styles.input} value={email} editable={false} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.textHeader}>Gender:</Text>
          <TextInput style={styles.input} value={gender} editable={false} />
        </View>
        <View style={styles.button}>
          <Button title='Log out' onPress={logoutHandler} color={Platform.OS === 'android' ? 'grey' : ''} />
        </View>
      </View>
    </ScrollView>
  );

}

ProfileScreen.navigationOptions = ({ navigation }) => {
  const isOnEdit = navigation.getParam('isOnEdit');
  return {
    title: 'Your Profile',
    headerRight: () => (
      <TouchableOpacity onPress={navigation.getParam('onEdit')}>
        <AntDesign style={styles.headerButton} name={isOnEdit === true ? 'save' : 'edit'} size={23} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  name: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  imageContainer: {
    marginBottom: 10,
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    overflow: 'hidden',
    marginVertical: 20,
    alignSelf: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    marginHorizontal: 10,
    alignItems: 'flex-start',
    marginVertical: 5
  },
  textHeader: {
    fontSize: 16,
    marginVertical: 10
  },
  input: {
    borderBottomWidth: 0.5,
    borderColor: 'grey',
    width: '100%',
    fontSize: 14,
    color: 'grey',
  },
  editInput: {
    borderBottomWidth: 0.5,
    borderColor: 'grey',
    width: '100%',
    fontSize: 14,
    color: 'black',
  },
  button: {
    marginHorizontal: 20,
    marginVertical: 10
  },
  headerButton: {
    marginRight: 10
  }
});

export default ProfileScreen;
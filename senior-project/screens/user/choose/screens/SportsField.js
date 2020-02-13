import React,{ useState, useEffect }  from 'react';
import {View,Text,Button, StyleSheet,AsyncStorage} from 'react-native';

import url from '../../../../constants/url-constant';

const SportsField = (props) => {


  const [username, setUsername] = useState([]);

  async function getMoviesFromApi() {
  try {
    let response = await fetch(`https://senior-project-server.herokuapp.com/users`);
    let responseJson = await response.json();
    setUsername(responseJson.username);
    return responseJson.username;
  } catch (error) {
    console.error(error);
  }
}

  return <View>
  <Text> This is  </Text>
  </View>
};

const styles = StyleSheet.create({});

export default SportsField;

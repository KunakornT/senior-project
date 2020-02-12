import React from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput } from 'react-native';
import MapView from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

import Card from '../../../components/Card';

const ChooseSports = () => {
  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.titleContainer}>
          <Ionicons name='ios-search' size={25} />
          <TextInput style={styles.text}/>
        </View>
      </Card>
      <MapView style={styles.mapStyle} />
    </View>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    height: Dimensions.get('window').height / 10,
  },
  text: {
    fontSize: 20,
    marginLeft: 5,
    width: '100%'
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default ChooseSports;

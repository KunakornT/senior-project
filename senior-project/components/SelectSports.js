import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { AntDesign } from '@expo/vector-icons';

const SelectSports = ({ navigation }) => {
  return (
  <View style={styles.backgroundStyle}>
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Choose')}>
        <Ionicons name="ios-football" size={80} style={styles.iconstyle} />
      </TouchableOpacity>
    </View>
  </View>);
};

const styles = StyleSheet.create({
  backgroundStyle: {
    height: 200,
    backgroundColor: '#FFFCF7',
    borderColor: 'black',
    borderRadius: 15,
    margin: 10,
    borderWidth: 1,
    marginTop: 15
  },
  iconstyle: {
    marginLeft: 20,
    fontSize: 100
  },
  iconstyle2: {
    marginLeft: 20,
    fontSize: 80
  }
});

export default withNavigation(SelectSports);

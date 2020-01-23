import React from 'react';
import {View,Text,StyleSheet,ScrollView} from 'react-native';
import SportsFilter from '../../../components/SportsFilter';
import ComingSports from '../../../components/ComingSports';
import HistorySports from '../../../components/HistorySports';

const EventScreen = () => {
  return <View>
  <ScrollView>
  <Text style = {styles.textStyle}> Your Events </Text>
  <SportsFilter />
  <Text style = {styles.textStyle2}> Coming Events </Text>
  <ComingSports title = "Futsal Park RAMA II"
  imageSource={require('../../../assets/football.jpg')}/>
  <Text style = {styles.textStyle2}> History </Text>
  <HistorySports  title = "Futsal Park RAMA II"
  imageSource={require('../../../assets/football.jpg')}/>
  <HistorySports  title = "Unun badminton"
  imageSource={require('../../../assets/badminton.jpg')}/>
  <HistorySports   title = "Chris basketball"
   imageSource={require('../../../assets/basketball.jpg')}/>
  <HistorySports  title = "Unun badminton"
  imageSource={require('../../../assets/badminton.jpg')}/>
  </ScrollView>
  </View>
};

const styles = StyleSheet.create({
  textStyle:{
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 15,
  },
  textStyle2:{
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold'
  }
});

export default EventScreen;

import React, {useState, useEffect} from 'react';
import {View,Image,Text,StyleSheet,FlatList,ScrollView} from 'react-native';
import url from '../../../../constants/url-constant';

const SubField = ({navigation}) => {
  const {state} = navigation;
  const [data, setData] = useState('');
  const [subField, setSubField] = useState(null);
  var id = state.params ? state.params.id : "<undefined>";

useEffect(() => {
    const fetchSubField = async () => {
      const response = await fetch(`http://senior-project-server.herokuapp.com/sport-field/${id}/sub-field`, {
        method: 'GET'
      });
      const data = await response.json();
      console.log("This is sub 2")
      console.log(data)
      if (!response.ok) {
        Alert.alert(
          'Error',
          data.message,
          [{ text: 'OK', style: 'destructive' }]
        )
        return;
      }
      setSubField(data);

    }
    fetchSubField();
  }, []);

  return <View>
  <Text style = {styles.headText}> Select the field</Text>
  <FlatList
  data = {subField}
  keyExtractor = {(subField) => subField.id}
  renderItem= {({item}) => {
    return <View>
     <ScrollView>
      <Text style = {styles.normalText}> Field {item.sub_field_id} </Text>
      <Image style={styles.Image} source={require('../../../../assets/sub.jpg')} />
      <Text style = {styles.textStyle2}> Size of the field (width x length) </Text>
      <Text style = {styles.textStyle}> {item.width} x {item.length}</Text>
      <Text style = {styles.textStyle2}> Service rate </Text>
      <Text style = {styles.textStyle}> {item.service_rate} </Text>
      </ScrollView>
      </View>
  }}/>
  </View>
};


const styles = StyleSheet.create({
  normalText:{
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  headText: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 10
  },
  textStyle: {
    alignSelf: 'center',
    marginLeft: 20,
    marginRight: 20,

  },
  Image: {
    height: 225,
    width:380,
    resizeMode: 'stretch',
    borderRadius: 50,
    marginLeft: 20,
    marginRight: 20,
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 15
  },
  textStyle2:{
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  }
});

export default SubField;

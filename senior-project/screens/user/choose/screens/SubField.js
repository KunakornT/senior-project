import React, {useState, useEffect} from 'react';
import {View,Image,Text,StyleSheet,FlatList,ScrollView,TouchableOpacity} from 'react-native';
import url from '../../../../constants/url-constant';

const SubField = ({navigation}) => {
  const {state} = navigation;
  const [data, setData] = useState('');
  const [subField, setSubField] = useState('');
  var id = state.params ? state.params.id : "<undefined>";
  var type = state.params ? state.params.type : "<undefined>";


useEffect(() => {
    const fetchSubField = async () => {
      const response = await fetch(`http://senior-project-server.herokuapp.com/sport-field/${id}/sub-field`, {
        method: 'GET'
      });
      const data = await response.json();
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



  return (
  <View>
  <FlatList
  data = {subField}
  keyExtractor = {(item) => {item.id}}
  renderItem= {({item}) => {
    return <View>
      <ScrollView>
      <View style = {styles.container}>
      <Text style = {styles.normalText}> Field {item.sub_field_id} </Text>
      <Image style={styles.Image}
      defaultSource={require('../../../../assets/football.jpg')}
      source={{uri:`https://senior-project-server.herokuapp.com/sport-field/${item.sport_field_id}/sub-field/${item.sub_field_id}.jpeg`}}/>
      <Text style = {styles.textStyle2}> Size of the field (width x length) </Text>
      <Text style = {styles.textStyle}> {item.width} x {item.length}</Text>
      <Text style = {styles.textStyle2}> Service rate </Text>
      <Text style = {styles.textStyle}> {item.service_rate} </Text>
      <Text style = {styles.textStyle2}> Holiday service rate </Text>
      <Text style = {styles.textStyle}> {item.holiday_service_rate} </Text>
      <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('Form',{
        sportID: item.sport_field_id,
        id: item.sub_field_id,
        type,
        width: item.width,
        length: item.length,
        service: item.service_rate,
        holiday: item.holiday_service_rate
      })} >
      <Text style = {styles.textButton}> Next </Text>
      </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
  }}/>
  </View>
)
};


const styles = StyleSheet.create({
  normalText:{
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 20,
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
    width:350,
    resizeMode: 'stretch',
    borderRadius: 50,
    marginLeft: 20,
    marginRight: 20,
    alignSelf: 'center',
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 15
  },
  textStyle2:{
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    margin: 5,
  },
  button:{
    borderRadius: 50,
    borderWidth: 2,
    alignSelf: 'center',
    margin:10,
    backgroundColor: '#FFA64B',
    borderColor: 'white'
  },
  textButton:{
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
    padding: 10
  },
  container: {
    borderWidth: 1,
    flex: 1,
    margin: 15

  }
});

export default SubField;

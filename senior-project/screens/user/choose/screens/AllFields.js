import React,{useState, useEffect}  from 'react';
import { View, Text, StyleSheet, ScrollView, AsyncStorage, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import url from '../../../../constants/url-constant';
import Card from '../../../../components/Card';
import { Ionicons } from '@expo/vector-icons';


const AllFields = ({navigation}) => {
  const {state} = navigation;
  const [data, setData] = useState('');
  const [allField, setAllField] = useState('');
  const [term,setTerm] = useState('');
  const [errorMessage,setError] = useState('');
  const [newData,setnewData] = useState('');

  const fetchSportField = async () => {
    try{
      const response = await fetch(`http://senior-project-server.herokuapp.com/sport-field`,{
        method: 'GET'
        }
      );
      const data = await response.json();
      setAllField(data);
      console.log(term);
      console.log(data);
    }catch (err){
    setError('Something went wrong');
  }
};

useEffect(() => {
  fetchSportField();
}, []);

const searchFilterFunction = term => {
  const filter = allField.filter(item => {
    const itemData = `${item.sport_field_name.toUpperCase()}`;
     const textData = term.toUpperCase();
     return itemData.indexOf(textData) > -1;
  });
  setAllField(filter);
};

console.log(term);


  return (
  <View>
   <Card>
     <View style={styles.titleContainer}>
       <Ionicons name='ios-search' size={25} />
       <TextInput
       style={styles.text}
       autoCapitalize = "none"
       autoCorrect = {false}
       placeholder="Search"
       value={term}
       onChangeText= {term => setTerm(term)}
       onEndEditing = {() => searchFilterFunction(term)}
       />
     </View>
   </Card>

  <FlatList
  data = {allField}
  keyExtractor = {(item) => {item.sport_field_name}}
  renderItem= {({item}) => {
    return <View>
      <ScrollView>
      <View style = {styles.titleContainer2}>
      <Text style = {styles.textStyle2}> {item.sport_field_name} </Text>
      <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('Field',{
          id: item.sport_field_id,
          description: item.description,
          name: item.sport_field_name,
          type: item.sport_type,
          openTime: item.open_time,
          closeTime: item.close_time
        })} >
      <Text style = {styles.textButton}> Next </Text>
      </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
  }}
  />

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
  textStyle: {
    alignSelf: 'center',
    marginLeft: 20,
    marginRight: 20,

  },
  textStyle2:{
    fontSize: 25,
    flex: 1
  },
  button:{
    borderRadius: 50,
    borderWidth: 2,
    alignSelf: 'center',
    margin:3,
    backgroundColor: '#FFA64B',
    borderColor: 'white'
  },
  textButton:{
    fontSize: 15,
    color: 'white',
    alignSelf: 'center',
    padding: 10
  },
   text: {
      fontSize: 20,
      marginLeft: 5,
      width: '100%'
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    titleContainer2: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 5,
      borderWidth: 1,
      flex: 1,
      justifyContent: 'space-around'
    },
});

export default AllFields;

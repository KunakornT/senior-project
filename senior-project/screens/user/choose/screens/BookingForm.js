import React,{useState} from 'react';
import {View,Text,StyleSheet,TextInput,Button,TouchableOpacity} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Ionicons} from '@expo/vector-icons';

const BookingForm = ({navigation}) => {
  const {state} = navigation;
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  var id = state.params ? state.params.id : "<undefined>";
  var width = state.params ? state.params.width : "<undefined>";
  var length = state.params ? state.params.length : "<undefined>";
  var service = state.params ? state.params.service : "<undefined>";
  var holiday = state.params ? state.params.holiday : "<undefined>";

const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

 const showTimePicker = () => {
   setTimePickerVisibility(true);
 };
 const hideTimePicker = () => {
   setTimePickerVisibility(false);
 };

 const handleConfirm = time => {
   console.warn("Time has been picked: ", time);
   hideTimePicker();
 };

  return < View>

  <Text style= {styles.header}> Booking Information </Text>
  <Text style = {styles.textStyle2}> Field: {id} </Text>
  <Text style = {styles.textStyle2}> Size of the field {width} x {length} </Text>
  <Text style={styles.label}> Name of booking:  </Text>
  <TextInput
    style = {styles.inputName}
    value={title}
    onChangeText={(text) => setTitle(text)}/>
  <Text style={styles.label}> Description: </Text>
  <TextInput
    style = {styles.inputContent}
    value={content}
    onChangeText={text => setContent(text)}/>
    <TouchableOpacity title = "pick the time" onPress={showTimePicker} >
      <View style={styles.titleContainer} >
        <Ionicons name='md-time' size={25} color= '#f65c78' />
        <Text style={styles.label2}> Select time of booking </Text>
      </View>
      <DateTimePickerModal
        timeZoneOffsetInMinutes={0}
        isVisible={isTimePickerVisible}
        mode="datetime"
        headerTextIOS = "Booking Time"
        is24Hour={true}
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
      />
      </TouchableOpacity>
  <Button
  title = "Book the field"
  onPress = {() => navigation.navigate('Home')}
  />
  </View>
};

BookingForm.defaultProps ={
    initialValues:{
      title:'',
      content:''
    }
};

const styles = StyleSheet.create({
  inputName:{
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom:15,
    padding:5,
    margin: 5
  },
  inputContent:{
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom:15,
    padding:5,
    margin: 5
  },
  label:{
    fontSize: 18,
    marginBottom: 5,
    marginLeft: 5,
    fontWeight: 'bold',
    marginTop: 5,
  },
  header:{
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf:'center',
    marginTop: 15,
    marginBottom: 10
  },
  normalText:{
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10
  },
  textStyle: {
    alignSelf: 'center'
  },
  textStyle2:{
    alignSelf: 'center',
    fontSize: 20,
    margin: 2
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    color : '#FF9800',
    alignSelf: 'center'
  },
  label2:{
    fontSize: 18,
    marginBottom: 5,
    marginLeft: 5,
    fontWeight: 'bold',
    marginTop: 5,
    color : '#f65c78'
  },

});

export default BookingForm;

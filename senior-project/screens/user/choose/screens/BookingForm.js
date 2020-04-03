import React,{useState,useEffect} from 'react';
import {View,Text,Alert,StyleSheet,TextInput,Button,TouchableOpacity, ScrollView,Slider,AsyncStorage} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {MaterialIcons,AntDesign} from '@expo/vector-icons';
import url from '../../../../constants/url-constant';

const BookingForm = ({navigation,props}) => {
  const {state} = navigation;
  const [username,setUsername] = useState('');
  const [description,setDescription] = useState('');
  const [date, setDate] = useState('');
  const [start_time, setbookTime] = useState('');
  const [end_time, setEndTime] = useState('');
  const [player,setPlayer] = useState('0');
  var id = state.params ? state.params.id : "<undefined>";
  var sportID = state.params ? state.params.sportID : "<undefined>";
  var type = state.params ? state.params.type : "<undefined>";
  var width = state.params ? state.params.width : "<undefined>";
  var length = state.params ? state.params.length : "<undefined>";
  var service = state.params ? state.params.service : "<undefined>";
  var holiday = state.params ? state.params.holiday : "<undefined>";
const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
const [isTimePickerVisible2, setTimePickerVisibility2] = useState(false);

useEffect(() => {
  async function fetchUserData() {
    let data = await AsyncStorage.getItem('userInfo');
    let user = await JSON.parse(data);
    setUsername(user.username);
  }
  fetchUserData();
}, [username])

 const showTimePicker = () => {
   setTimePickerVisibility(true);
 };
 const hideTimePicker = () => {
   setTimePickerVisibility(false);
 };

 const showDatePicker = () => {
   setDatePickerVisibility(true);
 };
 const hideDatePicker = () => {
   setDatePickerVisibility(false);
 };

 const showTimePicker2 = () => {
   setTimePickerVisibility2(true);
 };
 const hideTimePicker2 = () => {
   setTimePickerVisibility2(false);
 };

 const dateConfirmHandler = date => {
   console.log(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())
   setDate(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
   hideDatePicker();
 };

const timeConfirmHandler = time => {
   console.log(time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds());
   setbookTime(time.getHours() + ':' + time.getMinutes());
   hideTimePicker();
 };

const timeConfirmHandler2 = time => {
    console.log(time.getHours() + ':' + time.getMinutes() );
    setEndTime(time.getHours() + ':' + (time.getMinutes()) );
    hideTimePicker2();
};


const inputValidation = () => {
    if (date.trim() === '' || start_time.trim() === '' || end_time.trim() === '') {
      return false;
    }
    else{
      return true;
    }
  };

const handleSubmit = () => {
      var dateStart = new Date(start_time);
      var dateEnd = new Date(end_time);

    if (inputValidation() === false) {
      Alert.alert(
        'Invalid Input',
        'Must specific all fields',
        [{ text: 'OK', style: 'destructive'}]
      );
      return;
    }
    else {
   const data = JSON.stringify({
       "sportFieldId": sportID,
       "subFieldId": id,
       "sportType": type,
       "startTime": date + 'T' + start_time + ':00',
       "endTime": date + 'T' + end_time + ':00',
       "reserveUser": username,
       "maxPlayer": player,
       "description": description
   });
   fetch('http://senior-project-server.herokuapp.com/match', {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
     body: data,
   });
   navigation.navigate('Home');
   console.log(data);
  }

 }

  return < View>
  <ScrollView>
  <Text style= {styles.header}> Booking Information </Text>
  <Text style = {styles.textStyle2}> Field: {id} </Text>
  <Text style = {styles.textStyle2}> Size of the field {width} x {length} </Text>

     <View style= {styles.titleContainer2}>
     <TouchableOpacity title = "pick the date" onPress={showDatePicker} >
      <DateTimePickerModal

        isVisible={isDatePickerVisible}
        mode="date"
        minimumDate={new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate())}
        maximumDate={new Date(2020, 11, 31)}
        value={date}
        headerTextIOS = "Booking Time"
        is24Hour={true}
        display ="default"
        onConfirm={dateConfirmHandler}
        onCancel={hideDatePicker}
        date={new Date()}
      />
      <View style={styles.titleContainer}>
      <AntDesign name='calendar' size={25} color='#d63447'/>
      <Text style={styles.textStyle3}>Date </Text>
      </View>
      <TextInput value={date} editable={false} style={styles.textStyle2} />
    </TouchableOpacity>
    </View>

    <View style= {styles.titleContainer2}>

    <TouchableOpacity title = "pick the time" onPress={showTimePicker} >
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        value={start_time}
        minimumDate={new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate())}
        headerTextIOS = "Booking Time"
        is24Hour={true}
        locale="en_GB"
        display ="default"
        onConfirm={timeConfirmHandler}
        onCancel={hideTimePicker}
        date={new Date()}
      />

      <View style={styles.titleContainer}>
      <MaterialIcons name='timer' size={25} color='#d63447'/>
      <Text style={styles.textStyle3}>Start Time </Text>
      </View>
      <TextInput value={start_time} editable={false} style={styles.textStyle2} />
    </TouchableOpacity>


    <TouchableOpacity title = "pick the time" onPress={showTimePicker2} >
      <DateTimePickerModal
        isVisible={isTimePickerVisible2}
        mode="time"
        value={end_time}
        minimumDate={new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate())}
        headerTextIOS = "Booking Time"
        is24Hour={true}
        locale="en_GB"
        display ="default"
        onConfirm={timeConfirmHandler2}
        onCancel={hideTimePicker2}
        date={new Date()}
      />
      <View style={styles.titleContainer}>
      <MaterialIcons name='timer-off' size={25} color='#d63447'/>
      <Text style={styles.textStyle3}>End Time </Text>
      </View>
      <TextInput value={end_time} editable={false} style={styles.textStyle2} />
    </TouchableOpacity>
    </View>

  <Text style={styles.label3}> Request player  </Text>

    <View style={styles.slideBar}>
    <Slider
    style={{width: 200, height: 40}}
    value = {player}
    step = {1}
    onValueChange={setPlayer}
    minimumValue={0}
    maximumValue={33}
    minimumTrackTintColor="#d63447"
    maximumTrackTintColor="#000000"
    thumbTintColor= "#c81912"
    />
    <Text style={styles.textStyle2}>Players: {player} </Text>
    </View>

  <Text style={styles.label}> Note: </Text>
  <TextInput
    style = {styles.inputContent}
    multiline={true}
    value={description}
    onChangeText={text => setDescription(text)}/>
    <TouchableOpacity style = {styles.button} onPress= {handleSubmit}>
    <Text style = {styles.textButton}> Confirm </Text>
    </TouchableOpacity>

  </ScrollView>
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
    margin: 5,
    height: 100,
  },
  label:{
    fontSize: 18,
    marginBottom: 5,
    marginLeft: 5,
    fontWeight: 'bold',
    marginTop: 5,
  },
  label3:{
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5,
    fontWeight: 'bold',
    marginTop: 5,
    alignSelf: 'center'
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
    margin: 5
  },
  textStyle3:{
    alignSelf: 'center',
    fontSize: 20,
    margin: 2,
    fontWeight: 'bold',
    color:'#c81912'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#c81912',
    borderRadius: 10,
    padding: 2,
    marginRight: 10
  },
  titleContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    alignSelf: 'center',
  },
  label2:{
    fontSize: 18,
    marginBottom: 5,
    marginLeft: 5,
    fontWeight: 'bold',
    marginTop: 5,
    color : '#f65c78'
  },
  slideBar:{
    alignItems: 'stretch',
    alignSelf: 'center'
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
    }

});

export default BookingForm;

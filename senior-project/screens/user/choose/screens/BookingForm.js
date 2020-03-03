import React,{useState} from 'react';
import {View,Text,StyleSheet,TextInput,Button,TouchableOpacity} from 'react-native';
import Slider from "react-native-slider";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {MaterialIcons,AntDesign} from '@expo/vector-icons';

const BookingForm = ({navigation}) => {
  const {state} = navigation;
  const [reserve_user,setReserve] = useState('');
  const [description,setDescription] = useState('');
  const [date, setDate] = useState('0000-00-00');
  const [start_time, setbookTime] = useState('00:00');
  const [end_time, setEndTime] = useState('00:00');
  const [player,setPlayer] = useState(0);
  var id = state.params ? state.params.id : "<undefined>";
  var width = state.params ? state.params.width : "<undefined>";
  var length = state.params ? state.params.length : "<undefined>";
  var service = state.params ? state.params.service : "<undefined>";
  var holiday = state.params ? state.params.holiday : "<undefined>";

const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
const [isTimePickerVisible2, setTimePickerVisibility2] = useState(false);

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
   setDate(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
   hideDatePicker();
 };

const timeConfirmHandler = time => {
   console.log(time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()+ ' ' +time.getHours() + ':' + (time.getMinutes()));
   setbookTime(time.getHours() + ':' + time.getMinutes() );
   hideTimePicker();
 };

const timeConfirmHandler2 = end => {
    setEndTime(end.getHours() + ':' + (end.getMinutes()));
    hideTimePicker2();
};

  return < View>

  <Text style= {styles.header}> Booking Information </Text>
  <Text style = {styles.textStyle2}> Field: {id} </Text>
  <Text style = {styles.textStyle2}> Size of the field {width} x {length} </Text>
  <Text style={styles.label}> Name of booking:  </Text>
  <TextInput
    style = {styles.inputName}
    value={reserve_user}
    onChangeText={(text) => setReserve(text)}/>
  <Text style={styles.label}> Description: </Text>
  <TextInput
    style = {styles.inputContent}
    multiline={true}
    value={description}
    onChangeText={text => setDescription(text)}/>


  <Text style={styles.label3}> Please select the date and time  </Text>

 <View style= {styles.titleContainer}>
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
  <Text style={styles.textStyle3}>Date</Text>
  </View>
  <TextInput value={date} editable={false} style={styles.textStyle2} />
</TouchableOpacity>
</View>

<View style= {styles.titleContainer}>

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
      <Text style={styles.textStyle3}>Start Time</Text>
      </View>
      <TextInput value={start_time} editable={false} style={styles.textStyle2} />
    </TouchableOpacity>

        <Text style={styles.textStyle2}> ----> </Text>

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
      <Text style={styles.textStyle3}>End Time</Text>
      </View>
      <TextInput value={end_time} editable={false} style={styles.textStyle2} />
    </TouchableOpacity>
    </View>

  <Text style={styles.label3}> Please limit number of players  </Text>

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
    />
    <Text style={styles.textStyle2}>Players: {player} </Text>
    </View>

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
    margin: 1,
    fontWeight: 'bold',
    color:'#d63447'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
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
  slideBar:{
    alignItems: 'stretch',
    alignSelf: 'center'
  }

});

export default BookingForm;

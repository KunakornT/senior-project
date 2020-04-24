import React,{useState,useEffect} from 'react';
import {Text,StyleSheet,View, TouchableOpacity,AsyncStorage,Alert} from 'react-native';

const ConfirmBooking = ({navigation,props}) => {
  const {state} = navigation;
  const [username,setUsername] = useState('');
  var id = state.params ? state.params.id : "<undefined>";
  var sportID = state.params ? state.params.sportID : "<undefined>";
  var type = state.params ? state.params.type : "<undefined>"
  var date = state.params ? state.params.date : "<undefined>"
  var startTime = state.params ? state.params.start_time : "<undefined>"
  var endTime = state.params ? state.params.end_time : "<undefined>"
  var player = state.params ? state.params.player : "<undefined>"
  var description = state.params ? state.params.description : "<undefined>"

  useEffect(() => {
    async function fetchUserData() {
      let data = await AsyncStorage.getItem('userInfo');
      let user = await JSON.parse(data);
      setUsername(user.username);
    }
    fetchUserData();
  }, [username])

  const confirmation=()=>{
   //function to make two option alert
   Alert.alert(
     //title
     'Confirm Booking',
     //body
     'if you confirm the booking, you can cancel this event before 8 hours of booking time',
     [
       {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
       {text: 'Yes', onPress: () => handleSubmit()},
     ],
     { cancelable: false }
     //clicking out side of alert will not cancel
   );
 }

  const handleSubmit = () => {
        var dateStart = new Date(startTime);
        var dateEnd = new Date(endTime);
        const data = JSON.stringify({
            "sportFieldId": sportID,
            "subFieldId": id,
            "sportType": type,
            "startTime": date + 'T' + startTime + ':00',
            "endTime": date + 'T' + endTime + ':00',
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
        console.log(data);
         navigation.navigate('Home',
         Alert.alert(
           'Success',
           'You have created the event, check information on Event page',
           [
            { text: "OK", onPress: () => console.log("OK Pressed") }
           ],
           { cancelable: false }
         ));
      }


  return <View>
        <Text style = {styles.headText}> Confirm Booking </Text>

        <View style = {styles.titleContainer}>
        <Text style = {styles.hardText}> Hosting event: </Text>
        <Text style = {styles.normalText} > {username} </Text>
        </View>
        <View style = {styles.titleContainer}>
        <Text style = {styles.hardText} > Sport type:  </Text>
        <Text style = {styles.normalText} > {type} </Text>
        </View>
        <View style = {styles.titleContainer}>
        <Text style = {styles.hardText} > Date:  </Text>
        <Text style = {styles.normalText}> {date} </Text>
        </View>
        <View style = {styles.titleContainer}>
        <Text style = {styles.hardText} > Time:  </Text>
        <Text style = {styles.normalText}>{startTime} - {endTime}</Text>
        </View>
        <View style = {styles.titleContainer}>
        <Text style = {styles.hardText} > Request player: </Text>
        <Text style = {styles.normalText}> {player}</Text>
        </View>
        <View style = {styles.titleContainer}>
        <Text style = {styles.hardText} > Note: </Text>
        </View>
        <View style = {styles.descriptionBox}>
        <Text style = {styles.description}>{description}</Text>
        </View>
        <TouchableOpacity style = {styles.button} onPress = {confirmation}>
        <Text style = {styles.textButton}> Confirm </Text>
        </TouchableOpacity>
        </View>
}
const styles = StyleSheet.create({
  headText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    alignSelf: 'center'
  },
  normalText:{
    fontSize: 18,
  },
  description:{
    fontSize: 18,
    alignSelf: 'center',
    margin: 2,
  },
  descriptionBox: {
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    alignItems: 'center',
    padding: 5
  },
  hardText:{
    fontSize: 18,
    fontWeight: 'bold'
  },
  textButton:{
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
    padding: 10
  },
  button:{
    borderRadius: 50,
    borderWidth: 2,
    alignSelf: 'center',
    margin:10,
    backgroundColor: '#FFA64B',
    borderColor: 'white'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
  },
});

export default ConfirmBooking;

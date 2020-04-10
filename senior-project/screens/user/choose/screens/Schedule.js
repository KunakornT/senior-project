import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const Schedule = props => {
  const [scheduleData, setScheduleData] = useState();

  useEffect(() => {
    const data = props.navigation.getParam('data');
    setScheduleData(data)
  }, [])

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  return (
    <View>
      {/* <Text style={styles.header}>Schedule</Text> */}
      {scheduleData && (
        <View style={styles.tableContainer}>
          <Text style={styles.tableHeaderText}>Reserve user</Text>
          <Text style={styles.tableHeaderText}>Time</Text>
        </View>)}
      {scheduleData && scheduleData.map((item, index) => {
        return (
          <View style={styles.tableContainer} key={item.start_time}>
            <Text style={styles.tableText}>{item.reserve_user}</Text>
            <Text style={styles.tableText}>
              {addZero(new Date(item.start_time).getUTCHours())}:{addZero(new Date(item.start_time).getUTCMinutes())} - {addZero(new Date(item.end_time).getUTCHours())}:{addZero(new Date(item.end_time).getUTCMinutes())}
            </Text>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height / 40,
    marginVertical: 10
  },
  tableContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginHorizontal: Dimensions.get('window').width/10,
    marginTop: Dimensions.get('window').width/30,
  },
  tableHeaderText: {
    fontSize: Dimensions.get('window').height / 45,
    width: '50%'
  },
  tableText: {
    width: '50%',
    fontSize: Dimensions.get('window').height / 50
  }
})

export default Schedule;

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
      <Text style={styles.header}>Schedule</Text>
      {scheduleData && (
        <View style={styles.tableContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.tableText}>reserve user</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.tableText}>Time</Text>
          </View>
        </View>)}
      {scheduleData && scheduleData.map((item, index) => {
        return (
          <View style={styles.tableContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.tableText}>{item.reserve_user}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.tableText}>
                {addZero(new Date(item.start_time).getUTCHours())}:{addZero(new Date(item.start_time).getUTCMinutes())}-
                {addZero(new Date(item.end_time).getUTCHours())}:{addZero(new Date(item.end_time).getUTCMinutes())}
              </Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height / 50,
    marginVertical: 10
  },
  tableContainer: {
    flexDirection: 'row',
    marginHorizontal: 5,
    padding: 5
  },
  rowContainer: {
    width: '50%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 5
  },
  tableText: {
    fontSize: Dimensions.get('window').height / 60
  }
})

export default Schedule;

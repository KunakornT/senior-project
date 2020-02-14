import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import url from '../../../../constants/url-constant';

class SportsField extends Component {
   state = {
      data: ''
   }
   componentDidMount = () => {
      fetch(url.url_sportsfield, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         this.setState({
            data: responseJson
         })
      })
      .catch((error) => {
         console.error(error);
      });
   }
   render() {
      return (
         <View>
         <FlatList
         data={this.state.data}
         renderItem={({item}) => {
        return (
          <View>
            <Text style = {styles.headText}> {item.sport_field_name}</Text>
          </View>
        )
      }}
      keyExtractor={(item, index) => index.toString()}
     />
         </View>
      )
   }
}
const styles = StyleSheet.create({
  headText: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 10
  },
  textStyle: {
    alignSelf: 'center'
  },
  row: {
    height: 200,
    backgroundColor: '#FFFCF7',
    borderColor: 'black',
    borderRadius: 15,
    margin: 10,
    borderWidth: 1,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default SportsField;

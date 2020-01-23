import React, {useState, useEffect} from 'react';
import {View,Text,StyleSheet, ScrollView} from 'react-native';
import SearchBar from '../components/SearchBar';
import yelp from '../api/yelp';
import ResultsList from '../components/ResultsList';
import useResults from '../hooks/useResults';


const SearchScreen = () => {

  const [term,setTerm] = useState('');
  const [searchApi,results,errorMessage] = useResults();

  const filterResultsByPrice = (price) => {
    return results.filter(results => {
      return results.price == price;
    })
  };

  return (
    <>
      <SearchBar
      term = {term}
      onTermChange={setTerm}
      onTermSubmit = {() => searchApi(term)}
      />
      <Text> {errorMessage} </Text>
      <ScrollView>
      <ResultsList
      results = {filterResultsByPrice('$')}
      title = "Cost Effective"
      />
      <ResultsList
      results = {filterResultsByPrice('$$')}
      title = "Bit Pricer"
      />

      <ResultsList
      results = {filterResultsByPrice('$$$')}
      title = "Big Spender"
      />
      </ScrollView>
    </>
  );

};

const styles = StyleSheet.create({
});

export default SearchScreen;

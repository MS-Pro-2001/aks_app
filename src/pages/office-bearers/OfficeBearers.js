/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import React, { useState } from 'react';
import { Searchbar, TouchableRipple } from 'react-native-paper';
import { ActivityIndicator } from 'react-native-paper';
import { useFetchOfficeBearersQuery } from '../../store/apis/officeBearers';

const styles = StyleSheet.create({
  searchInputBox: {
    margin: 7,
  },
  container: {
    flex: 1,
  },

  InputBox: {
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 30,
    padding: 10,
    color: '#005b96',
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    height: 50,
    marginLeft: 20,
  },
  entriesCount: {
    margin: 5,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  name: {
    fontSize: 20,
    marginTop: 8,
    color: '#005b96',
  },
  photo: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 70,
    width: 50,
    height: 50,
    marginRight: 10,
    marginTop: 8,
  },
});

const OfficeBearers = () => {
  const [searchedQuery, setSearchedQuery] = useState('');

  const { data, isLoading } = useFetchOfficeBearersQuery();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchInputBox}>
        <Searchbar
          style={{ borderRadius: 10 }}
          placeholder="Search"
          onChangeText={(value) => setSearchedQuery(value)}
          value={searchedQuery}
        />
        {/* <TextInput onChangeText={(value) => setSearchedQuery(value)} placeholderTextColor={"grey"} style={styles.InputBox} placeholder='search here...' /> */}
      </View>
      <View style={styles.entriesCount}>
        <Text style={{ color: '#005b96', marginLeft: 5 }}>
          Total entries:{' '}
          {data?.filter((item) =>
            item?.firstName.toLowerCase().includes(searchedQuery.toLowerCase())
          )?.length || 0}
        </Text>
        <Text style={styles.border} />
      </View>

      <ActivityIndicator
        size={'large'}
        style={{ display: `${isLoading ? '' : 'none'}` }}
      />
      <FlatList
        data={data?.filter((item) =>
          item.firstName.toLowerCase().includes(searchedQuery.toLowerCase())
        )}
        renderItem={({ item }) => {
          return (
            <TouchableRipple
              key={item.Id}
              onPress={() => console.log('pressed')}
              rippleColor="rgba(0, 0, 0, .32)"
            >
              <View>
                <View style={styles.listItem}>
                  {/* <Text style={styles.photo} ></Text> */}
                  <View>
                    <Text style={styles.name}>{item?.firstName}</Text>
                    <Text style={{ color: 'black' }}>{item?.designation}</Text>
                  </View>
                </View>
                <Text style={styles.border} />
              </View>
            </TouchableRipple>
          );
        }}
        keyExtractor={(item) => item?.Id}
      />
    </SafeAreaView>
  );
};

export default OfficeBearers;

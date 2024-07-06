/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Searchbar,
  TouchableRipple,
  useTheme,
  List,
  Divider,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { setAllUsers } from '../../store/user';
import { useFetchAllUsersQuery } from '../../store/apis/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const wards = [
  'Bopal',
  'Bapunagar',
  'Ghatlodiya',
  'Krishnanagar',
  'Maninagar',
  'Naroda',
  'Nirnaynagar',
  'Noblenagar',
  'Odhav',
  'Sabarmati',
  'Thaltej',
  'Vastrapur',
  'Vejalpur',
];

const WardItem = ({ item, onPress }) => {
  const theme = useTheme();
  return (
    <TouchableRipple onPress={onPress} rippleColor="rgba(0, 0, 0, .32)">
      <>
        <List.Item
          titleStyle={{ fontSize: 20, color: theme.colors.primary }}
          title={item}
          right={() => (
            <MaterialCommunityIcons
              name="chevron-right"
              size={30}
              style={{ color: theme.colors.primary }}
            />
          )}
        />
        <Divider />
      </>
    </TouchableRipple>
  );
};

const Wards = ({ navigation }) => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const { data: allUsersData } = useFetchAllUsersQuery();

  useEffect(() => {
    const fetchData = async () => {
      const pin = await AsyncStorage.getItem('mpin');
      const currentUserInfo = await AsyncStorage.getItem('userData');
      // console.log('wards', { pin, currentUserInfo });
    };

    fetchData();
  }, []);

  useEffect(() => {
    dispatch(setAllUsers(allUsersData));
  }, [allUsersData, dispatch]);

  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    searchInputBox: {
      margin: 7,
    },
    InputBox: {
      borderWidth: 2,
      borderColor: theme.colors.primary,
      borderRadius: 50,
      padding: 10,
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
      marginTop: 13,
      color: theme.colors.primary,
    },
  });

  const [searchedQuery, setSearchedQuery] = useState('');

  const filteredWards = wards.filter((item) =>
    item.toLowerCase().includes(searchedQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchInputBox}>
        <Searchbar
          style={{ borderRadius: 10 }}
          placeholder="Search"
          onChangeText={(value) => setSearchedQuery(value)}
          value={searchedQuery}
        />
      </View>
      <View style={styles.entriesCount}>
        <Text style={{ color: theme.colors.primary, marginLeft: 5 }}>
          {searchedQuery?.length ? 'Search records' : 'Total wards'}:{' '}
          {filteredWards.length || 0}
        </Text>
        <Text style={styles.border} />
      </View>
      <FlatList
        data={filteredWards}
        renderItem={({ item }) => (
          <WardItem
            item={item}
            onPress={() =>
              navigate.navigate('WardTabsNavigator', { userWard: item })
            }
          />
        )}
        keyExtractor={(item) => item}
      />
    </SafeAreaView>
  );
};

export default Wards;

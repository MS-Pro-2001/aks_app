/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import React, { useState } from 'react';
import {
  Searchbar,
  TouchableRipple,
  useTheme,
  List,
  Divider,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
        {item !== 'Odhav' && <Divider />}
      </>
    </TouchableRipple>
  );
};

const Wards = ({ navigation }) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
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
    <View>
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
          {filteredWards.length}
        </Text>
        <Text style={styles.border} />
      </View>
      <View>
        <SafeAreaView>
          <FlatList
            data={filteredWards}
            renderItem={({ item }) => (
              <WardItem
                item={item}
                onPress={() =>
                  navigation.push('WardTabsNavigator', { userWard: item })
                }
              />
            )}
            keyExtractor={(item) => item}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

export default Wards;

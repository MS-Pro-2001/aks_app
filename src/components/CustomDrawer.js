// CustomDrawerContent.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../store/user';
import { CommonActions } from '@react-navigation/native';

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOutUser());
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'LoginUsingMPin' }],
      })
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.logoutContainer}>
        <DrawerItem
          label="Logout"
          onPress={handleLogout}
          labelStyle={styles.logoutLabel}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  logoutContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 400,
  },
  logoutLabel: {
    color: 'red',
  },
});

export default CustomDrawerContent;

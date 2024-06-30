import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import TabsNavigator from './TabsNavigator';
import UserProfile from '../pages/userProfile/UserProfile';
import FamilyDetails from '../pages/familyDetails/FamilyDetails';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser, userSelector } from '../store/user';
// import { useNavigation } from '@react-navigation/native';
import AddPin from '../pages/addPin/AddPin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutUser = ({ navigation }) => {
  // const navigate = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logOutUser());
    navigation.navigate('LoginUsingMPin');
  }, [dispatch, navigation]);
};

const Drawer = createDrawerNavigator();

function DrawerNavigator({ navigation }) {
  const [isPinSet, setIsPinSet] = useState(false);
  const { isUserLoggedIn } = useSelector(userSelector);
  useEffect(() => {
    if (!isUserLoggedIn) {
      navigation.navigate('LoginUsingMPin');
    }
  }, [isUserLoggedIn, navigation]);

  useEffect(() => {
    const fetchData = async () => {
      const pin = await AsyncStorage.getItem('mpin');

      if (pin) {
        setIsPinSet(true);
      }
    };
    fetchData();
  }, [isUserLoggedIn]);

  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        options={{ headerShown: true }}
        component={TabsNavigator}
      />
      <Drawer.Screen name="Profile" component={UserProfile} />
      <Drawer.Screen
        name={isPinSet ? 'Change 4-digit PIN' : 'Set up 4-digit PIN'}
        component={AddPin}
      />
      <Drawer.Screen name="Family Details" component={FamilyDetails} />
      <Drawer.Screen
        options={{ headerShown: false }}
        name="Logout"
        component={LogoutUser}
      />

      {/* <Drawer.Screen name="Update Details" component={UpdateUserDetails} /> */}
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;

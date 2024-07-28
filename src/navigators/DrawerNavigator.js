import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useContext, useEffect, useState } from 'react';
import TabsNavigator from './TabsNavigator';
import UserProfile from '../pages/userProfile/UserProfile';
import FamilyDetails from '../pages/familyDetails/FamilyDetails';
import { useSelector } from 'react-redux';
import { userSelector } from '../store/user';
// import { useNavigation } from '@react-navigation/native';
import AddPin from '../pages/addPin/AddPin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/authContext/AuthContext';

const LogoutUser = () => {
  const { logoutUser } = useContext(AuthContext);
  logoutUser();
};

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const [isPinSet, setIsPinSet] = useState(false);
  const { isUserLoggedIn } = useSelector(userSelector);

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
    <Drawer.Navigator
      initialRouteName="Home"
      // drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
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
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;

import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useEffect } from 'react';
import TabsNavigator from './TabsNavigator';
import UserProfile from '../pages/userProfile/UserProfile';
import Mpin from '../pages/mPin/Mpin';
import FamilyDetails from '../pages/familyDetails/FamilyDetails';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../store/user';
import { useNavigation } from '@react-navigation/native';

const LogoutUser = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logOutUser());
    navigate.navigate('Login');
  }, [dispatch, navigate]);
};

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        options={{ headerShown: true }}
        component={TabsNavigator}
      />
      <Drawer.Screen name="Profile" component={UserProfile} />
      <Drawer.Screen name="Set up 4-digit PIN" component={Mpin} />
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

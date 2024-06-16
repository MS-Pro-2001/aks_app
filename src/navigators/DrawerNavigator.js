import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import TabsNavigator from './TabsNavigator';
import { Home } from '../pages/homeScreen/Home';
import UserProfile from '../pages/userProfile/UserProfile';
import Mpin from '../pages/mPin/Mpin';
import FamilyDetails from '../pages/familyDetails/FamilyDetails';

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

      {/* <Drawer.Screen name="Update Details" component={UpdateUserDetails} /> */}

      {/* <Drawer.Screen options={{ headerShown: false, }} name="LogoutPage" component={LogOutPage} /> */}
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;

import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import TabsNavigator from './TabsNavigator';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        options={{ headerShown: true }}
        component={TabsNavigator}
      />
      {/* <Drawer.Screen name="Profile" component={UserDetailPage} /> */}
      {/* <Drawer.Screen name="Set up 4-digit PIN" component={AddPinPage} /> */}

      {/* <Drawer.Screen name="Update Details" component={UpdateUserDetails} /> */}

      {/* <Drawer.Screen options={{ headerShown: false, }} name="LogoutPage" component={LogOutPage} /> */}
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;

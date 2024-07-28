import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import DrawerNavigator from './DrawerNavigator';
import { WardTabsNavigator } from './WardsTabNavigator';
import MembersDetail from '../pages/memberDetail/MembersDetail';

const AppStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WardTabsNavigator"
        component={WardTabsNavigator}
        options={{
          headerShown: true,
          headerTitle: 'Wards',
        }}
      />
      <Stack.Screen
        name="MembersDetail"
        component={MembersDetail}
        options={{
          headerShown: true,
          headerTitle: 'Members Detail',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

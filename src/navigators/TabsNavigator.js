/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OfficeBearers from '../pages/office-bearers/OfficeBearers';
import Wards from '../pages/wards/Wards';
// import Wards from '../pages/wards/Wards';
const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Wards"
        component={Wards}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={size}
            />
          ),
          headerTitleAlign: 'center',
        }}
      />

      <Tab.Screen
        name="Office Bearers"
        component={OfficeBearers}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="file-account"
              color={color}
              size={size}
            />
          ),
          headerShown: true,
          headerTitleAlign: 'center',
          headerTintColor: '#213190',
        }}
      />
    </Tab.Navigator>
  );
}

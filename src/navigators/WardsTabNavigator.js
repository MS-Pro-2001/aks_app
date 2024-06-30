/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import OfficeBearers from '../pages/office-bearers/OfficeBearers';
// import Wards from '../pages/wards/Wards';
import Directory from '../pages/directory/Directory';
import WardCommittee from '../pages/wardCommittee/WardCommittee';
// import Wards from '../pages/wards/Wards';
const Tab = createBottomTabNavigator();

export function WardTabsNavigator({ navigation, route }) {
  const { userWard } = route.params;

  // useEffect(() => {
  //   console.log({ Wards: isUserLoggedIn });
  //   if (!isUserLoggedIn) {
  //     navigation.navigate('Login');
  //   }
  // }, [isUserLoggedIn, navigation]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: true,
          headerTitleAlign: 'center',
          headerTintColor: '#213190',
          headerTitle: `${userWard}`,
        }}
        name="Directory"
        component={Directory}
        initialParams={{ userWard }}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={size}
            />
          ),
          headerShown: true,
          headerTitleAlign: 'center',
          headerTintColor: '#213190',
          headerTitle: `${userWard}`,
        }}
        name="Ward Comittee"
        component={WardCommittee}
        initialParams={{ userWard }}
      />
    </Tab.Navigator>
  );
}

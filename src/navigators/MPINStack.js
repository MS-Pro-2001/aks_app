import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import LoginUsingMPin from '../pages/mPin/LoginUsingPin';

const Stack = createNativeStackNavigator();

const MPINStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginUsingMPin"
        component={LoginUsingMPin}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MPINStack;

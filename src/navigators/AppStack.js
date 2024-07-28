import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import Login from '../pages/login/Login';
import LoginUsingMPin from '../pages/mPin/LoginUsingPin';
import SignUp from '../pages/signUp/SignUp';
import { AuthContext } from '../context/authContext/AuthContext';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const { isUserLoggedIn } = useContext(AuthContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginUsingMPin"
        component={LoginUsingMPin}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

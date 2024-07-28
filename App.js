/* eslint-disable react-native/no-inline-styles */
// In App.js in a new project
import 'react-native-gesture-handler';
import * as React from 'react';
// import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigators/AppStack';
import { AuthContext } from './src/context/authContext/AuthContext';
import AppStack from './src/navigators/AuthStack';
import MPINStack from './src/navigators/MPINStack';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';

function App() {
  const { isUserLoggedIn, mPin, isLoading } = React.useContext(AuthContext);
  console.log('qqqqqq', { mPin, isUserLoggedIn });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isUserLoggedIn ? <AppStack /> : mPin ? <MPINStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default App;

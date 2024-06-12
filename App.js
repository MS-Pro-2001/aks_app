// In App.js in a new project

import * as React from 'react';
// import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { HomeScreen } from './src/pages/homeScreen/Home';
import { DetailsScreen } from './src/pages/userDetails/userDetailsPage';
import TabsNavigator from './src/navigators/TabsNavigator';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={TabsNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: 'DETAILS' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

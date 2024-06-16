// In App.js in a new project

import * as React from 'react';
// import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { HomeScreen } from './src/pages/homeScreen/Home';
import { DetailsScreen } from './src/pages/userDetails/userDetailsPage';
import TabsNavigator from './src/navigators/TabsNavigator';
import { useSelector } from 'react-redux';
import { userSelector } from './src/store/user';
import SignUp from './src/pages/signUp/SignUp';
import SignIn from './src/pages/signIn/SignIn';
import DrawerNavigator from './src/navigators/DrawerNavigator';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
const Stack = createNativeStackNavigator();

function App() {
  const { isUserLoggedIn } = useSelector(userSelector);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isUserLoggedIn ? (
          <Stack.Screen
            name="Home"
            component={DrawerNavigator}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
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
            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              options={{ title: 'DETAILS' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

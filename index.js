/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import React from 'react';
import store from './src/store';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';
import AuthProvider from './src/context/authContext/AuthContext';
import CustomSnackBar from './src/components/common/CustomSnackbar';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#005b96',
    secondary: 'yellow',
  },
};

const ReduxApp = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <App />
          <CustomSnackBar />
        </AuthProvider>
      </PaperProvider>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => ReduxApp);

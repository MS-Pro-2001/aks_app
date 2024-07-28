/* eslint-disable react-native/no-inline-styles */
import { useContext, useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { loginUser, setCurrentUserInfo, userSelector } from '../../store/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/authContext/AuthContext';

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#005b96',
    textAlign: 'center',
    verticalAlign: 'middle',
    margin: 5,
  },
  focusCell: {
    borderColor: '#000',
  },
  box: {
    flex: 1,
    justifyContent: 'center',
  },
  headingContainer: {
    // marginTop: -100,
    alignItems: 'center',
  },
  heading: {
    marginTop: 200,
    // marginBottom: 5,
    color: '#213190',
    fontSize: 25,
  },
  container: {
    margin: 10,
    padding: 5,
  },
  subHeading: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  createAccount: {
    color: '#213190',
  },
  logo: {
    width: 100,
    borderRadius: 50,
    height: 100,
    marginTop: 50,
    objectFit: 'cover',
  },
});

const LoginUsingMPin = ({ navigation }) => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigation();
  const dispatch = useDispatch();
  // const { MPin } = useSelector(userSelector);

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleInputPin = async (val) => {
    setValue(val);
    const pin = await AsyncStorage.getItem('mpin');
    const data = await AsyncStorage.getItem('userData');
    const currentUserInfo = JSON.parse(data);
    dispatch(setCurrentUserInfo(currentUserInfo));

    try {
      if (val.length === 4) {
        if (val === pin) {
          loginUser();

          navigate.navigate('Drawer');
        } else {
          Alert.alert('Error', 'Invalid Pin?', [
            {
              text: 'Retry',
              onPress: () => {
                setValue('');
              },
            },
          ]);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
    // if (MPin?.payload?.code === val) {
    //   dispatch(loginUser());
    //   navigate.navigate('WardTabsNavigator');
    // }
  };

  return (
    <SafeAreaView>
      <View style={styles.headingContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/aks_logo.png')}
        />

        <Text style={styles.heading}>Enter Your Pin</Text>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={handleInputPin}
          cellCount={4}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          testID="my-code-input"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol}
            </Text>
          )}
        />
        <Text style={styles.subHeading}>
          Access your account with your 4-digit Pin
        </Text>
        <View style={{ display: 'flex', alignItems: 'center', marginTop: 50 }}>
          <Text
            onPress={() => navigate.navigate('Login')}
            style={{ color: '#005b96' }}
          >
            Forgot Pin?
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginUsingMPin;

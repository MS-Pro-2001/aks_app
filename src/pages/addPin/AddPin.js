/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
// import { useDispatch } from 'react-redux';
// import { setMPin } from '../../store/user';
const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 250 },
  cell: {
    width: 55,
    height: 55,
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
    marginTop: 5,
    marginBottom: 5,
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

const AddPin = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigation();
  const [isMPinValid, setIsMPinValid] = useState(false);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleInputPin = (val) => {
    if (val.length === 4) {
      setIsMPinValid(true);
    }
    setValue(val);
  };

  const validateMPin = () => {
    Alert.alert('Message', 'Are you sure?', [
      {
        text: 'Yes',
        onPress: async () => {
          try {
            await AsyncStorage.setItem('mpin', value);
            navigate.navigate('Wards');
          } catch (error) {
            console.warn('Error setting MPIN');
          }
          // dispatch(setMPin({ isSet: true, code: value }));
        },
      },
      {
        text: 'Cancel',
        onPress: () => {
          setIsMPinValid(false);
          setValue('');
        },
        style: 'cancel',
      },
    ]);
  };
  return (
    <SafeAreaView>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 50,
        }}
      >
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
          // autoComplete={Platform.select({
          //   android: 'sms-otp',
          //   default: 'one-time-code',
          // })}
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

        <Button
          disabled={!isMPinValid}
          style={{ marginTop: 25, padding: 2, width: 300 }}
          mode="contained"
          color="#213190"
          onPress={validateMPin}
        >
          Set MPIN
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default AddPin;

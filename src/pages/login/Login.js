/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { Button, HelperText, TextInput } from 'react-native-paper';

import { Controller, useForm } from 'react-hook-form';
import { useLoginUserMutation } from '../../store/apis/user';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setCurrentUserInfo, userSelector } from '../../store/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: 'center',
  },
  headingContainer: {
    alignItems: 'center',
    marginTop: 150,
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
    width: 60,
    borderRadius: 50,
    height: 60,
    marginTop: 20,
    objectFit: 'cover',
  },
});

export const CustomInput = ({
  control = {},
  name = '',
  validationRules = {},
  placeholder = '',
  label = '',
  errors = '',
  multiline = false,
  keyboardType,
  setOpenDatePicker,
  readonly = 'false',
  inputTextIcon,
}) => {
  return (
    <>
      <Controller
        control={control}
        rules={validationRules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            readonly={readonly}
            mode="flat"
            multiline={multiline}
            keyboardType={keyboardType}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            // right={<TextInput.Icon icon="eye" />}
            style={{ marginTop: 5 }}
            // theme={{ colors: { primary: '#213190' } }}
            //   label={label}
            error={!!errors[name] && Object.keys(errors[name])?.length !== 0}
            right={inputTextIcon}
          />
        )}
        name={name}
      />
      <HelperText
        type="error"
        visible={!!errors[name] && Object.keys(errors[name])?.length !== 0}
      >
        {errors[name]?.message}
      </HelperText>
    </>
  );
};

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isUserLoggedIn } = useSelector(userSelector);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isUserLoggedIn) {
      navigation.navigate('Drawer');
    }
  }, [isUserLoggedIn, navigation]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      phone_no: '',
      password: '',
    },
  });

  const [signInUser] = useLoginUserMutation();

  const onSubmit = async (data) => {
    setIsLoading(true);

    const res = await signInUser(data);

    if (res?.data) {
      console.log('loginnn2', res?.data);
      await AsyncStorage.setItem('userData', JSON.stringify(res?.data?.user));
      dispatch(setCurrentUserInfo(res?.data?.user));
      reset();
      setIsLoading(false);
      Alert.alert('Message', 'Logged In successfully', [
        {
          text: 'OK',
          onPress: () => {
            dispatch(loginUser());
            navigation.navigate('Home');
          },
        },
      ]);
    } else {
      reset();
      setIsLoading(false);
      Alert.alert('Error', `${res?.error?.data?.msg}`, [
        {
          text: 'OK',
        },
      ]);
    }

    // const res = await registerUser(payload);
    // console.log({ res });
  };

  return (
    <>
      <View style={styles.headingContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/aks_logo.png')}
        />

        <Text style={styles.heading}>Login</Text>
      </View>

      <ScrollView>
        <SafeAreaView>
          <View style={styles.container}>
            <CustomInput
              control={control}
              name="phone_no"
              validationRules={{
                required: { value: true, message: 'Phone number is required' },
                maxLength: {
                  value: 10,
                  message: 'Please enter a valid 10 digit phone number',
                },
                minLength: {
                  value: 10,
                  message: 'Please enter a valid 10 digit phone number',
                },
                pattern: {
                  value: /^(?:\+?91|0)?[789]\d{9}$/,
                  message: 'Invalid phone number',
                },
              }}
              placeholder={'Phone Number'}
              // label={"Phone Number"}
              errors={errors}
              keyboardType="numeric"
            />
            <CustomInput
              control={control}
              name="password"
              validationRules={{
                required: { value: true, message: 'Password is required' },
              }}
              placeholder={'Password'}
              errors={errors}
              keyboardType="text"
            />

            <Button
              loading={isLoading}
              style={{ marginTop: 5, padding: 2, borderRadius: 4 }}
              mode="contained"
              color="#213190"
              onPress={handleSubmit(onSubmit)}
            >
              Login{' '}
            </Button>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }}
            >
              <Text
                style={{ color: '#005b96' }}
                onPress={() => navigation.push('LoginUsingMPin')}
              >
                Login Using Pin?
              </Text>
              <Text
                style={{ color: '#005b96' }}
                onPress={() => navigation.push('SignUp')}
              >
                New user? Register
              </Text>
            </View>
            {/* <View style={{ alignItems: 'flex-end' }}>

            </View> */}
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default Login;

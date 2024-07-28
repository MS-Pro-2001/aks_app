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
import React, { useContext, useState } from 'react';

import { Button, HelperText, TextInput } from 'react-native-paper';

import { Controller, useForm } from 'react-hook-form';
import { useLoginUserMutation } from '../../store/apis/user';
import { AuthContext } from '../../context/authContext/AuthContext';
// import CustomSnackBar from '../../components/common/CustomSnackbar';

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
  const { loginUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isPinSet] = useState(false);
  // const [isVisible, setIsVisible] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
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
    setIsLoading(false);
    // setIsVisible(true);
    if (res?.data) {
      Alert.alert('Message', 'Logged In Successfully', [
        {
          text: 'OK',
          onPress: () => {
            loginUser(res?.data?.user);
          },
        },
      ]);
    } else {
      Alert.alert('Error', `${res?.error?.data?.msg}`, [
        {
          text: 'OK',
        },
      ]);
    }
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
              {isPinSet && (
                <Text
                  style={{ color: '#005b96' }}
                  onPress={() => navigation.push('LoginUsingMPin')}
                >
                  Login Using Pin?
                </Text>
              )}
              <Text
                style={{ color: '#005b96' }}
                onPress={() => {
                  navigation.navigate('SignUp');
                }}
              >
                New user? Register
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
      {/* <CustomSnackBar
        message={'Logged In Successful'}
        onClose={() => {
          reset();
        }}
        visible={isVisible}
      /> */}
    </>
  );
};

export default Login;

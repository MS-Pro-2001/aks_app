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
import React, { useState } from 'react';

import { Button, HelperText, TextInput } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';

import { Controller, useForm } from 'react-hook-form';

import { SelectList } from 'react-native-dropdown-select-list';
import { useRegisterUserMutation } from '../../store/apis/user';

const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: 'center',
  },
  headingContainer: {
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

const SignUp = ({ navigation }) => {
  const [date, setDate] = useState(new Date());

  const [isLoading, setIsLoading] = useState(false);

  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selected, setSelected] = React.useState('');
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    clearErrors,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      phone_no: '',
      ward: '',
    },
  });

  const [registerUser, { isLoading: isRegisterUserLoading }] =
    useRegisterUserMutation();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const payload = { ...data, ward: selected };
    console.log('asaaaa', payload);

    const res = await registerUser(payload);
    console.log({ res });
  };

  const data = [
    { key: '1', value: 'Bopal' },
    { key: '2', value: 'Bapunagar' },
    { key: '3', value: 'Ghatlodiya' },
    { key: '4', value: 'Krishnanagar' },
    { key: '5', value: 'Maninagar' },
    { key: '6', value: 'Naroda' },
    { key: '7', value: 'Nirnaynagar' },
    { key: '8', value: 'Nirnaynagar' },
    { key: '9', value: 'Noblenagar' },
    { key: '10', value: 'Odhav' },
    { key: '11', value: 'Sabarmati' },
    { key: '12', value: 'Sabarmati' },
    { key: '13', value: 'Thaltej' },
    { key: '14', value: 'Vastrapur' },
    { key: '15', value: 'Vejalpur' },
  ];

  return (
    <>
      <View style={styles.headingContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/aks_logo.png')}
        />

        <Text style={styles.heading}>Register</Text>
      </View>

      <ScrollView>
        <SafeAreaView>
          <View style={styles.container}>
            <CustomInput
              control={control}
              name="firstName"
              validationRules={{
                required: { value: true, message: 'First name is required' },
              }}
              placeholder={'First Name'}
              // label={"First Name"}
              errors={errors}
            />

            <CustomInput
              control={control}
              name="lastName"
              validationRules={{
                required: { value: true, message: 'Last name is required' },
              }}
              placeholder={'Last Name'}
              // label={"Last Name"}
              errors={errors}
            />

            <CustomInput
              control={control}
              name="address"
              validationRules={{
                required: { value: true, message: 'Address is required' },
              }}
              placeholder={'Address'}
              // label={"Address"}
              errors={errors}
              multiline={true}
            />

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
            <SelectList
              setSelected={(val) => {
                setSelected(val);
              }}
              data={data}
              save="value"
              placeholder="Please select a Ward"
              search={false}
              inputStyles={{ color: '#005b96' }}
              dropdownTextStyles={{ color: '#005b96' }}
              boxStyles={{ marginBottom: 20, height: 50, color: '#005b96' }}
            />

            {/* <CustomInput
                control={control}
                name="ward"
                validationRules={{
                  required: { value: true, message: "Ward name is required" },
                }}
                placeholder={"Ward"}
                // label={"Ward"}
                errors={errors}
              /> */}

            <CustomInput
              control={control}
              name="dob"
              validationRules={{
                required: { value: true, message: 'Date of birth is required' },
                pattern: {
                  value: /^\d{2}-\d{2}-\d{4}$/,
                  message: 'Date of birth should of format DD-MM-YYYY',
                },
              }}
              inputTextIcon={
                <TextInput.Icon
                  icon="calendar-range"
                  onPress={() => setOpenDatePicker(true)}
                />
              }
              placeholder={'Date of birth'}
              errors={errors}
              setOpenDatePicker={setOpenDatePicker}
              readonly={true}
            />
            {/* <Text style={{ color: '#005b96', fontSize: 10 }}>DD-MM-YYYY</Text> */}

            <Button
              loading={isLoading}
              style={{ marginTop: 5, padding: 2, borderRadius: 4 }}
              mode="contained"
              color="#213190"
              onPress={handleSubmit(onSubmit)}
            >
              Submit{' '}
            </Button>
            <View style={{ alignItems: 'flex-end' }}>
              <Text
                style={{ margin: 10, color: '#005b96' }}
                onPress={() => navigation.push('SignIn')}
              >
                Already a user? Login
              </Text>
            </View>
          </View>

          <DatePicker
            theme="light"
            mode="date"
            modal
            open={openDatePicker}
            date={date}
            onConfirm={() => {
              setOpenDatePicker(false);
              setDate(date);
              // const formattedDate = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()
              const extractedDate = date.toISOString().split('T')[0].split('-');
              const customDate =
                extractedDate[2] +
                '-' +
                extractedDate[1] +
                '-' +
                extractedDate[0];

              setValue('dob', customDate);
              clearErrors('dob');
            }}
            onCancel={() => {
              setOpenDatePicker(false);
            }}
          />
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default SignUp;

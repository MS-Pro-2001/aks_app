/* eslint-disable react-native/no-inline-styles */
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { Button, HelperText, TextInput } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
// import PhoneInput from 'react-native-phone-number-input';
// import CustomPhoneInput from '../components/CustomPhoneInput';
import { Controller, useForm } from 'react-hook-form';

import { useFocusEffect } from '@react-navigation/native';
import { useUpdateUserMutation } from '../../store/apis/user';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/user';

const styles = StyleSheet.create({
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
    width: 60,
    borderRadius: 50,
    height: 60,
    marginTop: 20,
    objectFit: 'cover',
  },
});

const CustomInput = ({
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
  updateProfileStatus,
  inputTextIcon,
  ...props
}) => {
  return (
    <>
      <Controller
        control={control}
        rules={validationRules}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <TextInput
              disabled={!updateProfileStatus}
              readonly={readonly}
              mode="outlined"
              multiline={multiline}
              keyboardType={keyboardType}
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              theme={{ colors: { primary: '#213190' } }}
              //   label={label}
              error={!!errors[name] && Object.keys(errors[name])?.length !== 0}
              right={inputTextIcon}
              {...props}
            />
          );
        }}
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

const UserProfile = ({ navigation }) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const [updateProfileStatus, setUpdateProfileStatus] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setUpdateProfileStatus(false);
      return () => {
        // Cleanup if necessary
      };
    }, [])
  );

  const { currentUserInfo } = useSelector(userSelector);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({
    defaultValues: {
      firstName: currentUserInfo?.firstName,
      lastName: currentUserInfo?.lastName,
      address: currentUserInfo?.address,
      phone_no: currentUserInfo?.phone_no,
      ward: currentUserInfo?.ward,
      dob: currentUserInfo?.dob,
    },
  });

  // const [fetchSingleUser, { data, isLoading }] = useGetSingleUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const onSubmit = async (formData) => {
    const body = { ...formData, user_id: currentUserInfo?._id };
    const res = await updateUser(body);
    console.log({ res: res });
    const updatedData = res?.data?.user;
    if (res?.data?.user) {
      setValue('firstName', updatedData?.firstName || ''); // Set firstName default value
      setValue('lastName', updatedData?.lastName || ''); // Set lastName default value
      setValue('address', updatedData?.address || ''); // Set address default value
      setValue('phone_no', updatedData?.phone_no || ''); // Set phoneNumber default value
      setValue('ward', updatedData?.ward || ''); // Set ward default value
      setValue('dob', updatedData?.dob || ''); // Set dob default value
      Alert.alert('Message', 'Profile Updated SuccessFully', [{ text: 'OK' }]);
      setUpdateProfileStatus(false);
    } else {
      Alert.alert('Message', res?.error?.data?.msg, [{ text: 'OK' }]);
    }
  };

  return (
    <>
      <ScrollView>
        <SafeAreaView>
          <View style={styles.container}>
            <CustomInput
              updateProfileStatus={updateProfileStatus}
              dValue={'hello'}
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
              updateProfileStatus={updateProfileStatus}
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
              updateProfileStatus={updateProfileStatus}
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
              updateProfileStatus={updateProfileStatus}
              control={control}
              name="phone_no"
              validationRules={{
                required: {
                  value: true,
                  message: 'Phone number is required',
                },
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
              updateProfileStatus={updateProfileStatus}
              control={control}
              name="ward"
              validationRules={{
                required: { value: true, message: 'Ward name is required' },
              }}
              placeholder={'Ward'}
              // label={"Ward"}
              errors={errors}
            />

            <CustomInput
              updateProfileStatus={updateProfileStatus}
              control={control}
              name="dob"
              validationRules={{
                required: {
                  value: true,
                  message: 'Date of birth is required',
                },
                pattern: {
                  value: /^\d{2}-\d{2}-\d{4}$/,
                  message: 'Date of birth should of format DD-MM-YYYY',
                },
              }}
              inputTextIcon={
                <TextInput.Icon
                  icon="calendar-range"
                  disabled={!updateProfileStatus}
                  onPress={() => setOpenDatePicker(true)}
                />
              }
              placeholder={'Date of birth'}
              // label={"Date of birth"}
              errors={errors}
              setOpenDatePicker={setOpenDatePicker}
              readonly={true}
              editable={false}
            />

            {updateProfileStatus ? (
              <Button
                loading={false}
                style={{ marginTop: 5, padding: 2, borderRadius: 4 }}
                mode="contained"
                color="#213190"
                onPress={handleSubmit(onSubmit)}
              >
                Submit
              </Button>
            ) : (
              <Button
                loading={false}
                style={{ marginTop: 5, padding: 2, borderRadius: 4 }}
                mode="contained"
                color="#213190"
                onPress={() => setUpdateProfileStatus(true)}
              >
                Update details
              </Button>
            )}
          </View>

          <DatePicker
            theme="light"
            mode="date"
            modal
            open={openDatePicker}
            placeholder="DD-MM-YYYY"
            date={new Date()}
            onConfirm={(inputDate) => {
              const extractedDate = inputDate
                .toISOString()
                .split('T')[0]
                .split('-');
              const customDate =
                extractedDate[2] +
                '-' +
                extractedDate[1] +
                '-' +
                extractedDate[0];

              setOpenDatePicker(false);
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

export default UserProfile;

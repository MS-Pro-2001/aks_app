/* eslint-disable react-native/no-inline-styles */
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Text,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  HelperText,
  TextInput,
} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { Controller, useForm } from 'react-hook-form';

import { useFocusEffect } from '@react-navigation/native';
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from '../../store/apis/user';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/user';
import { AuthContext } from '../../context/authContext/AuthContext';
import { SelectList } from 'react-native-dropdown-select-list';

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
    fontSize: 22,
  },
  container: {
    margin: 10,
    padding: 5,
  },
  subHeading: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
  },
  text: {
    marginVertical: 2,
    fontSize: 18,
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

const wardData = [
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

const UserProfile = ({ navigation }) => {
  const { isUserLoggedIn } = useContext(AuthContext);
  console.log('$%%%%%%%%%%%%%%', { isUserLoggedIn });
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selected, setSelected] = React.useState('');

  const [updateProfileStatus, setUpdateProfileStatus] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setUpdateProfileStatus(false);
      return () => {
        // Cleanup if necessary
      };
    }, [])
  );

  const { _id: userId } = JSON.parse(isUserLoggedIn);

  const { data, isLoading, isFetching } = useGetSingleUserQuery(
    { _id: userId },
    { skip: !userId, refetchOnMountOrArgChange: true }
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm();

  useEffect(() => {
    if (data) {
      setValue('firstName', data?.firstName || '');
      setValue('lastName', data?.lastName || '');
      setValue('address', data?.address || '');
      setValue('phone_no', data?.phone_no || '');
      setValue('ward', data?.ward || '');
      setValue('dob', data?.dob || '');
    }
  }, [data, setValue]);

  const [updateUser, { data: updateUserData }] = useUpdateUserMutation();

  // console.log('22222222', { updateUserData });

  const onSubmit = async (formData) => {
    const body = { ...formData, user_id: data?._id, ward: selected };
    const res = await updateUser(body);

    const updatedData = res?.data?.user;
    // console.log('111111111', updatedData);
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

  if (isLoading || isFetching) {
    return (
      <ActivityIndicator
        size={'large'}
        style={{ marginTop: 100, display: `${isLoading ? '' : 'none'}` }}
      />
    );
  }

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.container}>
          {updateProfileStatus ? (
            <>
              <CustomInput
                updateProfileStatus={updateProfileStatus}
                control={control}
                name="firstName"
                validationRules={{
                  required: { value: true, message: 'First name is required' },
                }}
                placeholder={'First Name'}
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
                errors={errors}
                keyboardType="numeric"
              />
              <SelectList
                setSelected={(val) => {
                  setSelected(val);
                }}
                data={wardData}
                save="value"
                placeholder="Please select a Ward"
                search={false}
                inputStyles={{ color: '#005b96' }}
                dropdownTextStyles={{ color: '#005b96' }}
                boxStyles={{ marginBottom: 20, height: 50, color: '#005b96' }}
              />
              <CustomInput
                updateProfileStatus={updateProfileStatus}
                control={control}
                name="ward"
                validationRules={{
                  required: { value: true, message: 'Ward name is required' },
                }}
                placeholder={'Ward'}
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
                errors={errors}
                setOpenDatePicker={setOpenDatePicker}
                readonly={true}
                editable={false}
              />
              <Button
                loading={false}
                style={{ marginTop: 5, padding: 2, borderRadius: 4 }}
                mode="contained"
                color="#213190"
                onPress={handleSubmit(onSubmit)}
              >
                Submit
              </Button>
              <Button
                style={{ marginTop: 5, padding: 2, borderRadius: 4 }}
                mode="contained"
                color="#213190"
                onPress={() => setUpdateProfileStatus(false)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Text style={styles.subHeading}>Name</Text>
              <Text style={styles.text}>
                {data?.firstName || updateUserData?.firstName}{' '}
                {data?.lastName || updateUserData?.lastName}
              </Text>
              <Text style={styles.subHeading}>Address</Text>
              <Text style={styles.text}>{data?.address}</Text>
              <Text style={styles.subHeading}>Phone Number</Text>
              <Text style={styles.text}>{data?.phone_no}</Text>
              <Text style={styles.subHeading}>Ward</Text>
              <Text style={styles.text}>{data?.ward}</Text>
              <Text style={styles.subHeading}>Date of Birth</Text>
              <Text style={styles.text}>{data?.dob}</Text>
              <Button
                loading={false}
                style={{ marginTop: 35, padding: 2, borderRadius: 4 }}
                mode="contained"
                color="#213190"
                onPress={() => setUpdateProfileStatus(true)}
              >
                Update details
              </Button>
            </>
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
  );
};

export default UserProfile;

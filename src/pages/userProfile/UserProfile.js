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
import { useUpdateUserMutation } from '../../store/apis/user';
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
  const { userData } = useContext(AuthContext);
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

  // const { _id: userId } = JSON.parse(isUserLoggedIn);

  // const { data, isLoading, isFetching } = useGetSingleUserQuery(
  //   { _id: userId },
  //   { skip: !userId, refetchOnMountOrArgChange: true }
  // );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm();

  useEffect(() => {
    if (userData) {
      setValue('firstName', userData?.firstName || '');
      setValue('lastName', userData?.lastName || '');
      setValue('address', userData?.address || '');
      setValue('phone_no', userData?.phone_no || '');
      setValue('ward', userData?.ward || 'Bopal');
      setValue('dob', userData?.dob || '');
    }
  }, [setValue, userData]);

  const [updateUser, { data: updateUserData }] = useUpdateUserMutation();

  console.log({ selected });
  const onSubmit = async (formData) => {
    const body = { ...formData, user_id: userData?._id, ward: selected };
    const res = await updateUser(body);

    const updatedData = res?.data?.user;
    // console.log('111111111', updatedData);
    if (res?.data?.user) {
      setValue(
        'firstName',
        updateUserData?.user?.firstName || updatedData?.firstName
      ); // Set firstName default value
      setValue(
        'lastName',
        updateUserData?.user?.lastName || updatedData?.lastName
      ); // Set lastName default value
      setValue(
        'address',
        updateUserData?.user?.address || updatedData?.address
      ); // Set address default value
      setValue(
        'phone_no',
        updateUserData?.user?.phone_no || updatedData?.phone_no
      ); // Set phoneNumber default value
      setValue('ward', updateUserData?.user?.ward || updatedData?.ward); // Set ward default value
      setValue('dob', updateUserData?.user?.dob || updatedData?.dob); // Set dob default value
      Alert.alert('Message', 'Profile Updated SuccessFully', [{ text: 'OK' }]);
      setUpdateProfileStatus(false);
    } else {
      Alert.alert('Message', res?.error?.data?.msg, [{ text: 'OK' }]);
    }
  };

  if (!userData) {
    return (
      <ActivityIndicator
        size={'large'}
        style={{ marginTop: 100, display: `${!userData ? '' : 'none'}` }}
      />
    );
  }

  const userProfileData = [
    {
      label: 'First Name',
      name: 'firstName',
      props: {
        validationRules: {
          required: { value: true, message: 'First name is required' },
        },
      },
      // placeholder:'', use label instead
      type: 'input',
    },
    {
      label: 'Last Name',
      name: 'lastName',
      props: {
        validationRules: {
          required: { value: true, message: 'Last name is required' },
        },
      },
      type: 'input',
    },
    {
      label: 'Address',
      name: 'address',
      props: {
        validationRules: {
          required: { value: true, message: 'Address is required' },
        },
      },
      type: 'input',
    },
    {
      label: 'Phone Number',
      name: 'phone_no',
      props: {
        validationRules: {
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
        },
      },
      type: 'input',
    },
    {
      label: 'Please select a ward',
      name: '',
      props: {},
      type: 'selectList',
    },
    // {
    //   label: 'Ward',
    //   name: 'ward',
    //   props: {
    //     validationRules: {
    //       required: { value: true, message: 'Ward name is required' },
    //     },
    //   },
    //   type: 'input',
    // },
    {
      label: 'Date of Birth',
      name: 'dob',
      props: {
        validationRules: {
          required: {
            value: true,
            message: 'Date of birth is required',
          },
          pattern: {
            value: /^\d{2}-\d{2}-\d{4}$/,
            message: 'Date of birth should of format DD-MM-YYYY',
          },
        },
        inputTextIcon: (
          <TextInput.Icon
            icon="calendar-range"
            disabled={!updateProfileStatus}
            onPress={() => setOpenDatePicker(true)}
          />
        ),
        setOpenDatePicker: setOpenDatePicker,
        readonly: true,
        editable: false,
      },
      type: 'input',
    },
  ];

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.container}>
          {updateProfileStatus ? (
            <>
              {userProfileData?.map((item, index) => (
                <View key={index}>
                  <Text style={{ fontSize: 15, marginLeft: 2 }}>
                    {item.label}
                  </Text>
                  {item?.type === 'selectList' ? (
                    <SelectList
                      setSelected={(val) => {
                        setSelected(val);
                      }}
                      data={wardData}
                      save="value"
                      defaultOption={'Bopal'}
                      placeholder="Please select a Ward"
                      search={false}
                      inputStyles={{ color: '#005b96' }}
                      dropdownTextStyles={{ color: '#005b96' }}
                      boxStyles={{
                        marginBottom: 20,
                        height: 50,
                        color: '#005b96',
                      }}
                    />
                  ) : (
                    <CustomInput
                      updateProfileStatus={updateProfileStatus}
                      control={control}
                      name={item.name}
                      validationRules={item.props.validationRules}
                      placeholder={item.label}
                      errors={errors}
                      {...item.props}
                    />
                  )}
                </View>
              ))}

              <View
                style={{
                  flex: 1,
                  border: '1px solid red',
                  flexDirection: 'row-reverse',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <Button
                  loading={false}
                  style={{ marginTop: 5, padding: 2, borderRadius: 4, flex: 1 }}
                  mode="contained"
                  color="#213190"
                  onPress={handleSubmit(onSubmit)}
                >
                  Submit
                </Button>
                <Button
                  style={{ marginTop: 5, padding: 2, borderRadius: 4, flex: 1 }}
                  mode="contained"
                  color="#213190"
                  onPress={() => setUpdateProfileStatus(false)}
                >
                  Cancel
                </Button>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.subHeading}>Name</Text>
              <Text style={styles.text}>
                {updateUserData?.user?.firstName || userData?.firstName}{' '}
                {updateUserData?.user?.lastName || userData?.lastName}
              </Text>
              <Text style={styles.subHeading}>Address</Text>
              <Text style={styles.text}>
                {' '}
                {updateUserData?.user?.address || userData?.address}
              </Text>
              <Text style={styles.subHeading}>Phone Number</Text>
              <Text style={styles.text}>
                {' '}
                {updateUserData?.user?.phone_no || userData?.phone_no}
              </Text>
              <Text style={styles.subHeading}>Ward</Text>
              <Text style={styles.text}>
                {' '}
                {updateUserData?.user?.ward || userData?.ward}
              </Text>
              <Text style={styles.subHeading}>Date of Birth</Text>
              <Text style={styles.text}>
                {' '}
                {updateUserData?.user?.dob || userData?.dob}
              </Text>
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

/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionSheet from 'react-native-actions-sheet';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { CustomInput } from '../signUp/SignUp';
import {
  useAddFamilyDetailsMutation,
  useFetchFamilyDetailsQuery,
} from '../../store/apis/familyDetails';
import DatePicker from 'react-native-date-picker';
import { AuthContext } from '../../context/authContext/AuthContext';

// Family member card component
export const FamilyMemberCard = ({ member }) => (
  <View style={styles.card}>
    <Text style={styles.name}>{member?.name_of_member}</Text>
    <Text style={styles.info}>Date of Birth: {member?.dob}</Text>
    <Text style={styles.info}>
      Relationship: {member?.relationship_with_user}
    </Text>
  </View>
);

// Main FamilyDetails component
const FamilyDetails = () => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({
    defaultValues: { name_of_member: '', dob: '', relationship_with_user: '' },
  });
  const actionSheetRef = useRef();

  const { userData } = useContext(AuthContext);

  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { data, refetch, isLoading } = useFetchFamilyDetailsQuery(
    { id: userData?._id },
    { skip: !userData?._id, refetchOnMountOrArgChange: true }
  );

  // console.log({ data });

  // const [familyMembers, setFamilyMembers] = useState(data ? [...data] : []);

  const [addFamilyMember, { isLoading: isAddFamilyMemberLoading, isFetching }] =
    useAddFamilyDetailsMutation();

  const showActionSheet = () => {
    actionSheetRef.current?.show();
  };
  const hideActionSheet = () => {
    actionSheetRef.current?.hide();
  };

  const onSubmit = async (formData) => {
    const body = {
      ...formData,
      user_id: userData?._id,
    };
    // setFamilyMembers((prev) => [body, ...prev]);
    const res = await addFamilyMember(body);
    if (res?.data) {
      Alert.alert('Message', 'Registeration Successful', [
        {
          text: 'OK',
          onPress: () => {
            reset();
            hideActionSheet();
            console.log(`Family Member added by ${userData?.firstName}`, {
              res,
            });
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

  const handleRefresh = () => {
    setRefreshing(true);
    refetch();
    // setFamilyMembers([...data]);
    setRefreshing(false);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#005b96']}
          />
        }
      >
        {data?.length === 0 && (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text
              style={{
                textAlign: 'center',

                fontSize: 15,
              }}
            >
              Click on the Add button to start adding family members
            </Text>
          </View>
        )}
        {isLoading || refreshing ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#005b96" />
          </View>
        ) : (
          data?.map((member, index) => (
            <FamilyMemberCard key={index} member={member} />
          ))
        )}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={showActionSheet}>
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>

      <ActionSheet ref={actionSheetRef}>
        <View>
          <Text style={{ fontSize: 20, margin: 10, textAlign: 'center' }}>
            Enter Member Details
          </Text>
        </View>
        <View style={{ margin: 10 }}>
          <CustomInput
            control={control}
            name="name_of_member"
            validationRules={{
              required: { value: true, message: 'Member name is required' },
            }}
            placeholder={'Member Name'}
            // label={"First Name"}
            errors={errors}
          />
          <CustomInput
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
                onPress={() => setOpenDatePicker(true)}
              />
            }
            placeholder={'Date of  Birth'}
            errors={errors}
            setOpenDatePicker={setOpenDatePicker}
            readonly={true}
            editable={false}
          />
          <CustomInput
            control={control}
            name="relationship_with_user"
            validationRules={{
              required: { value: true, message: 'Relationship is required' },
            }}
            placeholder={'Relationship with the member'}
            // label={"First Name"}
            errors={errors}
          />
        </View>
        <Button
          loading={isAddFamilyMemberLoading || isFetching}
          style={{ margin: 10, padding: 2, borderRadius: 4 }}
          mode="contained"
          color="#213190"
          onPress={handleSubmit(onSubmit)}
        >
          + Add Member
        </Button>
        {/* <Button
          loading={false}
          style={{ margin: 10, padding: 2, borderRadius: 4 }}
          mode="contained"
          color="#213190"
          onPress={() => actionSheetRef.current?.hide()}
        >
          Cancel
        </Button> */}
      </ActionSheet>
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
            extractedDate[2] + '-' + extractedDate[1] + '-' + extractedDate[0];

          setOpenDatePicker(false);
          setValue('dob', customDate);
          clearErrors('dob');
        }}
        onCancel={() => {
          setOpenDatePicker(false);
        }}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#e6f7ff',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#005b96',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#005b96',
  },
  info: {
    fontSize: 16,
    color: '#444',
    marginBottom: 5,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    backgroundColor: '#005b96',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  actionSheetContent: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  actionButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  actionButtonText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#005b96',
  },
  cancelButton: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  cancelButtonText: {
    color: 'red',
  },
});

export default FamilyDetails;

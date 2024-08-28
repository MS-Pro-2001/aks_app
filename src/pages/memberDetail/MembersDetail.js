/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { ActivityIndicator, Card, Title, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/user';
import { useGetSingleUserQuery } from '../../store/apis/user';
import { FamilyMemberCard } from './../familyDetails/FamilyDetails';

const MembersDetail = ({ navigation, route }) => {
  const { isUserLoggedIn } = useSelector(userSelector);

  const theme = useTheme();
  const userId = route?.params?.user_id;

  const { data, isLoading, isFetching } = useGetSingleUserQuery(
    { _id: userId },
    { skip: !userId, refetchOnMountOrArgChange: true }
  );

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingVertical: 20,
      paddingHorizontal: 10,
    },
    card: {
      width: '100%',
      padding: 10,
      borderRadius: 10,
      elevation: 3,
      marginVertical: 10,
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: 10,
      marginBottom: 10,
      objectFit: 'fill',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.primary,
      marginBottom: 10,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 5,
    },
    key: {
      fontSize: 15,
      fontWeight: 'bold',
      color: theme.colors.primary,
      flex: 1,
    },
    value: {
      color: theme.colors.primary,
      flex: 2,
      textAlign: 'right',
    },
    familyContainer: {
      marginTop: 20,
    },
    familyTitle: {
      fontSize: 25,
      textAlign: 'center',
      marginBottom: 10,
    },
  });

  if (isLoading || isFetching) {
    return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.familyTitle, { marginBottom: 0 }]}>
          Personal Details
        </Text>
        <Card style={styles.card}>
          <Image
            source={
              data?.familyPhoto
                ? { uri: data?.familyPhoto }
                : require('../../assets/images/No_Image_Available.jpg')
            }
            style={styles.image}
          />
          <Card.Content>
            <Title style={styles.title}>
              {data?.firstName} {data?.lastName}
            </Title>
            <View style={styles.detailRow}>
              <Text style={styles.key}>Phone:</Text>
              <Text style={styles.value}>{data?.phone_no}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.key}>Address:</Text>
              <Text style={styles.value}>{data?.address}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.key}>Ward:</Text>
              <Text style={styles.value}>{data?.ward}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.key}>Date of Birth:</Text>
              <Text style={styles.value}>{data?.dob}</Text>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.familyContainer}>
          <Text style={styles.familyTitle}>Family Details</Text>
          {data?.familyDetails?.map((member, index) => (
            <FamilyMemberCard key={index} member={member} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MembersDetail;

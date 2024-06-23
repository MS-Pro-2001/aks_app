import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Card, Title, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/user';

const MembersDetail = ({ route }) => {
  const { allUsers } = useSelector(userSelector);
  const theme = useTheme();
  const user = allUsers.find((item) => item?._id === route?.params?.user_id);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 20, // Optional: Adds vertical padding to the ScrollView
    },
    card: {
      width: '90%', // Adjust this to control the card width
      padding: 10,
      borderRadius: 10,
      elevation: 3,
      marginTop: 50,
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
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Image
          source={
            user.familyPhoto
              ? {
                  uri: user.familyPhoto,
                }
              : require('../../assets/images/No_Image_Available.jpg')
          }
          style={styles.image}
        />
        <Card.Content>
          <Title style={styles.title}>
            {user.firstName} {user.lastName}
          </Title>
          <View style={styles.detailRow}>
            <Text style={styles.key}>Phone:</Text>
            <Text style={styles.value}>{user.phone_no}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.key}>Address:</Text>
            <Text style={styles.value}>{user.address}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.key}>Ward:</Text>
            <Text style={styles.value}>{user.ward}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.key}>Date of Birth:</Text>
            <Text style={styles.value}>{user.dob}</Text>
          </View>
          {/* <View style={styles.detailRow}>
            <Text style={styles.key}>Created At:</Text>
            <Text style={styles.value}>
              {new Date(user.createdAt).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.key}>Updated At:</Text>
            <Text style={styles.value}>
              {new Date(user.updatedAt).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.key}>Family Details:</Text>
            <Text style={styles.value}>{user.familyDetails.join(', ')}</Text>
          </View> */}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default MembersDetail;

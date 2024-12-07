import React, { useContext } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';
import { useUploadFamilyPhotoMutation } from '../store/apis/familyDetails';
import { AuthContext } from '../context/authContext/AuthContext';
import { ActivityIndicator } from 'react-native-paper';

const UploadPhoto = ({ userData }) => {
  const [uploadFamilyPhoto, { isLoading }] = useUploadFamilyPhotoMutation();

  const { globalUserData } = useContext(AuthContext);

  const getCurrentUserData = globalUserData?.find(
    (item) => item?._id === userData?._id
  );

  console.log({ getCurrentUserData });

  if (isLoading) {
    return (
      <ActivityIndicator
        size={'large'}
        style={{ display: `${isLoading ? '' : 'none'}` }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          launchImageLibrary(
            {
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 600, // Increase height
              maxWidth: 600, // Increase width
              quality: 1, // Set quality to 1 for the best resolution
            },
            async (res) => {
              const result = await uploadFamilyPhoto({
                userId: userData?._id,
                body: res.assets[0],
              });
              console.log({ result });
            }
          )
        }
      >
        <Image
          source={
            getCurrentUserData?.familyPhoto
              ? { uri: getCurrentUserData?.familyPhoto }
              : require('../assets/images/No_Image_Available.jpg')
          }
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: 320, // Let the height adjust proportionally
    aspectRatio: 1, // Maintain aspect ratio for better quality
    borderRadius: 10,
    marginBottom: 10,
  },
});

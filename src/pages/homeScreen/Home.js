/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View } from 'react-native';

export function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{ color: 'black' }}
        onPress={() => navigation.navigate('Details')}
      >
        Home Screen
      </Text>
    </View>
  );
}

/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { Snackbar } from 'react-native-paper';

const CustomSnackBar = ({ message, onClose, visible }) => {
  return (
    <Snackbar
      style={{ backgroundColor: 'green', marginBottom: 30 }}
      visible={visible}
      onDismiss={onClose}
      // action={{
      //   label: 'Undo',
      //   onPress: () => {
      //     // Do something
      //   },
      // }}
    >
      {message}
    </Snackbar>
  );
};

export default CustomSnackBar;

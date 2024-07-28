import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUserInfo } from '../../store/user';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [mPin, setMpin] = useState(null);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const userCred = await AsyncStorage.getItem('userData');
      const pin = await AsyncStorage.getItem('mpin');
      setMpin(pin);
      dispatch(setCurrentUserInfo(JSON.parse(userCred)));
      setIsUserLoggedIn(JSON.parse(userCred));
      console.log({ userCred });
    };
    checkUserLoggedIn();
    setIsLoading(false);
  }, [dispatch]);

  const logoutUser = async () => {
    const data = { ...isUserLoggedIn, logout: true };
    await AsyncStorage.setItem('userData', data);
    setIsUserLoggedIn({});
  };

  const loginUser = async (userData) => {
    const data = { ...userData, logout: false };
    await AsyncStorage.setItem('userData', data);
    setIsUserLoggedIn(data);
  };

  const handleMpin = async (mpin) => {
    await AsyncStorage.setItem('mpin', mpin);
    setMpin(mpin);
  };

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        mPin,
        logoutUser,
        loginUser,
        handleMpin,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState } from 'react';

// if user logged in
//  if user not logged in

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [mPin, setMPin] = useState(null);

  // useEffect(() => {
  //   const checkUserLoggedIn = async () => {
  //     const userCred = await AsyncStorage.getItem('userData');

  //   //   console.log('LLLL', JSON.parse(userCred));
  //   //   const pin = await AsyncStorage.getItem('mpin');
  //   //   if (!userCred) {
  //   //     setMPin(null);
  //   //   } else {
  //   //     setMPin(pin);
  //   //   }
  //   //   dispatch(setCurrentUserInfo(JSON.parse(userCred)));
  //   //   setIsUserLoggedIn(JSON.parse(userCred));
  //   // };
  //   // checkUserLoggedIn();
  //   // setIsLoading(false);
  // }, [dispatch]);

  const logoutUser = async () => {
    const data = { ...isUserLoggedIn, logout: true };
    await AsyncStorage.setItem('userData', data);
    setIsUserLoggedIn({});
  };

  // if user signUp or Login this will run
  const loginUser = async (data) => {
    await AsyncStorage.setItem('userData', JSON.stringify(data));
    setUserData(data);
    setIsUserLoggedIn(true);
  };

  const handleMPin = async (pin) => {
    await AsyncStorage.setItem('mPin', pin);
    setMPin(pin);
  };

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        mPin,
        logoutUser,
        loginUser,
        handleMPin,
        isLoading,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

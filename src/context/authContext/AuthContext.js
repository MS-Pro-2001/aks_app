import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { useFetchAllUsersQuery } from '../../store/apis/user';

// if user logged in
//  if user not logged in

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const [globalUserData, setGlobalUserData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [mPin, setMPin] = useState(null);

  const { data: allUserData, isSuccess } = useFetchAllUsersQuery();

  useEffect(() => {
    if (isSuccess) {
      setGlobalUserData(allUserData);
    }
  }, [allUserData, isSuccess]);

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
    await AsyncStorage.removeItem('userData');
    setIsUserLoggedIn(false);
  };

  // if user signUp or Login this will run
  const loginUser = async (data) => {
    await AsyncStorage.setItem('userData', JSON.stringify(data));
    setUserData(data);
    setIsUserLoggedIn(true);
  };

  // const handleMPin = async (pin) => {
  //   await AsyncStorage.setItem('mPin', pin);
  //   setMPin(pin);
  // };

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const userCred = await AsyncStorage.getItem('userData');
      setUserData(JSON.parse(userCred));
      setIsUserLoggedIn(!!Object.keys(JSON.parse(userCred))?.length);

      // const pin = await AsyncStorage.getItem('mpin');
      // if (!userCred) {
      //   setMPin(null);
      // } else {
      //   setMPin(pin);
      // }
    };
    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        mPin,
        logoutUser,
        loginUser,
        // handleMPin,
        isLoading,
        userData,
        globalUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

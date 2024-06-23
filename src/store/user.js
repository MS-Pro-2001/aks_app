import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUserLoggedIn: false,
  MPin: { isSet: false, code: '' },
  currentUserInfo: {},
  allUsers: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state) => {
      state.isUserLoggedIn = true;
    },
    logOutUser: (state) => {
      state.isUserLoggedIn = false;
    },
    MPin: (state, payload) => {
      state.MPin = { ...state.MPin, code: payload };
    },
    setCurrentUserInfo: (state, payload) => {
      console.log(payload);
      state.currentUserInfo = {
        ...state.currentUserInfo,
        phoneNumber: payload.payload,
      };
    },
    setAllUsers: (state, payload) => {
      state.allUsers = payload.payload;
    },
  },
});

export const { loginUser, logOutUser, setAllUsers, setCurrentUserInfo } =
  userSlice.actions;
export const userSelector = (state) => {
  return state.user;
};

const userReducer = userSlice.reducer;
export default userReducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUserLoggedIn: false,
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
  },
});

export const { loginUser, logOutUser } = userSlice.actions;
export const userSelector = (state) => {
  return state.user;
};
console.log(userSelector);
const userReducer = userSlice.reducer;
export default userReducer;

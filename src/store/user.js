import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [1, 2, 3],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userData: (state, action) => {
      return [1, 2];
    },
  },
});

export const { userData } = userSlice.actions;
export const userSelector = (state) => state.data;
const user = userSlice.reducer;
export default user;

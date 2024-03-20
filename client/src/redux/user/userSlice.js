import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isOauth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.currentUser = action.payload;
    },
    signInOauth: (state, action) => {
      state.currentUser = action.payload;
      state.isOauth = true;
    },
    updateUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logOut: (state) => {
      state.isOauth = false;
      state.currentUser = null;
    },
  },
});

export const { signIn, signInOauth, updateUser, logOut } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  token: "",
};

const auth_slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    REMOVE_ACTIVE_USER: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    SET_STATUS(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_USER_TOKEN(state, action) {
      state.token = action.payload;
    },
  },
});

export const {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
  SET_STATUS,
  SET_USER_TOKEN,
} = auth_slice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const getUser = (state) => state.auth.user;
export const getUserToken = (state) => state.auth.token;

export default auth_slice.reducer;

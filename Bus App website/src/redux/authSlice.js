import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userRole: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userRole = action.payload.userRole;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userRole = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

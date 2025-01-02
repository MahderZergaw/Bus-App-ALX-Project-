import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import uiReducer from "./uiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, // Add your auth slice here
    ui: uiReducer,
  },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";

const initialTheme = localStorage.getItem("theme") === "dark";

const uiSlice = createSlice({
  name: "ui",
  initialState: { theme: initialTheme },
  reducers: {
    toggleTheme(state) {
      state.theme = !state.theme;
    },
  },
});

export const { toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: localStorage.getItem("isDarkMode") === "true",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newMode = !state.isDarkMode;
      state.isDarkMode = newMode;
      document.documentElement.classList.toggle("dark", newMode);
      localStorage.setItem("isDarkMode", newMode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;

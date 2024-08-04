import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface ThemeState {
  isDarkMode: boolean;
}

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDarkMode: false,
  } as ThemeState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const selectIsDarkMode = (state: RootState) => state.theme.isDarkMode;

export default themeSlice.reducer;

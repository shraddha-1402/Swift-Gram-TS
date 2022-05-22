import { createSlice } from "@reduxjs/toolkit";
import { Theme } from "../../types/types";

const { dark, light } = Theme.Mode;
const initialState: Theme.State = {
  // ONLY FOR REFERENCE NOT TO BE USED AS IT IS BAD PRACTICE
  // mode: (localStorage.getItem("theme") as keyof typeof ThemeMode) || Theme.Mode.dark,
  mode:
    localStorage.getItem("theme") === dark
      ? dark
      : localStorage.getItem("theme") === light
      ? light
      : dark,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      const newTheme = state.mode === light ? dark : light;
      localStorage.setItem("theme", newTheme);
      state.mode = newTheme;
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;

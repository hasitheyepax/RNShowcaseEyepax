import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface SettingsState {
  swipeToDeleteEnabled: boolean;
  showCompletedTodosEnabled: boolean;
}

const initialState: SettingsState = {
  swipeToDeleteEnabled: false,
  showCompletedTodosEnabled: false,
};

export const SettingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleSwipeToDeleteEnable: (state) => {
      state.swipeToDeleteEnabled = !state.swipeToDeleteEnabled;
    },
    toggleShowTodos: (state) => {
      state.showCompletedTodosEnabled = !state.showCompletedTodosEnabled;
    },
  },
});

export const { toggleSwipeToDeleteEnable, toggleShowTodos } =
  SettingsSlice.actions;

export const selectSwipeToDeleteEnabled = (state: RootState) =>
  state.settings.swipeToDeleteEnabled;
export const selectShowCompletedTodosEnabled = (state: RootState) =>
  state.settings.showCompletedTodosEnabled;

export default SettingsSlice.reducer;

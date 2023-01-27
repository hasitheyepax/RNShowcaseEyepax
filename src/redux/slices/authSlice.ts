import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthState {
  isLoggedIn: boolean;
  email: any;
}

const initialState: AuthState = {
  isLoggedIn: false,
  email: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, payload) => {
      state.isLoggedIn = true;
      state.email = payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = "";
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth.isLoggedIn;
export const selectAuthEmail = (state: RootState) => state.auth.email;

export default authSlice.reducer;

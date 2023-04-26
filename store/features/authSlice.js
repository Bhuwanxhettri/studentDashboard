import {
  auth,
  authLogout,
  clearToken,
  getToken,
  setToken,
} from "@/helper/token";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: getToken(),
  isLoggedIn: false,
  user: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.access_token;
      state.isLoggedIn = true;
      setToken(action.payload.access_token);
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      clearToken();
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

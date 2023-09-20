import { createSlice } from "@reduxjs/toolkit";
import { APP_TOKEN_KEY } from "../constants";

export interface I_AuthReducer {
  authLoading: boolean;
  isAuthenticated: boolean;
  user: {
    username?: string;
  };
}

const initialState = () => {
  // Process data if any !!

  var state: I_AuthReducer = {
    authLoading: true,
    isAuthenticated: false,
    user: {},
  };

  return state;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState(),
  reducers: {
    // extend the payload to be of type boolean
    ar_setLoading: (state, action: { payload: boolean }) => {
      state.authLoading = action.payload;
    },

    ar_login: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
      state.isAuthenticated = true;
      state.authLoading = false;
    },

    ar_logout: (state) => {
      localStorage.removeItem(APP_TOKEN_KEY);
      state.isAuthenticated = false;
      state.user = {};
    },
  },
});

export const { ar_setLoading, ar_login, ar_logout } = authSlice.actions;

export default authSlice.reducer;

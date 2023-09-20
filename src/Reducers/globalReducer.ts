import { createSlice } from "@reduxjs/toolkit";

export interface I_GlobalReducer {
  globalLoading: boolean;
  navbarTitle?: string[];
}

const initialState = () => {
  // Process data if any !!

  var state: I_GlobalReducer = {
    globalLoading: true,
    navbarTitle: [],
  };

  return state;
};

export const globalSlice = createSlice({
  name: "global",
  initialState: initialState(),
  reducers: {
    // extend the payload to be of type boolean
    gr_setLoading: (state, action: { payload: boolean }) => {
      state.globalLoading = action.payload;
    },
    gr_setNavbarTitle: (state, action: { payload: string[] }) => {
      state.navbarTitle = action.payload;
    }
  },
});

export const { gr_setLoading, gr_setNavbarTitle } = globalSlice.actions;

export default globalSlice.reducer;

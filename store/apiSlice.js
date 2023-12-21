import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shown: null,
};

export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setShown: (state, action) => {
      state.shown = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setShown } = apiSlice.actions;

export default apiSlice.reducer;

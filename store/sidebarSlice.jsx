import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarActive: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarActive = !state.isSidebarActive;
    },
    activateSidebar: (state) => {
      state.isSidebarActive = true;
    },
    deactivateSidebar: (state) => {
      state.isSidebarActive = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { activateSidebar, deactivateSidebar, toggleSidebar } =
  sidebarSlice.actions;

export default sidebarSlice.reducer;

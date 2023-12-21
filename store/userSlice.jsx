import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  id: null,
  username: null,
  profilePic: null,
  create_contract: false,
  manage_contracts: false,
  manage_members: false,
  manage_pages: false,
  manage_promocodes: false,
  view_reports: false,
  view_mail: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state) => {
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
    },
    setProfilePic: (state, action) => {
      state.profilePic = action.payload;
    },
    setID: (state, action) => {
      state.id = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    toggleCreateContract: (state) => {
      state.create_contract = true;
    },
    toggleManageContracts: (state) => {
      state.manage_contracts = true;
    },
    toggleManageMembers: (state) => {
      state.manage_members = true;
    },
    toggleManagePages: (state) => {
      state.manage_pages = true;
    },
    toggleManagePromocodes: (state) => {
      state.manage_promocodes = true;
    },
    toggleViewReports: (state) => {
      state.view_reports = true;
    },
    toggleViewMail: (state) => {
      state.view_mail = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loginUser,
  logoutUser,
  setUsername,
  setProfilePic,
  toggleCreateContract,
  toggleManageContracts,
  toggleManagePromocodes,
  toggleManageMembers,
  toggleManagePages,
  toggleViewReports,
  toggleViewMail,
  setID,
} = userSlice.actions;

export default userSlice.reducer;

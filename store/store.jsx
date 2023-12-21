import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import sidebarReducer from "./sidebarSlice";
import apiReducer from "./apiSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    sidebar: sidebarReducer,
    api: apiReducer,
  },
});

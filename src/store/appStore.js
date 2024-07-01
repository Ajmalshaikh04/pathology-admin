import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/auth/userSlice";
import labsReducer from "./features/labs/labsSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    labs: labsReducer,
  },
});

export default appStore;

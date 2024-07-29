import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/auth/userSlice";
import labsReducer from "./features/labs/labsSlice";
import franchiseReducer from "./features/franchise/franchiseSlice";
import agentsReducer from "./features/agents/agentsSlice";
import appointmentsReducer from "./features/appoinments/appoinmentsSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    labs: labsReducer,
    franchise: franchiseReducer,
    agents: agentsReducer,
    appointments: appointmentsReducer,
  },
});

export default appStore;

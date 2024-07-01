import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import appStore from "./store/appStore.js";
import AppRouter from "./routes";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster position="top-right" />
    <Provider store={appStore}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);

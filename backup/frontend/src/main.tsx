import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import AuthContextProvider from "./context/Auth";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthContextProvider>
);

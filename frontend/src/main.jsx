import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();

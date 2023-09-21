import React from "react";
import createRoot from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./App.css";

const rootElement = document.getElementById("root");

createRoot.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  rootElement
);

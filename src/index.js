import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./AppD";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter
    // basename="/react-components"
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext.jsx";
import DocumentsContextProvider from "./context/DocumentsContext.jsx";




ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <DocumentsContextProvider>
          <App />
      </DocumentsContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext.jsx";
import DocumentsContextProvider from "./context/DocumentsContext.jsx";
import FlowchartContextProvider from "./context/FlowchartContext.jsx";




ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <DocumentsContextProvider>
          <FlowchartContextProvider>
            <App />
          </FlowchartContextProvider>
        </DocumentsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

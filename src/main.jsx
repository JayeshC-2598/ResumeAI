import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext.jsx";
import DocumentsContextProvider from "./context/DocumentsContext.jsx";
// import ProfileProvider from "./context/ProfileContext.jsx";
import PaymentContextProvider from "./context/PaymentContext.jsx";
import OpenAIContextProvider from "./context/OpenAIContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <DocumentsContextProvider>
          <PaymentContextProvider>
            <OpenAIContextProvider>
              <App />
            </OpenAIContextProvider>
          </PaymentContextProvider>
        </DocumentsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// <ProfileProvider>
// </ProfileProvider>
// <MarkdownContextProvider>
// </MarkdownContextProvider>

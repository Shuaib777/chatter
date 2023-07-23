import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { ChatContextProvider } from "./context/chatContext";
import { PopupContextProvider } from "./context/popupContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <PopupContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </PopupContextProvider>
    </ChatContextProvider>
  </AuthContextProvider>
);

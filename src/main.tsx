import React from "react";
import ReactDOM from "react-dom/client";
import XRayload from "./components/XRayload.tsx";
import "./index.scss";
import TokenContextProvider from "./context/TokenContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TokenContextProvider>
      <XRayload />
    </TokenContextProvider>
  </React.StrictMode>
);

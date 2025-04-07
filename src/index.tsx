import React from "react";
import ReactDOM from "react-dom/client";
import { InitProvider } from "./InitContextProvider";
import "./index.css";

const root = document.getElementById("root") as HTMLElement;
if (!root) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <InitProvider />
  </React.StrictMode>
);

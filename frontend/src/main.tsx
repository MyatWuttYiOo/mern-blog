import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./routes/index"; 
// import { AuthContextProvider } from "./contexts/AuthContext";
import "./index.css";

const root = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(root).render(
  <React.StrictMode>

      <RouterProvider router={router} />
    
  </React.StrictMode>
);
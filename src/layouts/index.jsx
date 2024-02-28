import React from "react";
import NavBar from "./NavBar";

export const MainLayout = ({ children }) => (
  <div className="main-layout-grid">
    <NavBar/>
    <div className="content-container">{children}</div>
  </div>
);

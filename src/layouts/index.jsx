import React from "react";
import NavBar from "./NavBar";
import TopBar from "../components/TopBar/TopBar";

export const MainLayout = ({ children }) => (
  <div className="main-layout-grid">
    <TopBar />
      <NavBar />
      <div className="content-container">{children}</div>

  </div>
);

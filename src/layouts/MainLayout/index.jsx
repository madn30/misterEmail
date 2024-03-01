import React from "react";

import MainHeader from "../../components/MainHeader/MainHeader";
import NavBar from "./NavBar";

export const MainLayout = ({ children }) => (
  <div className="main-layout-grid">
    <MainHeader />
    <NavBar />
    <div className="content-container">{children}</div>
  </div>
);

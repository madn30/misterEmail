import React from "react";

import MainHeader from "../../components/MainHeader/MainHeader";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const MainLayout = ({ children }) => (
  <div className="main-layout-grid">
    <MainHeader />
    <NavBar />
    {/* <div className="content-container">{children}</div> */}
    <Outlet/>
  </div>
);
export default  MainLayout

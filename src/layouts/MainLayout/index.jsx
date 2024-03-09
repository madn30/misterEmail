import React from "react";

import MainHeader from "../../components/MainHeader/MainHeader";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => (
  <div className="main-layout-grid">
    <MainHeader />
    <NavBar />
    <Outlet/>
  </div>
);
export default  MainLayout

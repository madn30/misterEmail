import React from "react";
import MainMenu from "../MainMenu/MainMenu";
import Logo from "../Logo/Logo";
import Help from "../Help/Help";
import Perfences from "../Perfences/Perfences";
import Applications from "../Applications/Applications";
import Account from "../Account/Account";
import Search from "../Search/Search";

export default function TopBar() {
  return (
    <header className="app-header">
      <div className="app-header-left">
        <MainMenu />
        <Logo />
      </div>
      <div className="flex space-between">
        <Search />
        <div className="flex align-center"> 
        <Help />
        <Perfences />
        <Applications />
        <Account />
        </div>
      </div>
    </header>
  );
}

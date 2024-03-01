import React from "react";
import MainMenu from "../MainMenu/MainMenu";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import IconButton from "../IconButton/IconButton";
import { headerIcons } from "./helper";
import { IoSettingsOutline as SettingIcon } from "react-icons/io5";
import { CgMenuGridO as MenuIcon } from "react-icons/cg";
import { IoIosHelpCircleOutline as SupportIcon } from "react-icons/io";
import ToolTip from "../ToolTip/ToolTip";

const iconComponents = {
  IoSettingsOutline: SettingIcon,
  CgMenuGridO: MenuIcon,
  IoIosHelpCircleOutline: SupportIcon,
};

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
          {headerIcons.map(
            ({ title, icon }, index) => {
            const IconComponent = iconComponents[icon];
            return IconComponent && (
              <ToolTip key={index}>
                <IconButton title={title}>
                  <IconComponent />
                </IconButton>
              </ToolTip>
            );
          })}
        </div>
      </div>
    </header>
  );
}

import React from "react";

import MainMenu from "../MainMenu/MainMenu";
import Search from "../Search/Search";
import IconButton from "../IconButton/IconButton";
import ToolTip from "../ToolTip/ToolTip";
import Avatar from "../Avatar/Avatar";
import { headerIcons } from "./helper";
import Logo from "../Icons/Logo/Logo";

import { CgMenuGridO as MenuIcon } from "react-icons/cg";
import { IoIosHelpCircleOutline as SupportIcon } from "react-icons/io";
import { IoSettingsOutline as SettingIcon } from "react-icons/io5";
import { userService } from "../../services/user.service";

const iconComponents = {
  IoSettingsOutline: SettingIcon,
  CgMenuGridO: MenuIcon,
  IoIosHelpCircleOutline: SupportIcon,
};

export default function MainHeader() {
  const { fullName } = userService.getUser();

  return (
    <header className="app-header">
      <div className="app-header-left">
        <MainMenu />
        <Logo />
      </div>
      <div className="flex space-between">
        <Search />
        <div className="flex align-center">
          {headerIcons.map(({ title, icon }, index) => {
            const IconComponent = iconComponents[icon];
            return (
              IconComponent && (
                <ToolTip key={index} content={title} position="bottom">
                  <IconButton title={title}>
                    <IconComponent />
                  </IconButton>
                </ToolTip>
              )
            );
          })}
          <Avatar name={fullName} className={"app-header-avatar"} />
        </div>
      </div>
    </header>
  );
}

import React from "react";
import { NavLink } from "react-router-dom";

export default function NavItem({ navItem }) {
  const Icon = navItem.icon;
  return (
    <NavLink to={navItem.to} className="nav-item">
      <Icon />
      {navItem.title}
    </NavLink>
  );
}

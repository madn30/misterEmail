import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function NavItem({ navItem }) {
  const Icon = navItem.icon;
  const [unreadMessages] = useState(0);


  return (
    <NavLink to={`${navItem.to}`} className="nav-item">
      <Icon />
      {navItem.title}
      {unreadMessages > 0 && <span className="unread-emails">{unreadMessages}</span>}
    </NavLink>
  );
}

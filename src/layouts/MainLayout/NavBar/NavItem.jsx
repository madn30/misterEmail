import React from "react";
import { NavLink } from "react-router-dom";
import { emailService } from "../../../services/email.service";

export default function NavItem({ navItem }) {
  const Icon = navItem.icon;
  const count = emailService.countUnreadEmailsInFolder(navItem.title);
  return (
    <NavLink to={`${navItem.to}`} className="nav-item">
      <Icon />
      {navItem.title}
      <span className="unread-emails">{count > 0 ? count : ""}</span>
    </NavLink>
  );
}

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { eventBusService } from "../../../services/event-bus.service";
import { emailService } from "../../../services/email.service";

export default function NavItem({ navItem }) {
  const Icon = navItem.icon;
  const [unreadMessages, setUnreadMessages] = useState(0);

  const updateUnreadMessages = () => {
    const count = emailService.countUnreadEmailsInFolder(navItem.to);
    setUnreadMessages(count);
  };

  // useEffect(() => {
  //   updateUnreadMessages(); 

  //   const handleComposeForm = () => updateUnreadMessages();
  //   const unsubscribe = eventBusService.on("compose-form", handleComposeForm);

  //   return () => unsubscribe();
  // }, [navItem.to]);

  return (
    <NavLink to={`${navItem.to}`} className="nav-item">
      <Icon />
      {navItem.title}
      {unreadMessages > 0 && <span className="unread-emails">{unreadMessages}</span>}
    </NavLink>
  );
}

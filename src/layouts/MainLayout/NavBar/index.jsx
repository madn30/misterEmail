import React from "react";
import { MdOutlineInbox } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { RiDraftLine } from "react-icons/ri";
import { VscSend } from "react-icons/vsc";
import NavItem from "./NavItem";
import Compose from "../../../components/Compose/Compose";
import ToolTip from "../../../components/ToolTip/ToolTip";

export default function NavBar() {
  const sections = [
    { title: "Inbox", icon: MdOutlineInbox },
    { title: "Starred", icon: FaRegStar },
    { title: "Sent", icon: VscSend },
    { title: "Draft", icon: RiDraftLine },
    // { title: "Trash", icon: FaRegTrashCan },
  ];

  return (
    <nav className="nav-bar">
      <Compose />
      {sections.map((section, index) => (
        <ToolTip position="right">
          <NavItem key={index} title={section.title} icon={section.icon} />
        </ToolTip>
      ))}
    </nav>
  );
}

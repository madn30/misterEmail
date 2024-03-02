import React from "react";
import { MdOutlineInbox as InboxIcon} from "react-icons/md";
import { FaRegStar as StarIcon } from "react-icons/fa";
import { RiDraftLine as DraftIcon} from "react-icons/ri";
import { VscSend as SendIcon} from "react-icons/vsc";
import NavItem from "./NavItem";
import SendMail from "../../../components/SendMail/SendMail";
import ToolTip from "../../../components/ToolTip/ToolTip";

export default function NavBar() {
  const sections = [
    { title: "Inbox", icon: InboxIcon },
    { title: "Starred", icon: StarIcon },
    { title: "Sent", icon: SendIcon },
    { title: "Draft", icon: DraftIcon },
  ];

  return (
    <nav className="nav-bar">
      <SendMail />
      {sections.map((section, index) => (
        <ToolTip position="right" key={index} content={section.title}>
          <NavItem  title={section.title} icon={section.icon} />
        </ToolTip>
      ))}
    </nav>
  );
}

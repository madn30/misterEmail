import React from "react";
import { MdOutlineInbox as InboxIcon} from "react-icons/md";
import { FaRegStar as StarIcon } from "react-icons/fa";
import { RiDraftLine as DraftIcon} from "react-icons/ri";
import { VscSend as SendIcon} from "react-icons/vsc";
import NavItem from "./NavItem";
import EmailCompose from "../../../components/Emails/EmailCompose/EmailCompose";
import ToolTip from "../../../components/ToolTip/ToolTip";

export default function NavBar() {
  const sections = [
    { title: "Inbox", icon: InboxIcon ,to:'/inbox'},
    { title: "Starred", icon: StarIcon ,to:'/starred'},
    { title: "Sent", icon: SendIcon ,to :'/sent'},
    { title: "Draft", icon: DraftIcon ,to:'/draft'},
  ];

  return (
    <nav className="nav-bar">
      <EmailCompose />
      {sections.map((item, index) => (
        <ToolTip position="right" key={index} content={item.title}>
          <NavItem  navItem={item}/>
        </ToolTip>
      ))}
    </nav>
  );
}

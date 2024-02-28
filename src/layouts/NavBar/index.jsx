import React from "react";
import { MdOutlineInbox } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { RiDraftLine } from "react-icons/ri";
import { VscSend } from "react-icons/vsc";
import NavItem from "./NavItem"; // Adjust the import path as necessary
import Logo from "../../components/Logo/Logo";
import MainMenu from "../../components/MainMenu/MainMenu";

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
      <div className="nav-bar-top">
        <MainMenu />
        <Logo />
      </div>
      {sections.map((section, index) => (
        <NavItem key={index} title={section.title} icon={section.icon} />
      ))}
    </nav>
  );
}

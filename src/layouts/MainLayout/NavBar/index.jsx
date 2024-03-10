import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import NavItem from "./NavItem";
import ToolTip from "../../../components/ToolTip/ToolTip";
import ComposeIcon from "../../../components/Icons/ComposeIcon/ComposeIcon";

import { MdOutlineInbox as InboxIcon } from "react-icons/md";
import { FaRegStar as StarIcon } from "react-icons/fa";
import { RiDraftLine as DraftIcon } from "react-icons/ri";
import { VscSend as SendIcon } from "react-icons/vsc";

const sections = [
  { title: "Inbox", icon: InboxIcon, to: "inbox" },
  { title: "Starred", icon: StarIcon, to: "starred" },
  { title: "Sent", icon: SendIcon, to: "sent" },
  { title: "Draft", icon: DraftIcon, to: "drafts" },
  { title: "Trash", icon: DraftIcon, to: "trash" },
];

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const onClickCompose = () => {
    const queryParams = new URLSearchParams(location.search);
    const isComposing = queryParams.get("compose") === "new";
    if (isComposing) {
      queryParams.delete("compose");
    } else navigate(`${location.pathname}?compose=new`);
  };

  return (
    <nav className="nav-bar ">
      <ComposeIcon onClick={onClickCompose} />
      {sections.map((item, index) => (
        <ToolTip position="right" key={index} content={item.title}>
          <NavItem navItem={item} />
        </ToolTip>
      ))}
    </nav>
  );
}

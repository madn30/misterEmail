import React, { useState } from "react";
import { FaStar as FullStarIcon, FaReply, FaTrash, FaRegEdit } from "react-icons/fa";
import { CiBookmark as BookMarkIcon } from "react-icons/ci";
import useFormattedTime from "../../hooks/useFormattedTime";
import { useNavigate } from "react-router-dom";
import IconButton from "../IconButton/IconButton";

export default function EmailPreview({ email, onRemoveMail }) {
  const navigate = useNavigate();
  const formattedTime = useFormattedTime(email.sentAt);

  const actionIcons = [
    { id: "reply", icon: FaReply, action: () => console.log("Reply action") },
    { id: "edit", icon: FaRegEdit, action: () => console.log("Edit action") },
    { id: "star", icon: FullStarIcon, action: () => console.log("Star action") },
    {
      id: "remove",
      icon: FaTrash,
      action: (event) => {
        event.stopPropagation(); 
        onRemoveMail(email.id);
      },
    },
  ];

  const renderActionIcons = () =>
    actionIcons.map((iconConfig) => (
      <IconButton
        key={iconConfig.id}
        className="icon-container"
        onClick={(event) => iconConfig.action(event)} 
      >
        {React.createElement(iconConfig.icon)}
      </IconButton>
    ));

  function onEmailClick() {
    navigate(`/email-detail/${email.id}`);
  }

  return (
    <div
      onClick={onEmailClick}
      className="table-grid-row email-preview"
      onMouseEnter={(e) => e.currentTarget.classList.add("hovered")}
      onMouseLeave={(e) => e.currentTarget.classList.remove("hovered")}
    >
      <div className="flex align-center gap10">
        <input type="checkbox" />
        <FullStarIcon />
        <BookMarkIcon />
        <h5>{email.to}</h5>
      </div>
      <h5>{email.subject}</h5>
      <div className="email-body-container">
        <h5>{email.body}</h5>
      </div>
      <div className="email-preview-time">
        <h5>{formattedTime}</h5>
      </div>
      <div className="actions-icons">{renderActionIcons()}</div>
    </div>
  );
}

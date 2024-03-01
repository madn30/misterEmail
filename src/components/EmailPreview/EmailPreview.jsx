import React, { useState } from "react";
import {
  FaStar as FullStarIcon,
  FaReply,
  FaTrash,
  FaRegEdit,
} from "react-icons/fa";
import { CiBookmark as BookMarkIcon } from "react-icons/ci";
import useFormattedTime from "../../hooks/useFormattedTime";
import { useNavigate } from "react-router-dom";

export default function EmailPreview({ email, onRemoveMail }) {
  const [isHovered, setIsHovered] = useState(false);
  const formattedTime = useFormattedTime(email.sentAt);
  const navigate = useNavigate();

  function onEmailClick() {
    navigate(`/email-detail/${email.id}`);
  }

  const HoverIcons = () => (
    <div className="hover-icons">
      <div className="icon-container">
        <FaReply />
      </div>
      <div
        className="icon-container"
        onClick={(event) => {
          event.stopPropagation();
          onRemoveMail(email.id);
        }}
      >
        <FaTrash />
      </div>
      
      <div className="icon-container">
        <FaRegEdit />
      </div>
      <div className="icon-container">
        <FullStarIcon />
      </div>
    </div>
  );

  return (
    <div
      onClick={onEmailClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`table-grid-row email-preview ${isHovered ? "hovered" : ""}`}
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
      {!isHovered && <h5>{formattedTime}</h5>}
      {isHovered && <HoverIcons />}
    </div>
  );
}

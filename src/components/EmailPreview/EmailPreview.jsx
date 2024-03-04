import React from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../IconButton/IconButton";
import Star from "../Star/Star";
import { FaTrash } from "react-icons/fa";
import useFormattedTime from "../../hooks/useFormattedTime";
import SmartTypography from "../SmartTypography/SmartTypography";

const EmailPreview = ({ email, onRemoveMail }) => {
  const navigate = useNavigate();
  const formattedTime = useFormattedTime(email.sentAt);
  const emailClass = email.isRead
    ? "email-preview-read"
    : "email-preview-unread";

  const handleRemove = (event) => {
    event.stopPropagation();
    onRemoveMail(email.id);
  };

  const onEmailClick = () => navigate(`/email-detail/${email.id}`);

  return (
    <div className={`email-preview ${emailClass}`} onClick={onEmailClick}>
      <div className="row-left">
        <input type="checkbox" />
        <Star isStarring={email.isStarred} className={'row-left-star'}/>
        <SmartTypography className="mail-typography">
          {email.to}
        </SmartTypography>
      </div>
      <div className="row-center">
        <SmartTypography className="row-center-subject mail-typography">
          {email.subject} &nbsp; <span>{email.body}</span>
        </SmartTypography>
      </div>
      <div className="row-right">
        <SmartTypography className="row-right-time mail-typography">
          {formattedTime}
        </SmartTypography>
      </div>
      <div className="actions-icons">
        <IconButton className="icon-container" onClick={handleRemove}>
          <FaTrash />
        </IconButton>
      </div>
    </div>
  );
};

export default EmailPreview;

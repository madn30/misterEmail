import React from "react";
import IconButton from "../../IconButton/IconButton";
import Star from "../../Icons/Star/Star";
import { FaTrash } from "react-icons/fa";
import useFormattedTime from "../../../hooks/useFormattedTime";
import SmartTypography from "../../SmartTypography/SmartTypography";

const EmailPreview = ({
  email,
  onCheckEmail,
  onRemoveEmail,
  checked,
  onEmailClick,
}) => {
  const formattedTime = useFormattedTime(email.sentAt);
  const emailClass = email.isRead
    ? "email-preview-read"
    : "email-preview-unread";

  return (
    <div
      style={{ background: checked && "#c2dbff" }}
      className={`email-preview ${emailClass}`}
      onClick={() => onEmailClick(email.id)}
    >
      <div className="row-left">
        <input
          type="checkbox"
          onClick={(event) => event.stopPropagation()}
          checked={checked}
          onChange={(event) => onCheckEmail(email.id, event.target.checked)}
        />
        <Star isStarring={email.isStarred} className={"row-left-star"} />

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
        <IconButton
          className="icon-container"
          onClick={(event) => {
            event.stopPropagation();
            onRemoveEmail(email.id);
          }}
        >
          <FaTrash />
        </IconButton>
      </div>
    </div>
  );
};

export default EmailPreview;

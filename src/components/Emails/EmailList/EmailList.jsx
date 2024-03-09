import React from "react";
import EmailPreview from "../EmailPreview/EmailPreview";

export default function EmailList({ emails, onRemoveEmail, onCheckEmail,checkedEmails ,onEmailClick}) {
  return (
    <div className="table-grid">
      {emails?.map((email, index) => (
        <EmailPreview
          key={email.id}
          email={email}
          onRemoveEmail={onRemoveEmail}
          onCheckEmail={onCheckEmail}
          checked={checkedEmails[email.id] || false}
          onEmailClick={onEmailClick}
        />
      ))}
    </div>
  );
}

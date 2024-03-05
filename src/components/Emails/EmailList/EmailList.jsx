import React from "react";
import EmailPreview from "../EmailPreview/EmailPreview";

export default function EmailList({ emails, onRemoveMail }) {
  return (
    <div className="table-grid">
      {emails?.map((email) => (
        <EmailPreview
          key={email.id}
          email={email}
          onRemoveMail={onRemoveMail}
        />
      ))}
    </div>
  );
}

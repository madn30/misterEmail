import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Paper from "../../components/Paper/Paper";
import { emailService } from "../../services/email.service";
import Avatar from "../../components/Avatar/Avatar";
import { userService } from "../../services/user.service";

export default function EmailDetails() {
  const [email, setEmail] = useState(null);
  const { fullName } = userService.getUser();
  const { id } = useParams();

  useEffect(() => {
    const loadEmail = async () => {
      try {
        const emailData = await emailService.getById(id);
        setEmail(emailData);
      } catch (err) {
        console.error("Failed to load email:", err);
      }
    };
    if (id) loadEmail();
  }, [id]);

  if (!email) {
    return <div>Loading...</div>;
  }

  return (
    <Paper className="email-details-root email-preview-grid">
      <header className="subject">{email.subject}</header>
      <Avatar name={fullName} className="avatar" />
      <section className="full-width email-details-content">
        <div className="flex column">
          <span>{email.to}</span>
          <p>to me</p>
        </div>
        <div className="email-body">
          <p>{email.body}</p>
          <div style={{ height: 300 }}></div>
        </div>
      </section>
    </Paper>
  );
}

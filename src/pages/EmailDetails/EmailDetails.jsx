import React, { useEffect, useState } from "react";
import Paper from "../../components/Paper/Paper";
import { emailService } from "../../services/email.service";
import { useParams } from "react-router-dom";
import EmailFilter from "../../components/EmailFilter/EmailFilter";
// import Account from "../../components/Account/Account";
export default function EmailDetails() {
  const [email, setEmail] = useState(null);
  const query = useParams();
  useEffect(() => {
    const loadEmails = async () => {
      try {
        const emails = await emailService.getById(query.id);
        setEmail(emails);
      } catch (err) {
        console.error(err);
      }
    };
    loadEmails();
  }, [query]);
  if (!email) return <div>loading...</div>;

  return (
    <Paper className="email-details-root">
      {/* <EmailFilter /> */}
      <h2>{email.subject}</h2>
      <div className="email-details">
        {/* <Account /> */}
        <div className="full-width email-details-content">
          <div className="flex column">
            <span>Slack {"<notification@slack.com>"}</span>
            <span>to me</span>
          </div>
          <div className="email-body">
            <span>{email.body}</span>
            <div style={{ height: 300 }}></div>
          </div>
        </div>
      </div>
    </Paper>
  );
}

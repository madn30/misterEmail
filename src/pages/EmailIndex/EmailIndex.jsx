import React, { useEffect, useState } from "react";
import Paper from "../../components/Paper/Paper";
import { emailService } from "../../services/email.service";
import EmailFilter from "../../components/EmailFilter/EmailFilter";
import EmailList from "../../components/EmailList/EmailList";
export default function EmailIndex() {
  const [emails, setEmails] = useState(null);
  const [filterBy, setFilterBy] = useState();
  useEffect(() => {
    const loadEmails = async () => {
      try {
        const emails = await emailService.query(null);
        setEmails(emails);
      } catch (err) {
        console.error(err);
      }
    };
    loadEmails();
  }, []);

  const onRemoveMail = async (event, idx) => {
    event.stopPropagation();
    try {
      const resp = await emailService.remove(idx);
      setEmails((prevEmails) => prevEmails.filter((mail) => mail.id !== idx));
      // setEmails(emails);
    } catch (err) {
      console.error(err);
    }
  };

  if (!emails) return <div>Loading...</div>;
  console.log(emails);
  return (
    <Paper>
      <EmailFilter />
      <EmailList emails={emails} onRemoveMail={onRemoveMail} />
    </Paper>
  );
}

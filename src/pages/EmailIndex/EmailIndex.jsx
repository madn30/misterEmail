import React, { useEffect, useState } from "react";
import Paper from "../../components/Paper/Paper";
import { emailService } from "../../services/email.service";
import EmailFilter from "../../components/EmailFilter/EmailFilter";
import EmailList from "../../components/EmailList/EmailList";

export default function EmailIndex() {
  const [emails, setEmails] = useState(null);
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter());

  useEffect(() => {
    const loadEmails = async () => {
      try {
        const emails = await emailService.query(filterBy);
        setEmails(emails);
      } catch (err) {
        console.error(err);
      }
    };
    loadEmails();
  }, [filterBy]);

  function onSetFilter(fieldsToUpdate) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...fieldsToUpdate }));
  }
  const onRemoveMail = async (idx) => {
    try {
      await emailService.remove(idx);
      setEmails((prevEmails) => prevEmails.filter((mail) => mail.id !== idx));
    } catch (err) {
      console.error(err);
    }
  };

  if (!emails) return <div>Loading...</div>;
  return (
    <Paper>
      <EmailFilter onSetFilter={onSetFilter} />
      <EmailList emails={emails} onRemoveMail={onRemoveMail} />
    </Paper>
  );
}

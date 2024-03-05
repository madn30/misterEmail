import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Paper from "../../components/Paper/Paper";
import { emailService } from "../../services/email.service";
import EmailFilter from "../../components/Emails/EmailFilter/EmailFilter";
import EmailList from "../../components/Emails/EmailList/EmailList";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

export default function EmailIndex() {
  const [emails, setEmails] = useState(null);
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter());
  const countEmails = emails
    ? (emails.filter((mail) => mail.isRead).length / emails.length) * 100
    : 0;
  const location = useLocation();

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

  useEffect(() => {
    const endPoint = location.pathname.substring(1) || "inbox";
    if (filterBy.route !== endPoint) {
      setFilterBy((prevFilter) => {
        if (prevFilter.route !== endPoint) {
          return { ...prevFilter, route: endPoint };
        }
        return prevFilter;
      });
    }
  }, [location]);

  function onSetFilter(fieldsToUpdate) {
    if (fieldsToUpdate)
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
      <ProgressBar progress={countEmails} />
    </Paper>
  );
}

import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import { emailService } from "../../services/email.service";

import Paper from "../../components/Paper/Paper";
import EmailFilter from "../../components/Emails/EmailFilter/EmailFilter";
import EmailList from "../../components/Emails/EmailList/EmailList";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { eventBusService } from "../../services/event-bus.service";

export default function EmailIndex() {
  const [emails, setEmails] = useState(null);
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter());
  const [composeForm, setComposeForm] = useState(null);
  const { folder } = useParams();

  const countEmails = emails
    ? (emails.filter((mail) => mail.isRead).length / emails.length) * 100
    : 0;

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
    setFilterBy((prevFilter) => {
      return { ...prevFilter, folder };
    });
  }, [folder]);

  useEffect(() => {
    const unsubscribe = eventBusService.on("compose-form", (payload) => {
      setComposeForm(payload);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (composeForm) {
      onAddEmail(composeForm);
    }
  }, [composeForm]);

  
  const onAddEmail = async (email) => {
    try {
      await emailService.save(email);
      const updatedEmails = await emailService.query(filterBy);
      setEmails(updatedEmails);
    } catch (err) {
      console.error(err);
    }
  };
  const onRemoveEmail = async (idx) => {
    try {
      await emailService.remove(idx);
      setEmails((prevEmails) => prevEmails.filter((mail) => mail.id !== idx));
      eventBusService.emit("show-message", {
        message: "Conversation moved to Trash.",
      });
    } catch (err) {
      console.error(err);
    }
  };

  function onSetFilter(fieldsToUpdate) {
    if (fieldsToUpdate)
      setFilterBy((prevFilter) => ({ ...prevFilter, ...fieldsToUpdate }));
  }
  if (!emails) return <div>Loading...</div>;
  return (
    <Paper className="content-container">
      {/* <EmailFilter onSetFilter={onSetFilter} /> */}
      <EmailList emails={emails} onRemoveEmail={onRemoveEmail} />
      {!!countEmails && <ProgressBar progress={countEmails} />}
    </Paper>
  );
}

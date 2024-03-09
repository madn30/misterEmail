import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { emailService } from "../../services/email.service";
import Paper from "../../components/Paper/Paper";
import EmailList from "../../components/Emails/EmailList/EmailList";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { eventBusService } from "../../services/event-bus.service";

export default function EmailIndex() {
  const [emails, setEmails] = useState(null);
  const [searchParams] = useSearchParams();

  const { folder } = useParams();
  const initialFilter =
    searchParams.size > 0
      ? emailService.getFilterFromParams(searchParams)
      : { ...emailService.getDefaultFilter(), folder };

  const [filterBy, setFilterBy] = useState(initialFilter);

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
    if (folder) {
      setFilterBy((prevFilter) => ({ ...prevFilter, folder }));
    }
  }, [folder, searchParams]);

  useEffect(() => {
    const unsubscribe = eventBusService.on("compose-form", (payload) => {
      console.log(payload);
      onAddEmail(payload);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const onAddEmail = async (email) => {
    try {
      const emailUpdated = await emailService.save(email);
      if (folder === "sent") {
        setEmails((prevEmails) => [...prevEmails, emailUpdated]);
      }
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
  if (!emails) return <div>Loading...</div>;
  return (
    <Paper className="content-container">
      <EmailList emails={emails} onRemoveEmail={onRemoveEmail} />
      {!!countEmails && <ProgressBar progress={countEmails} />}
    </Paper>
  );
}

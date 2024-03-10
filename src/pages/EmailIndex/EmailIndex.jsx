import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { emailService } from "../../services/email.service";
import Paper from "../../components/Paper/Paper";
import EmailList from "../../components/Emails/EmailList/EmailList";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { eventBusService } from "../../services/event-bus.service";
import EmailCompose from "../../components/Emails/EmailCompose/EmailCompose";

export default function EmailIndex() {
  const [emails, setEmails] = useState([]);
  const [checkedEmails, setCheckedEmails] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const { folder } = useParams();
  const [isOpenCompose, setIsOpenCompose] = useState(
    searchParams.has("compose")
  );
  const [filterBy, setFilterBy] = useState({
    ...emailService.getDefaultFilter(),
    folder: folder,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loadEmails = async () => {
      try {
        const emailsFromService = await emailService.query(filterBy);
        setEmails(emailsFromService);
      } catch (err) {
        console.error("Failed to load emails:", err);
      }
    };

    loadEmails();
  }, [filterBy]);

  useEffect(() => {
    const updateFilters = () => {
      const newFiltersFromParams =
        searchParams.size > 0
          ? emailService.getFilterFromParams(searchParams)
          : {};
      setFilterBy((prevFilters) => ({
        ...prevFilters,
        ...newFiltersFromParams,
        folder,
      }));
    };

    updateFilters();
    setIsOpenCompose(searchParams.has("compose"));
  }, [searchParams, folder]);

  useEffect(() => {
    const handleComposeForm = (payload) => onAddEmail(payload);
    const handleDraftForm = (payload) => onDraftEmail(payload);
    const unsubscribe = eventBusService.on("compose-form", handleComposeForm);
    const unsubscribe2 = eventBusService.on("draft-saved", handleDraftForm);

    return () => {
      unsubscribe();
      unsubscribe2();
    };
  }, []);

  const onCheckEmail = (id, isChecked) => {
    setCheckedEmails((prevCheckedEmails) => ({
      ...prevCheckedEmails,
      [id]: isChecked,
    }));
  };

  const onAddEmail = async (email) => {

    try {
      const isSavingAsDraft = !email.isDraft; 

      const emailToUpdate = {
        ...email,
        isDraft: isSavingAsDraft ? true : false,
      };

      const updatedEmail = await emailService.save(emailToUpdate);

      setEmails((prevEmails) => {
        if (email.isDraft) {
          return prevEmails.filter((e) => e.id !== email.id);
        } else {
          return [...prevEmails, updatedEmail];
        }
      });

      eventBusService.emit("show-message", { message: "Message sent." });

      navigate(-1);
    } catch (err) {
      console.error("Failed to add email:", err);
    }
  };

  const onRemoveEmail = async (id) => {
    try {
      let message = "Conversation moved to Trash.";
      let updatedEmails = emails.filter((email) => email.id !== id);

      if (folder === "trash") {
        await emailService.remove(id);
        message = "Conversation removed.";
      } else {
        const emailToUpdate = emails.find((email) => email.id === id);
        if (!emailToUpdate) {
          throw new Error("Email not found");
        }
        const updatedEmail = {
          ...emailToUpdate,
          isTrash: true,
          isDraft: false,
        };
        await emailService.save(updatedEmail);
      }

      setEmails(updatedEmails);
      eventBusService.emit("show-message", { message });
    } catch (err) {
      console.error("Failed to remove email:", err);
    }
  };

  const toggleComposeEmail = () => setIsOpenCompose((prev) => !prev);

  const onDraftEmail = async (draftEmail) => {
    if (draftEmail) {
      try {
        const emailWithDraftInfo = {
          ...draftEmail,
          folder: ["drafts"],
          isRead: true,
        };

        await emailService.save(emailWithDraftInfo);

        if (folder === "drafts") {
          setEmails((prevEmails) => [...prevEmails, emailWithDraftInfo]);
        }

        eventBusService.emit("show-message", { message: "Draft saved." });
      } catch (error) {
        console.error("Failed to save draft:", error);
      }
    }
  };

  const countUnreadEmailsPercentage = () => {
    if (!emails.length) return 0;
    const readEmailsCount = emails.filter((email) => email.isRead).length;
    return (readEmailsCount / emails.length) * 100;
  };

  const onEmailClick = async (id) => {
    const emailToUpdate = emails.find((email) => email.id === id);
    if (emailToUpdate.isDraft) {
      navigate(`?compose=${emailToUpdate.composeId}`);
    } else {
      if (emailToUpdate && !emailToUpdate.isRead) {
        const updatedEmail = { ...emailToUpdate, isRead: true };
        try {
          await emailService.save(updatedEmail);
          setEmails(
            emails.map((email) => (email.id === id ? updatedEmail : email))
          );
        } catch (error) {
          console.error("Failed to mark email as read", error);
        }
      }

      navigate(`${id}`);
    }
  };

  if (!emails) return <div>Loading...</div>;

  return (
    <Paper className="content-container">
      <EmailList
        emails={emails}
        onRemoveEmail={onRemoveEmail}
        onCheckEmail={onCheckEmail}
        checkedEmails={checkedEmails}
        onEmailClick={onEmailClick}
      />
      {!!emails.length && <ProgressBar progress={countUnreadEmailsPercentage()} />}
      {isOpenCompose && <EmailCompose onCloseCompose={toggleComposeEmail} />}
    </Paper>
  );
}

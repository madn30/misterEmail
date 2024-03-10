import React, { useState, useEffect } from "react";
import { emailService } from "../../../services/email.service";
import { MdClose as CloseIcon } from "react-icons/md";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { eventBusService } from "../../../services/event-bus.service";
import { utilService } from "../../../services/util.service";

export default function EmailCompose() {
  const [email, setEmail] = useState({ to: "", subject: "", body: "" });
  const [searchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.get("compose") !== "new") {
      const loadDraft = async () => {
        const draftId = searchParams.get("compose");
        if (draftId) {
          const draft = await emailService.getDraftEmail(draftId);
          if (draft) setEmail(draft);
        }
      };

      loadDraft();
    }
  }, [searchParams]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail((prevEmail) => ({
      ...prevEmail,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...emailService.getDefaultEmail(),
      ...email,
      isRead: true,
    };
    try {
      eventBusService.emit("compose-form", payload);
    } catch (err) {
      console.error(err);
    }
  };
  const saveDraft = () => {
    if (email.to || email.subject || email.body) {
      const draftEmail = {
        ...emailService.getDefaultEmail(),
        ...email,
        folder: ["drafts"],
        isRead: true,
        isDraft: true,
        composeId: utilService.makeId(),
      };
      eventBusService.emit("draft-saved", draftEmail);
    } else navigate(-1);
  };

  const handleClose = () => {
    saveDraft();
  };

  return (
    <div className="nav-bar-compose-root">
      <form className="send-mail-modal" onSubmit={handleSubmit}>
        <header>
          New message
          <button type="button" onClick={handleClose} className="close-button">
            <CloseIcon />
          </button>
        </header>
        <section>
          <input
            name="to"
            placeholder="To"
            value={email.to}
            onChange={handleChange}
          />
          <input
            name="subject"
            placeholder="Subject"
            value={email.subject}
            onChange={handleChange}
          />
          <textarea
            name="body"
            rows="10"
            maxLength="2000"
            placeholder="Your message here"
            value={email.body}
            onChange={handleChange}
          />
        </section>
        <footer>
          <button className="send-button" type="submit">
            Send
          </button>
        </footer>
      </form>
    </div>
  );
}

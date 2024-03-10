import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { emailService } from "../../../services/email.service";
import { utilService } from "../../../services/util.service";
import { eventBusService } from "../../../services/event-bus.service";
import { ComposeControlButtons } from "./ComposeControlButtons";

export default function EmailCompose() {
  const [email, setEmail] = useState({ to: "", subject: "", body: "" });
  const [viewCompose, setViewCompose] = useState("normal");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const composeParam = searchParams.get("compose");
    if (composeParam && composeParam !== "new") {
      const loadDraft = async () => {
        const draft = await emailService.getDraftEmail(composeParam);
        if (draft) setEmail(draft);
      };
      loadDraft();
    }
  }, [searchParams]);

  const handleChange = ({ target: { name, value } }) => {
    setEmail((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...emailService.getDefaultEmail(),
      ...email,
      isRead: true,
    };
    eventBusService.emit("compose-form", payload);
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

  const toggleMinimize = () => setViewCompose(prev => prev === "minimize" ? "normal" : "minimize");

  const toggleFullscreen = () => setViewCompose(prev => prev === "full" ? "normal" : "full");

  return (
    <div className="nav-bar-compose-root">
      <form
        className={`send-mail-modal ${viewCompose}`}
        onSubmit={handleSubmit}
      >
        <header>
          New message
          <ComposeControlButtons
            viewCompose={viewCompose}
            toggleMinimize={toggleMinimize}
            toggleFullscreen={toggleFullscreen}
            saveDraft={saveDraft}
          />
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

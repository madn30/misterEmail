import React, { useState } from "react";
import { emailService } from "../../../services/email.service";
import { MdClose as CloseIcon } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { eventBusService } from "../../../services/event-bus.service";

export default function EmailCompose() {
  const [email, setEmail] = useState({ to: "", subject: "", body: "" });
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
    const defaultEmail = emailService.getDefaultEmail();

    const payload = {
      ...defaultEmail,
      ...email,
      folder: ["sent"],
    };
    try {
      eventBusService.emit("compose-form", payload);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="nav-bar-compose-root">
      <form className="send-mail-modal" onSubmit={handleSubmit}>
        <header>
          New message
          <button
            type="button"
            onClick={handleClose}
            className="close-button"
          >
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

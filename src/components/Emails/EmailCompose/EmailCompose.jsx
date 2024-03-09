import React, { useState } from "react";

import { emailService } from "../../../services/email.service";
import ComposeIcon from "../../Icons/ComposeIcon/ComposeIcon";
import { eventBusService } from "../../../services/event-bus.service";

import { MdClose as CloseIcon } from "react-icons/md";

export default function EmailCompose() {
  const [email, setEmail] = useState({ to: "", subject: "", body: "" });
  const [isOpen, setIsOpen] = useState(false);

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
      eventBusService.emit("show-message", {
        message: "Message sent.",
      });
      setIsOpen(false);

    } catch (err) {
      console.error(err);
    }
  };
  const toggleComposeModal = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  return (
    <div className="nav-bar-compose-root">
      <ComposeIcon onClick={toggleComposeModal} />
      {isOpen && (
        <form className="send-mail-modal" onSubmit={handleSubmit}>
          <header>
            New message
            <button
              type="button"
              onClick={toggleComposeModal}
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
              value={email.message}
              onChange={handleChange}
            />
          </section>
          <footer>
            <button className="send-button" type="submit">
              Send
            </button>
          </footer>
        </form>
      )}
    </div>
  );
}

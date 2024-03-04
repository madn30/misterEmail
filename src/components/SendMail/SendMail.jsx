import React, { useState } from 'react';
import { MdOutlineModeEditOutline as EditIcon, MdClose as CloseIcon } from 'react-icons/md';

export default function Compose() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState({ to: '', subject: '', message: '' });

  const onMailOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail((prevEmail) => ({
      ...prevEmail,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sending email:', email);
    setEmail({ to: '', subject: '', message: '' });
    setIsOpen(false); 
  };

  return (
    <div className="nav-bar-compose-root">
      <button onClick={onMailOpen} className="flex align-center compose-button">
        <EditIcon /> Compose
      </button>
      {isOpen && (
        <form className="send-mail-modal" onSubmit={handleSubmit}>
          <header>
            New message
            <button onClick={handleClose} className="close-button">
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
              name="message"
              rows="10"
              maxLength="2000"
              placeholder="Your message here"
              value={email.message}
              onChange={handleChange}
            />
          </section>
          <footer>
            <button className='send-button' type="submit">Send</button>
          </footer>
        </form>
      )}
    </div>
  );
}

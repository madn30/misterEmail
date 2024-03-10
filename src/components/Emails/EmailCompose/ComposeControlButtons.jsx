import React from 'react';
import { MdClose, MdMaximize } from "react-icons/md";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";
import { FaRegWindowMinimize } from "react-icons/fa";

export const ComposeControlButtons = ({ viewCompose, toggleMinimize, toggleFullscreen, saveDraft }) => {
  return (
    <div className="flex">
      <button type="button" onClick={toggleMinimize}>
        {viewCompose === "minimize" ? <MdMaximize /> : <FaRegWindowMinimize />}
      </button>
      <button type="button" onClick={toggleFullscreen}>
        {viewCompose === "full" ? <FiMinimize2 /> : <FiMaximize2 />}
      </button>
      <button type="button" onClick={saveDraft} className="close-button">
        <MdClose />
      </button>
    </div>
  );
};

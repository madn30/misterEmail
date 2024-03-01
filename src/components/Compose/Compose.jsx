import React from "react";
import { MdOutlineModeEditOutline as EditIcon } from "react-icons/md";

export default function Compose() {
  return (
    <div className="nav-bar-compose-root">
      <button className="flex align-center simple-button">
        <EditIcon /> Compose
      </button>
    </div>
  );
}

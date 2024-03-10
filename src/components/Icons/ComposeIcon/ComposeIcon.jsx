import React from "react";
import { MdOutlineModeEditOutline as EditIcon } from "react-icons/md";

export default function ComposeIcon({onClick}) {
  return (
    <div className="flex align-center compose-button" onClick={onClick}>
      <EditIcon /> Compose
    </div>
  );
}

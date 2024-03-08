import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineModeEditOutline as EditIcon } from "react-icons/md";

export default function ComposeIcon({onClick}) {
  return (
    <button className="flex align-center compose-button" onClick={onClick}>
      <EditIcon /> Compose
    </button>
  );
}

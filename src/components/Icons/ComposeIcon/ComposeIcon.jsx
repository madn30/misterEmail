import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineModeEditOutline as EditIcon } from "react-icons/md";

export default function ComposeIcon() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('?compose=new');
  };

  return (
    <div className="flex align-center compose-button" onClick={handleClick}>
      <EditIcon /> Compose
    </div>
  );
}

import React from "react";

export default function IconButton({ children, onClick }) {
  return <div className="icon-button" onClick={onClick}>{children}</div>;
}

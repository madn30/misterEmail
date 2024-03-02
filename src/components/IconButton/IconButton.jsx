import React from "react";

export default function IconButton({ children, onClick, className }) {
  return <div className={className} onClick={onClick}>{children}</div>;
}

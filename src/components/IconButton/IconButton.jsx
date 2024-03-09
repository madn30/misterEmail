import React from "react";

export default function IconButton({ children, onClick ,className}) {
  return <div className={`${className } icon-button`} onClick={onClick}>{children}</div>;
}

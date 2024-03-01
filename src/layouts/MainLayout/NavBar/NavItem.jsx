import React from "react";

export default function NavItem(prop) {
  const { title, icon:Icon, ...rest } = prop;
  return (
    <div className="nav-item">
      <Icon />
      <a href="#">{title}</a>
    </div>
  );
}

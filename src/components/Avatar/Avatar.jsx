import React from "react";

export default function Avatar({ name, className }) {
  const avatarInitial = name ? name.charAt(0) : "?";

  return (
    <div className={`${className} avatar-root`}>
      <h4>{avatarInitial}</h4>
    </div>
  );
}

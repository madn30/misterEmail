import React from "react";

export default function Paper({ children, className }) {
  return <main className={`paper ${className}`}>{children}</main>;
}

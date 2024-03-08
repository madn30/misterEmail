import React from "react";

export default function Paper({ children, className = '' }) {
  return <section className={`paper ${className}`}>{children}</section>;
}

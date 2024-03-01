import React from "react";

export default function Paper({ children, className }) {
  console.log(className)
  return <div className={`paper ${className}`}>{children}</div>;
}

import React from "react";
import AdvancedSearch from "./AdvancedSearch";

export default function Search() {
  return (
    <div className="search-root">
      <input
        id="search-input"
        className="search-input"
        placeholder="Search mail"
        aria-label="Search mail"
      />
      <AdvancedSearch />
    </div>
  );
}

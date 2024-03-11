import React, { useState } from "react";
import AdvancedSearch from "./AdvancedSearch";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submit action
    navigate(`/mail/search?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="search-root">
      <form onSubmit={handleSubmit}>
        <input
          id="search-input"
          className="search-input"
          placeholder="Search mail"
          aria-label="Search mail"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" style={{ display: "none" }}>Search</button>
      </form>
      <AdvancedSearch />
    </div>
  );
}

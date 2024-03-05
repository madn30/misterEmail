import React, { useState, useCallback } from "react";
import { debounce } from "lodash";

export default function EmailFilter({ onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({});

  const debouncedOnSetFilter = useCallback(
    debounce((nextValue) => onSetFilter(nextValue), 500),
    []
  );

  const handleChange = (ev) => {
    let { value, name: field, type } = ev.target;
    value = type === "number" ? +value : value;
    const newFilterByToEdit = { ...filterByToEdit, [field]: value };
    setFilterByToEdit(newFilterByToEdit);
    debouncedOnSetFilter(newFilterByToEdit);
  };

  return (
    <form onSubmit={(ev) => ev.preventDefault()} className="formContainer">
      <input
        onChange={handleChange}
        type="text"
        placeholder="Search by text"
        name="search"
        className="searchInput"
      />
      <select onChange={handleChange} name="status" className="statusSelect">
        <option value="all">All</option>
        <option value="read">Read</option>
        <option value="unread">Unread</option>
      </select>
    </form>
  );
}

import React, { useEffect, useState } from "react";

export default function EmailFilter({ onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({});

  useEffect(() => {
    if(onSetFilter) {
      onSetFilter(filterByToEdit);
    }
  }, [ filterByToEdit]);

  function onSubmitFilter(ev) {
    ev.preventDefault();
    if(onSetFilter) {
      onSetFilter(filterByToEdit);
    }
  }

  function handleChange(ev) {
    let { value, name: field, type } = ev.target;
    value = type === "number" ? +value : value;
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  return (
    <form onSubmit={onSubmitFilter}>
      <input
        onChange={handleChange}
        type="text"
        placeholder="Search by text"
        name="search"
      />
      <select onChange={handleChange} name="status">
        <option value="all">All</option>
        <option value="read">Read</option>
        <option value="unread">Unread</option>
      </select>

    </form>
  );
}

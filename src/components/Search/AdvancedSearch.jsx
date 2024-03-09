import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { IoFilterOutline as FilterIcon } from "react-icons/io5";

import Paper from "../Paper/Paper";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import IconButton from "../IconButton/IconButton";
import { emailService } from "../../services/email.service";

export default function AdvancedSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAdvancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [filterByToEdit, setFilterByToEdit] = useState({
    from: "",
    to: "",
    subject: "",
    has: "",
    hasnot: "",
  });

  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () =>
    setAdvancedSearchOpen(toggleAdvancedSearch())
  );

  // useEffect(() => {
  //   const params = {};
  //   searchParams.forEach((value, key) => {
  //     params[key] = value;
  //   });
  //   setFilterByToEdit(params);
  // }, [searchParams]);

  function toggleAdvancedSearch() {
    setAdvancedSearchOpen((prev) => !prev);
  }

  const onSubmitFilter = (e) => {
    e.preventDefault();

    const definedParams = Object.entries(filterByToEdit).reduce(
      (acc, [key, value]) => {
        if (value) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    console.log({ definedParams });
    setSearchParams(definedParams);

    navigate({
      pathname: "/mail/advanced-search",
      search: `?${new URLSearchParams(definedParams).toString()}`,
    });
  };

  const handleChange = (ev) => {
    let { value, name: field, type } = ev.target;
    value = type === "number" ? +value : value;
    const newFilterByToEdit = { ...filterByToEdit, [field]: value };
    setFilterByToEdit(newFilterByToEdit);
  };

  return (
    <>
      {!isAdvancedSearchOpen && (
        <IconButton className="advanced-search-icon">
          <FilterIcon
            onClick={toggleAdvancedSearch}
            aria-label="Toggle advanced search"
          />
        </IconButton>
      )}
      {isAdvancedSearchOpen && (
        <Paper className="advanced-search-form">
          <form onSubmit={onSubmitFilter} ref={wrapperRef}>
            <label htmlFor="from">From:</label>
            <input
              value={filterByToEdit.from}
              onChange={handleChange}
              id="from"
              name="from"
            />

            <label htmlFor="to">To:</label>
            <input
              value={filterByToEdit.to}
              onChange={handleChange}
              id="to"
              name="to"
            />

            <label htmlFor="subject">Subject:</label>
            <input
              value={filterByToEdit.subject}
              onChange={handleChange}
              id="subject"
              name="subject"
            />

            <label htmlFor="has-words">Has the words:</label>
            <input
              value={filterByToEdit.has}
              onChange={handleChange}
              id="has"
              name="has"
            />

            <label htmlFor="doesnt-have">Doesn't have:</label>
            <input
              value={filterByToEdit.hasnot}
              onChange={handleChange}
              id="hasnot"
              name="hasnot"
            />

            <button type="submit">Search</button>
          </form>
        </Paper>
      )}
    </>
  );
}

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as SearchIcon } from "./search.svg";
import "./styles.css";

const SearchBar = ({ disabled }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    history.push(`/search?term=${searchTerm}`);
  };
  const onChange = (event) => setSearchTerm(event.target.value);

  return (
    !disabled && (
      <div className="search-bar">
        <form onSubmit={onSubmit} className="search">
          <input
            type="search"
            className="searchTerm"
            placeholder="What are you drinking ?"
            onChange={onChange}
          />
          <button type="submit" className="searchButton">
            <SearchIcon />
          </button>
        </form>
      </div>
    )
  );
};

export default SearchBar;

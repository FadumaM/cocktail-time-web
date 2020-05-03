import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as SearchIcon } from "./search.svg";

import "./index.css";

const SearchBar = ({ disable }) => {
  const [searchTerm, setSearchTerm] = useState(false);
  const history = useHistory();
  const onSubmit = (event) => {
    event.preventDefault();
    history.push(`/search?term=${searchTerm}`);
  };
  const onChange = (event) => setSearchTerm(event.target.value);

  return (
    !disable && (
      <div className="search-bar">
        <form onSubmit={onSubmit} className="search">
          <input
            type="text"
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

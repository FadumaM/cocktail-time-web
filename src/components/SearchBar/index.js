import React from "react";
import { ReactComponent as SearchIcon } from "./search.svg";
import "./index.css";

const SearchBar = ({ disable }) =>
  !disable && (
    <div className="search-bar">
      <form className="search">
        <input
          type="text"
          className="searchTerm"
          placeholder="What are you looking for?"
        />
        <button type="submit" className="searchButton">
          <SearchIcon />
        </button>
      </form>
    </div>
  );

export default SearchBar;

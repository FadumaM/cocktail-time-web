import React from "react";
import SearchBar from "../../components/SearchBar";

import "./styles.css";

const Home = () => {
  return (
    <div className="home">
      <div className="search-container">
        <SearchBar />
        <a class="random-search" href="/random">
          I'm Feeling Lucky
        </a>
      </div>
    </div>
  );
};

export default Home;

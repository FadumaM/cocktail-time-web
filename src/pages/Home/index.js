import React from "react";
import SearchBar from "../../components/SearchBar";

import "./styles.css";

const Home = () => {
  return (
    <div className="home">
      <div className="search-container">
        <SearchBar />
        <form className="random-search">
          <button>I'm Feeling Lucky</button>
        </form>
      </div>
    </div>
  );
};

export default Home;

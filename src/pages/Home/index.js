import React from "react";
import SearchBar from "../../components/SearchBar";
import "./styles.css";

const Home = () => (
  <main data-testid="home-page" className="home">
    <div className="search-container">
      <h1>What you drinking tonight ?</h1>
      <SearchBar />
      <a className="random-search" href="/random">
        I'm Feeling Lucky
      </a>
    </div>
  </main>
);

export default Home;

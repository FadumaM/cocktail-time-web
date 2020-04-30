import React from "react";
import SearchBar from "../../components/SearchBar";
import Nav from "../../components/Nav";
import "./styles.css";

const Home = () => (
  <div className="home">
    <Nav />
    <div className="search-container">
      <SearchBar />
    </div>
  </div>
);

export default Home;

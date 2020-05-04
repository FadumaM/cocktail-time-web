import React from "react";
import { useLocation } from "react-router-dom";
import Search from "../SearchBar";
import "./styles.css";

const Nav = () => {
  const { pathname } = useLocation();
  return (
    <nav>
      <ul className="list-container">
        <li className="list-item-logo">
          <a href="/">Cocktail time</a>
        </li>
        <li className="list-item-search">
          <Search disabled={pathname === "/"} />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

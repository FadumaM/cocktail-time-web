import React from "react";
import { useLocation } from "react-router-dom";
import Search from "../SearchBar";
import "./styles.css";

const Nav = (props) => {
  const { pathname } = useLocation();
  return (
    <nav>
      <ul className="list-container">
        <li className="list-item-logo">
          <p>Cocktail time</p>
        </li>
        <li className="list-item-search">
          <Search disable={pathname === "/"} />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

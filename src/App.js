import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Cocktail from "./pages/Cocktail";
import Nav from "./components/Nav/";
import "./App.css";

const App = () => {
  return (
    <>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={Results} />
        <Route path="/cocktails/:id" component={Cocktail} />
        <Route path="/random" component={Cocktail} />
      </Switch>
    </>
  );
};

export default App;

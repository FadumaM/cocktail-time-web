import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Cocktail from "./pages/Cocktail";
import Nav from "./components/Nav/";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/search">
          <Results />
        </Route>
        <Route path="/cocktails/:id">
          <Cocktail />
        </Route>
        <Route path="/random">
          <Cocktail />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

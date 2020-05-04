import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useParams, useLocation } from "react-router-dom";
import { GET_COCKTAIL, GET_RANDOM_COCKTAIL } from "./utils";
import Cocktail from "../../components/Cocktail";

const WithCocktailId = (Component) => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_COCKTAIL, {
    variables: { id },
  });

  if (loading) {
    return null;
  }
  return (
    <div data-testid="cocktail-page">
      <Component cocktail={data.getCocktailById} />
    </div>
  );
};
const WithRandomCocktail = (Component) => {
  const { data, loading } = useQuery(GET_RANDOM_COCKTAIL);

  if (loading) {
    return null;
  }
  return (
    <div data-testid="random-cocktail-page">
      <Component cocktail={data.getRandomCocktail} />
    </div>
  );
};

export default () => {
  const { pathname } = useLocation();
  return pathname === "/random"
    ? WithRandomCocktail(Cocktail)
    : WithCocktailId(Cocktail);
};

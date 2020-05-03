import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useParams, useLocation } from "react-router-dom";
import { GET_COCKTAIL, GET_RANDOM_COCKTAIL } from "./utils";
import Cocktail from "./Cocktail";

const WithCocktailId = (Component) => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_COCKTAIL, {
    variables: { id },
  });

  if (loading) {
    return null;
  }
  return <Component cocktail={data.getCocktailById} />;
};
const WithRandomCocktail = (Component) => {
  const { data, loading } = useQuery(GET_RANDOM_COCKTAIL);

  if (loading) {
    return null;
  }
  return <Component cocktail={data.getRandomCocktail} />;
};

export default () => {
  const { pathname } = useLocation();
  return pathname === "/random"
    ? WithRandomCocktail(Cocktail)
    : WithCocktailId(Cocktail);
};

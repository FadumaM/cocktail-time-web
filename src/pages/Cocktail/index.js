import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useParams, useLocation } from "react-router-dom";
import { GET_COCKTAIL, GET_RANDOM_COCKTAIL } from "./utils";
import Cocktail from "../../components/Cocktail";
import Error from "../Error";

const WithCocktailId = (Component) => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_COCKTAIL, {
    variables: { id },
  });

  if (loading) {
    return null;
  }
  if (!data || !data.getCocktailById || error) {
    return <Error />;
  }
  return (
    <main data-testid="cocktail-page">
      <Component cocktail={data.getCocktailById} />
    </main>
  );
};
const WithRandomCocktail = (Component) => {
  const { data, loading, error } = useQuery(GET_RANDOM_COCKTAIL);

  if (loading) {
    return null;
  }

  if (!data.getRandomCocktail || error) {
    return <Error />;
  }

  return (
    <main data-testid="random-cocktail-page">
      <Component cocktail={data.getRandomCocktail} />
    </main>
  );
};

export default () => {
  const { pathname } = useLocation();
  return pathname === "/random"
    ? WithRandomCocktail(Cocktail)
    : WithCocktailId(Cocktail);
};

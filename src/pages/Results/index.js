import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useQueryParams, GET_COCKTAILS, getMoreCocktails } from "./utils";
import ErrorPage from "../Error";

import "./styles.css";

const Results = () => {
  const query = useQueryParams();
  const searchTerm = query.get("term");

  const { data, loading, error, fetchMore } = useQuery(GET_COCKTAILS, {
    variables: { searchTerm, limit: 12, page: 1 },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) {
    return null;
  }

  if (error || !data || !data.getCocktails) {
    return <ErrorPage />;
  }

  const onClick = () =>
    getMoreCocktails({
      page: data.getCocktails.pagination.page,
      fetchMore,
    });

  const { getCocktails } = data;
  console.log(getCocktails);

  return (
    <main data-testid="results-page" className="results">
      <h1>Cocktails</h1>
      {getCocktails.results.length > 0 ? (
        <>
          <div className="total-results">
            <p>
              A total of <span>{getCocktails.totalResults}</span> results
            </p>
          </div>
          <div className="cocktails-results">
            {getCocktails.results.map((cocktail) => {
              return (
                <div key={cocktail.id} className="cocktail-result">
                  <a href={`/cocktails/${cocktail.id}`}>
                    <img alt={`For ${cocktail.name}`} src={cocktail.image} />
                    <p>{cocktail.name}</p>
                  </a>
                </div>
              );
            })}
          </div>
          {parseInt(getCocktails.totalResults) > getCocktails.results.length ? (
            <div className="more-results-container">
              <button onClick={onClick}>Show more</button>
            </div>
          ) : null}
        </>
      ) : null}
    </main>
  );
};

export default Results;

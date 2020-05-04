import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useQueryParams, GET_COCKTAILS, getMoreCocktails } from "./utils";

import "./styles.css";

const Results = () => {
  const query = useQueryParams();
  const searchTerm = query.get("term");

  const { data, loading, fetchMore } = useQuery(GET_COCKTAILS, {
    variables: { searchTerm, limit: 12, page: 1 },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) {
    return null;
  }

  const onClick = () =>
    getMoreCocktails({
      page: data.getCocktails.pagination.page,
      fetchMore,
    });

  return (
    <div data-testid="results-page" className="results">
      {data && data.getCocktails.results.length > 0 ? (
        <>
          <div className="total-results">
            <p>
              A total of <span>{data.getCocktails.totalResults}</span> results
            </p>
          </div>
          <div className="cocktails-results">
            {data.getCocktails.results.map((cocktail) => {
              return (
                <div key={cocktail.id} className="cocktail-result">
                  <a href={`/cocktails/${cocktail.id}`}>
                    <img alt={cocktail.name} src={cocktail.image} />
                    <p>{cocktail.name}</p>
                  </a>
                </div>
              );
            })}
          </div>
          {data.getCocktails.totalResults !==
            data.getCocktails.results.length && (
            <div className="more-results-container">
              <button onClick={onClick}>Show more</button>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default Results;

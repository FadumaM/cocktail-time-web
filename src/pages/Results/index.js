import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useQueryParams, GET_COCKTAILS, getMoreCocktails } from "./utils";

import "./index.css";

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
  const { getCocktails: cocktails } = data;

  return (
    <div className="results">
      <div className="total-results">
        <p>
          A total of <span>{cocktails.totalResults}</span> results
        </p>
      </div>
      <div className="cocktails-results">
        {cocktails.results.map((cocktail) => {
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
      {cocktails.totalResults > cocktails.results.length && (
        <div className="more-results-container">
          <button
            onClick={() =>
              getMoreCocktails({ page: cocktails.pagination.page, fetchMore })
            }
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
};

export default Results;

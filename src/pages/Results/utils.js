import { useLocation } from "react-router-dom";
import { gql } from "apollo-boost";

export const GET_COCKTAIL = gql`
  query GetCocktails($searchTerm: String!, $limit: Int!, $page: Int!) {
    getCocktails(searchTerm: $searchTerm, limit: $limit, page: $page) {
      results {
        id
        name
        image
      }
      totalResults
      pagination {
        page
        totalPages
        limit
      }
    }
  }
`;

export const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};

export const getMoreCocktails = ({ fetchMore, page }) =>
  fetchMore({
    variables: {
      limit: 12,
      page,
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult) return previousResult;
      return {
        getCocktails: {
          ...previousResult.getCocktails,
          pagination: {
            ...previousResult.getCocktails.pagination,
            ...fetchMoreResult.getCocktails.pagination,
          },
          results: [
            ...previousResult.getCocktails.results,
            ...fetchMoreResult.getCocktails.results,
          ],
        },
      };
    },
  });

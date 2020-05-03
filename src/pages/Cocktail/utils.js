import { gql } from "apollo-boost";

export const GET_RANDOM_COCKTAIL = gql`
  query GetRandomCocktail {
    getRandomCocktail {
      id
      name
      ingredients {
        amount
        name
      }
      image
      instruction
    }
  }
`;

export const GET_COCKTAIL = gql`
  query GetCocktailById($id: ID!) {
    getCocktailById(id: $id) {
      id
      name
      ingredients {
        amount
        name
      }
      image
      instruction
    }
  }
`;

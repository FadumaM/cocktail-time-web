import { gql } from "apollo-boost";

export const GET_COCKTAIL = gql`
  query GetCocktail($id: ID!) {
    getCocktail(id: $id) {
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

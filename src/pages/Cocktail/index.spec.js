import React from "react";
import { render } from "@testing-library/react";
import { useQuery } from "@apollo/react-hooks";
import { useLocation } from "react-router-dom";
import { GET_COCKTAIL, GET_RANDOM_COCKTAIL } from "./utils";
import Cocktail from "./index";

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn().mockImplementation(() => ({ pathname: "/cocktails" })),
  useParams: jest.fn().mockImplementation(() => ({ id: "1" })),
}));

jest.mock("@apollo/react-hooks", () => ({
  useQuery: jest
    .fn()
    .mockImplementation(() => ({ data: { getCocktailById: null } })),
}));

describe("Cocktail", () => {
  it("should call getCocktailById query when pathname is '/cocktails", () => {
    render(<Cocktail />);
    expect(useQuery).toHaveBeenCalledWith(GET_COCKTAIL, {
      variables: { id: "1" },
    });
  });
  it("should call getRandomCocktail query when pathname is '/random", () => {
    useLocation.mockImplementationOnce(() => ({ pathname: "/random" }));
    render(<Cocktail />);
    expect(useQuery).toHaveBeenCalledWith(GET_RANDOM_COCKTAIL);
  });
});

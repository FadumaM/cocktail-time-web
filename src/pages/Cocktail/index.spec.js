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
  useQuery: jest.fn(),
}));

describe("Cocktail", () => {
  it("should call getCocktailById query when pathname is '/cocktails", () => {
    useLocation.mockImplementationOnce(() => ({ pathname: "/cocktail/1" }));
    useQuery.mockImplementation(() => ({ data: { getCocktailById: {} } }));
    render(<Cocktail />);
    expect(useQuery).toHaveBeenCalledWith(GET_COCKTAIL, {
      variables: { id: "1" },
    });
  });
  it("should call getRandomCocktail query when pathname is '/random", () => {
    useLocation.mockImplementationOnce(() => ({ pathname: "/random" }));
    useQuery.mockImplementation(() => ({ data: { getRandomCocktail: {} } }));
    render(<Cocktail />);
    expect(useQuery).toHaveBeenCalledWith(GET_RANDOM_COCKTAIL);
  });

  it("should render Error page when there is an error", () => {
    useLocation.mockImplementationOnce(() => ({ pathname: "/cocktail/1" }));
    useQuery.mockImplementation(() => ({
      error: { message: "there is an error" },
      data: null,
    }));
    const { container } = render(<Cocktail />);
    const errorComponent = container.querySelector(".error-page");
    expect(errorComponent).toBeInTheDocument();
  });
  it("should render Error page when there is no data", () => {
    useLocation.mockImplementationOnce(() => ({ pathname: "random" }));
    useQuery.mockImplementation(() => ({
      data: { getRandomCocktail: null },
    }));
    const { container } = render(<Cocktail />);
    const errorComponent = container.querySelector(".error-page");
    expect(errorComponent).toBeInTheDocument();
  });
});

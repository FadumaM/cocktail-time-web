import React from "react";
import { Router } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";

import App from "./App";

jest.mock("@apollo/react-hooks", () => ({
  useQuery: jest.fn(),
}));

describe("App.js", () => {
  let renderWithRouter;
  beforeEach(() => {
    renderWithRouter = (
      ui,
      {
        route = "/",
        history = createMemoryHistory({ initialEntries: [route] }),
      } = {}
    ) => {
      const Wrapper = ({ children }) => (
        <Router history={history}>{children}</Router>
      );
      return {
        ...render(ui, { wrapper: Wrapper }),
        history,
      };
    };
  });
  it("renders nav", () => {
    const { getByText } = renderWithRouter(<App />);
    const linkElement = getByText(/Cocktail Time/i);
    expect(linkElement).toBeInTheDocument();
  });
  it("should render Home component when route /", () => {
    const route = "/";
    const { getByTestId } = renderWithRouter(<App />, { route });
    expect(getByTestId("home-page")).toBeInTheDocument();
  });
  it("should render Results component when route /search", () => {
    useQuery.mockImplementation(() => ({
      loading: false,
      data: { getCocktails: { results: [], totalResult: 0 } },
    }));

    const route = "/search";
    const { getByTestId } = renderWithRouter(<App />, { route });
    expect(getByTestId("results-page")).toBeInTheDocument();
  });

  it("should render Cocktail component when route /cocktails/:id", () => {
    useQuery.mockImplementationOnce(() => ({
      data: { getCocktailById: { id: 1, ingredients: [] } },
    }));
    const route = "/cocktails/1";
    const { getByTestId } = renderWithRouter(<App />, { route });
    expect(getByTestId("cocktail-page")).toBeInTheDocument();
  });
  it("should render Cocktail component when route /random", () => {
    useQuery.mockImplementationOnce(() => ({
      data: { getRandomCocktail: { id: 1, ingredients: [] } },
    }));
    const route = "/random";
    const { getByTestId } = renderWithRouter(<App />, { route });
    expect(getByTestId("random-cocktail-page")).toBeInTheDocument();
  });
});

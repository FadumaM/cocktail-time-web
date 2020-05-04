import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";

import App from "./App";

jest.mock("@apollo/react-hooks", () => ({
  useQuery: jest.fn().mockImplementation(() => ({ data: {}, loading: false })),
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
    const route = "/search";
    const { getByTestId } = renderWithRouter(<App />, { route });
    expect(getByTestId("results-page")).toBeInTheDocument();
  });
  it("should render Cocktail component when route /cocktails/:id", () => {
    const route = "/cocktails/1";
    const { getByTestId } = renderWithRouter(<App />, { route });
    expect(getByTestId("cocktail-page")).toBeInTheDocument();
  });
});

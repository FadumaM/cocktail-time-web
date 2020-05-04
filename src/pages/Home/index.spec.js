import React from "react";
import { render } from "@testing-library/react";
import Home from "./index";

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));

describe("Home", () => {
  it("should render SearchBar", () => {
    const { container } = render(<Home />);
    const searchBar = container.querySelector(".search-bar");
    expect(searchBar).toBeInTheDocument();
  });
  it("should render random cocktail link", () => {
    const { getByText } = render(<Home />);
    const randomCocktailLink = getByText(/I'm Feeling Lucky/i);
    expect(randomCocktailLink).toBeInTheDocument();
  });
});

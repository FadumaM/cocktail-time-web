import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { render, fireEvent } from "@testing-library/react";
import Results from "./index";

jest.mock("@apollo/react-hooks", () => ({
  useQuery: jest.fn(),
}));
jest.mock("./utils.js", () => ({
  useQueryParams: () => ({
    get: jest.fn().mockImplementation(() => "margarita"),
  }),
  getMoreCocktails: jest
    .fn()
    .mockImplementation(({ fetchMore, page }) => fetchMore()),
}));
describe("Result page", () => {
  it("should not render elements if no cocktail data", () => {
    useQuery.mockImplementationOnce(() => ({ data: null, loading: false }));
    const { container } = render(<Results />);
    const totalResults = container.querySelector(".total-results");
    const cocktails = container.querySelector(".cocktails-results");
    expect(totalResults).toBe(null);
    expect(cocktails).toBe(null);
  });
  it("should render totalResult", () => {
    useQuery.mockImplementationOnce(() => ({
      loading: false,
      data: {
        getCocktails: {
          totalResults: 1,
          results: [
            { id: "1234", name: "Cocktail Name", image: "cocktail-image.png" },
          ],
        },
      },
    }));
    const { container } = render(<Results />);
    const totalResults = container.querySelector(".total-results");
    expect(totalResults).toBeInTheDocument();
  });

  it("should render correct amount cocktails", () => {
    useQuery.mockImplementationOnce(() => ({
      loading: false,
      data: {
        getCocktails: {
          totalResults: 2,
          results: [
            {
              id: "1",
              name: "Cocktail Name 1",
              image: "cocktail-image1.png",
            },
            {
              id: "2",
              name: "Cocktail Name 2",
              image: "cocktail-image2.png",
            },
          ],
        },
      },
    }));
    const { container } = render(<Results />);
    const cocktails = container.querySelectorAll(".cocktail-result");
    expect(cocktails.length).toBe(2);
  });

  it("should render button when cocktail length is less then totalResults", () => {
    useQuery.mockImplementationOnce(() => ({
      loading: false,
      data: {
        getCocktails: {
          totalResults: 2,
          results: [
            {
              id: "1",
              name: "Cocktail Name 1",
              image: "cocktail-image1.png",
            },
          ],
        },
      },
    }));
    const { container } = render(<Results />);
    const button = container.querySelector("button");
    expect(button).not.toBeInTheDocument();
  });
  it("should not render button when cocktail length is equal totalResults", () => {
    useQuery.mockImplementationOnce(() => ({
      loading: false,
      data: {
        getCocktails: {
          totalResults: 2,
          results: [
            {
              id: "1",
              name: "Cocktail Name 1",
              image: "cocktail-image1.png",
            },
            {
              id: "2",
              name: "Cocktail Name 2",
              image: "cocktail-image2.png",
            },
          ],
        },
      },
    }));
    const { container } = render(<Results />);
    const button = container.querySelector("button");
    expect(button).toBeInTheDocument();
  });
  it("should call fetchMore function when button is clicked", () => {
    const mockFetchMore = jest.fn();
    useQuery.mockImplementationOnce(() => ({
      loading: false,
      data: {
        getCocktails: {
          totalResults: 1,
          results: [
            {
              id: "1",
              name: "Cocktail Name 1",
              image: "cocktail-image1.png",
            },
          ],
          pagination: {
            page: 2,
          },
        },
      },
      fetchMore: mockFetchMore,
    }));
    const { container } = render(<Results />);
    const button = container.querySelector("button");
    fireEvent.click(button);
    expect(mockFetchMore).toHaveBeenCalled();
  });

  it("should return error page if there is an error", () => {
    useQuery.mockImplementationOnce(() => ({
      error: { message: "error has occured" },
    }));
    const { container } = render(<Results />);
    const errorComponent = container.querySelector(".error-page");
    expect(errorComponent).toBeInTheDocument();
  });
});

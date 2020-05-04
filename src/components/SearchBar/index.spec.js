import React from "react";
import { render, fireEvent } from "@testing-library/react";
import * as router from "react-router";
import SearchBar from "./index";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));
describe("SearchBar", () => {
  it("should not render when disabled is true", () => {
    const { container } = render(<SearchBar disabled />);
    const searchBar = container.querySelector(".search-bar");
    expect(searchBar).not.toBeInTheDocument();
  });

  it("should route to correct page when form is submitted", () => {
    const historyHistory = { push: jest.fn() };
    jest.spyOn(router, "useHistory").mockImplementation(() => historyHistory);
    const { container } = render(<SearchBar disabled={false} />);
    const inputField = container.querySelector("input");
    const form = container.querySelector("form");

    fireEvent.change(inputField, { target: { value: "margarita" } });
    fireEvent.submit(form);

    expect(mockHistoryPush).toHaveBeenCalledWith("/search?term=margarita");
  });
});

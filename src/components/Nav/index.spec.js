import React from "react";
import { render } from "@testing-library/react";
import SearchBar from "./index";

jest.mock("react-router-dom", () => ({
  useLocation: () => ({
    pathname: "/search",
  }),
  useHistory: jest.fn(),
}));

describe("Nav", () => {
  it("should contain logo", () => {
    const { container } = render(<SearchBar disabled={false} />);
    const logo = container.querySelector(".list-item-logo");
    expect(logo).toBeInTheDocument();
  });
  it("should render SearchBar", () => {
    const { container } = render(<SearchBar disabled={false} />);
    const searchBar = container.querySelector(".search-bar");
    expect(searchBar).toBeInTheDocument();
  });
});

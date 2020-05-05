import React from "react";
import { render } from "@testing-library/react";
import ErrorPage from "./index";

describe("Error", () => {
  it("should render correctly", () => {
    const { baseElement } = render(<ErrorPage />);
    expect(baseElement).toMatchSnapshot();
  });
});
